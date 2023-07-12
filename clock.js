import * as dotenv from 'dotenv'
import puppeteer from 'puppeteer'
import { localCookies } from './local-cookies.js'
dotenv.config();

;(async () => {
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
  const gotomainSelector = '[class="btn btn-white btn-lg btn-block"]'
  await page.waitForSelector(gotomainSelector)
  // let source = await page.content()

  await page.click(gotomainSelector)
  await page.waitForNavigation()

  await browser.close()
})()
