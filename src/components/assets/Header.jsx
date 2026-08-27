import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { fetchMe, logout } from '../../lib/commerceApi';

const isJapanese = (navigator.languages?.[0] ?? navigator.language ?? '')
  .toLowerCase()
  .startsWith('ja');

const menuLabels = isJapanese
  ? {
      home: 'ホーム',
      games: 'ゲーム',
      openMenu: 'メニューを開く',
      accountMenu: 'アカウントメニュー',
      mypage: 'マイページ',
      changeEmail: 'メールアドレス変更',
      logout: 'ログアウト',
    }
  : {
      home: 'Home',
      games: 'Games',
      openMenu: 'Open menu',
      accountMenu: 'Account menu',
      mypage: 'My page',
      changeEmail: 'Change email',
      logout: 'Log out',
    };

const menuItems =
  'font-bold text-md text-gray-500 hover:text-gray-700 transition-colors duration-100 hover:bg-slate-300 rounded-full py-2 px-4';

const dropdownItemClass =
  'flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-100 transition-colors';

/** Header 右上のアカウント／マイページアイコン。true で再表示 */
const SHOW_ACCOUNT_MENU = false;

const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!SHOW_ACCOUNT_MENU) return undefined;
    let cancelled = false;
    fetchMe()
      .then((me) => {
        if (cancelled) return;
        setLoggedIn(Boolean(me));
        setEmail(me?.email || '');
      })
      .catch(() => {
        if (cancelled) return;
        setLoggedIn(false);
        setEmail('');
      });
    return () => {
      cancelled = true;
    };
  }, [location.pathname]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!SHOW_ACCOUNT_MENU || !open) return undefined;
    const onPointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const onAccountClick = () => {
    if (!loggedIn) {
      navigate('/mypage');
      return;
    }
    setOpen((value) => !value);
  };

  const onLogout = async () => {
    setOpen(false);
    try {
      await logout();
    } catch {
      // ignore and still clear local UI
    }
    setLoggedIn(false);
    setEmail('');
    navigate('/mypage');
  };

  return (
    <header className="bg-slate-200 text-slate-100 px-2 shadow-xs fixed top-0 left-0 right-0 z-50 w-full h-12">
      <div className="flex items-center justify-between h-full w-full max-w-6xl mx-auto px-2">
        <button
          onClick={onMenuClick}
          className="xl:hidden p-2 hover:bg-slate-300 rounded-xl transition-all duration-200 active:scale-95 group text-slate-700"
          aria-label={menuLabels.openMenu}
        >
          <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-6 xl:gap-10">
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <h1 className="sr-only">AIRONA-LAB</h1>
              <img src="/Title.svg?v=2" alt="AIRONA-LAB" className="h-4 w-auto drop-shadow-md" />
            </div>
          </Link>

          <div className="hidden xl:flex items-center gap-6">
            <Link to="/" className={menuItems}>
              {menuLabels.home}
            </Link>
            <Link to="/minigames" className={menuItems}>
              {menuLabels.games}
            </Link>
          </div>
        </div>

        {SHOW_ACCOUNT_MENU ? (
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={onAccountClick}
              className="p-1.5 hover:bg-slate-300 rounded-full transition-colors duration-100"
              aria-label={menuLabels.accountMenu}
              aria-expanded={open}
              aria-haspopup="menu"
            >
              <img
                src={loggedIn ? '/user_in.svg' : '/user.svg'}
                alt=""
                className="h-8 w-8"
              />
            </button>

            {loggedIn && open ? (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden text-slate-800"
              >
                <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
                  <img src="/user_in.svg" alt="" className="h-9 w-9 shrink-0" />
                  <p className="text-sm font-bold text-slate-700 break-all leading-snug">
                    {email}
                  </p>
                </div>
                <div className="py-1">
                  <Link
                    to="/mypage"
                    role="menuitem"
                    className={dropdownItemClass}
                    onClick={() => setOpen(false)}
                  >
                    {menuLabels.mypage}
                  </Link>
                  <Link
                    to="/mypage/email"
                    role="menuitem"
                    className={dropdownItemClass}
                    onClick={() => setOpen(false)}
                  >
                    {menuLabels.changeEmail}
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    className={dropdownItemClass}
                    onClick={onLogout}
                  >
                    {menuLabels.logout}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="w-10" aria-hidden />
        )}
      </div>
    </header>
  );
};

export default Header;
