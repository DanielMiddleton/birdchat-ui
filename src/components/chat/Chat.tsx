import { Box, Button, TextField, Typography } from "@suid/material";
import { For, createEffect, createSignal } from "solid-js";

const messageFieldName = "newMessage";
const birdMessage = {
  text: "I'm Larry A. Bird",
  user: "bird",
};

type Message = typeof birdMessage;

export function Chat() {
  const [messages, setMessages] = createSignal<Message[]>([birdMessage]);
  createEffect(() => {
    if (messages()[messages().length - 1].user === "human") {
      setMessages((messages) => [...messages, birdMessage]);
    }
  });

  return (
    <div>
      <For each={messages()}>
        {({ user, text }) => (
          <Box>
            <Typography>{user}</Typography>
            <Typography>{text}</Typography>
          </Box>
        )}
      </For>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setMessages((messages) => [
            ...messages,
            {
              text: e.currentTarget[messageFieldName].value,
              user: "human",
            },
          ]);
        }}
      >
        <TextField
          multiline
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.ctrlKey) {
              e.preventDefault();
              e.target.form.dispatchEvent(
                new Event("submit", { cancelable: true })
              );
              e.target.value = "";
            }

            if (e.key === "Enter" && e.ctrlKey) {
              e.target.value += "\n";
            }
          }}
          name={messageFieldName}
          placeholder="What do you want to tell the bird?"
        ></TextField>
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
