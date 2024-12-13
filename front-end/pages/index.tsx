import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import Footer from '@components/footer';
import styles from '@styles/home.module.css';
import { useTranslation } from 'next-i18next';

import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    const translations = await serverSideTranslations(locale ?? 'en', ['common']);
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

const Home: React.FC = () => {
    const { t } = useTranslation('common');
    return (
        <>
            <Head>
                <title>{t('app.title')}</title>
                <meta name="description" content="Courses app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/wms.png" />
            </Head>
            <Header />
            <main className={styles.main}>
                <span>
                    <Image
                        src="/images/wms.png"
                        alt="Simple WMS Logo"
                        className={styles.vercelLogo}
                        width={50}
                        height={50}
                    />
                    <h1>Welcome!</h1>
                </span>

                <div className={styles.description}>
                    <p>
                        Simple WMS is designed to provide a simple yet comprehensive warehouse
                        management solution for SMEs.
                        <br />
                        This project aims to streamline inventory management, order fulfillment and
                        shipping processes to increase operational efficiency and reduce human
                        errors.
                        <br />
                        The backend is developed with Node.js and Express to create a RESTful API,
                        while the frontend is implemented with React to provide a dynamic user
                        interface.
                        <br />
                    </p>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Home;
