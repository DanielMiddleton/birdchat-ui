import {
  StartServer,
  createHandler,
  renderAsync,
} from "solid-start/entry-server";
import { createSupabaseServerClient } from "./contexts";
import { redirect } from "solid-start";

const protectedPaths = ["/"];
const unauthenticatedPaths = ["/auth/login", "/auth/register"];

export default createHandler(
  ({ forward }) => {
    return async (event) => {
      if (!protectedPaths.includes(new URL(event.request.url).pathname)) {
        return forward(event);
      }

      const { request } = event;
      const supabase = createSupabaseServerClient(request);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        return redirect("/auth/login");
      }

      return forward(event);
    };
  },
  ({ forward }) => {
    return async (event) => {
      if (!unauthenticatedPaths.includes(new URL(event.request.url).pathname)) {
        return forward(event);
      }

      const { request } = event;
      const supabase = createSupabaseServerClient(request);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        return redirect("/");
      }

      return forward(event);
    };
  },
  renderAsync((event) => <StartServer event={event} />),
);
