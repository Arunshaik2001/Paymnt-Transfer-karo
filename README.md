# Payment-Transfer Karo

This is a fake money transfer app built using nextjs.

## High Level Design

<img src=https://github.com/Arunshaik2001/Paymnt-Transfer-karo/assets/50947867/374d9e65-499d-4404-be50-dcdf8a58d398 height=600px />


## Demo

[PaymntApp.webm](https://github.com/Arunshaik2001/Paymnt-Transfer-karo/assets/50947867/915853c3-3aa0-489f-801d-8ce73030be96)



## Features
 1. SignUp/SignIn.
 2. Automatic UpiId creation on SignUp.
 3. Session based login using NextAuth.
 4. OnRamp/OffRamp fake money from fake/to netbanking frontend and server.
 5. Peer-2-Peer Transfer in app.
 6. See OnRamp and OffRamp Transactions.
 7. Transaction Status updates using Websocket server.


## Tech Stack
 1. Nextjs
 2. NextAuth
 3. Websocket
 4. Express Server
 5. Postgres
 6. Docker

## CI/CD jobs
 1. On pull requests build job will be run
 2. On push to main branch it will be pushed docker image.
 3. On push to main branch it will copy main branch to ec2 server and start the nodejs apps.

## Set up Locally

### Without Docker
```js
// Make Sure You have env.js created on root folder where you have both netbanking and paymnt repo.

const netbankConfig = {
    DATABASE_URL: "YOUR_DATABASE_URL",
    HDFC_JWT_LOGIN_SECRET: "PAYMNT_SECRET_HDFC",
    REDIS_URL: "YOUR_REDIS_URL"
}

const paymntConfig = {
    DATABASE_URL: "YOUR_DATABASE_URL",
    HDFC_PAYMNT_BANK_SERVER_KEY: "HDFC_SECRET",
    PAYMNT_HDFC_BANK_SERVER_KEY: "PAYMNT_SECRET_HDFC",
    KOTAK_PAYMNT_BANK_SERVER_KEY: "KOTAK_SECRET",
    PAYMNT_KOTAK_BANK_SERVER_KEY: "PAYMNT_SECRET_KOTAK",
    HDFC_BANK_SERVER: "http://localhost:4000",
    PAYMNT_WEBHOOK_PORT: 3005,
    PAYMNT_WEBSOCKET_PORT: 3006
}

module.exports = {
    netbankConfig,
    paymntConfig
};

```

```
 clone the repo
 npm install
 npx pm2 start ecosystem.config.js
 npm run dev:user-app
```

### With Docker

**Step 1:** add this in **.env** file inside /Paymnt-Transfer-karo

make sure to update with your own **database url **
```js
DATABASE_URL="postgres://YOUR_DATABASE_URL/paymnt?sslmode=require"
HDFC_PAYMNT_BANK_SERVER_KEY="HDFC_SECRET"
PAYMNT_HDFC_BANK_SERVER_KEY="PAYMNT_SECRET_HDFC"
KOTAK_PAYMNT_BANK_SERVER_KEY="KOTAK_SECRET"
PAYMNT_KOTAK_BANK_SERVER_KEY="PAYMNT_SECRET_KOTAK"
HDFC_BANK_SERVER="http://netbanking:4000"
KOTAK_BANK_SERVER=
HDFC_BANK_OFF_RAMP_URL=
KOTAK_BANK_OFF_RAMP_URL=
PAYMNT_OFF_RAMP_URL=
PAYMNT_WEBHOOK_PORT=3005
PAYMNT_WEBSOCKET_PORT=3006
NEXTAUTH_URL='http://localhost:3000/transfer'
NEXTAUTH_SECRET="secret"
NEXT_PUBLIC_PAYMNT_WEBSOCKET_URL="ws://localhost:3006"
NEXT_PUBLIC_HDFC_DEBIT_URL="http://netbanking:5173/debit"
NEXT_PUBLIC_PAYMNT_HDFC_SECRET="PAYMNT_SECRET_HDFC"
NEXT_PUBLIC_HDFC_CREDIT_SERVER_URL="http://netbanking:4000/api/v1/credit"
NEXT_PUBLIC_CLOUDFARE_TOKEN="XXXXXXXXXX"
NEXT_PUBLIC_CAPTCHA="XXXXXXXXX"
NEXT_CAPTCHA_KEY="XXXXXXXXX"
```

**Step 2:**
Build the _Dockerfile_

```shell
    docker build -t paymnt-app .
```

**Step 3:**
Update the image name in _**docker-compose.yml**_

    image: paymnt-app:latest

**Step 4:**
run in /Paymnt-Transfer-karo

  ```shell
    npm run docker-compose
  ```

### For dummy data
[seed.ts](https://github.com/Arunshaik2001/Paymnt-Transfer-karo/blob/main/packages/db/prisma/seed.ts)

You can run in the packages/db folder
```sh
 npx prisma db seed
```

### Contribute
Pick issues from [issues](https://github.com/Arunshaik2001/Paymnt-Transfer-karo/issues)
