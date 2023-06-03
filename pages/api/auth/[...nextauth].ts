import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { mongooseConnect } from "@/lib/mongoose";
import { Customer } from "@/models/Customer";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "guest@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const { email, password } = credentials;
        mongooseConnect();
        const user = await Customer.findOne({ email: { $eq: email } });

        if (!user) return null;

        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
          throw new Error("Wrong credentials. Try again.");
        }

        return user;
      },
    }),
  ],
};

export default NextAuth(authOptions);
