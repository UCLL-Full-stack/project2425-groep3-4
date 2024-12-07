import Head from 'next/head';
import Header from '@components/header';
import Footer from '@components/footer';
import ProductOverviewTable from '@components/products/ProductOverviewTable';
import { useState, useEffect } from 'react';
import { Product } from '@types';
import { ProductService } from '@services/ProductService';
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
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getProducts = async () => {
        try {
            const response = await ProductService.getAllProducts();
            console.log('Fetched products:', response); 
            setProducts(response);
         } catch (err) {
            console.error('Failed to fetch products:', err);
            setError('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
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
                <h1>Products</h1>
                <section>
                    {loading && <p>Loading...</p>}
                    {error && <p className="text-danger">{error}</p>}
                    {!loading && products && <ProductOverviewTable products={products} />}
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Home;
