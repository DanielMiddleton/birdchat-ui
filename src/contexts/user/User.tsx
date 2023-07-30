import {
  createResource,
  useContext,
  createContext,
  JSXElement,
} from "solid-js";
import { SupabaseContext } from "../supabase";
import { Session } from "@supabase/supabase-js";

interface UserContextValues {
  session: Session | null;
  refetchSession: () => void;
}

interface UserContextProviderProps {
  children: JSXElement;
}

export const UserContext = createContext<UserContextValues>({
  session: null,
  refetchSession: () => {},
});

export function UserContextProvider(props: UserContextProviderProps) {
  const supabase = useContext(SupabaseContext);
  const [session, { refetch }] = createResource(
    async () => await supabase.auth.getSession(),
  );

  return (
    <UserContext.Provider
      value={{
        session: session()?.data?.session ?? null,
        refetchSession: refetch,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
