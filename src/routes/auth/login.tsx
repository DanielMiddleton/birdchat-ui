import { TextField, Button } from "@kobalte/core";
import { A, Navigate } from "@solidjs/router";
import { Show, useContext } from "solid-js";
import { createRouteAction } from "solid-start";
import { Layout, Loader, Unauthenticated } from "~/components";
import { SupabaseContext, UserContext } from "~/contexts";

export default function Login() {
  const supabase = useContext(SupabaseContext);
  const { refetchSession } = useContext(UserContext);
  const [loggingIn, { Form }] = createRouteAction(async (form: FormData) => {
    const email = form.get("email");
    const password = form.get("password");

    if (!email || !password) {
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email as string,
      password: password as string,
    });

    if (error) {
      throw error;
    }

    refetchSession();

    return data;
  });

  return (
    <Unauthenticated>
      <Layout>
        <Form>
          <Show when={loggingIn.result}>
            <p>Logged in!</p>
            <Navigate href="/" />
          </Show>
          <Show when={loggingIn.error}>
            <p>{loggingIn.error.message}</p>
          </Show>
          <TextField.Root name="email">
            <TextField.Label>Email</TextField.Label>
            <TextField.Input type="email" />
          </TextField.Root>
          <TextField.Root name="password">
            <TextField.Label>Password</TextField.Label>
            <TextField.Input type="password" />
          </TextField.Root>
          <Show when={!loggingIn.pending} fallback={<Loader loading />}>
            <Button.Root type="submit">Log In</Button.Root>
          </Show>
        </Form>
        <A href="/auth/register">Or, create a new account</A>
      </Layout>
    </Unauthenticated>
  );
}
