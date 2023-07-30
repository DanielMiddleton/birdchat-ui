import { JSXElement, Show, useContext } from "solid-js";
import { Navigate } from "solid-start";
import { UserContext } from "~/contexts";

interface ProtectedProps {
  children: JSXElement;
}

export function Protected(props: ProtectedProps) {
  const { session } = useContext(UserContext);

  return (
    <Show when={session} fallback={<Navigate href="/auth/login" />}>
      {props.children}
    </Show>
  );
}
