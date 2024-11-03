import Head from 'next/head';
import Header from '@components/header';
import Footer from '@components/footer';
import InventoryOverviewTable from '@components/inventories/InventoryOverviewTable';

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
        <h1>Inventory</h1>
        <section>
          <InventoryOverviewTable />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home;