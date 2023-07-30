import { createContext } from "solid-js";
import { createClient } from "@supabase/supabase-js";
import { isServer } from "solid-js/web";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_API_URL,
  import.meta.env.VITE_SUPABASE_API_KEY,
  {
    auth: {
      autoRefreshToken: !isServer,
      persistSession: !isServer,
      detectSessionInUrl: !isServer,
    },
  },
);

export const SupabaseContext = createContext(supabase);
