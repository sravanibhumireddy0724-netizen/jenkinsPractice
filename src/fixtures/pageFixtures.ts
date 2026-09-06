import {test as baseTest} from '@playwright/test'
import { BasePage } from '../Pages/BasePage'
import { LoginPage } from '../Pages/LoginPage'
import { HomePage } from '../Pages/HomePage'
import { CsvHelper } from '../utils/CSVHelper'


type pageFixture={
    basePage:BasePage,
    loginPage:LoginPage,
    homePage:HomePage ,
    testData:Record<string,string>[]
    
    }

export let test=baseTest.extend<pageFixture>({
basePage:async({page},use)=>{
    let basePage=new BasePage(page);
    await use(basePage)
},

loginPage:async({page},use)=>{

    let loginPage=new LoginPage(page);
    await use(loginPage)
},

homePage:async({page},use)=>{

    let homePage=new HomePage(page);
    await use(homePage)
},
testData:async({},use)=>{

    let testData=CsvHelper.readCsv('src/data/loginData.csv')
    await use(testData)
},


})

export {expect} from '@playwright/test'