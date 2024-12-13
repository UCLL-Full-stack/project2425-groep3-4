import Link from 'next/link';
import Language from './language/Language';
import { useTranslation } from 'next-i18next';

const Header: React.FC = () => {
    const { t } = useTranslation('common');
    console.log('Loaded translation:', t('app.title'));

    return (
        <header className="bg-dark bg-gradient text-white-50 border-bottom mb-5">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-dark">
                    {/* Brand Title */}
                    <a className="navbar-brand fs-2 text-white" href="#">
                        {t('app.title')}
                    </a>

                    {/* Toggler Button for Mobile */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Collapsible Menu */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav mx-auto">
                            <li className="nav-item">
                                <Link href="/" className="nav-link fs-5 text-white">
                                    {t('header.nav.home')}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/products" className="nav-link fs-5 text-white">
                                    {t('header.nav.product')}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/inventories" className="nav-link fs-5 text-white">
                                    {t('header.nav.inventory')}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/orders" className="nav-link fs-5 text-white">
                                    {t('header.nav.order')}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/users" className="nav-link fs-5 text-white">
                                    User Management
                                </Link>
                            </li>
                        </ul>
                        {/* Language Selector */}
                        <div className="d-flex align-items-center">
                            <span className="fs-5 me-2 text-white">Language:</span>
                            <Language />
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
