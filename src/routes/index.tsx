import { Chat } from "~/components/Chat";
import "./index.css";

export default function Home() {
  // Replace the content of this function with a chat client centered in the screen
  return (
    <main>
      <h1>Welcome to BirdChat!</h1>
      <p>
        The only site on the internet where you can chat with birds!<sup>*</sup>
      </p>
      <Chat />
      <footer>
        <sub>* - claims not verified</sub>
      </footer>
    </main>
  );
}
