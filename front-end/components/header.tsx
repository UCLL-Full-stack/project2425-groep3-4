import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">

      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        {' '}
        Simple WMS
      </a>

      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
          Home
        </Link>

        <Link href="/products" className="nav-link px-4 fs-5 text-white">
          Product
        </Link>

        {/* <Link href="/inventories" className="nav-link px-4 fs-5 text-white">
          Inventory
        </Link>

        <Link href="/orders" className="nav-link px-4 fs-5 text-white">
          Order
        </Link>

        <Link href="/users" className="nav-link px-4 fs-5 text-white">
          User Manangement
        </Link> */}
      </nav>

    </header>
  );
};

export default Header;