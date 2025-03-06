// /lib/supabaseClient.ts
"use client"; 
/**
 * "use client" si lo usas en componentes cliente;
 * para consultas en Server Components, quítalo si prefieres
 * un uso netamente del lado del servidor.
 */

import { createClient } from "@supabase/supabase-js";

// Variables de entorno (asegúrate de definirlas en tu .env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "❌ No se han definido las variables NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

/**
 * Cliente de Supabase
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);