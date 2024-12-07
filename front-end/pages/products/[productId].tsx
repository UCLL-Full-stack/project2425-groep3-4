import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Product } from '@types';
import { ProductService } from '../../services/ProductService';
import ProductDetail from '@components/products/ProductDetail';
import Head from 'next/head';
import Header from '@components/header';
import Footer from '@components/footer';

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
const ProductDetailPage: React.FC = () => {
    const router = useRouter();
    const { productId } = router.query;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (productId) {
            const fetchProduct = async () => {
                try {
                    setLoading(true);
                    const data = await ProductService.getProductById(Number(productId));
                    setProduct(data);
                } catch (err) {
                    console.error('Failed to fetch product details:', err);
                    setError('Failed to fetch product details');
                } finally {
                    setLoading(false);
                }
            };

            fetchProduct();
        }
    }, [productId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!product) {
        return <p>Product not found</p>;
    }

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
                <h1>Pruduct Detail</h1>
                <section>
                    <ProductDetail product={product} />
                </section>
            </main>
            <Footer />
        </>
    );
};

export default ProductDetailPage;
