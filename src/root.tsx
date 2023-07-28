// @refresh reload
import { Routes } from "@solidjs/router";
import { Suspense } from "solid-js";
import {
  Body,
  FileRoutes,
  Head,
  Html,
  Meta,
  Scripts,
  Title,
} from "solid-start";
import { ErrorBoundary } from "solid-start/error-boundary";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>BirdChat - Chat with birds today!</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
          rel="stylesheet"
        />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
