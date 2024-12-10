import Head from 'next/head';
import Header from '@components/header';
import Footer from '@components/footer';
import OrderOverviewTable from '@components/orders/OrderOverviewTable';
import { useEffect, useState } from 'react';
import { Order } from '@types';
import { OrderService } from '@services/OrderService';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    const translations = await serverSideTranslations(locale ?? 'en', ['common']);
    return {
        props: {
            ...translations,
        },
    };
};
const Home: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getOrders = async () => {
        try {
            setLoading(true);
            const orderService = new OrderService();
            const data = await orderService.getAllOrders();
            setOrders(data);
        } catch (err) {
            console.error(err);
            setError('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    return (
        <>
            <Head>
                <title>Simple WMS</title>
                <meta name="description" content="Simple WMS" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/wms.png" />
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Order</h1>
                <section>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-danger">{error}</p>}
                    {!loading && orders && <OrderOverviewTable orders={orders} />}
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Home;
