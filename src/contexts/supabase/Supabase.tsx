import { createContext } from "solid-js";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_API_URL,
  import.meta.env.VITE_SUPABASE_API_KEY,
);

export const SupabaseContext = createContext(supabase);
