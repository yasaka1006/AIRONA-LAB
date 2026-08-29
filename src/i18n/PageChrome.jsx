import { Link } from 'react-router-dom';
import { useSiteLocale } from './siteLocale';

/** Back link for localized content pages */
export function PageChrome({ backTo, backLabel, className = 'mb-4' }) {
  const { path } = useSiteLocale();
  if (!backTo) return null;

  return (
    <div className={className}>
      <Link to={path(backTo)} className="text-sm text-slate-500 underline">
        {backLabel}
      </Link>
    </div>
  );
}
