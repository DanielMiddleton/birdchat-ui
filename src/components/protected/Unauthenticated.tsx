import { JSXElement, Show, useContext } from "solid-js";
import { Navigate } from "solid-start";
import { UserContext } from "~/contexts";

interface UnprotectedProps {
  children: JSXElement;
}

export function Unauthenticated(props: UnprotectedProps) {
  const { session } = useContext(UserContext);

  return (
    <Show when={!session} fallback={<Navigate href="/" />}>
      {props.children}
    </Show>
  );
}
