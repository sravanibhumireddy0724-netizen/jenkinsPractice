import { test, expect } from '@playwright/test';
import{LoginPage} from '../src/Pages/LoginPage';
import{HomePage} from '../src/Pages/HomePage';


let loginPage:LoginPage;
let homePage:HomePage;

test.beforeEach( async({page})=>{
loginPage=new LoginPage(page);
await loginPage.goToLoginPage();
homePage=new HomePage(page);

});

test('Checking Config file reading - User able to login@smoke',async({})=>{
await loginPage.goToLoginPage();
await loginPage.doLogin(process.env.APP_USERNAME!,process.env.APP_PASSWORD!);
await homePage.isLogoutLinkExist();
})


test('Verifyting Login functionality', async ({ page }) => {
await loginPage.doLogin('dev123@nal.com','Test@123');
expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();

  
});

test('Verifyting Login Error Message', async ({ page }) => {
await loginPage.doLogin('dev123@nal.com23','Test@123');
console.log("hi hello");
expect.soft(await loginPage.isInvalidLoginErrorDisplayed()).toBeTruthy();
});


