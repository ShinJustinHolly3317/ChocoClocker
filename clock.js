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

const randInt = (int) => {
  const randint = Math.ceil(Math.random() * int)
  console.log(`randint: ${randint}`);
  return randint
}
const sleepByMins = (mins) => new Promise((res) => setTimeout(res, mins * 1000 * 60))

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

  // wait for clock-in botton div
  await page.waitForSelector(selector, { timeout: 1000000 }); 
  // wait for clock-in time updated, cause default is 1970.1.1, sometimes will clock with that time before the datetime updated.
  await page.waitForSelector('.PSC-ClockIn .-date', { timeout: 1000000 });
  const cookie = (await page.cookies()).map(cookieObj => `${cookieObj.name}=${cookieObj.value}`).join('; ');

  await sleepByMins(randInt(10))

  console.log(cookie);
  fetch("https://pro.104.com.tw/psc2/api/f0400/newClockin", {
    "headers": {
      "accept": "application/json",
      "accept-language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7,zh-CN;q=0.6",
      "content-type": "application/json",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Chromium\";v=\"124\", \"Google Chrome\";v=\"124\", \"Not-A.Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"macOS\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-request": "JSON",
      "x-requested-with": "XMLHttpRequest",
      "cookie": cookie,
      "Referer": "https://pro.104.com.tw/psc2",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": "",
    "method": "POST"
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.log(error))
  .finally(() => browser.close())
})()
