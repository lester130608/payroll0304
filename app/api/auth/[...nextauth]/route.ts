import NextAuth, { NextAuthOptions } from "next-auth";
import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import { createClient } from "@supabase/supabase-js";

// Obtén las variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Usa la llave de service role
if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Falta la configuración de Supabase en las variables de entorno");
}

// Crea el cliente de Supabase
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

// Configuración de NextAuth
export const authOptions: NextAuthOptions = {
  adapter: SupabaseAdapter(supabase),
  providers: [
    // Puedes agregar aquí los proveedores que desees (p.ej., Email, Google, etc.)
    // Ejemplo para Email Provider:
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  // Configura callbacks, páginas, etc. según necesites
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };