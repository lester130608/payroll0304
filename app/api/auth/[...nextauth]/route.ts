import NextAuth, { NextAuthOptions } from "next-auth";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

// Leer variables de entorno
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error("❗ Variables de entorno de Supabase no definidas");
}

// Configuración de NextAuth
export const authOptions: NextAuthOptions = {
  adapter: SupabaseAdapter({
    url: supabaseUrl || "",
    secret: supabaseServiceRoleKey || "",
  }),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: anonKey || "",
          },
          body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        console.log("LOGIN RESPONSE:", result);

        if (!response.ok || !result.user) {
          console.error("Auth error:", result.error_description || result.error || result);
          throw new Error(result.error_description || "Invalid credentials");
        }

        return {
          id: result.user.id,
          email: result.user.email,
        };
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.email = token.email;
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  debug: true,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
