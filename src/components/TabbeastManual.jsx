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

const Sub = ({ children }) => (
  <p className="font-bold text-slate-700">{children}</p>
);

const Kbd = ({ children }) => (
  <kbd className="inline-block rounded border border-slate-300 bg-slate-100 px-1.5 py-0.5 text-xs font-mono text-slate-700">
    {children}
  </kbd>
);

const BulletList = ({ items }) => (
  <ul className="list-disc pl-5 space-y-2">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>
);

const TOC_IDS = [
  'overview',
  'ui',
  'basic',
  'edit',
  'view',
  'playback',
  'backing',
  'mp4',
  'io',
  'shortcuts',
];

const SHORTCUT_ROWS = [
  { action: 'pages.manual.shortcuts.actionPlay', key: 'Space' },
  { action: 'pages.manual.shortcuts.actionUndo', key: 'Ctrl+Z / Ctrl+Y' },
  { action: 'pages.manual.shortcuts.actionFile', key: 'Ctrl+N / Ctrl+O / Ctrl+S' },
  { action: 'pages.manual.shortcuts.actionSaveAs', key: 'Ctrl+Shift+S' },
  { action: 'pages.manual.shortcuts.actionClipboard', key: 'Ctrl+C / Ctrl+X / Ctrl+V' },
  { action: 'pages.manual.shortcuts.actionRhythmPaste', key: 'Ctrl+Alt+V' },
  { action: 'pages.manual.shortcuts.actionSelectAll', key: 'Ctrl+A' },
  { action: 'pages.manual.shortcuts.actionDuplicate', key: 'Ctrl+D' },
  { action: 'pages.manual.shortcuts.actionMeasure', key: 'Ctrl+T / Ctrl+Delete' },
  { action: 'pages.manual.shortcuts.actionResetMeasure', key: 'Ctrl+R' },
  { action: 'pages.manual.shortcuts.actionNoteSplit', key: '+ / −' },
  { action: 'pages.manual.shortcuts.actionDuplicateSplit', key: 'Shift + +' },
  { action: 'pages.manual.shortcuts.actionRest', key: 'R / Shift+R' },
  { action: 'pages.manual.shortcuts.actionTie', key: 'L' },
  { action: 'pages.manual.shortcuts.actionDotTuplet', key: '* / /' },
  { action: 'pages.manual.shortcuts.actionFret', key: 'A / D' },
  { action: 'pages.manual.shortcuts.actionString', key: 'Alt+↑ / Alt+↓' },
  { action: 'pages.manual.shortcuts.actionExtend', key: 'Shift+← → ↑ ↓' },
  { action: 'pages.manual.shortcuts.actionMeasureNav', key: 'Ctrl+← / Ctrl+→' },
  { action: 'pages.manual.shortcuts.actionChord', key: 'Shift+C' },
  { action: 'pages.manual.shortcuts.actionChordShortcut', key: 'Alt+1–9 / Alt+0' },
];

const TECH_ROWS = [
  { action: 'pages.manual.shortcuts.techBrush', key: 'X / .' },
  { action: 'pages.manual.shortcuts.techPalm', key: 'M' },
  { action: 'pages.manual.shortcuts.techHammer', key: 'H' },
  { action: 'pages.manual.shortcuts.techGhost', key: 'C' },
  { action: 'pages.manual.shortcuts.techSlide', key: 'S' },
  { action: 'pages.manual.shortcuts.techGlide', key: 'G' },
  { action: 'pages.manual.shortcuts.techBend', key: 'B' },
  { action: 'pages.manual.shortcuts.techBendHeight', key: '] / [' },
  { action: 'pages.manual.shortcuts.techBendFlip', key: 'Shift+B' },
  { action: 'pages.manual.shortcuts.techVibrato', key: 'V' },
  { action: 'pages.manual.shortcuts.techHarmonic', key: 'N' },
  { action: 'pages.manual.shortcuts.techTap', key: 'T' },
  { action: 'pages.manual.shortcuts.techSlap', key: 'O' },
  { action: 'pages.manual.shortcuts.techPull', key: 'P' },
  { action: 'pages.manual.shortcuts.techLetRing', key: ';' },
  { action: 'pages.manual.shortcuts.techText', key: 'Shift+T' },
  { action: 'pages.manual.shortcuts.techAccent', key: 'Z' },
  { action: 'pages.manual.shortcuts.techStaccato', key: ',' },
  { action: 'pages.manual.shortcuts.techStrokeDown', key: 'Y' },
  { action: 'pages.manual.shortcuts.techStrokeUp', key: 'U' },
  { action: 'pages.manual.shortcuts.techSlash', key: 'K' },
];

