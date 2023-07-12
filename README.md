# How to use
1. Fill out your account and password in .env
2. Run `npm install`
3. Go to your 104 website use `document.cookie` to find out your cookie through dev tool and Copy it. (This is because we at least need one cookie to refresh to avoid 2FA authentication, even it's a expired cookie.)
4. `npm run generate-cookie {the-cookie-you-just-copied-from-website}` and paste the ouput into local-cookie
5, use crontab to with below command `{node-path} {path-to-this-repo}/clock,js`

# Future optimization
1. optimize command for better ux
2. randomrize running time for HR routine inspection
3. finding out GPS clock api