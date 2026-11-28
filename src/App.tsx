import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiMenu, FiSearch, FiX } from 'react-icons/fi';
import { siteConfig } from './data/config';
import { certifications } from './data/certifications';
import { aiLevels, aiSkills, groups, levels, milestones, profile, technologies, technologyName, workspaceProjects } from './data/workspace';
import type { Translate, WorkspaceProject } from './data/workspace';
import { labDemos } from './data/lab';
import { Contact, Hero, Journey, Lab, ProjectDetail, ProjectGallery, Recruiter, SectionHeading, TechnologyMap } from './components/sections/WorkspaceSections';
import { CommandPalette, Terminal, WorkspaceDialog } from './components/ui/WorkspaceControls';
import type { Command, SearchItem, TerminalResponse } from './components/ui/WorkspaceControls';

type Certificate = (typeof certifications)[number];
type Overlay = { type: 'palette' } | { type: 'project'; project: WorkspaceProject } | { type: 'certificate'; certificate: Certificate };
type SectionLink = { name: string; id: string; recruiterId?: string };

const shortcuts = /Mac|iPhone|iPad/.test(navigator.platform) ? '⌘ K' : 'Ctrl K';

export default function App() {
  const { t, i18n } = useTranslation();
  const language = i18n.resolvedLanguage === 'en' ? 'en' : 'es';
  const tr: Translate = (es, en) => language === 'en' ? en : es;
  const [recruiter, setRecruiter] = useState(false);
  const [technology, setTechnology] = useState('React');
  const [overlay, setOverlay] = useState<Overlay | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setOverlay(null), []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = language === 'en' ? 'Samuel Melero | Full Stack Developer' : 'Samuel Melero | Desarrollador Full Stack';
  }, [language]);

  useEffect(() => {
    if (!menuOpen) return;
    function dismissMenu(event: PointerEvent) {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setMenuOpen(false);
    }
    document.addEventListener('pointerdown', dismissMenu);
    return () => document.removeEventListener('pointerdown', dismissMenu);
  }, [menuOpen]);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && !event.altKey && !event.shiftKey && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOverlay((current) => current?.type === 'palette' ? null : { type: 'palette' });
      }
    }
    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  const certificateTitle = (certificate: Certificate) => t('certifications.list.c' + certificate.id.split('-')[1], { defaultValue: certificate.title });
  const openProject = (project: WorkspaceProject) => setOverlay({ type: 'project', project });
  const openCertificate = (certificate: Certificate) => setOverlay({ type: 'certificate', certificate });
  const switchLanguage = (next = language === 'es' ? 'en' : 'es') => { void i18n.changeLanguage(next); };

  function goTo(id: string, view = recruiter) {
    close();
    setMenuOpen(false);
    setRecruiter(view);
    requestAnimationFrame(() => {
      const destination = document.getElementById(id);
      if (!destination) return;
      if (window.location.hash !== '#' + id) window.history.pushState(null, '', '#' + id);
      destination.focus({ preventScroll: true });
      destination.scrollIntoView({ block: 'start' });
    });
  }

  useEffect(() => {
    function restoreView() {
      const hash = window.location.hash;
      const inRecruiter = hash.startsWith('#recruiter');
      setRecruiter(inRecruiter);
      setMenuOpen(false);
      if (hash) requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'start' }));
      else if (window.history.scrollRestoration === 'manual') window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
    restoreView();
    window.addEventListener('popstate', restoreView);
    return () => window.removeEventListener('popstate', restoreView);
  }, []);

  const links: SectionLink[] = [
    { name: tr('Proyectos', 'Projects'), id: 'proyectos', recruiterId: 'recruiter-projects' },
    { name: tr('Tecnologías', 'Technologies'), id: 'habilidades', recruiterId: 'recruiter-skills' },
    { name: tr('Trayectoria', 'Experience'), id: 'trayectoria', recruiterId: 'recruiter-experience' },
    { name: tr('Contacto', 'Contact'), id: 'contacto', recruiterId: 'recruiter-contact' },
  ];

  const allSections: SectionLink[] = [
    ...links.filter((section) => section.id !== 'trayectoria'),
    { name: tr('Experiencia y formación', 'Experience and education'), id: 'trayectoria', recruiterId: 'recruiter-experience' },
    { name: tr('Experiencia profesional', 'Professional experience'), id: 'experiencia', recruiterId: 'recruiter-experience' },
    { name: tr('Perfil profesional', 'Professional profile'), id: 'sobre-mi', recruiterId: 'recruiter-profile' },
    { name: tr('Formación académica', 'Education'), id: 'formacion', recruiterId: 'recruiter-education' },
    { name: tr('Certificaciones', 'Certifications'), id: 'certificaciones', recruiterId: 'recruiter-certificates' },
    { name: tr(...groups.ai), id: 'ai-skills', recruiterId: 'recruiter-ai' },
    { name: tr('Terminal interactiva', 'Interactive terminal'), id: 'terminal' },
    ...(labDemos.length ? [{ name: 'AI Lab', id: 'ai-lab' }] : []),
  ];

  const recruiterLabel = tr('Modo reclutador', 'Recruiter mode');
  const workspaceLabel = tr('Volver al workspace', 'Back to workspace');
  const downloadLabel = tr('Descargar CV', 'Download CV');
  const closeLabel = tr('Cerrar', 'Close');
  const mobileLinks = allSections.filter((section) => !links.some((link) => (
    link.id === section.id || (recruiter && link.recruiterId === section.recruiterId)
  )));
  const paletteItems: SearchItem[] = [
    ...allSections.map((section, index) => ({
      id: 'section-' + index, name: section.name, category: tr('Sección', 'Section'),
      run: () => goTo(recruiter && section.recruiterId ? section.recruiterId : section.id, recruiter && Boolean(section.recruiterId)),
    })),
    { id: 'view', name: recruiter ? workspaceLabel : recruiterLabel, category: tr('Acción', 'Action'), run: () => goTo(recruiter ? 'inicio' : 'recruiter', !recruiter) },
    { id: 'cv', name: downloadLabel, category: tr('Acción', 'Action'), keywords: 'curriculum resume pdf ' + siteConfig.cvFilename, run: () => { document.getElementById('header-cv')?.click(); close(); } },
    { id: 'language', name: tr('Cambiar a inglés', 'Switch to Spanish'), category: tr('Acción', 'Action'), keywords: 'language idioma english español', run: () => { switchLanguage(); close(); } },
    ...workspaceProjects.map((project) => ({ id: project.id, name: tr(...project.title), category: tr('Proyecto', 'Project'), keywords: project.stack.join(' '), run: () => openProject(project) })),
    ...milestones.map((item) => ({
      id: item.id, name: [tr(...item.title), item.organization].filter(Boolean).join(' · '),
      category: item.kind === 'work' ? tr('Experiencia', 'Experience') : tr('Formación', 'Education'),
      keywords: [...item.title, item.date, item.current ? 'en curso in progress' : ''].join(' '),
      run: () => goTo((recruiter ? 'recruiter-' : '') + item.id),
    })),
    ...certifications.map((certificate) => ({
      id: certificate.id, name: certificateTitle(certificate), category: tr('Certificación', 'Certification'),
      keywords: certificate.issuer, run: () => openCertificate(certificate),
    })),
    ...technologies.map((item, index) => ({
      id: 'tech-' + index, name: technologyName(item, tr), category: tr(...groups[item.group]),
      keywords: ['tecnología technology', item.name, ...(item.label ?? []), ...groups[item.group], ...levels[item.level]].join(' '),
      run: () => { setTechnology(item.name); goTo('habilidades', false); },
    })),
  ];

  function run(command: Command, args: string): TerminalResponse {
    const link = (label: string, id: string) => ({ label, href: '#' + id, run: () => goTo(id, id.startsWith('recruiter')) });
    if (args && command !== 'language') return { text: tr('Este comando se usa sin argumentos.', 'This command takes no arguments.') };
    switch (command) {
      case 'help':
        return {
          text: tr(
            'help — Comandos disponibles\nabout — Perfil profesional\nskills — Competencias y mapa\nprojects — Proyectos seleccionados\nexperience — Experiencia laboral\neducation — Formación y certificados\ncontact — Correo y formulario\ncv — Descargar CV\nclear — Limpiar la salida\nlanguage [es|en] — Cambiar idioma',
            'help — Available commands\nabout — Professional profile\nskills — Skills and map\nprojects — Selected projects\nexperience — Work experience\neducation — Education and certifications\ncontact — Email and contact form\ncv — Download CV\nclear — Clear output\nlanguage [es|en] — Switch language',
          ),
        };
      case 'about':
        return { text: tr(...profile), actions: [link(tr('Ver perfil', 'View profile'), 'sobre-mi')] };
      case 'skills': {
        const stack = Object.entries(groups).filter(([group]) => group !== 'ai').map(([group, label]) => {
          const items = technologies.filter((item) => item.group === group).map((item) => {
            const name = technologyName(item, tr);
            return item.level === 'basic' ? name + ' (' + tr(...levels.basic) + ')' : name;
          });
          return tr(...label) + ' · ' + items.join(', ');
        });
        const ai = aiLevels.map((level) => tr(...levels[level]) + ' · ' + aiSkills.filter((item) => item.level === level).map((item) => technologyName(item, tr)).join(', '));
        return { text: [...stack, '', tr(...groups.ai), ...ai].join('\n'), actions: [link(tr('Abrir mapa', 'Open map'), 'habilidades'), link(tr(...groups.ai), 'ai-skills')] };
      }
      case 'projects':
        return { text: workspaceProjects.map((project) => project.number + ' / ' + tr(...project.title)).join('\n'), actions: [link(tr('Abrir galería', 'Open gallery'), 'proyectos')] };
      case 'experience':
        return { text: milestones.filter((item) => item.kind === 'work').map((item) => item.date + ' · ' + tr(...item.title) + ' · ' + item.organization).join('\n'), actions: [link(tr('Ver experiencia', 'View experience'), 'experiencia')] };
      case 'education':
        return { text: milestones.filter((item) => item.kind === 'education').map((item) => [tr(...item.title), item.organization, item.current ? tr('En curso', 'In progress') : item.date].filter(Boolean).join(' · ')).join('\n'), actions: [link(tr('Ver formación', 'View education'), 'formacion'), link(tr('Ver certificados', 'View certificates'), 'certificaciones')] };
      case 'contact':
        return { text: siteConfig.email, actions: [{ label: tr('Abrir correo', 'Open email'), href: 'mailto:' + siteConfig.email }, link(tr('Abrir formulario', 'Open form'), 'contacto')] };
      case 'cv':
        document.getElementById('header-cv')?.click();
        return { text: siteConfig.cvFilename, actions: [{ label: downloadLabel, href: siteConfig.cvUrl, download: true }] };
      case 'language': {
        if (args && args !== 'es' && args !== 'en') return { text: 'language [es|en]' };
        const next = args || (language === 'es' ? 'en' : 'es');
        switchLanguage(next);
        return { text: next === 'es' ? 'Idioma: español.' : 'Language: English.' };
      }
      case 'clear':
        return { text: '' };
    }
  }

  const dialogTitle = overlay?.type === 'palette' ? tr('Paleta de comandos', 'Command palette')
    : overlay?.type === 'project' ? tr(...overlay.project.title)
    : overlay?.type === 'certificate' ? certificateTitle(overlay.certificate) : '';

  return (
    <>
      <a className="skip-link" href={recruiter ? '#recruiter' : '#contenido'}>{tr('Saltar al contenido', 'Skip to content')}</a>
      <div id="inicio" tabIndex={-1} />
      <header ref={header} className="site-header" onKeyDown={(event) => {
        if (!menuOpen || event.key !== 'Escape') return;
        event.preventDefault();
        setMenuOpen(false);
        menuButton.current?.focus();
      }}>
        <div className="shell header-inner">
          <a href="#inicio" className="brand" onClick={(event) => { event.preventDefault(); goTo('inicio', false); }}>
            <span>SM<span>.</span></span><span className="brand-name">Samuel<br />Melero</span><span className="sr-only"> {tr('Inicio', 'Home')}</span>
          </a>
          <nav id="main-nav" className="main-nav" data-open={menuOpen} aria-label={tr('Navegación principal', 'Main navigation')}>
            {[...links, ...mobileLinks].map((link, index) => {
              const target = recruiter ? link.recruiterId ?? link.id : link.id;
              return <a key={link.id} className={index >= links.length ? 'mobile-nav-link' : undefined} href={'#' + target}
                onClick={(event) => { event.preventDefault(); goTo(target, recruiter && Boolean(link.recruiterId)); }}>{link.name}</a>;
            })}
          </nav>
          <div className="header-actions">
            <button type="button" className="language-button" onClick={() => switchLanguage()} aria-label={tr('EN · Cambiar a inglés', 'ES · Switch to Spanish')}>{language === 'es' ? 'EN' : 'ES'}</button>
            <button type="button" className="search-button" onClick={() => { setMenuOpen(false); setOverlay({ type: 'palette' }); }} aria-haspopup="dialog" aria-keyshortcuts={shortcuts === '⌘ K' ? 'Meta+K' : 'Control+K'}>
              <FiSearch aria-hidden="true" /><span className="sr-only">{tr('Abrir paleta de comandos', 'Open command palette')}{' '}</span><kbd>{shortcuts}</kbd>
            </button>
            <button type="button" className="view-button" aria-pressed={recruiter} onClick={() => goTo(recruiter ? 'inicio' : 'recruiter', !recruiter)}>{recruiter ? workspaceLabel : recruiterLabel}</button>
            <button type="button" ref={menuButton} className="menu-button" aria-expanded={menuOpen} aria-controls="main-nav"
              aria-label={menuOpen ? tr('Cerrar menú', 'Close menu') : tr('Abrir menú', 'Open menu')} onClick={() => {
                setMenuOpen(!menuOpen);
                if (!menuOpen) requestAnimationFrame(() => header.current?.querySelector<HTMLAnchorElement>('#main-nav a')?.focus());
              }}>
              {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
            </button>
            <a id="header-cv" href={siteConfig.cvUrl} download hidden>{downloadLabel}</a>
          </div>
        </div>
      </header>
      <main id="contenido" tabIndex={-1}>
        {recruiter ? <Recruiter tr={tr} open={openProject} openCertificate={openCertificate} certificateTitle={certificateTitle} /> : <>
          <Hero tr={tr} />
          <ProjectGallery tr={tr} open={openProject} />
          <TechnologyMap tr={tr} technology={technology} select={setTechnology} open={openProject} />
          <section className="terminal-panel" id="terminal" tabIndex={-1}>
            <div className="shell terminal-layout">
              <SectionHeading label={tr('Herramienta de navegación', 'Navigation tool')} title={tr('Abre una terminal.', 'Open a terminal.')}>
                <p>{tr('Consulta proyectos, competencias y experiencia desde la línea de comandos.', 'Explore projects, skills and experience from the command line.')}</p>
              </SectionHeading>
              <Terminal tr={tr} execute={run} />
            </div>
          </section>
          <Journey tr={tr} title={certificateTitle} open={openCertificate} />
          <Lab tr={tr} />
        </>}
        <Contact tr={tr} id={recruiter ? 'recruiter-contact' : 'contacto'} />
      </main>
      <footer className="site-footer">
        <div className="shell mono"><span>Samuel Melero</span><a href="#terminal" onClick={(event) => { event.preventDefault(); goTo('terminal', false); }}>Terminal</a><a href={recruiter ? '#recruiter' : '#inicio'}>{tr('Volver arriba', 'Back to top')}</a></div>
      </footer>
      {overlay && <WorkspaceDialog key={overlay.type} title={dialogTitle} closeLabel={closeLabel} close={close} kind={overlay.type === 'palette' ? 'palette' : undefined}>
        {overlay.type === 'palette' && <CommandPalette items={paletteItems} tr={tr} />}
        {overlay.type === 'project' && <ProjectDetail key={overlay.project.id} project={overlay.project} tr={tr} />}
        {overlay.type === 'certificate' && <figure className="certificate-detail">
          {overlay.certificate.image && <img src={overlay.certificate.image} alt={dialogTitle} decoding="async" />}
          <figcaption>{overlay.certificate.issuer} · {overlay.certificate.date.slice(0, 4)}</figcaption>
        </figure>}
      </WorkspaceDialog>}
    </>
  );
}
