import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="p-3 border-top bg-dark bg-gradient text-center text-white-100 fixed-bottom">
      <div className="container">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Groep 3-4
        </p>
        <p className="mt-2">
          <Link href="mailto:@ucll.be" className="text-white text-decoration-none">
            <i className="bi bi-envelope-fill"></i> @ucll.be
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
