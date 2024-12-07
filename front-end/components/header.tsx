import Link from 'next/link';
import Language from "./language/Language";
import { useTranslation } from "next-i18next";

const Header: React.FC = () => {
  const { t } = useTranslation("common");
  console.log("Loaded translation:", t("app.title"))

  return (
    <header className="p-3 mb-3 border-bottom bg-dark bg-gradient">

      <a className="fs-2 d-flex justify-content-center mb-2 mb-lg-0 text-white-50 text-decoration-none">
        {' '}
        {t("app.title")}
      </a>

      <nav className="nav justify-content-center">
        <Link href="/" className="nav-link px-4 fs-5 text-white">
        {t("header.nav.home")}
        </Link>

        <Link href="/products" className="nav-link px-4 fs-5 text-white">
        {t("header.nav.product")}
        </Link>

        <Link href="/inventories" className="nav-link px-4 fs-5 text-white">
        {t("header.nav.inventory")}
        </Link>

        <Link href="/orders" className="nav-link px-4 fs-5 text-white">
        {t("header.nav.order")}
        </Link>

        <Link href="/users" className="nav-link px-4 fs-5 text-white">
          User Manangement
        </Link>

        <div className="px-4 fs-5">
          <Language />
        </div>
      </nav>

    </header>
  );
};

export default Header;