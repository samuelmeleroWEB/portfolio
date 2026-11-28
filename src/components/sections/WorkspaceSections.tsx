import { useId, useState } from 'react';
import type { PointerEvent, ReactNode } from 'react';
import { FiArrowUpRight, FiCopy, FiDownload, FiGithub, FiLinkedin, FiPlus } from 'react-icons/fi';
import { SiFastapi, SiOpenai, SiPytest, SiPython, SiReact, SiSqlalchemy, SiSqlite, SiTypescript, SiVite, SiVitest } from 'react-icons/si';
import type { IconType } from 'react-icons';
import { siteConfig } from '../../data/config';
import { certifications } from '../../data/certifications';
import { aiLevels, aiSkills, groups, levels, milestones, profile, relations, technologies, technologyName, workspaceProjects } from '../../data/workspace';
import type { ProjectScreenshot, Translate, WorkspaceProject } from '../../data/workspace';
import { labDemos } from '../../data/lab';
import portrait from '../../assets/images/projects/imgprofile.webp';
import playwrightLogo from '../../assets/images/playwright.svg';
import calendarGallery from '../../assets/images/projects/calendar-gallery.webp';
import calendarGallerySmall from '../../assets/images/projects/calendar-gallery-640.webp';
import portfolioGallery from '../../assets/images/projects/imgporfolio-gallery.webp';
import portfolioGallerySmall from '../../assets/images/projects/imgporfolio-gallery-640.webp';
import restaurantGallery from '../../assets/images/projects/restaurant-gallery.webp';
import restaurantGallerySmall from '../../assets/images/projects/restaurant-gallery-640.webp';
import weatherGallery from '../../assets/images/projects/weather-gallery.webp';
import weatherGallerySmall from '../../assets/images/projects/weather-gallery-640.webp';
import { ContactForm } from './WorkspaceContact';
import { ProjectMedia } from '../ui/ProjectMedia';
import type { GallerySlide } from '../ui/ProjectMedia';

export function ExternalLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
}

export function SectionHeading({ label, title, children }: { label: string; title: string; children?: ReactNode }) {
  return <div className="section-heading">
    <p className="eyebrow"><span aria-hidden="true">+</span> {label}</p>
    <div><h2>{title}</h2>{children}</div>
  </div>;
}

export function Hero({ tr }: { tr: Translate }) {
  function move(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse' || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--cursor-x', ((event.clientX - box.left) / box.width * 100).toFixed(2) + '%');
    event.currentTarget.style.setProperty('--cursor-y', ((event.clientY - box.top) / box.height * 100).toFixed(2) + '%');
  }

  return (
    <section className="hero shell" id="hero" tabIndex={-1} aria-labelledby="hero-name">
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow hero-label"><span aria-hidden="true">+</span> {tr('Espacio de desarrollo interactivo', 'Interactive Developer Workspace')}</div>
          <h1 id="hero-name">Samuel <span>Melero<span className="hero-period">.</span></span></h1>
          <div className="hero-description">
            <p className="hero-role">Full Stack Developer</p>
            <p>{tr('Desarrollo de software asistido por IA y formación en ciberseguridad.', 'AI-assisted software development and cybersecurity studies.')}</p>
          </div>
          <div className="hero-actions">
            <a className="button button-accent" href="#proyectos">{tr('Explorar proyectos', 'Explore projects')}</a>
            <a className="button button-line" href={siteConfig.cvUrl} download>{tr('Descargar CV', 'Download CV')}<FiDownload aria-hidden="true" /></a>
            <div className="hero-socials">
              <ExternalLink className="icon-link" href={siteConfig.github}><FiGithub aria-hidden="true" /><span className="sr-only">GitHub</span></ExternalLink>
              <ExternalLink className="icon-link" href={siteConfig.linkedin}><FiLinkedin aria-hidden="true" /><span className="sr-only">LinkedIn</span></ExternalLink>
            </div>
          </div>
        </div>
        <figure className="hero-portrait" onPointerMove={move}>
          <div className="portrait-surface">
            <span className="portrait-cross portrait-cross-top" aria-hidden="true">+</span>
            <span className="portrait-cross portrait-cross-bottom" aria-hidden="true">+</span>
            <span className="portrait-orbit" aria-hidden="true" />
            <div className="portrait-window">
              <img src={portrait} width="573" height="762" fetchPriority="high" alt={tr('Retrato de Samuel Melero', 'Portrait of Samuel Melero')} />
            </div>
            <span className="portrait-tracker" aria-hidden="true" />
          </div>
          <figcaption className="mono">{tr('RETRATO / SAMUEL MELERO', 'PORTRAIT / SAMUEL MELERO')}</figcaption>
        </figure>
      </div>
      <div className="hero-footer mono">
        <a href="#proyectos">{tr('Proyectos', 'Projects')}</a>
        <span>REACT / TYPESCRIPT / NODE.JS</span>
      </div>
    </section>
  );
}

