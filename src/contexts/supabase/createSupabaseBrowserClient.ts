import {
  CookieAuthStorageAdapter,
  CookieOptions,
} from "@supabase/auth-helpers-shared";
import { createClient } from "@supabase/supabase-js";
import cookie from "cookie";

class ServerCookieAuthStorageAdapter extends CookieAuthStorageAdapter {
  private request: Request;

  constructor(request: Request, cookieOptions?: CookieOptions) {
    super(cookieOptions);
    this.request = request;
  }

  protected getCookie(name: string) {
    return cookie.parse(this.request.headers.get("Cookie") || "")[name];
  }

  protected setCookie(name: string, value: string) {
    this.request.headers.set("Set-Cookie", cookie.serialize(name, value));
  }

  protected deleteCookie(name: string) {
    this.request.headers.set(
      "Set-Cookie",
      cookie.serialize(name, "", { maxAge: -1 }),
    );
  }
}

export function createSupabaseServerClient(request: Request) {
  return createClient(
    import.meta.env.VITE_SUPABASE_API_URL,
    import.meta.env.VITE_SUPABASE_API_KEY,
    {
      auth: {
        storage: new ServerCookieAuthStorageAdapter(request),
      },
    },
  );
}
