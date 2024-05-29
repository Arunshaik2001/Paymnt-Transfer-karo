import { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import getUser from "../actions/getUser";
import getUserById from "../actions/getUserById";
import { JWT } from "next-auth/jwt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials Provider",
      credentials: {
        email: {
          label: "Email",
          placeholder: "Enter your email id",
          type: "text",
        },
        password: {
          label: "Password",
          placeholder: "Enter your password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        try {
          const userRes = await getUser(
            credentials!.email,
            credentials!.password
          );

          if (userRes) {
            return userRes;
          }
        } catch (error) {
          console.log(error);
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account, profile, trigger, session }) {
      //

      if (trigger == "update") {
        const sessionData = session as Session;
        const user = await getUserById(sessionData.user!.userId!);

        return { ...token, ...user } as JWT;
      }

      if (user) {
        return {
          ...token,
          ...user,
        } as JWT;
      }

      if (token!.id) {
        const userData = await getUserById(Number(token!.id));

        console.log({
          ...token,
          ...userData,
        });

        return {
          ...token,
          ...userData,
        } as JWT;
      }

      return token as JWT;
    },
    async session({ session, token, user }) {
      // console.log("AUTHORIZE1 ");
      // console.log(token);
      if (session.user) {
        session.user!.accountType = token.accountType;
        session.user!.balance = token!.balance;
        session.user!.bankAccountNumber = token!.bankAccountNumber;
        session.user!.upiId = token!.upiId;
        session.user!.userId = token!.id;

        return session;
      }
      return session;
    },
  },
};
