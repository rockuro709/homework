/*******************************************************************************

    uBlock Origin Lite - a comprehensive, MV3-compliant content blocker
    Copyright (C) 2022-present Raymond Hill

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see {http://www.gnu.org/licenses/}.

    Home: https://github.com/gorhill/uBlock
*/

import {
    i18n,
    localRead, localRemove, localWrite,
    runtime,
    sessionRead, sessionRemove, sessionWrite,
} from './ext.js';

import {
    rulesetConfig,
    saveRulesetConfig,
} from './config.js';

import { dnr } from './ext-compat.js';
import { fetchJSON } from './fetch.js';
import { getAdminRulesets } from './admin.js';
import { hasBroadHostPermissions } from './utils.js';
import { ubolLog } from './debug.js';

/******************************************************************************/

const TRUSTED_DIRECTIVE_BASE_RULE_ID = 8000000;
const STRICTBLOCK_PRIORITY = 29;

let dynamicRegexCount = 0;
let sessionRegexCount = 0;

/******************************************************************************/

const isStrictBlockRule = rule => {
    if ( rule.priority !== STRICTBLOCK_PRIORITY ) { return false; }
    if ( rule.action.type !== 'redirect' ) { return false; }
    const substitution = rule.action.redirect.regexSubstitution;
    return substitution !== undefined &&
        substitution.includes('/strictblock.');
};

/******************************************************************************/

function getRulesetDetails() {
    if ( getRulesetDetails.rulesetDetailsPromise !== undefined ) {
        return getRulesetDetails.rulesetDetailsPromise;
    }
    getRulesetDetails.rulesetDetailsPromise = fetchJSON('/rulesets/ruleset-details').then(entries => {
        const rulesMap = new Map(
            entries.map(entry => [ entry.id, entry ])
        );
        return rulesMap;
    });
    return getRulesetDetails.rulesetDetailsPromise;
}

/******************************************************************************/

async function pruneInvalidRegexRules(realm, rulesIn) {
    const rejectedRegexRules = [];

    const validateRegex = regex => {
        return dnr.isRegexSupported({ regex, isCaseSensitive: false }).then(result => {
            const isSupported = result?.isSupported || false;
            pruneInvalidRegexRules.validated.set(regex, isSupported);
            if ( isSupported ) { return true; }
            rejectedRegexRules.push(`\t${regex}  ${result?.reason}`);
            return false;
        });
    };

    // Validate regex-based rules
    const toCheck = [];
    for ( const rule of rulesIn ) {
        if ( rule.condition?.regexFilter === undefined ) {
            toCheck.push(true);
            continue;
        }
        const { regexFilter } = rule.condition;
        if ( pruneInvalidRegexRules.validated.has(regexFilter) ) {
            toCheck.push(pruneInvalidRegexRules.validated.get(regexFilter));
            continue;
        }
        toCheck.push(validateRegex(regexFilter));
    }

    // Collate results
    const isValid = await Promise.all(toCheck);

    if ( rejectedRegexRules.length !== 0 ) {
        ubolLog(`${realm} realm: rejected regexes:\n`,
            rejectedRegexRules.join('\n')
        );
    }

    return rulesIn.filter((v, i) => isValid[i]);
}
pruneInvalidRegexRules.validated = new Map();

/******************************************************************************/

async function updateRegexRules(currentRules, addRules, removeRuleIds) {
    // Remove existing regex-related block rules
    for ( const rule of currentRules ) {
        const { type } = rule.action;
        if ( type !== 'block' && type !== 'allow' ) { continue; }
        if ( rule.condition.regexFilter === undefined ) { continue; }
        removeRuleIds.push(rule.id);
    }

    const rulesetDetails = await getEnabledRulesetsDetails();

    // Fetch regexes for all enabled rulesets
    const toFetch = [];
    for ( const details of rulesetDetails ) {
        if ( details.rules.regex === 0 ) { continue; }
        toFetch.push(fetchJSON(`/rulesets/regex/${details.id}`));
    }
    const regexRulesets = await Promise.all(toFetch);

    // Collate all regexes rules
    const allRules = [];
    for ( const rules of regexRulesets ) {
        if ( Array.isArray(rules) === false ) { continue; }
        for ( const rule of rules ) {
            allRules.push(rule);
        }
    }
    if ( allRules.length === 0 ) { return; }

    const validRules = await pruneInvalidRegexRules('regexes', allRules);
    if ( validRules.length === 0 ) { return; }

    ubolLog(`Add ${validRules.length} DNR regex rules`);
    addRules.push(...validRules);
}

