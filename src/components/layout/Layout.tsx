import css from "./Layout.module.css";
import { JSXElement } from "solid-js";

interface LayoutProps {
  children: JSXElement;
}

export function Layout(props: LayoutProps) {
  return (
    <>
      <header>
        <h1 class={css.heading}>BirdChat</h1>
        <p class={css.subheading}>
          The only site on the internet where you can chat with birds!
          <sup>*</sup>
        </p>
      </header>
      <main>
        {props.children}
        <footer>
          <sub>* - claims not verified</sub>
        </footer>
      </main>
    </>
  );
}
