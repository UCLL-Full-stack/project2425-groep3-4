import Head from 'next/head';
import Header from '@components/header';
import Footer from '@components/footer';
import InventoryOverviewTable from '@components/inventories/InventoryOverviewTable';

import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { InventoryService } from '@services/InventoryService';
import { Inventory } from '@types';
import { useState, useEffect } from 'react';

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    const translations = await serverSideTranslations(locale ?? 'en', ['common']);
    return {
        props: {
            ...(await serverSideTranslations(locale ?? 'en', ['common'])),
        },
    };
};

const Home: React.FC = () => {
    const [inventories, setInventories] = useState<Inventory[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const inventoryService = new InventoryService();

    useEffect(() => {
        const fetchInventories = async () => {
            try {
                setLoading(true);
                const data = await inventoryService.getAllInventories();
                setInventories(data);
            } catch (err) {
                setError('Failed to load inventories');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchInventories();
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
            <main className="d-flex flex-column align-items-center">
                <h1>Inventory</h1>
                <section>
                    <InventoryOverviewTable
                        inventories={inventories}
                        loading={loading}
                        error={error}
                    />
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Home;
