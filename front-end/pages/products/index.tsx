import Head from 'next/head';
import Header from '@components/header';
import Footer from '@components/footer';
import PruductOverviewTable from '@components/products/ProductOverviewTable';
import { useState } from 'react';
import { Product } from '@types';
import ProductsService from '@services/ProductsService';
import { StatusMessage } from '@types';
import useSWR from 'swr';

const Home: React.FC = () => {
  const [statusMessage, setStatusMessage] = useState<StatusMessage[]>([]);
  const [products, setProducts] = useState<Product[]>();
  // TODO function
  const getProducts = async () => {
    const response = await Promise.all([
      ProductsService.getAllProducts()
    ]);

    const [products] = response;

    if (!products.ok) {
      setStatusMessage([{message: "Failed to fetch products", type: "error"}])
    }
    else {
      return await products.json();
    }

  }

  const { data, isLoading, error } = useSWR(
    "products",
    getProducts

  )

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
        <h1>Pruduct</h1>
        <section>
          <PruductOverviewTable products={products} />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;