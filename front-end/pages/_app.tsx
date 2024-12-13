import '@styles/globals.css';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { appWithTranslation } from 'next-i18next';
import { useEffect } from 'react';

const App = ({ Component, pageProps }: AppProps) => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            require('bootstrap/dist/js/bootstrap.bundle.min.js');
        }
    }, []);
    return <Component {...pageProps} />;
};

export default appWithTranslation(App);