const galleryImages: Record<string, readonly [string, string]> = {
  p4: [calendarGallery, calendarGallerySmall],
  p1: [weatherGallery, weatherGallerySmall],
  p2: [restaurantGallery, restaurantGallerySmall],
  p6: [portfolioGallery, portfolioGallerySmall],
};

const galleryAlternates: Record<string, readonly [string, string]> = {
  p4: ['Resumen de actividad y productividad', 'Activity and productivity overview'],
  p1: ['Previsión de Madrid en un día soleado', 'Madrid forecast on a sunny day'],
};

function projectSlides(project: WorkspaceProject, tr: Translate): [GallerySlide, ...GallerySlide[]] {
  const localize = ({ images, thumbnails, cardImage, width, height, caption, video }: ProjectScreenshot): GallerySlide => {
    const src = tr(...images);
    return {
      src, width, height, video, cardImage, alt: tr(...caption),
      srcSet: thumbnails && `${tr(...thumbnails)} 640w, ${src} ${width}w`,
    };
  };

  if (project.gallery) {
    const [cover, ...screenshots] = project.gallery;
    return [localize(cover), ...screenshots.map(localize)];
  }

  const featured = project.featured;
  if (featured) {
    const { cover, screenshots, galleryLead = cover } = featured;
    return [localize(galleryLead), ...[cover, ...screenshots].filter((item) => item !== galleryLead).map(localize)];
  }

  const [src, small] = galleryImages[project.id];
  const slides: [GallerySlide, ...GallerySlide[]] = [{
    src, srcSet: `${small} 640w, ${src} 1920w`, width: 1920, height: 1080,
    video: project.galleryVideo,
    alt: tr('Vista de ', 'Preview of ') + tr(...project.title),
  }];
  const alternate = galleryAlternates[project.id];
  if (alternate && project.preview?.src) {
    slides.push({ ...project.preview, src: project.preview.src, alt: tr(...alternate) });
  }
  return slides;
}

export function ProjectGallery({ tr, open }: { tr: Translate; open: (project: WorkspaceProject) => void }) {
  const exhibit = (project: WorkspaceProject) => {
    const featured = project.featured;
    const title = tr(...project.title);

    return <article key={project.id} className={featured ? 'gallery-project gallery-featured' : 'gallery-project'} aria-labelledby={`title-${project.id}`}>
      <ProjectMedia slides={projectSlides(project, tr)} title={title} tr={tr}
        sizes={featured ? '(min-width: 1600px) 820px, (min-width: 900px) 53vw, 90vw' : '(min-width: 1600px) 700px, (min-width: 720px) 43.5vw, 90vw'} />
      <div className="gallery-details">
        <p className="gallery-status mono">{projectStatus(project, tr)}</p>
        <h3 id={`title-${project.id}`}>{title}</h3>
        <p>{tr(...project.problem)}</p>
        <ul className="gallery-stack mono" aria-label={tr('Tecnologías', 'Technologies')}>
          {project.stack.map((tool) => <li key={tool}>{tool}</li>)}
        </ul>
        <div className="gallery-actions">
          {project.demoUrl && project.demoUrl !== '#' && <ExternalLink href={project.demoUrl} className={featured ? 'button button-accent' : 'button gallery-demo'}>
            {featured ? tr('Probar demo', 'Try demo') : <>Demo<FiArrowUpRight aria-hidden="true" /></>}
          </ExternalLink>}
          {project.githubUrl && <ExternalLink href={project.githubUrl} className="button button-line"><FiGithub aria-hidden="true" />GitHub</ExternalLink>}
          <button type="button" className="button gallery-detail" aria-haspopup="dialog" onClick={() => open(project)}>{tr('Detalles', 'Details')}<FiPlus aria-hidden="true" /></button>
        </div>
        {featured && <p className="project-demo-note">{tr(...featured.demoNote)}</p>}
      </div>
    </article>;
  };

  return (
    <section id="proyectos" className="projects-panel" tabIndex={-1} aria-labelledby="projects-heading">
      <div className="shell">
        <header className="gallery-heading">
          <h2 id="projects-heading">{tr('Proyectos', 'Projects')}<span>.</span></h2>
          <p>{tr('Aplicaciones web, desde la interfaz hasta los datos.', 'Web applications, from interface to data.')}</p>
        </header>
        <div className="gallery">{workspaceProjects.map(exhibit)}</div>
      </div>
    </section>
  );
}

