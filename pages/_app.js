import { UserProvider } from "@auth0/nextjs-auth0";
import { ActionsProvider } from "../contexts/ActionsContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <ActionsProvider>
      <UserProvider>
        <div className="container mx-auto my-10 max-w-xl">
          <Component {...pageProps} />
        </div>
      </UserProvider>
    </ActionsProvider>
  );
}

export default MyApp;
