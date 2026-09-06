import {Locator,Page} from "@playwright/test";
import {BasePage} from '../Pages/BasePage';


export class HomePage extends BasePage{
//Private locators:
//readonly page:Page;
 private readonly logoutLink:Locator;
 private readonly headers:Locator;

constructor(page:Page){
    super(page);//BasePage(page)
   
    this.logoutLink=page.getByRole('link',{name:'Logout'});
    this.headers=page.getByRole('heading',{level:2});
   
}

//Page Acrtions


async isLogoutLinkExist():Promise<boolean>{
    return await this.logoutLink.first().isVisible();

}

async getHomePageHeaders():Promise<string[]>{
    return await this.headers.allInnerTexts();
}

async doSearch(searchKey:string):Promise<void>{

    console.log(`search key : ${searchKey}`);
    await this.searchBox.fill(searchKey);
    await this.searchIcon.click();
}

async getHomePageTitle():Promise<string>{
    return await this.page.title();
}


}