const ShortcutTable = ({ rows, colAction, colKey, t }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm border-collapse">
      <thead>
        <tr className="border-b border-slate-200 text-left">
          <th className="py-2 pr-4 font-extrabold text-slate-700">{colAction}</th>
          <th className="py-2 font-extrabold text-slate-700">{colKey}</th>
        </tr>
      </thead>
      <tbody className="text-slate-600">
        {rows.map(({ action, key }) => (
          <tr key={action} className="border-b border-slate-100">
            <td className="py-2 pr-4">{t(action)}</td>
            <td className="py-2 font-mono text-xs">{key}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TabbeastManual = () => {
  const { t, path } = useSiteLocale();
  const li = (base, count) =>
    Array.from({ length: count }, (_, index) => t(`${base}${index + 1}`));

  return (
    <main className="my-8 mx-1">
      <article className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm">
        <PageChrome backTo="/tabbeast" backLabel={t('common.backToTabbeast')} />
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-2">
          {t('pages.manual.title')}
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed mb-2">{t('pages.manual.intro')}</p>
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
            <p>{t('pages.manual.overview.p3')}</p>
          </Section>

          <Section id="ui" title={t('pages.manual.ui.title')}>
            <BulletList items={li('pages.manual.ui.li', 7)} />
          </Section>

          <Section id="basic" title={t('pages.manual.basic.title')}>
            <Sub>{t('pages.manual.basic.fretTitle')}</Sub>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <Kbd>0</Kbd>〜<Kbd>9</Kbd> {t('pages.manual.basic.fretLi1')}
              </li>
              <li>{t('pages.manual.basic.fretLi2')}</li>
              <li>{t('pages.manual.basic.fretLi3')}</li>
              <li>
                <Kbd>Backspace</Kbd> / <Kbd>Delete</Kbd> — {t('pages.manual.basic.fretLi4')}
              </li>
            </ul>

            <Sub>{t('pages.manual.basic.dragTitle')}</Sub>
            <p>{t('pages.manual.basic.dragIntro')}</p>
            <BulletList items={li('pages.manual.basic.dragLi', 6)} />
            <p className="text-xs text-slate-500">{t('pages.manual.basic.dragNote')}</p>

            <Sub>{t('pages.manual.basic.modeTitle')}</Sub>
            <BulletList items={li('pages.manual.basic.modeLi', 4)} />

            <Sub>{t('pages.manual.basic.fileTitle')}</Sub>
            <BulletList items={li('pages.manual.basic.fileLi', 3)} />
          </Section>

          <Section id="edit" title={t('pages.manual.edit.title')}>
            <Sub>{t('pages.manual.edit.measureTitle')}</Sub>
            <p>{t('pages.manual.edit.measureP')}</p>

            <Sub>{t('pages.manual.edit.rhythmTitle')}</Sub>
            <BulletList items={li('pages.manual.edit.rhythmLi', 4)} />

            <Sub>{t('pages.manual.edit.technicalTitle')}</Sub>
            <p>{t('pages.manual.edit.technicalP')}</p>

            <Sub>{t('pages.manual.edit.chordTitle')}</Sub>
            <BulletList items={li('pages.manual.edit.chordLi', 4)} />

            <Sub>{t('pages.manual.edit.fingerTitle')}</Sub>
            <p>{t('pages.manual.edit.fingerP')}</p>

            <Sub>{t('pages.manual.edit.efficiencyTitle')}</Sub>
            <BulletList items={li('pages.manual.edit.efficiencyLi', 6)} />
          </Section>

          <Section id="view" title={t('pages.manual.view.title')}>
            <Sub>{t('pages.manual.view.layoutTitle')}</Sub>
            <BulletList items={li('pages.manual.view.layoutLi', 4)} />

            <Sub>{t('pages.manual.view.appearanceTitle')}</Sub>
            <BulletList items={li('pages.manual.view.appearanceLi', 4)} />

            <Sub>{t('pages.manual.view.generalTitle')}</Sub>
            <BulletList items={li('pages.manual.view.generalLi', 4)} />
          </Section>

          <Section id="playback" title={t('pages.manual.playback.title')}>
            <ul className="list-disc pl-5 space-y-2">
              {li('pages.manual.playback.li', 4).map((item) => (
                <li key={item}>{item}</li>
              ))}
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

            <Sub>{t('pages.manual.backing.loadTitle')}</Sub>
            <BulletList items={li('pages.manual.backing.loadLi', 4)} />
            <p className="text-xs text-slate-500">{t('pages.manual.backing.loadNote')}</p>

            <Sub>{t('pages.manual.backing.youtubeTitle')}</Sub>
            <p>{t('pages.manual.backing.youtubeP')}</p>

            <Sub>{t('pages.manual.backing.panelTitle')}</Sub>
            <BulletList items={li('pages.manual.backing.panelLi', 5)} />

            <Sub>{t('pages.manual.backing.syncTitle')}</Sub>
            <ol className="list-decimal pl-5 space-y-2">
              {li('pages.manual.backing.syncLi', 3).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <p className="text-xs text-slate-500">{t('pages.manual.backing.syncNote')}</p>

            <Sub>{t('pages.manual.backing.seekTitle')}</Sub>
            <BulletList items={li('pages.manual.backing.seekLi', 2)} />

            <Sub>{t('pages.manual.backing.otherTitle')}</Sub>
            <BulletList items={li('pages.manual.backing.otherLi', 4)} />

            <Sub>{t('pages.manual.backing.mp4RelationTitle')}</Sub>
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

            <Sub>{t('pages.manual.mp4.stepsTitle')}</Sub>
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
                  {li('pages.manual.mp4.step2Li', 3).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
              <li>
                {t('pages.manual.mp4.step3')}
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  {li('pages.manual.mp4.step3Li', 8).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
              <li>{t('pages.manual.mp4.step4')}</li>
              <li>{t('pages.manual.mp4.step5')}</li>
              <li>{t('pages.manual.mp4.step6')}</li>
            </ol>
            <p className="text-xs text-slate-500">{t('pages.manual.mp4.stepsNote')}</p>

            <Sub>{t('pages.manual.mp4.tipsTitle')}</Sub>
            <BulletList items={li('pages.manual.mp4.tipsLi', 4)} />
            <p className="text-xs text-slate-500">{t('pages.manual.mp4.demoNote')}</p>
          </Section>

          <Section id="io" title={t('pages.manual.io.title')}>
            <Sub>{t('pages.manual.io.importTitle')}</Sub>
            <BulletList items={li('pages.manual.io.importLi', 5)} />

            <Sub>{t('pages.manual.io.exportTitle')}</Sub>
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
              <li>{t('pages.manual.io.exportLi4')}</li>
            </ul>
            <p className="text-xs text-slate-500">{t('pages.manual.io.exportNote1')}</p>
            <p className="text-xs text-slate-500">{t('pages.manual.io.exportNote2')}</p>
          </Section>

          <Section id="shortcuts" title={t('pages.manual.shortcuts.title')}>
            <p>{t('pages.manual.shortcuts.intro')}</p>
            <ShortcutTable
              rows={SHORTCUT_ROWS}
              colAction={t('pages.manual.shortcuts.colAction')}
              colKey={t('pages.manual.shortcuts.colKey')}
              t={t}
            />

            <Sub>{t('pages.manual.shortcuts.techTitle')}</Sub>
            <ShortcutTable
              rows={TECH_ROWS}
              colAction={t('pages.manual.shortcuts.colAction')}
              colKey={t('pages.manual.shortcuts.colKey')}
              t={t}
            />
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
