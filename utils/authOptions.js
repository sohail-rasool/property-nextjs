import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/userModel";

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
    async signIn({ profile }) {
      // 1. Connect to the database
      await connectDB();
      // 2. Check if user exists
      const userExists = await User.findOne({ email: profile.email });
      // 3. if not, create user
      if (!userExists) {
        // Truncate username if too long
         await User.create({
          email: profile.email,
          username: (profile.name || "User").slice(0, 20),
          image: profile.picture,
        });
      }
      // 4. Return true to allow sign in
      return true; // Do different verification for other providers that don't have `email_verified`
    },
    // Session callback function that modifies the session object
    async session({ session }) {
      // 1. Get user from database
      const user = await User.findOne({ email: session.user.email });
      // 2. Assign user id from the session
      session.user.id = user._id.toString();
      // return session
      return session;
    },
  },
};
