import "@styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import { appWithTranslation } from "next-i18next";

console.log("next-i18next config loaded");

const App = ({ Component, pageProps}: AppProps) => {
    return <Component {...pageProps} />;
}
console.log("next-i18next config loaded");

export default appWithTranslation(App);