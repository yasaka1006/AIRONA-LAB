import { Link } from 'react-router-dom';
import { PageChrome } from '../i18n/PageChrome';
import { useSiteLocale } from '../i18n/siteLocale';

const Section = ({ id, title, children }) => (
  <section id={id} className="scroll-mt-24">
    <h2 className="text-lg font-extrabold text-slate-800 mb-3 pb-2 border-b border-slate-200">
      {title}
    </h2>
    <div className="text-sm text-slate-600 leading-relaxed space-y-3">{children}</div>
  </section>
);

const Kbd = ({ children }) => (
  <kbd className="inline-block rounded border border-slate-300 bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-slate-700">
    {children}
  </kbd>
);

const TOC_IDS = ['overview', 'ui', 'basic', 'edit', 'playback', 'backing', 'mp4', 'io', 'shortcuts'];

const SHORTCUT_ROWS = [
  { action: 'pages.manual.shortcuts.actionPlay', key: 'Space' },
  { action: 'pages.manual.shortcuts.actionUndo', key: 'Ctrl+Z / Ctrl+Y' },
  { action: 'pages.manual.shortcuts.actionClipboard', key: 'Ctrl+C / Ctrl+X / Ctrl+V' },
  { action: 'pages.manual.shortcuts.actionRhythmPaste', key: 'Ctrl+Alt+V' },
  { action: 'pages.manual.shortcuts.actionSelectAll', key: 'Ctrl+A' },
  { action: 'pages.manual.shortcuts.actionMeasure', key: 'Ctrl+T / Ctrl+Delete' },
  { action: 'pages.manual.shortcuts.actionNoteSplit', key: '+ / -' },
  { action: 'pages.manual.shortcuts.actionRestTie', key: 'R / L' },
  { action: 'pages.manual.shortcuts.actionFret', key: 'Alt+← / Alt+→' },
  { action: 'pages.manual.shortcuts.actionMeasureNav', key: 'Ctrl+← / Ctrl+→' },
];

