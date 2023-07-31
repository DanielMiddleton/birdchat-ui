import {
  createResource,
  useContext,
  createContext,
  JSXElement,
  createEffect,
  Show,
} from "solid-js";
import { SupabaseContext } from "../supabase";
import { Session } from "@supabase/supabase-js";

interface UserContextValues {
  session: Session | null;
  refetchSession: () => void;
  loading: boolean;
}

interface UserContextProviderProps {
  children: JSXElement;
}

export const UserContext = createContext<UserContextValues>({
  session: null,
  refetchSession: () => {},
  loading: false,
});

export function UserContextProvider(props: UserContextProviderProps) {
  const supabase = useContext(SupabaseContext);
  const [session, { refetch }] = createResource(async () => {
    const session = await supabase.auth.getSession();
    // console.log(session);
    return session;
  });

  createEffect(() => {
    // console.log(session());
    // console.log(supabase);
  });

  return (
    <Show
      when={!session.loading}
      fallback={
        <UserContext.Provider
          value={{
            session: null,
            refetchSession: refetch,
            loading: true,
          }}
        >
          {props.children}
        </UserContext.Provider>
      }
    >
      <UserContext.Provider
        value={{
          session: session()?.data?.session ?? null,
          refetchSession: refetch,
          loading: false,
        }}
      >
        {props.children}
      </UserContext.Provider>
    </Show>
  );
}