/******************************************************************************/

async function updateRemoveparamRules(currentRules, addRules, removeRuleIds) {
    // Remove existing removeparam-related rules
    for ( const rule of currentRules ) {
        if ( rule.action.type !== 'redirect' ) { continue; }
        if ( rule.action.redirect.transform === undefined ) { continue; }
        removeRuleIds.push(rule.id);
    }

    const rulesetDetails = await getEnabledRulesetsDetails();

    // Fetch removeparam rules for all enabled rulesets
    const toFetch = [];
    for ( const details of rulesetDetails ) {
        if ( details.rules.removeparam === 0 ) { continue; }
        toFetch.push(fetchJSON(`/rulesets/removeparam/${details.id}`));
    }
    const removeparamRulesets = await Promise.all(toFetch);

    // Removeparam rules can only be enforced with omnipotence
    const allRules = [];
    for ( const rules of removeparamRulesets ) {
        if ( Array.isArray(rules) === false ) { continue; }
        for ( const rule of rules ) {
            allRules.push(rule);
        }
    }
    if ( allRules.length === 0 ) { return; }

    const validRules = await pruneInvalidRegexRules('removeparam', allRules);
    if ( validRules.length === 0 ) { return; }

    ubolLog(`Add ${validRules.length} DNR removeparam rules`);
    addRules.push(...validRules);
}

/******************************************************************************/

async function updateRedirectRules(currentRules, addRules, removeRuleIds) {
    // Remove existing redirect-related rules
    for ( const rule of currentRules ) {
        if ( rule.action.type !== 'redirect' ) { continue; }
        if ( rule.action.redirect.extensionPath === undefined ) { continue; }
        removeRuleIds.push(rule.id);
    }

    const rulesetDetails = await getEnabledRulesetsDetails();

    // Fetch redirect rules for all enabled rulesets
    const toFetch = [];
    for ( const details of rulesetDetails ) {
        if ( details.rules.redirect === 0 ) { continue; }
        toFetch.push(fetchJSON(`/rulesets/redirect/${details.id}`));
    }
    const redirectRulesets = await Promise.all(toFetch);

    // Redirect rules can only be enforced with omnipotence
    const allRules = [];
    for ( const rules of redirectRulesets ) {
        if ( Array.isArray(rules) === false ) { continue; }
        for ( const rule of rules ) {
            allRules.push(rule);
        }
    }
    if ( allRules.length === 0 ) { return; }

    const validRules = await pruneInvalidRegexRules('redirect', allRules);
    if ( validRules.length === 0 ) { return; }

    ubolLog(`Add ${validRules.length} DNR redirect rules`);
    addRules.push(...validRules);
}

/******************************************************************************/

async function updateModifyHeadersRules(currentRules, addRules, removeRuleIds) {
    // Remove existing header modification-related rules
    for ( const rule of currentRules ) {
        if ( rule.action.type !== 'modifyHeaders' ) { continue; }
        removeRuleIds.push(rule.id);
    }

    const rulesetDetails = await getEnabledRulesetsDetails();

    // Fetch modifyHeaders rules for all enabled rulesets
    const toFetch = [];
    for ( const details of rulesetDetails ) {
        if ( details.rules.modifyHeaders === 0 ) { continue; }
        toFetch.push(fetchJSON(`/rulesets/modify-headers/${details.id}`));
    }
    const rulesets = await Promise.all(toFetch);

    // Redirect rules can only be enforced with omnipotence
    const allRules = [];
    for ( const rules of rulesets ) {
        if ( Array.isArray(rules) === false ) { continue; }
        for ( const rule of rules ) {
            allRules.push(rule);
        }
    }
    if ( allRules.length === 0 ) { return; }

    const validRules = await pruneInvalidRegexRules('modify-headers', allRules);
    if ( validRules.length === 0 ) { return; }

    ubolLog(`Add ${validRules.length} DNR modify-headers rules`);
    addRules.push(...validRules);
}

/******************************************************************************/

