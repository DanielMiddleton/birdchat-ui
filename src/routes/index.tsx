import { Chat, Layout, Protected } from "~/components";

export default function Home() {
  return (
    <Protected>
      <Layout>
        <Chat />
      </Layout>
    </Protected>
  );
}