const TabbeastManual = () => {
  const { t, path } = useSiteLocale();

  return (
    <main className="my-8 mx-1">
      <article className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
        <PageChrome backTo="/tabbeast" backLabel={t('common.backToTabbeast')} />
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">
          {t('pages.manual.title')}
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed mb-2">
          {t('pages.manual.intro')}
        </p>
        <p className="text-xs text-slate-400 mb-8">
          {t('pages.manual.guideRefPrefix')}
          <Link to={path('/tabbeast/guide')} className="underline mx-0.5">
            {t('common.guide')}
          </Link>
          {t('pages.manual.guideRefSuffix')}
        </p>

        <nav
          aria-label={t('pages.manual.tocTitle')}
          className="mb-10 rounded-lg bg-slate-50 border border-slate-200 p-4"
        >
          <p className="text-sm font-extrabold text-slate-800 mb-2">{t('pages.manual.tocTitle')}</p>
          <ul className="text-sm text-slate-600 columns-1 sm:columns-2 gap-x-6 space-y-1">
            {TOC_IDS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="underline hover:text-slate-800">
                  {t(`pages.manual.toc.${id}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-10">
          <Section id="overview" title={t('pages.manual.overview.title')}>
            <p>{t('pages.manual.overview.p1')}</p>
            <p>{t('pages.manual.overview.p2')}</p>
          </Section>

          <Section id="ui" title={t('pages.manual.ui.title')}>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t('pages.manual.ui.li1')}</li>
              <li>{t('pages.manual.ui.li2')}</li>
              <li>{t('pages.manual.ui.li3')}</li>
              <li>{t('pages.manual.ui.li4')}</li>
              <li>{t('pages.manual.ui.li5')}</li>
              <li>{t('pages.manual.ui.li6')}</li>
              <li>{t('pages.manual.ui.li7')}</li>
            </ul>
          </Section>

          <Section id="basic" title={t('pages.manual.basic.title')}>
            <p className="font-bold text-slate-700">{t('pages.manual.basic.fretTitle')}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <Kbd>0</Kbd>〜<Kbd>9</Kbd> {t('pages.manual.basic.fretLi1')}
              </li>
              <li>{t('pages.manual.basic.fretLi2')}</li>
              <li>
                <Kbd>Backspace</Kbd> — {t('pages.manual.basic.fretLi3')}
              </li>
            </ul>

            <p className="font-bold text-slate-700 pt-2">{t('pages.manual.basic.dragTitle')}</p>
            <p>{t('pages.manual.basic.dragIntro')}</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t('pages.manual.basic.dragLi1')}</li>
              <li>{t('pages.manual.basic.dragLi2')}</li>
              <li>{t('pages.manual.basic.dragLi3')}</li>
              <li>{t('pages.manual.basic.dragLi4')}</li>
              <li>{t('pages.manual.basic.dragLi5')}</li>
              <li>{t('pages.manual.basic.dragLi6')}</li>
            </ul>
            <p className="text-xs text-slate-500">{t('pages.manual.basic.dragNote')}</p>

            <p className="font-bold text-slate-700 pt-2">{t('pages.manual.basic.modeTitle')}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t('pages.manual.basic.modeLi1')}</li>
              <li>{t('pages.manual.basic.modeLi2')}</li>
              <li>{t('pages.manual.basic.modeLi3')}</li>
              <li>{t('pages.manual.basic.modeLi4')}</li>
            </ul>

            <p className="font-bold text-slate-700 pt-2">{t('pages.manual.basic.fileTitle')}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t('pages.manual.basic.fileLi1')}</li>
              <li>{t('pages.manual.basic.fileLi2')}</li>
            </ul>
          </Section>

          <Section id="edit" title={t('pages.manual.edit.title')}>
            <p className="font-bold text-slate-700">{t('pages.manual.edit.measureTitle')}</p>
            <p>{t('pages.manual.edit.measureP')}</p>

            <p className="font-bold text-slate-700 pt-2">{t('pages.manual.edit.rhythmTitle')}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t('pages.manual.edit.rhythmLi1')}</li>
              <li>{t('pages.manual.edit.rhythmLi2')}</li>
              <li>{t('pages.manual.edit.rhythmLi3')}</li>
            </ul>

            <p className="font-bold text-slate-700 pt-2">{t('pages.manual.edit.technicalTitle')}</p>
            <p>{t('pages.manual.edit.technicalP')}</p>

            <p className="font-bold text-slate-700 pt-2">{t('pages.manual.edit.efficiencyTitle')}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t('pages.manual.edit.efficiencyLi1')}</li>
              <li>{t('pages.manual.edit.efficiencyLi2')}</li>
              <li>{t('pages.manual.edit.efficiencyLi3')}</li>
              <li>{t('pages.manual.edit.efficiencyLi4')}</li>
            </ul>
          </Section>

          <Section id="playback" title={t('pages.manual.playback.title')}>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t('pages.manual.playback.li1')}</li>
              <li>{t('pages.manual.playback.li2')}</li>
              <li>{t('pages.manual.playback.li3')}</li>
              <li>{t('pages.manual.playback.li4')}</li>
              <li>
                {t('pages.manual.playback.li5Prefix')}
                <a href="#backing" className="underline mx-0.5">
                  {t('pages.manual.playback.backingLink')}
                </a>
                {t('pages.manual.playback.li5Suffix')}
              </li>
              <li>{t('pages.manual.playback.li6')}</li>
            </ul>
          </Section>

          <Section id="backing" title={t('pages.manual.backing.title')}>
            <p>{t('pages.manual.backing.intro')}</p>

            <p className="font-bold text-slate-700 pt-1">{t('pages.manual.backing.loadTitle')}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t('pages.manual.backing.loadLi1')}</li>
              <li>{t('pages.manual.backing.loadLi2')}</li>
              <li>{t('pages.manual.backing.loadLi3')}</li>
            </ul>
            <p className="text-xs text-slate-500">{t('pages.manual.backing.loadNote')}</p>

            <p className="font-bold text-slate-700 pt-2">{t('pages.manual.backing.panelTitle')}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t('pages.manual.backing.panelLi1')}</li>
              <li>{t('pages.manual.backing.panelLi2')}</li>
              <li>{t('pages.manual.backing.panelLi3')}</li>
              <li>{t('pages.manual.backing.panelLi4')}</li>
            </ul>

            <p className="font-bold text-slate-700 pt-2">{t('pages.manual.backing.syncTitle')}</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>{t('pages.manual.backing.syncLi1')}</li>
              <li>{t('pages.manual.backing.syncLi2')}</li>
              <li>{t('pages.manual.backing.syncLi3')}</li>
            </ol>
            <p className="text-xs text-slate-500">{t('pages.manual.backing.syncNote')}</p>

            <p className="font-bold text-slate-700 pt-2">{t('pages.manual.backing.seekTitle')}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t('pages.manual.backing.seekLi1')}</li>
              <li>{t('pages.manual.backing.seekLi2')}</li>
            </ul>

            <p className="font-bold text-slate-700 pt-2">{t('pages.manual.backing.otherTitle')}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t('pages.manual.backing.otherLi1')}</li>
              <li>{t('pages.manual.backing.otherLi2')}</li>
              <li>{t('pages.manual.backing.otherLi3')}</li>
              <li>{t('pages.manual.backing.otherLi4')}</li>
            </ul>

            <p className="font-bold text-slate-700 pt-2">{t('pages.manual.backing.mp4RelationTitle')}</p>
            <p>
              {t('pages.manual.backing.mp4RelationPrefix')}
              <a href="#mp4" className="underline mx-0.5">
                {t('pages.manual.backing.mp4Link')}
              </a>
              {t('pages.manual.backing.mp4RelationSuffix')}
            </p>
          </Section>

          <Section id="mp4" title={t('pages.manual.mp4.title')}>
            <p>{t('pages.manual.mp4.intro')}</p>

            <p className="font-bold text-slate-700 pt-1">{t('pages.manual.mp4.stepsTitle')}</p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                {t('pages.manual.mp4.step1Prefix')}
                <a href="#backing" className="underline mx-0.5">
                  {t('pages.manual.mp4.backingLink')}
                </a>
                {t('pages.manual.mp4.step1Suffix')}
              </li>
              <li>
                {t('pages.manual.mp4.step2')}
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>{t('pages.manual.mp4.step2Li1')}</li>
                  <li>{t('pages.manual.mp4.step2Li2')}</li>
                  <li>{t('pages.manual.mp4.step2Li3')}</li>
                </ul>
              </li>
              <li>
                {t('pages.manual.mp4.step3')}
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>{t('pages.manual.mp4.step3Li1')}</li>
                  <li>{t('pages.manual.mp4.step3Li2')}</li>
                  <li>{t('pages.manual.mp4.step3Li3')}</li>
                  <li>{t('pages.manual.mp4.step3Li4')}</li>
                  <li>{t('pages.manual.mp4.step3Li5')}</li>
                </ul>
              </li>
              <li>{t('pages.manual.mp4.step4')}</li>
              <li>{t('pages.manual.mp4.step5')}</li>
              <li>{t('pages.manual.mp4.step6')}</li>
            </ol>
            <p className="text-xs text-slate-500">{t('pages.manual.mp4.stepsNote')}</p>

            <p className="font-bold text-slate-700 pt-2">{t('pages.manual.mp4.tipsTitle')}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t('pages.manual.mp4.tipsLi1')}</li>
              <li>{t('pages.manual.mp4.tipsLi2')}</li>
              <li>{t('pages.manual.mp4.tipsLi3')}</li>
            </ul>

            <p className="text-xs text-slate-500">{t('pages.manual.mp4.demoNote')}</p>
          </Section>

          <Section id="io" title={t('pages.manual.io.title')}>
            <p className="font-bold text-slate-700">{t('pages.manual.io.importTitle')}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t('pages.manual.io.importLi1')}</li>
              <li>{t('pages.manual.io.importLi2')}</li>
              <li>{t('pages.manual.io.importLi3')}</li>
              <li>{t('pages.manual.io.importLi4')}</li>
            </ul>

            <p className="font-bold text-slate-700 pt-2">{t('pages.manual.io.exportTitle')}</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t('pages.manual.io.exportLi1')}</li>
              <li>
                {t('pages.manual.io.exportLi2Prefix')}
                <a href="#mp4" className="underline">
                  {t('pages.manual.io.exportLi2Link')}
                </a>
                {t('pages.manual.io.exportLi2Suffix')}
              </li>
              <li>{t('pages.manual.io.exportLi3')}</li>
            </ul>
            <p className="text-xs text-slate-500">{t('pages.manual.io.exportNote1')}</p>
            <p className="text-xs text-slate-500">{t('pages.manual.io.exportNote2')}</p>
          </Section>

          <Section id="shortcuts" title={t('pages.manual.shortcuts.title')}>
            <p>{t('pages.manual.shortcuts.intro')}</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-left">
                    <th className="py-2 pr-4 font-extrabold text-slate-700">
                      {t('pages.manual.shortcuts.colAction')}
                    </th>
                    <th className="py-2 font-extrabold text-slate-700">
                      {t('pages.manual.shortcuts.colKey')}
                    </th>
                  </tr>
                </thead>
                <tbody className="text-slate-600">
                  {SHORTCUT_ROWS.map(({ action, key }) => (
                    <tr key={action} className="border-b border-slate-100">
                      <td className="py-2 pr-4">{t(action)}</td>
                      <td className="py-2 font-mono text-xs">{key}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500">{t('pages.manual.shortcuts.note')}</p>
          </Section>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link to={path('/tabbeast')} className="text-slate-700 underline">
            {t('common.productPage')}
          </Link>
          <Link to={path('/tabbeast/guide')} className="text-slate-700 underline">
            {t('common.guide')}
          </Link>
          <Link to={path('/tabbeast/contact')} className="text-slate-700 underline">
            {t('common.contact')}
          </Link>
        </div>
      </article>
    </main>
  );
};

export default TabbeastManual;
