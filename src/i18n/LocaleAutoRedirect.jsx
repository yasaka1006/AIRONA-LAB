import { Navigate, useLocation } from 'react-router-dom';
import { getLocaleRedirectTarget } from './localePreference';

/** Sends visitors to /en/… when browser or saved preference is English. */
export default function LocaleAutoRedirect() {
  const location = useLocation();
  const target = getLocaleRedirectTarget(
    location.pathname,
    location.search,
    location.hash,
  );

  if (target) {
    return <Navigate to={target} replace />;
  }

  return null;
}
