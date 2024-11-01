import Head from 'next/head';
import Image from 'next/image';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import PruductOverviewTable from '@components/products/ProductOverviewTable';
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
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Pruduct</h1>
        <section>
          <PruductOverviewTable/>
        </section>
      </main>
    </>
  );
};

export default Home;