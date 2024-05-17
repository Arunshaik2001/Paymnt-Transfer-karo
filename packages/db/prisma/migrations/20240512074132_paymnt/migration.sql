/*
  Warnings:

  - The values [EMAIl] on the enum `AuthType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `account` on the `Account` table. All the data in the column will be lost.
  - Added the required column `accountType` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AuthType_new" AS ENUM ('GOOGLE', 'EMAIL');
ALTER TABLE "Account" ALTER COLUMN "authType" TYPE "AuthType_new" USING ("authType"::text::"AuthType_new");
ALTER TYPE "AuthType" RENAME TO "AuthType_old";
ALTER TYPE "AuthType_new" RENAME TO "AuthType";
DROP TYPE "AuthType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "account",
ADD COLUMN     "accountType" "AccountType" NOT NULL;
