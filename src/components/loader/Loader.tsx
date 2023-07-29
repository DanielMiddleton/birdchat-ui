import { Show } from "solid-js";
import css from "./Loader.module.css";

interface LoaderProps {
  loading: boolean;
}

export function Loader(props: LoaderProps) {
  return (
    <Show when={props.loading}>
      <div class={css.lds_ellipsis}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </Show>
  );
}
