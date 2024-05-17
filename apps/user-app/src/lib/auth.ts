import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
      authorize(credentials, req) {
        return null;
      },
    }),
  ],
};
