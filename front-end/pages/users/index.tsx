import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import Footer from '@components/footer';
import styles from '@styles/home.module.css';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import UserForm from '@components/users/UserForm';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    const translations = await serverSideTranslations(locale ?? 'en', ['common']);
    return {
        props: {
            ...translations,
        },
    };
};

const Home: React.FC = () => {
    return (
        <>
            <Head>
                <title>Simple WMS</title>
                <meta name="description" content="Simple WMS" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/wms.png" />
            </Head>
            <Header />
            <main className={styles.main}>
                <UserForm />
            </main>
            <Footer />
        </>
    );
};

export default Home;