async function updateDynamicRules() {
    const currentRules = await dnr.getDynamicRules();
    const addRules = [];
    const removeRuleIds = [];

    // Remove potentially left-over strict-block rules from previous version
    for ( const rule of currentRules ) {
        if ( isStrictBlockRule(rule) === false ) { continue; }
        removeRuleIds.push(rule.id);
    }

    await Promise.all([
        updateRegexRules(currentRules, addRules, removeRuleIds),
        updateRemoveparamRules(currentRules, addRules, removeRuleIds),
        updateRedirectRules(currentRules, addRules, removeRuleIds),
        updateModifyHeadersRules(currentRules, addRules, removeRuleIds),
    ]);
    if ( addRules.length === 0 && removeRuleIds.length === 0 ) { return; }

    dynamicRegexCount = 0;
    let ruleId = 1;
    for ( const rule of addRules ) {
        if ( rule?.condition.regexFilter ) { dynamicRegexCount += 1; }
        if ( (rule.id || 0) >= TRUSTED_DIRECTIVE_BASE_RULE_ID ) { continue; }
        rule.id = ruleId++;
    }
    if ( dynamicRegexCount !== 0 ) {
        ubolLog(`Using ${dynamicRegexCount}/${dnr.MAX_NUMBER_OF_REGEX_RULES} dynamic regex-based DNR rules`);
    }
    return Promise.all([
        dnr.updateDynamicRules({ addRules, removeRuleIds }).then(( ) => {
            if ( removeRuleIds.length !== 0 ) {
                ubolLog(`Remove ${removeRuleIds.length} dynamic DNR rules`);
            }
            if ( addRules.length !== 0 ) {
                ubolLog(`Add ${addRules.length} dynamic DNR rules`);
            }
        }).catch(reason => {
            console.error(`updateDynamicRules() / ${reason}`);
        }),
        updateSessionRules(),
    ]);
}

/******************************************************************************/

async function updateStrictBlockRules(currentRules, addRules, removeRuleIds) {
    // Remove existing strictblock-related rules
    for ( const rule of currentRules ) {
        if ( isStrictBlockRule(rule) === false ) { continue; }
        removeRuleIds.push(rule.id);
    }

    if ( rulesetConfig.strictBlockMode === false ) { return; }

    const [
        hasOmnipotence,
        rulesetDetails,
        permanentlyExcluded = [],
        temporarilyExcluded = [],
    ] = await Promise.all([
        hasBroadHostPermissions(),
        getEnabledRulesetsDetails(),
        localRead('excludedStrictBlockHostnames'),
        sessionRead('excludedStrictBlockHostnames'),
    ]);

    // Strict-block rules can only be enforced with omnipotence
    if ( hasOmnipotence === false ) {
        localRemove('excludedStrictBlockHostnames');
        sessionRemove('excludedStrictBlockHostnames');
        return;
    }

    // Fetch strick-block rules
    const toFetch = [];
    for ( const details of rulesetDetails ) {
        if ( details.rules.strictblock === 0 ) { continue; }
        toFetch.push(fetchJSON(`/rulesets/strictblock/${details.id}`));
    }
    const rulesets = await Promise.all(toFetch);

    const substitution = `${runtime.getURL('/strictblock.html')}#\\0`;
    const allRules = [];
    for ( const rules of rulesets ) {
        if ( Array.isArray(rules) === false ) { continue; }
        for ( const rule of rules ) {
            rule.action.redirect.regexSubstitution = substitution;
            allRules.push(rule);
        }
    }

    const validRules = await pruneInvalidRegexRules('strictblock', allRules);
    if ( validRules.length === 0 ) { return; }
    ubolLog(`Add ${validRules.length} DNR strictblock rules`);
    for ( const rule of validRules ) {
        rule.priority = STRICTBLOCK_PRIORITY;
        addRules.push(rule);
    }

    const allExcluded = permanentlyExcluded.concat(temporarilyExcluded);
    if ( allExcluded.length === 0 ) { return; }
    addRules.push({
        action: { type: 'allow' },
        condition: {
            requestDomains: allExcluded,
            resourceTypes: [ 'main_frame' ],
        },
        priority: STRICTBLOCK_PRIORITY,
    });
    ubolLog(`Add 1 DNR session rule with ${allExcluded.length} for excluded strict-block domains`);
}

async function excludeFromStrictBlock(hostname, permanent) {
    if ( typeof hostname !== 'string' || hostname === '' ) { return; }
    const readFn = permanent ? localRead : sessionRead;
    const hostnames = new Set(await readFn('excludedStrictBlockHostnames'));
    hostnames.add(hostname);
    const writeFn = permanent ? localWrite : sessionWrite;
    await writeFn('excludedStrictBlockHostnames', Array.from(hostnames));
    return updateSessionRules();
}

