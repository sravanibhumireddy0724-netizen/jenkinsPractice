import {Locator,Page} from "@playwright/test"


export class BasePage{
//Private locators:
readonly page:Page;
 protected readonly logo:Locator;
 protected readonly searchBox:Locator;
 protected readonly searchIcon:Locator;
 protected readonly footerLinks:Locator;
 protected readonly currency:Locator;
 protected readonly cartButton:Locator;
  

//constructor (name,age)
constructor(page:Page){//BasePage(page) or LoginPage(page)
    this.page=page;//base page object creation ot child pages object creation
    this.logo=page.getByAltText('naveenopencart');
    this.searchBox=page.getByRole('textbox',{name:'Search'});
    this.searchIcon=page.locator('div#search button');
    this.footerLinks=page.locator('footer a') 
    this.currency=page.locator('#form-currency')  
   this.cartButton = page.locator('div#cart button');   
}

//Page Acrtions

async isSeacrhBoxVisible():Promise<Boolean>{

   return await this.searchBox.isVisible();
   
}

async isLogoVisible():Promise<Boolean>{

   return await this.logo.isVisible();
   
}


async isCurrencyVisible():Promise<Boolean>{

   return await this.currency.isVisible();
   
}

async getPageFootersCount():Promise<number>{

   return await this.footerLinks.count();
   
}

async takeScreenshot(name:string):Promise<Buffer>{
    return await this.page.screenshot({
        fullPage:true,
        path:`reports/screenshots/${name}.png`
    });

}

}