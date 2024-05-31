const {paymntConfig} = require("../env");

module.exports = {
  apps: [
    {
      name: "bankwebhook",
      script: "sh -c 'npm run dev:prisma  && cd ./apps/bankwebhook && npm run build && npm run dev'",
      env: {
        NODE_ENV: "development",
        ...paymntConfig
      },
      env_production: {
        NODE_ENV: "production",
        ...paymntConfig
      }
    },
    {
      name: "bankWebsocketServer",
      script: "sh -c 'npm run dev:prisma  && cd ./apps/bankWebsocketServer && npm run build  && npm run dev'",
      env: {
        NODE_ENV: "development",
        ...paymntConfig
      },
      env_production: {
        NODE_ENV: "production",
        ...paymntConfig
      }
    }
  ],
};