export function projectStatus(project: WorkspaceProject, tr: Translate) {
  if (project.featured) return tr('Proyecto destacado', 'Featured project');
  if (project.badgeType === 'warning') return tr('En desarrollo', 'In development');
  if (project.badgeType === 'info') return tr('En mejora', 'Being improved');
  return tr('Demo publicada', 'Published demo');
}

const technologyIcons: Partial<Record<string, IconType>> = {
  React: SiReact, TypeScript: SiTypescript, Vite: SiVite, Python: SiPython, FastAPI: SiFastapi,
  SQLAlchemy: SiSqlalchemy, SQLite: SiSqlite, 'OpenAI API': SiOpenai, Vitest: SiVitest, pytest: SiPytest,
};

function TechnologyLabel({ name, label = name }: { name: string; label?: string }) {
  const Icon = technologyIcons[name];
  return <>{name === 'Playwright' && <img className="technology-icon" src={playwrightLogo} alt="" />}{Icon && <Icon className="technology-icon" aria-hidden="true" />}{label}</>;
}

export function ProjectDetail({ project, tr }: { project: WorkspaceProject; tr: Translate }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const node = project.architecture?.[active];
  const featured = project.featured;

  return <article className="project-detail">
    <dl className="detail-meta">
      <div><dt>{tr('Estado', 'Status')}</dt><dd>{projectStatus(project, tr)}</dd></div>
      {featured ? Object.entries(groups).map(([group, label]) => {
        const items = technologies.filter((item) => item.group === group && project.stack.includes(item.name));
        if (!items.length) return null;
        return <div className="detail-stack" key={group}>
          <dt>{group === 'tools' ? tr('Pruebas', 'Testing') : tr(...label)}</dt>
          <dd>{items.map((item) => <span key={item.name}><TechnologyLabel name={item.name} label={technologyName(item, tr)} /></span>)}</dd>
        </div>;
      }) : <div><dt>Stack</dt><dd>{project.stack.join(' / ')}</dd></div>}
    </dl>
    {featured ? <figure className="detail-screen">
      <img src={tr(...featured.cover.images)} width={featured.cover.width} height={featured.cover.height} alt={tr(...featured.cover.caption)} decoding="async" />
    </figure> : <figure className="detail-screen">
      <img {...project.preview} sizes="(min-width: 850px) 780px, 90vw" alt={tr('Vista de ', 'Preview of ') + tr(...project.title)} decoding="async" />
      <figcaption>{tr(...project.title)}</figcaption>
    </figure>}
    <h3>{featured ? tr('Descripción', 'Overview') : tr('Problema', 'Problem')}</h3><p>{tr(...project.problem)}</p>
    <h3>{project.badgeType === 'warning' ? tr('Alcance documentado', 'Documented scope') : tr('Funcionalidades', 'Features')}</h3>
    <ul className="feature-list">{project.features.map((feature) => <li key={feature[0]}>{tr(...feature)}</li>)}</ul>
    {featured && <>
      <p>{tr(...featured.tests)}</p>
      <div className="featured-screenshots">
        {featured.screenshots.map(({ images, caption, width, height }) => <figure className="detail-screen" key={images[0]}>
          <img src={tr(...images)} width={width} height={height} alt={tr(...caption)} loading="lazy" decoding="async" />
          <figcaption>{tr(...caption)}</figcaption>
        </figure>)}
      </div>
    </>}
    {project.architecture && node && <>
      <h3>{tr('Arquitectura', 'Architecture')}</h3>
      <ol className="architecture" aria-label={tr('Capas de arquitectura', 'Architecture layers')}>
        {project.architecture.map((layer, index) => {
          const name = typeof layer.name === 'string' ? layer.name : tr(...layer.name);
          return <li key={index}><button type="button" aria-pressed={index === active} aria-controls={id} onClick={() => setActive(index)}>{name}</button></li>;
        })}
      </ol>
      <p id={id} className="architecture-note" aria-live="polite">{tr(...node.detail)}</p>
    </>}
    <div className="detail-links">
      {project.demoUrl && project.demoUrl !== '#' && <ExternalLink className="button button-accent" href={project.demoUrl}>
        {featured ? tr('Probar demo', 'Try demo') : tr('Abrir demo', 'Open demo')}
      </ExternalLink>}
      {project.githubUrl && <ExternalLink className="button button-line" href={project.githubUrl}><FiGithub aria-hidden="true" /> GitHub</ExternalLink>}
    </div>
    {featured && <p className="project-demo-note">{tr(...featured.demoNote)}</p>}
  </article>;
}

