import * as fs from 'fs';

const cookies = process.argv[2];

const cookiesObj = cookies
  .split(';')
  
  .map(cookie => {
    const cookieContent = cookie.split('=')
    const cookieName = cookieContent[0].trim();
    const cookieValue = cookieContent[1].trim();
    return {
      name: cookieName,
      value: cookieValue,
      domain: '.104.com.tw',
      path: '/',
      expires: -1,
      size: 276,
      httpOnly: false,
      secure: false,
      session: true,
      sameParty: false,
      sourceScheme: 'Secure',
      sourcePort: 443
    }
  });

console.log(cookiesObj)