import {Locator,Page} from "@playwright/test";
import {BasePage} from '../Pages/BasePage';


export class LoginPage extends BasePage{
//Private locators:
//readonly page:Page;
 private readonly emailId:Locator;
 private readonly password:Locator;
 private readonly loginBtn:Locator;
 private readonly forgottenPasswordLink:Locator;
 private readonly loginErrorMessage:Locator;
  

//constructor (name,age)
constructor(page:Page){
    super(page);//BasePage(page)
   // this.page=page;
    this.emailId=page.getByRole('textbox',{name:'E-Mail Address'});
    this.password=page.getByRole('textbox',{name:'Password'});
    this.loginBtn=page.getByRole('button',{name:'Login'});
    this.forgottenPasswordLink=page.getByRole('link',{name:'Forgotten Password'});  
     this.loginErrorMessage=page.locator('.alert.alert-danger.alert-dismissible');
}

//Page Acrtions

async goToLoginPage():Promise<void>{
    await this.page.goto('opencart/index.php?route=account/login',{waitUntil:'domcontentloaded'});
}

async doLogin(username:string,password:string){
    
    console.log(`User Credentials : ${username} - ${password}`);

    await this.emailId.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
    console.log("User Logged in successfully ");

}

async isInvalidLoginErrorDisplayed():Promise<boolean>{
    return await this.loginErrorMessage.isVisible();

}



}