async function setStrictBlockMode(state, force = false) {
    const newState = Boolean(state);
    if ( force === false ) {
        if ( newState === rulesetConfig.strictBlockMode ) { return; }
    }
    rulesetConfig.strictBlockMode = newState;
    const promises = [ saveRulesetConfig() ];
    if ( newState === false ) {
        promises.push(
            localRemove('excludedStrictBlockHostnames'),
            sessionRemove('excludedStrictBlockHostnames')
        );
    }
    await Promise.all(promises);
    return updateSessionRules();
}

/******************************************************************************/

async function updateSessionRules() {
    const addRulesUnfiltered = [];
    const removeRuleIds = [];
    const currentRules = await dnr.getSessionRules();
    await updateStrictBlockRules(currentRules, addRulesUnfiltered, removeRuleIds);
    if ( addRulesUnfiltered.length === 0 && removeRuleIds.length === 0 ) { return; }
    const maxRegexCount = dnr.MAX_NUMBER_OF_REGEX_RULES * 0.80;
    let regexCount = dynamicRegexCount;
    let ruleId = 1;
    for ( const rule of addRulesUnfiltered ) {
        if ( rule?.condition.regexFilter ) { regexCount += 1; }
        rule.id = regexCount < maxRegexCount ? ruleId++ : 0;
    }
    sessionRegexCount = regexCount - dynamicRegexCount;
    const addRules = addRulesUnfiltered.filter(a => a.id !== 0);
    const rejectedRuleCount = addRulesUnfiltered.length - addRules.length;
    if ( rejectedRuleCount !== 0 ) {
        ubolLog(`Too many regex-based filters, ${rejectedRuleCount} session rules dropped`);
    }
    if ( sessionRegexCount !== 0 ) {
        ubolLog(`Using ${sessionRegexCount}/${dnr.MAX_NUMBER_OF_REGEX_RULES} session regex-based DNR rules`);
    }
    return dnr.updateSessionRules({ addRules, removeRuleIds }).then(( ) => {
        if ( removeRuleIds.length !== 0 ) {
            ubolLog(`Remove ${removeRuleIds.length} session DNR rules`);
        }
        if ( addRules.length !== 0 ) {
            ubolLog(`Add ${addRules.length} session DNR rules`);
        }
    }).catch(reason => {
        console.error(`updateSessionRules() / ${reason}`);
    });
}

/******************************************************************************/

async function filteringModesToDNR(modes) {
    const noneHostnames = new Set([ ...modes.none ]);
    const notNoneHostnames = new Set([ ...modes.basic, ...modes.optimal, ...modes.complete ]);
    const requestDomains = [];
    const excludedRequestDomains = [];
    const allowEverywhere = noneHostnames.has('all-urls');
    if ( allowEverywhere ) {
        excludedRequestDomains.push(...notNoneHostnames);
    } else {
        requestDomains.push(...noneHostnames);
    }
    const noneCount = allowEverywhere
        ? notNoneHostnames.size
        : noneHostnames.size;
    return dnr.setAllowAllRules(
        TRUSTED_DIRECTIVE_BASE_RULE_ID,
        requestDomains.sort(),
        excludedRequestDomains.sort(),
        allowEverywhere
    ).then(modified => {
        if ( modified === false ) { return; }
        ubolLog(`${allowEverywhere ? 'Enabled' : 'Disabled'} DNR filtering for ${noneCount} sites`);
    });
}

/******************************************************************************/

async function defaultRulesetsFromLanguage() {
    const dropCountry = lang => {
        const pos = lang.indexOf('-');
        if ( pos === -1 ) { return lang; }
        return lang.slice(0, pos);
    };

    const langSet = new Set();

    for ( const lang of navigator.languages.map(dropCountry) ) {
        langSet.add(lang);
    }
    langSet.add(dropCountry(i18n.getUILanguage()));

    const reTargetLang = new RegExp(
        `\\b(${Array.from(langSet).join('|')})\\b`
    );

    const rulesetDetails = await getRulesetDetails();
    const out = [];
    for ( const ruleset of rulesetDetails.values() ) {
        const { id, enabled } = ruleset;
        if ( enabled ) {
            out.push(id);
            continue;
        }
        if ( typeof ruleset.lang !== 'string' ) { continue; }
        if ( reTargetLang.test(ruleset.lang) === false ) { continue; }
        out.push(id);
    }
    return out;
}

/******************************************************************************/

