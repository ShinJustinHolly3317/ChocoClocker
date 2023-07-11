const cookies =
  '__auc=3c69109b182bbb25ea4fdd77d16; _ga_WYQPBGBV8Z=GS1.1.1661006405.1.1.1661006436.29.0.0; ACUD=fb907f77-6df4-41b8-82a5-142b04208ff7; _hjSessionUser_642678=eyJpZCI6IjIyM2JmN2I5LWU4NDQtNTllYy1iZTJmLTc3NjQ1NTVjNDUwOCIsImNyZWF0ZWQiOjE2NjU0OTI2ODM0MTIsImV4aXN0aW5nIjp0cnVlfQ==; _hjSessionUser_1871292=eyJpZCI6ImI3ZWU2ZmFjLTNkZGYtNWZkMi05MTU2LTBiN2MyN2JlZDc1YSIsImNyZWF0ZWQiOjE2Nzg4ODk3NzczNTcsImV4aXN0aW5nIjpmYWxzZX0=; _hjSessionUser_657524=eyJpZCI6IjVlOTVlZDBkLWEwNjMtNWU4MC1iYzg1LTBjZmIzYTJlN2U1OSIsImNyZWF0ZWQiOjE2NjU0OTIzNzczMDUsImV4aXN0aW5nIjp0cnVlfQ==; _fbp=fb.2.1688647273229.796682049; _hjSession_642678=eyJpZCI6IjY5YTBhNjQ3LTliNDQtNGJiYy05YjAxLTA5MTc1MmJiYjdjZCIsImNyZWF0ZWQiOjE2ODg2NDcyNzM1NDIsImluU2FtcGxlIjpmYWxzZX0=; _hjAbsoluteSessionInProgress=0; _gid=GA1.3.1993442949.1688647274; _ga_ZH0QQJ3E75=GS1.3.1688647273.1.0.1688647273.60.0.0; dtCookie=v_4_srv_4_sn_A4A839465DEC62B6A05AAD17656D8F39_perc_100000_ol_0_mul_1_app-3Aea7c4b59f27d43eb_0; lup=1138341394.5106716112566.5106716112566.1.4640712161167; luauid=1138341394; lunp=5106716112566; AC_B=WyJwcm8iXQ; EPKB=15dccad610bbc4c6429e03cf949bf5d8d06846d3a0218e6d02196a9e59f9a39c8; TS01f8a99d=01180e452d7818b34ed357a8178cc9182340f9aff3d874a0263cbfa42082ac4d46ce160eceefb89127e77e11e610ea267b9d4ee48a355b096b51cc29f7fb1203b3ce12d0043869e63b1828af47ffdd7f226bd0dcf117f0eb1275bfe19d1bad7a26a6d6dedab645e2e44c713794354df5dc4ab52b8c; _ga_FJWMQR9J2K=GS1.1.1688647276.2.1.1688647347.60.0.0; _ga_EK43MBJWX0=GS1.1.1688647276.1.1.1688647347.60.0.0; _ga_W9X1GB1SVR=GS1.1.1688647276.2.1.1688647347.60.0.0; _hjHasCachedUserAttributes=true; _ga_LJFNDHDECN=GS1.1.1688647293.1.1.1688648427.0.0.0; _ga_YDMFS9FYG5=GS1.1.1688647273.1.1.1688648427.60.0.0; _ga=GA1.1.1273926849.1688647273; _ga_NPWGBNWP62=GS1.1.1688647273.1.1.1688648427.0.0.0; _ga_9KGQ988ZXX=GS1.1.1688647273.1.1.1688648427.0.0.0; _hjIncludedInSessionSample_642678=0; _ga_H7220JSY7N=GS1.3.1688647273.1.1.1688648428.60.0.0';

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