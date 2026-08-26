import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-200 border-t border-slate-300 mt-auto">
      <div className="max-w-[60%] mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
          <p className="text-center sm:text-left">
            © 2026 AironA. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:justify-end">
            <Link to="/legal/terms" className="underline">
              利用規約
            </Link>
            <Link to="/legal/tokushoho" className="underline">
              特商法
            </Link>
            <Link to="/privacy-policy" className="underline">
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
