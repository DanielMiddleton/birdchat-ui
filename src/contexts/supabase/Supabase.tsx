import { createContext } from "solid-js";
import { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseBrowserClient } from "./createSupabaseServerClient";

export const SupabaseContext = createContext<SupabaseClient>(
  createSupabaseBrowserClient(),
);
