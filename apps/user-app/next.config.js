const dotenv = require("dotenv");
dotenv.config({ path: __dirname + "/../../.env" })
/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@repo/ui"],
};