async function patchDefaultRulesets() {
    const [
        oldDefaultIds = [],
        newDefaultIds,
        staticRulesetIds,
    ] = await Promise.all([
        localRead('defaultRulesetIds'),
        defaultRulesetsFromLanguage(),
        getStaticRulesets().then(r => r.map(a => a.id)),
    ]);
    const toAdd = [];
    const toRemove = [];
    for ( const id of newDefaultIds ) {
        if ( oldDefaultIds.includes(id) ) { continue; }
        toAdd.push(id);
    }
    for ( const id of oldDefaultIds ) {
        if ( newDefaultIds.includes(id) ) { continue; }
        toRemove.push(id);
    }
    for ( const id of rulesetConfig.enabledRulesets ) {
        if ( staticRulesetIds.includes(id) ) { continue; }
        toRemove.push(id);
    }
    localWrite('defaultRulesetIds', newDefaultIds);
    if ( toAdd.length === 0 && toRemove.length === 0 ) { return; }
    const enabledRulesets = new Set(rulesetConfig.enabledRulesets);
    toAdd.forEach(id => enabledRulesets.add(id));
    toRemove.forEach(id => enabledRulesets.delete(id));
    const patchedRulesets = Array.from(enabledRulesets);
    ubolLog(`Patched rulesets: ${rulesetConfig.enabledRulesets} => ${patchedRulesets}`);
    rulesetConfig.enabledRulesets = patchedRulesets;
}

/******************************************************************************/

async function enableRulesets(ids) {
    const afterIds = new Set(ids);
    const [
        beforeIds,
        adminIds,
        rulesetDetails,
    ] = await Promise.all([
        dnr.getEnabledRulesets().then(ids => new Set(ids)),
        getAdminRulesets(),
        getRulesetDetails(),
    ]);

    for ( const token of adminIds ) {
        const c0 = token.charAt(0);
        const id = token.slice(1);
        if ( c0 === '+' ) {
            afterIds.add(id);
        } else if ( c0 === '-' ) {
            afterIds.delete(id);
        }
    }

    const enableRulesetSet = new Set();
    const disableRulesetSet = new Set();
    for ( const id of afterIds ) {
        if ( beforeIds.has(id) ) { continue; }
        enableRulesetSet.add(id);
    }
    for ( const id of beforeIds ) {
        if ( afterIds.has(id) ) { continue; }
        disableRulesetSet.add(id);
    }

    // Be sure the rulesets to enable/disable do exist in the current version,
    // otherwise the API throws.
    for ( const id of enableRulesetSet ) {
        if ( rulesetDetails.has(id) ) { continue; }
        enableRulesetSet.delete(id);
    }
    for ( const id of disableRulesetSet ) {
        if ( rulesetDetails.has(id) ) { continue; }
        disableRulesetSet.delete(id);
    }

    if ( enableRulesetSet.size === 0 && disableRulesetSet.size === 0 ) {
        return false;
    }

    const enableRulesetIds = Array.from(enableRulesetSet);
    const disableRulesetIds = Array.from(disableRulesetSet);

    if ( enableRulesetIds.length !== 0 ) {
        ubolLog(`Enable rulesets: ${enableRulesetIds}`);
    }
    if ( disableRulesetIds.length !== 0 ) {
        ubolLog(`Disable ruleset: ${disableRulesetIds}`);
    }
    await dnr.updateEnabledRulesets({ enableRulesetIds, disableRulesetIds }).catch(reason => {
        ubolLog(reason);
    });

    await updateDynamicRules();

    dnr.getEnabledRulesets().then(enabledRulesets => {
        ubolLog(`Enabled rulesets: ${enabledRulesets}`);
        return dnr.getAvailableStaticRuleCount();
    }).then(count => {
        ubolLog(`Available static rule count: ${count}`);
    });

    return true;
}

/******************************************************************************/

async function getStaticRulesets() {
    const manifest = runtime.getManifest();
    return manifest.declarative_net_request.rule_resources;
}

/******************************************************************************/

async function getEnabledRulesetsDetails() {
    const [
        ids,
        rulesetDetails,
    ] = await Promise.all([
        dnr.getEnabledRulesets(),
        getRulesetDetails(),
    ]);
    const out = [];
    for ( const id of ids ) {
        const ruleset = rulesetDetails.get(id);
        if ( ruleset === undefined ) { continue; }
        out.push(ruleset);
    }
    return out;
}

/******************************************************************************/

export {
    defaultRulesetsFromLanguage,
    enableRulesets,
    excludeFromStrictBlock,
    filteringModesToDNR,
    getEnabledRulesetsDetails,
    getRulesetDetails,
    patchDefaultRulesets,
    setStrictBlockMode,
    updateDynamicRules,
    updateSessionRules,
};