const coordinates: Record<keyof typeof groups, [number, number]> = {
  frontend: [16, 25], backend: [50, 25], data: [84, 25], tools: [16, 75], ai: [50, 75], security: [84, 75],
};

export function TechnologyMap({ tr, technology, select, open }: {
  tr: Translate;
  technology: string;
  select: (name: string) => void;
  open: (project: WorkspaceProject) => void;
}) {
  const selected = technologies.find((item) => item.name === technology) ?? technologies[0];
  const related = workspaceProjects.filter((project) => project.stack.includes(selected.name) || selected.projectIds?.includes(project.id));

  return (
    <section id="habilidades" className="tech-panel shell" tabIndex={-1}>
      <SectionHeading label={tr('Mapa tecnológico', 'Technology map')} title={tr('Cómo conecto las piezas.', 'How the pieces connect.')} />
      <div className="technology-layout">
        <div className="tech-browser">
          <div className="tech-map" role="group" aria-label={tr('Áreas tecnológicas', 'Technology areas')}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              {relations.map(([a, b]) => <line key={a + b} x1={coordinates[a][0]} y1={coordinates[a][1]} x2={coordinates[b][0]} y2={coordinates[b][1]} className={selected.group === a || selected.group === b ? 'active' : undefined} />)}
            </svg>
            {Object.entries(groups).map(([key, label]) => {
              const group = key as keyof typeof groups;
              return <button type="button" key={key} onClick={() => select((technologies.find((item) => item.group === group) ?? selected).name)} aria-pressed={selected.group === group}><span aria-hidden="true" />{tr(...label)}</button>;
            })}
          </div>
          <div className="tech-options" role="group" aria-label={tr(...groups[selected.group])}>
            {technologies.filter((item) => item.group === selected.group).map((item) => <button type="button" key={item.name} aria-pressed={item.name === selected.name} onClick={() => select(item.name)}><TechnologyLabel name={item.name} label={technologyName(item, tr)} /></button>)}
          </div>
        </div>
        <article className="tech-inspector">
          <div aria-live="polite">
            <p className="eyebrow"><span aria-hidden="true">+</span> {tr(...groups[selected.group])}</p>
            <h3>{technologyName(selected, tr)}</h3>
            <p className={'skill-level level-' + selected.level}>{tr(...levels[selected.level])}</p>
            <p>{tr(...selected.detail)}</p>
          </div>
          {!!related.length && <div className="tech-projects"><h4>{tr('En proyectos', 'Used in projects')}</h4>{related.map((project) => <button key={project.id} type="button" onClick={() => open(project)}>{tr(...project.title)}<FiPlus aria-hidden="true" /></button>)}</div>}
        </article>
      </div>
      <section className="ai-skills" id="ai-skills" aria-labelledby="ai-skills-title" tabIndex={-1}>
        <h3 id="ai-skills-title">{tr(...groups.ai)}</h3>
        {aiLevels.map((level) => <div key={level}>
          <h4 className="mono">{tr(...levels[level])}</h4>
          <ul>{aiSkills.filter((item) => item.level === level).map((item) => <li key={item.name}>{technologyName(item, tr)}</li>)}</ul>
        </div>)}
      </section>
    </section>
  );
}

