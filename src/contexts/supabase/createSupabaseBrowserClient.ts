import { BrowserCookieAuthStorageAdapter } from "@supabase/auth-helpers-shared";
import { createClient } from "@supabase/supabase-js";

export function createSupabaseBrowserClient() {
  return createClient(
    import.meta.env.VITE_SUPABASE_API_URL,
    import.meta.env.VITE_SUPABASE_API_KEY,
    {
      auth: {
        storage: new BrowserCookieAuthStorageAdapter(),
      },
    },
  );
}
