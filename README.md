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

## Set up
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

### Run Locally using Docker
docker setup is done in branch [**docker-setup**](https://github.com/Arunshaik2001/Paymnt-Transfer-karo/tree/docker-setup)

[Docker setup branch](https://github.com/Arunshaik2001/Paymnt-Transfer-karo/tree/docker-setup?tab=readme-ov-file#with-docker)

### For dummy data
[seed.ts](https://github.com/Arunshaik2001/Paymnt-Transfer-karo/blob/main/packages/db/prisma/seed.ts)

You can run in the packages/db folder
```sh
 npx prisma db seed
```

### Contribute
Pick issues from [issues](https://github.com/Arunshaik2001/Paymnt-Transfer-karo/issues)
