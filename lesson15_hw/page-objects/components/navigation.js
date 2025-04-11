import { Base } from '../base.js';

export class Navigation extends Base {
    constructor(page) {
        super(page);
    }

    async getItemByName(itemName) {
        const items = {
            //Elements
            textBox: '.element-group:nth-of-type(1) #item-0',
            checkBox: '.element-group:nth-of-type(1) #item-1',
            radioButton: '.element-group:nth-of-type(1) #item-2',
            webTables: '.element-group:nth-of-type(1) #item-3',
            buttons: '.element-group:nth-of-type(1) #item-4',
            links: '.element-group:nth-of-type(1) #item-5',
            brokenLinksImages: '.element-group:nth-of-type(1) #item-6',
            uploadAndDownload: '.element-group:nth-of-type(1) #item-7',
            dynamicProperies: '.element-group:nth-of-type(1) #item-8',

            //Alerts, Frame & Windows
            browserWindows: '.element-group:nth-of-type(3) #item-0',
            alerts: '.element-group:nth-of-type(3) #item-1',
            frames: '.element-group:nth-of-type(3) #item-2',
            nestedFrames: '.element-group:nth-of-type(3) #item-3',
            modalDialogs: '.element-group:nth-of-type(3) #item-4',
        }
        return items[itemName];
    }
    
    //itemName - имя тестируемого элемента типа Text Box, Radio Button, Alerts и т.д.
    async goToPageByItemName(itemName) {
        await this.page.locator(await this.getItemByName(itemName)).click();
    }
}