import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-200 border-t border-slate-300 mt-auto">
      <div className="max-w-[60%] mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <p className="text-center sm:text-left">
            © 2026 AironA. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            AIRONA-LAB
          </p>
          <Link to="/privacy-policy">
            <p className="text-center sm:text-right underline">
              プライバシーポリシー・免責事項
            </p>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