type Cert = (typeof certifications)[number];
type LocalizeCert = (certificate: Cert) => string;
type TrajectoryFilter = 'work' | 'education';

export function Timeline({ tr, filter, recruiter = false }: { tr: Translate; filter: TrajectoryFilter; recruiter?: boolean }) {
  const Heading = recruiter ? 'h3' : 'h4';
  return <ol className="timeline">
    {milestones.filter((item) => item.kind === filter).map((item) => <li key={item.id} id={(recruiter ? 'recruiter-' : '') + item.id} tabIndex={-1} className={item.current ? 'timeline-current' : undefined}>
      <span className="timeline-date mono">{item.current ? tr('En curso', 'In progress') : item.date}</span>
      <div><Heading>{tr(...item.title)}</Heading>{item.organization && <p className="timeline-org mono">{item.organization}</p>}{item.detail && <p>{tr(...item.detail)}</p>}</div>
    </li>)}
  </ol>;
}

export function CertificateList({ tr, title, open, id = 'certificaciones' }: { tr: Translate; title: LocalizeCert; open: (certificate: Cert) => void; id?: string }) {
  const Heading = id === 'certificaciones' ? 'h3' : 'h2';
  return <div className="certifications" id={id} tabIndex={-1}>
    <Heading>{tr('Certificaciones', 'Certifications')}</Heading>
    <ul>{[...certifications].sort((a, b) => b.date.localeCompare(a.date)).map((certificate) => (
      <li key={certificate.id}><button type="button" onClick={() => open(certificate)}>
        <span className="mono">{certificate.date.slice(0, 4)}</span>
        <span>{title(certificate)}<small>{certificate.issuer}</small></span>
        <FiPlus aria-hidden="true" />
      </button></li>
    ))}</ul>
  </div>;
}

export function Journey({ tr, title, open }: { tr: Translate; title: LocalizeCert; open: (certificate: Cert) => void }) {
  return <section className="journey-panel shell" id="trayectoria" tabIndex={-1}>
    <div className="section-heading"><h2>{tr('Experiencia y formación', 'Experience and education')}</h2></div>
    <p className="journey-profile" id="sobre-mi" tabIndex={-1}>{tr(...profile)}</p>
    <div className="journey-layout">
      <section className="journey-group" id="experiencia" tabIndex={-1}>
        <h3>{tr('Experiencia profesional', 'Professional experience')}</h3>
        <Timeline tr={tr} filter="work" />
      </section>
      <section className="journey-group" id="formacion" tabIndex={-1}>
        <h3>{tr('Formación académica', 'Education')}</h3>
        <Timeline tr={tr} filter="education" />
      </section>
      <CertificateList tr={tr} title={title} open={open} />
    </div>
  </section>;
}

