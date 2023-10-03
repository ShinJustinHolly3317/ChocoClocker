# How to use
1. Fill out your account and password in `.env`
2. Run `npm install`
3. Go to your 104 website(https://pro.104.com.tw/) use `document.cookie` to find out your cookie through dev tool and copy it. (This is because we at least need one cookie to refresh to avoid 2FA authentication, even it's a expired cookie.)
4. `npm run generate-cookie '{the-cookie-you-just-copied-from-website}'` (remember to use single quotes as cookies including spaces)
5. `npm run set-cron` to set a default cron every morning at 9, and feel free to adjust your cron.
(or can use `{node-path} {path-to-this-repo}/clock.js`)

# Future optimization
1. optimize command for better ux
2. randomrize running time for HR routine inspection
3. finding out GPS clock api
