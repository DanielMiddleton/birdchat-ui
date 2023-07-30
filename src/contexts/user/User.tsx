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
}

interface UserContextProviderProps {
  children: JSXElement;
}

export const UserContext = createContext<UserContextValues>({ session: null });

export function UserContextProvider(props: UserContextProviderProps) {
  const supabase = useContext(SupabaseContext);
  const [session] = createResource(
    async () => await supabase.auth.getSession(),
  );

  return (
    <UserContext.Provider value={{ session: session()?.data?.session ?? null }}>
      {props.children}
    </UserContext.Provider>
  );
}
