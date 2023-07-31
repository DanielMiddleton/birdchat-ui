import { TextField, Button } from "@kobalte/core";
import { A } from "@solidjs/router";
import { Show, useContext } from "solid-js";
import { createRouteAction } from "solid-start";
import { Layout, Loader } from "~/components";
import { SupabaseContext } from "~/contexts";

export default function SignUp() {
  const supabase = useContext(SupabaseContext);
  const [registering, { Form }] = createRouteAction(async (form: FormData) => {
    const email = form.get("email");
    const password = form.get("password");

    if (!email || !password) {
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email as string,
      password: password as string,
    });

    if (error) {
      throw error;
    }

    return data;
  });

  return (
    <Layout>
      <Form>
        <Show when={registering.result}>
          <p>Account created! Check your email for instructions</p>
        </Show>
        <Show when={registering.error}>
          <p>{registering.error.message}</p>
        </Show>
        <TextField.Root name="email">
          <TextField.Label>Email</TextField.Label>
          <TextField.Input type="email" />
        </TextField.Root>
        <TextField.Root name="password">
          <TextField.Label>Password</TextField.Label>
          <TextField.Input type="password" />
        </TextField.Root>
        <Show when={!registering.pending} fallback={<Loader loading />}>
          <Button.Root type="submit">Register</Button.Root>
        </Show>
      </Form>
      <A href="/auth/login">Or, log in to an existing account</A>
    </Layout>
  );
}
