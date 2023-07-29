import { Button, TextField } from "@kobalte/core";
import { For, createEffect, createMemo, createSignal } from "solid-js";
import css from "./Chat.module.css";
import server$ from "solid-start/server";
import { createRouteAction } from "solid-start";
import { Loader } from "../loader";
import { isServer } from "solid-js/web";

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

const isMobile = () => {
  const userAgent =
    typeof window.navigator === "undefined" ? "" : navigator.userAgent;
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  return mobileRegex.test(userAgent);
};

export function Chat() {
  let textAreaRef: HTMLTextAreaElement | undefined;
  const [messages, setMessages] = createSignal<Message[]>([]);
  const mobile = createMemo(() => !isServer && isMobile());
  const fetchMessage = server$(async () => {
    await new Promise((resolve) =>
      setTimeout(resolve, 500 + Math.random() * 2000),
    );

    const message: Message = {
      userType: "bird",
      username: "Larry A. Bird",
      text: birdMessages[Math.floor(Math.random() * birdMessages.length)],
    };

    return message;
  });

  const [messaging, { Form }] = createRouteAction(async (form: FormData) => {
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

    textAreaRef!.value = "";

    const response = await fetchMessage();

    setMessages((messages) => [...messages, response]);
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
      <Loader loading={messaging.pending} />
      <Form class={css.form}>
        <TextField.Root class={css.textRoot}>
          <TextField.TextArea
            ref={textAreaRef}
            placeholder="Send a message"
            class={css.textarea}
            name={messageFieldName}
            onKeyDown={(e) => {
              if (mobile()) {
                return;
              }

              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                e.currentTarget.form?.dispatchEvent(
                  new Event("submit", { cancelable: true }),
                );
              }

              if (e.key === "Enter" && e.shiftKey) {
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
