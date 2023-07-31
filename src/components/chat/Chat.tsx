import { Button, TextField } from "@kobalte/core";
import { For, createEffect, createSignal, useContext } from "solid-js";
import css from "./Chat.module.css";
import server$ from "solid-start/server";
import { createRouteAction } from "solid-start";
import { Loader } from "../loader";
import { BrowserContext } from "~/contexts";
import { Message, fetchMessageAction$ } from "./fetchMessage";

const messageFieldName = "newMessage";

export function Chat() {
  let textAreaRef: HTMLTextAreaElement | undefined;
  const [messages, setMessages] = createSignal<Message[]>([]);
  const { isMobile } = useContext(BrowserContext);
  const fetchMessage = server$(fetchMessageAction$);

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
              if (isMobile) {
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
