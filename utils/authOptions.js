import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    //Invoked on successfull sign in
    async signIn({ account, profile }) {
      // 1. Connect to the database
      // 2. Check if user exists
      // 3. if not, create user
      // 4. Return true to allow sign in
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@example.com");
      }
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    // Session callback function that modifies the session object
    async session({ session, user, token }) {
      // 1. Get user from database
      // 2. Assign user id from the session
      // return session
      return session;
    },
  },
};