export function Recruiter({ tr, open, openCertificate, certificateTitle }: {
  tr: Translate;
  open: (project: WorkspaceProject) => void;
  openCertificate: (certificate: Cert) => void;
  certificateTitle: LocalizeCert;
}) {
  return <div className="recruiter shell" id="recruiter" tabIndex={-1}>
    <p className="eyebrow"><span aria-hidden="true">+</span> {tr('Modo reclutador', 'Recruiter mode')}</p>
    <h1>Samuel Melero</h1>
    <p className="hero-role">Full Stack Developer</p>
    <p className="recruiter-profile" id="recruiter-profile" tabIndex={-1}>{tr(...profile)}</p>
    <div className="detail-links">
      <a className="button button-accent" href={siteConfig.cvUrl} download>{tr('Descargar CV', 'Download CV')}<FiDownload aria-hidden="true" /></a>
      <a className="button button-line" href={'mailto:' + siteConfig.email}>{tr('Enviar correo', 'Email Samuel')}</a>
      <ExternalLink className="button button-line" href={siteConfig.linkedin}>LinkedIn</ExternalLink>
      <ExternalLink className="button button-line" href={siteConfig.github}>GitHub</ExternalLink>
    </div>
    <nav className="recruiter-index mono" aria-label={tr('Índice del perfil', 'Profile index')}>
      <a href="#recruiter-experience">{tr('Experiencia', 'Experience')}</a>
      <a href="#recruiter-education">{tr('Formación', 'Education')}</a>
      <a href="#recruiter-certificates">{tr('Certificaciones', 'Certifications')}</a>
      <a href="#recruiter-skills">{tr('Competencias', 'Skills')}</a>
      <a href="#recruiter-ai">{tr(...groups.ai)}</a>
      <a href="#recruiter-projects">{tr('Proyectos', 'Projects')}</a>
      <a href="#recruiter-contact">{tr('Contacto', 'Contact')}</a>
    </nav>
    <div className="recruiter-layout">
      <section id="recruiter-experience" tabIndex={-1}><h2>{tr('Experiencia profesional', 'Professional experience')}</h2><Timeline tr={tr} filter="work" recruiter /></section>
      <section id="recruiter-skills" tabIndex={-1}><h2>{tr('Competencias', 'Skills')}</h2>
        <dl className="recruiter-skills">{Object.entries(groups).filter(([group]) => group !== 'ai').map(([group, label]) => <div key={group}><dt>{tr(...label)}</dt><dd>{technologies.filter((item) => item.group === group).map((item) => technologyName(item, tr) + (item.level !== 'acquired' ? ' (' + tr(...levels[item.level]) + ')' : '')).join(', ')}</dd></div>)}</dl>
      </section>
      <section id="recruiter-education" tabIndex={-1}><h2>{tr('Formación académica', 'Education')}</h2><Timeline tr={tr} filter="education" recruiter /></section>
      <section id="recruiter-ai" tabIndex={-1}><h2>{tr(...groups.ai)}</h2>
        <dl className="recruiter-skills">{aiLevels.map((level) => <div key={level}>
          <dt>{tr(...levels[level])}</dt>
          <dd>{aiSkills.filter((item) => item.level === level).map((item) => technologyName(item, tr)).join(', ')}</dd>
        </div>)}</dl>
      </section>
      <CertificateList tr={tr} title={certificateTitle} open={openCertificate} id="recruiter-certificates" />
      <section id="recruiter-projects" tabIndex={-1}><h2>{tr('Proyectos destacados', 'Selected projects')}</h2>
        <ol className="recruiter-projects">{workspaceProjects.slice(0, 5).map((project) => <li key={project.id}><button type="button" onClick={() => open(project)}>{tr(...project.title)}<FiPlus aria-hidden="true" /></button><p>{tr(...project.problem)}</p></li>)}</ol>
      </section>
    </div>
  </div>;
}

export function Lab({ tr }: { tr: Translate }) {
  if (!labDemos.length) return null;
  return <section id="ai-lab" className="shell lab-panel" tabIndex={-1}>
    <SectionHeading label={tr('Demostraciones', 'Demos')} title="AI Lab" />
    <ul className="lab-list">{labDemos.map((demo) => <li key={demo.id}><h3><ExternalLink href={demo.url}>{demo.title}</ExternalLink></h3><p>{tr(...demo.description)}</p></li>)}</ul>
  </section>;
}

export function Contact({ tr, id }: { tr: Translate; id: string }) {
  const [copyStatus, setCopyStatus] = useState<'copied' | 'failed'>();

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('failed');
    }
  }

  return <section className="contact-panel" id={id} tabIndex={-1}>
    <div className="shell contact-layout">
      <div>
        <p className="eyebrow"><span aria-hidden="true">+</span> {tr('Contacto', 'Contact')}</p>
        <h2>{tr('¿Hablamos?', 'Let’s talk.')}</h2>
        <div className="contact-address">
          <a className="contact-email" href={'mailto:' + siteConfig.email}>{siteConfig.email}</a>
          <button className="contact-copy" type="button" aria-label={tr('Copiar correo', 'Copy email')} onClick={() => { void copyEmail(); }}><FiCopy aria-hidden="true" /></button>
        </div>
        <p className="contact-copy-status" role="status">{copyStatus === 'copied' ? tr('Correo copiado.', 'Email copied.') : copyStatus === 'failed' ? tr('Mantén pulsada la dirección para copiarla.', 'Select the address to copy it.') : ''}</p>
        <div className="contact-socials mono"><ExternalLink href={siteConfig.github}><FiGithub aria-hidden="true" /> GitHub</ExternalLink><ExternalLink href={siteConfig.linkedin}><FiLinkedin aria-hidden="true" /> LinkedIn</ExternalLink></div>
      </div>
      <ContactForm tr={tr} />
    </div>
  </section>;
}
