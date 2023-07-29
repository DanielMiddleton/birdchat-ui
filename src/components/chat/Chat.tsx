import { Button, TextField } from "@kobalte/core";
import { For, createEffect, createSignal } from "solid-js";
import css from "./Chat.module.css";

const messageFieldName = "newMessage";
const birdMessage = {
  text: "I'm a bird!",
  userType: "bird",
  username: "Larry A. Bird",
};

type Message = typeof birdMessage;

export function Chat() {
  const [messages, setMessages] = createSignal<Message[]>([]);
  createEffect(() => {
    // The bird must always have the last word
    if (
      messages().length === 0 ||
      messages()[messages().length - 1].userType !== "bird"
    ) {
      setMessages((messages) => [...messages, birdMessage]);
    }
  });

  return (
    <div>
      <For each={messages()}>
        {({ userType, text, username }) => (
          <div
            classList={{
              [css.message]: true,
              [css.message_bird]: userType === "bird",
              [css.message_human]: userType === "human",
            }}
          >
            <div class={css.message_user}>{username}</div>
            <div class={css.message_text}>{text}</div>
          </div>
        )}
      </For>
      <form
        class={css.form}
        onSubmit={(e) => {
          e.preventDefault();
          if (!e.currentTarget[messageFieldName].value) {
            return;
          }

          setMessages((messages) => [
            ...messages,
            {
              text: e.currentTarget[messageFieldName].value,
              userType: "human",
              username: "Human",
            },
          ]);
        }}
      >
        <TextField.Root class={css.textRoot}>
          <TextField.TextArea
            placeholder="Send a message"
            class={css.textarea}
            name={messageFieldName}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.ctrlKey) {
                e.preventDefault();
                e.currentTarget.form?.dispatchEvent(
                  new Event("submit", { cancelable: true }),
                );
                e.currentTarget.value = "";
              }

              if (e.key === "Enter" && e.ctrlKey) {
                e.currentTarget.value += "\n";
              }
            }}
          />
        </TextField.Root>
        <Button.Root type="submit" class={css.button}>
          Send
        </Button.Root>
      </form>
    </div>
  );
}
