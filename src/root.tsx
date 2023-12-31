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
  useServerContext,
} from "solid-start";
import { ErrorBoundary } from "solid-start/error-boundary";
import {
  BrowserContext,
  SupabaseContext,
  UserContextProvider,
  createSupabaseBrowserClient,
  createSupabaseServerClient,
} from "./contexts";
import { isServer } from "solid-js/web";

const isMobile = () => {
  const userAgent =
    typeof window.navigator === "undefined" ? "" : navigator.userAgent;
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  return mobileRegex.test(userAgent);
};

export default function Root() {
  const server = useServerContext();

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
            <SupabaseContext.Provider
              value={
                isServer
                  ? createSupabaseServerClient(server.request)
                  : createSupabaseBrowserClient()
              }
            >
              <BrowserContext.Provider
                value={{ isMobile: !isServer && isMobile() }}
              >
                <UserContextProvider>
                  <Routes>
                    <FileRoutes />
                  </Routes>
                </UserContextProvider>
              </BrowserContext.Provider>
            </SupabaseContext.Provider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
