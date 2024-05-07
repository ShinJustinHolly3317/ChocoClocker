import * as dotenv from 'dotenv'
import puppeteer from 'puppeteer'
import { localCookies } from './local-cookies.js'
dotenv.config();

// recurisve find target
const avoidTarget = async (asyncFn, target) => {
  const val = await asyncFn();
  console.log(`${val} is not equal to ${target}`);
  if (val !== target) {
    return true;
  } else {
    return avoidTarget(asyncFn, target);
  }
}
  
;(async () => {
  console.log(`Clocker started at ${new Date()}`);
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  page.setDefaultNavigationTimeout(0)
  await page.setCookie(...localCookies)

  await page.goto('https://bsignin.104.com.tw/login')

  // Typing account info
  await page.waitForSelector('input[data-qa-id="loginUserName"]')
  await page.type('input[data-qa-id="loginUserName"]', process.env.account)
  await page.waitForSelector('input[data-qa-id="loginPassword"]')
  await page.type('input[data-qa-id="loginPassword"]', process.env.password)

  // log in
  const loginBtnSelector = '[data-qa-id="loginButton"]'
  await page.waitForSelector(loginBtnSelector)
  await page.click(loginBtnSelector)
  await page.waitForNavigation()

  // go to secretary page
  await page.goto('https://pro.104.com.tw/psc2')
  await page.content()
  
  try {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let selector = '';

    // 由時間做判斷
    if (currentHour < 12) {
      selector = '.PSC-ClockIn.morning'; 
    } else if (currentHour >= 12 && currentHour < 18) {
      selector = '.PSC-ClockIn.noon'; 
    } else {
      selector = '.PSC-ClockIn.night';
    }

    // 等待特定的 div 元素出现
    const divElement = await page.waitForSelector(selector, { timeout: 300000 }); 

    // wait for clock-in botton div
    const divElement = await page.waitForSelector(selector, { timeout: 100000 }); 
    // wait for clock-in time updated, cause default is 1970.1.1, sometimes will clock with that time before the datetime updated.
    const dateEle = await page.waitForSelector('.PSC-ClockIn .-date', { timeout: 100000 });
    avoidTarget(async () => {
      const dateText = await page.evaluate(element => element.textContent, dateEle);
      console.log('dateText', dateText);
      return dateText.split('.')[0];
    }, '1970')
    
    const divHTML = await page.evaluate(div => div.outerHTML, divElement);
    console.log('div 元素的 HTML：', divHTML);
    page.on('console', message =>
    console.log(`log: $${message.text()}`))
    await page.evaluate(async () => {
      const button = document.querySelector('.right-side > span.btn');
      if (button) {

        button.click();
        console.log('已點擊');
      } else {
        console.log('未找到按钮');
      }
    });
  } catch (error) {
    console.error('未找到特定的 div：', error);
  }
  await browser.close()
})()
