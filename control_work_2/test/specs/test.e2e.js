import Header from '../pageobjects/components/header.js';
import TestData from '../testData.js';
import Signup from '../pageobjects/signup.js';
import { expect } from 'chai';
import SignupLogin from '../pageobjects/signupLogin.js';
import ContactUs from '../pageobjects/contactUs.js';


describe('Automation Exercise tests', () => {
    
/*     before(async () => {
        await Header.navigate('https://www.automationexercise.com/');
        await Signup.createNewAccount(TestData.testUser.fastUser);
        await Header.logout();
    }); */

    beforeEach(async () => {
        await Header.navigate('https://www.automationexercise.com/');
    })

/*     it('should successfully register and delete a user account', async () => {
        await Signup.createNewAccount(TestData.testUser.fullUser);
        expect(await Header.loggedInAs.getText()).to.equal(`${TestData.testUser.fullUser.name}`);

        await Header.deleteAccount();
        expect(await Header.signupLogin.isDisplayed()).to.be.true;
        //пытаемся залогиниться удалённым аккаунтом и убеждаемся, что аккаунт удалён
        await SignupLogin.login(TestData.testUser.fullUser);
        expect(await SignupLogin.loginErrorMessage.isDisplayed()).to.be.true;
    });

    it('should successfully login with existed user account and delete account', async () => {
        await SignupLogin.login(TestData.testUser.fastUser);
        expect(await Header.loggedInAs.getText()).to.equal(`${TestData.testUser.fastUser.name}`);

        await Header.deleteAccount();
        expect(await Header.signupLogin.isDisplayed()).to.be.true;
        //пытаемся залогиниться удалённым аккаунтом и убеждаемся, что аккаунт удалён
        await SignupLogin.login(TestData.testUser.fastUser);
        expect(await SignupLogin.loginErrorMessage.isDisplayed()).to.be.true;
    });

    it('should successfully open feedbak form, fill it and send', async () => {
        await ContactUs.sendFeedback(TestData.testUser.feedbackUser);
        expect (await ContactUs.homeButton.isDisplayed()).to.be.true;
    }); */
});

