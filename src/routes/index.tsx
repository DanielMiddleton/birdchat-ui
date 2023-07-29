import { Chat } from "~/components/chat";
import css from "./index.module.css";

export default function Home() {
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
        <Chat />
        <footer>
          <sub>* - claims not verified</sub>
        </footer>
      </main>
    </>
  );
}
