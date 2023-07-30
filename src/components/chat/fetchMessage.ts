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

export interface Message {
  userType: "bird" | "human";
  username: string;
  text: string;
}

export async function fetchMessageAction() {
  await new Promise((resolve) =>
    setTimeout(resolve, 500 + Math.random() * 2000),
  );

  const message: Message = {
    userType: "bird",
    username: "Larry A. Bird",
    text: birdMessages[Math.floor(Math.random() * birdMessages.length)],
  };

  return message;
}
