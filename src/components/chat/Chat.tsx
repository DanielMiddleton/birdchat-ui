import { Button, TextField } from "@kobalte/core";
import { For, createEffect, createSignal } from "solid-js";
import css from "./Chat.module.css";
import { createServerAction$ } from "solid-start/server";
import { createRouteAction } from "solid-start";

const messageFieldName = "newMessage";

const birdMessages = [
  "I'm a bird!",
  "What's gravity?",
  "What are you doing down there?",
  "My favorite meal is worms",
  "Have you ever tried flying?",
  "Have you ever seen a coconut explode?",
  "Do I have a soul?",
  "I'm so over it",
];

interface Message {
  userType: "bird" | "human";
  username: string;
  text: string;
}

export function Chat() {
  const [messages, setMessages] = createSignal<Message[]>([]);
  const [messaging, fetchMessage] = createServerAction$<void, Message>(
    async () => {
      await new Promise((resolve) =>
        setTimeout(resolve, 500 + Math.random() * 2000),
      );

      return {
        userType: "bird",
        username: "Larry A. Bird",
        text: birdMessages[Math.floor(Math.random() * birdMessages.length)],
      };
    },
  );

  const [, { Form }] = createRouteAction(async (form: FormData) => {
    const text = form.get(messageFieldName);

    if (!text) {
      return;
    }

    setMessages((messages) => [
      ...messages,
      {
        userType: "human",
        username: "You",
        text: text as string,
      },
    ]);

    fetchMessage();
  });

  createEffect(() => {
    if (
      messages().length > 0 &&
      messages()[messages().length - 1].userType === "bird"
    ) {
      return;
    }

    if (messaging.result) {
      setMessages((messages) => [...messages, messaging.result!]);
    }

    messaging.clear();
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
      <Form class={css.form}>
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
      </Form>
    </div>
  );
}
