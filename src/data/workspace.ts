import { projects } from './projects';
import { skills } from './skills';
import weatherSmall from '../assets/images/projects/weather-640.webp';
import restaurantSmall from '../assets/images/projects/restaurant-640.webp';
import cinemaSmall from '../assets/images/projects/cinema-640.webp';
import calendarSmall from '../assets/images/projects/calendar-640.webp';
import organizatorSmall from '../assets/images/projects/organizatorimg-640.webp';
import portfolioSmall from '../assets/images/projects/imgporfolio-640.webp';
import agentflowWorkflowEs from '../assets/images/projects/agentflow-es-workflow-1600.webp';
import agentflowWorkflowEn from '../assets/images/projects/agentflow-en-workflow-1600.webp';
import agentflowWorkflowSmallEs from '../assets/images/projects/agentflow-es-workflow-640.webp';
import agentflowWorkflowSmallEn from '../assets/images/projects/agentflow-en-workflow-640.webp';
import agentflowKnowledgeEs from '../assets/images/projects/agentflow-es-knowledge-1280.webp';
import agentflowKnowledgeEn from '../assets/images/projects/agentflow-en-knowledge-1280.webp';
import agentflowTraceEs from '../assets/images/projects/agentflow-es-trace-1280.webp';
import agentflowTraceEn from '../assets/images/projects/agentflow-en-trace-1280.webp';

export type Translate = (es: string, en: string) => string;
type Copy = readonly [string, string];
type ArchitectureNode = { name: string | Copy; detail: Copy };
type ProjectScreenshot = { images: Copy; thumbnails?: Copy; caption: Copy; width: number; height: number };

const projectFacts: Record<string, { title: Copy; problem: Copy; features: Copy[]; architecture?: ArchitectureNode[] }> = {
  p3: {
    title: ['Cineverse', 'Cineverse'],
    problem: ['Centralizar la gestión de un cine, desde la programación de sesiones hasta las reservas de entradas.', 'Centralize cinema operations, from screening schedules to ticket reservations.'],
    features: [
      ['Administración de películas, salas, sesiones y usuarios.', 'Management of films, screens, screenings and users.'],
      ['Reservas de entradas.', 'Ticket reservations.'],
      ['Autenticación JWT y permisos de administrador y usuario.', 'JWT authentication and admin/user permissions.'],
    ],
    architecture: [
      { name: 'React · TypeScript', detail: ['Interfaz web para el catálogo, las reservas y la administración.', 'Web interface for the catalog, bookings and administration.'] },
      { name: 'Node.js · Express', detail: ['API REST con autenticación JWT y autorización por roles.', 'REST API with JWT authentication and role-based authorization.'] },
      { name: 'MongoDB', detail: ['Base de datos de la aplicación.', 'Application database.'] },
    ],
  },
  p5: {
    title: ['Organizator', 'Organizator'],
    problem: ['Reunir tareas y recordatorios personales en una vista de planificación semanal.', 'Bring personal tasks and reminders into one weekly planning view.'],
    features: [['Organización por categorías.', 'Category-based organization.'], ['Recordatorios y vista semanal.', 'Reminders and weekly view.']],
  },
  p4: {
    title: ['Reminder Calendar', 'Reminder Calendar'],
    problem: ['Organizar la jornada a partir de las tareas pendientes, sus prioridades y el tiempo disponible.', 'Plan the day around pending tasks, priorities and available time.'],
    features: [['Tareas, bloques horarios y prioridades.', 'Tasks, time blocks and priorities.'], ['Planificación automatizada según disponibilidad.', 'Automated planning based on availability.']],
    architecture: [
      { name: 'Angular · TypeScript', detail: ['Interfaz de tareas, horarios y prioridades.', 'Interface for tasks, schedules and priorities.'] },
      { name: ['Planificación', 'Scheduling'], detail: ['Lógica de generación de tareas según la disponibilidad del usuario.', 'Task generation logic based on user availability.'] },
    ],
  },
  p1: {
    title: ['Weather App', 'Weather App'],
    problem: ['Consultar el tiempo local y la previsión de la semana en una sola interfaz.', 'Check local weather and the weekly forecast in one interface.'],
    features: [['Geolocalización y previsión de siete días.', 'Geolocation and seven-day forecast.'], ['Datos meteorológicos de APIs externas.', 'Weather data from external APIs.']],
    architecture: [
      { name: 'React · TypeScript', detail: ['Interfaz responsive que muestra los datos de la previsión.', 'Responsive interface that renders forecast data.'] },
      { name: 'API REST', detail: ['Consulta de datos meteorológicos en servicios externos.', 'Weather data is fetched from external services.'] },
    ],
  },
  p2: {
    title: ['Restaurant Manager', 'Restaurant Manager'],
    problem: ['Centralizar la gestión de mesas, pedidos y carta en un restaurante.', 'Centralize table, order and menu management for a restaurant.'],
    features: [['Ámbito del proyecto en desarrollo: mesas, pedidos y carta.', 'Scope of the work in progress: tables, orders and menus.']],
  },
  p6: {
    title: ['Portfolio personal', 'Personal portfolio'],
    problem: ['Dar acceso a mi trabajo, trayectoria y datos de contacto desde un mismo sitio.', 'Provide a single place for my work, background and contact details.'],
    features: [['Contenido en español e inglés, navegación por secciones y descarga del CV.', 'Spanish and English content, section navigation and a CV download.']],
  },
};

const previews = {
  p3: [cinemaSmall, 1440, 598],
  p5: [organizatorSmall, 994, 967],
  p4: [calendarSmall, 1440, 769],
  p1: [weatherSmall, 1440, 736],
  p2: [restaurantSmall, 1440, 960],
  p6: [portfolioSmall, 1440, 870],
} as const;

const projectOrder = ['p3', 'p5', 'p4', 'p1', 'p2', 'p6'] as const;

const otherProjects = projectOrder.map((id, index) => {
  const project = projects.find((item) => item.id === id)!;
  const [small, width, height] = previews[id];
  return {
    ...project,
    ...projectFacts[id],
    number: String(index + 1).padStart(2, '0'),
    preview: { src: project.image, srcSet: `${small} 640w, ${project.image} ${width}w`, width, height },
  };
});
export type WorkspaceProject = Omit<(typeof otherProjects)[number], 'description' | 'preview'> & {
  preview?: (typeof otherProjects)[number]['preview'];
  featured?: {
    cover: ProjectScreenshot;
    screenshots: ProjectScreenshot[];
    demoNote: Copy;
    tests: Copy;
  };
};

export const workspaceProjects: WorkspaceProject[] = [
  {
    id: 'agentflow-ai',
    number: '00',
    title: ['AgentFlow AI', 'AgentFlow AI'],
    problem: [
      'Plataforma de automatización empresarial con agentes de IA, flujos visuales y gestión documental. Permite coordinar tareas y revisar decisiones antes de aprobarlas.',
      'A business automation platform with AI agents, visual workflows, and document management. It coordinates tasks and lets people review decisions before approving them.',
    ],
    stack: ['React', 'TypeScript', 'Vite', 'React Flow', 'FastAPI', 'SQLAlchemy', 'Alembic', 'SQLite', 'LangGraph', 'RAG', 'MCP'],
    demoUrl: 'https://agentflow-ai-demo-fiea.onrender.com/demo',
    features: [
      ['Editor visual con pasos de agente, herramientas, condiciones y aprobaciones humanas.', 'Visual editor with agent steps, tools, conditions, and human approvals.'],
      ['Diseño de agentes y biblioteca documental con búsqueda semántica y citas de las fuentes.', 'Agent design and a document library with semantic search and source citations.'],
      ['Automatización de flujos mediante una cola persistente e historial con estados por paso y resultados de herramientas.', 'Workflow automation backed by a persistent queue, with a run history that records step status and tool results.'],
    ],
    featured: {
      cover: {
        images: [agentflowWorkflowEs, agentflowWorkflowEn],
        thumbnails: [agentflowWorkflowSmallEs, agentflowWorkflowSmallEn],
        caption: ['Editor visual de flujos con nodos y ramas', 'Visual workflow editor with nodes and branches'],
        width: 1600,
        height: 900,
      },
      screenshots: [
        { images: [agentflowKnowledgeEs, agentflowKnowledgeEn], caption: ['Biblioteca documental con búsqueda y visor de extractos', 'Document library with search and a passage viewer'], width: 1280, height: 720 },
        { images: [agentflowTraceEs, agentflowTraceEn], caption: ['Historial de una devolución con consulta documental y aprobación humana', 'Return workflow history with document lookup and human approval'], width: 1280, height: 720 },
      ],
      demoNote: ['La demo utiliza ejecuciones simuladas.', 'The demo uses simulated runs.'],
      tests: ['Backend · 76 pruebas y 26 subpruebas superadas.', 'Backend · 76 tests and 26 subtests passed.'],
    },
  },
  ...otherProjects,
];

type Group = 'frontend' | 'backend' | 'data' | 'tools' | 'ai' | 'security';
type Level = 'acquired' | 'basic' | 'learning' | 'practice' | 'interest';

export const groups: Record<Group, Copy> = {
  frontend: ['Frontend', 'Frontend'],
  backend: ['Backend', 'Backend'],
  data: ['Bases de datos', 'Databases'],
  tools: ['Herramientas', 'Tools'],
  ai: ['Inteligencia artificial', 'Artificial intelligence'],
  security: ['Ciberseguridad', 'Cybersecurity'],
};

export const levels: Record<Level, Copy> = {
  acquired: ['Adquirido', 'Acquired'],
  basic: ['Básico', 'Basic'],
  learning: ['En formación', 'Learning'],
  practice: ['Práctica actual', 'Current practice'],
  interest: ['Especialización e interés técnico', 'Specialization interests'],
};

export const relations: [keyof typeof groups, keyof typeof groups][] = [
  ['frontend', 'backend'], ['backend', 'data'], ['backend', 'ai'], ['backend', 'security'], ['frontend', 'tools'], ['tools', 'security'],
];

const skillNotes: Record<string, Copy> = {
  React: ['Interfaces basadas en componentes y hooks.', 'Component-based interfaces and hooks.'],
  Angular: ['Aplicaciones web con RxJS y Signals.', 'Web applications using RxJS and Signals.'],
  JavaScript: ['Lógica de interfaz, DOM y código asíncrono.', 'Interface logic, the DOM and asynchronous code.'],
  TypeScript: ['Interfaces y tipado estático para JavaScript.', 'Interfaces and static typing for JavaScript.'],
  'Next.js': ['Framework de React con App Router y renderizado en servidor.', 'React framework with the App Router and server rendering.'],
  HTML5: ['Estructura semántica y accesibilidad.', 'Semantic structure and accessibility.'],
  CSS3: ['Composición con Grid y Flexbox y animación CSS.', 'Layout with Grid and Flexbox, and CSS animation.'],
  'Tailwind CSS': ['Estilos de interfaz mediante clases utilitarias.', 'Interface styling with utility classes.'],
  Bootstrap: ['Componentes de interfaz y diseño responsive.', 'UI components and responsive layout.'],
  SCSS: ['Variables, mixins y reglas anidadas.', 'Variables, mixins and nested rules.'],
  'Web Components': ['Elementos personalizados y Shadow DOM.', 'Custom elements and Shadow DOM.'],
  'Node.js': ['Servicios de backend con Express y APIs REST.', 'Backend services using Express and REST APIs.'],
  MongoDB: ['Bases de datos documentales y Mongoose.', 'Document databases and Mongoose.'],
  MySQL: ['Bases de datos relacionales y consultas SQL.', 'Relational databases and SQL queries.'],
  Git: ['Control de versiones y colaboración.', 'Version control and collaboration.'],
  GitFlow: ['Organización del trabajo con ramas.', 'Organizing work with branches.'],
  'GitHub / GitLab': ['Almacenamiento de repositorios y colaboración.', 'Repository hosting and collaboration.'],
  Jira: ['Seguimiento de tareas y gestión ágil.', 'Issue tracking and agile project management.'],
  Postman: ['Pruebas y diagnóstico de APIs REST.', 'Testing and debugging REST APIs.'],
  'VS Code': ['Editor de código.', 'Code editor.'],
  npm: ['Gestión de paquetes JavaScript.', 'JavaScript package management.'],
};

type Technology = { name: string; label?: Copy; group: Group; level: Level; detail: Copy; projectIds?: string[] };
export const technologyName = (item: Technology, tr: Translate) => item.label ? tr(...item.label) : item.name;

export const technologies: Technology[] = [
  ...skills.map<Technology>(({ name, category }) => ({
    name,
    group: ['MongoDB', 'MySQL'].includes(name) ? 'data' : category === 'Frontend' ? 'frontend' : category === 'Backend' ? 'backend' : 'tools',
    level: 'acquired',
    detail: skillNotes[name],
  })),
  { name: 'Express', group: 'backend', level: 'acquired', detail: ['Framework de Node.js para construir APIs.', 'Node.js framework for building APIs.'], projectIds: ['p3'] },
  { name: 'API REST', group: 'backend', level: 'acquired', detail: ['Comunicación HTTP entre aplicaciones y servicios.', 'HTTP communication between applications and services.'], projectIds: ['p3', 'p1'] },
  { name: 'Java', group: 'backend', level: 'basic', detail: ['Fundamentos del lenguaje.', 'Language fundamentals.'] },
  { name: 'Python', group: 'backend', level: 'basic', detail: ['Fundamentos del lenguaje.', 'Language fundamentals.'] },
  { name: 'SQL', group: 'data', level: 'basic', detail: ['Consultas básicas en bases de datos relacionales.', 'Basic queries in relational databases.'] },
  { name: 'AI-Assisted Development', group: 'ai', level: 'practice', detail: ['Apoyo de IA para explorar enfoques, revisar código y documentar cambios.', 'Using AI to explore approaches, review code and document changes.'] },
  { name: 'Prompt Engineering', group: 'ai', level: 'practice', detail: ['Diseño de instrucciones con contexto, restricciones y criterios de verificación.', 'Writing prompts with context, constraints and verification criteria.'] },
  { name: 'VS Code coding assistants', label: ['Asistentes de programación en VS Code', 'Coding assistants in VS Code'], group: 'ai', level: 'practice', detail: ['Uso de asistentes integrados en el editor durante el desarrollo.', 'Using editor-integrated coding assistants during development.'] },
  { name: 'AI development automation', label: ['Automatización del desarrollo con IA', 'AI-powered development automation'], group: 'ai', level: 'practice', detail: ['Apoyo de IA en tareas repetitivas del flujo de desarrollo.', 'Using AI to assist with repetitive development tasks.'] },
  { name: 'LLMs', group: 'ai', level: 'interest', detail: ['Capacidades, límites y evaluación de los modelos de lenguaje.', 'Language model capabilities, limitations and evaluation.'] },
  { name: 'RAG', group: 'ai', level: 'interest', detail: ['Generación de respuestas apoyada en la recuperación de información.', 'Retrieval-augmented generation for grounding responses in relevant information.'] },
  { name: 'AI API integration', label: ['Integración de APIs de IA', 'AI API integration'], group: 'ai', level: 'interest', detail: ['Patrones para conectar servicios de IA con aplicaciones web.', 'Patterns for connecting AI services with web applications.'] },
  { name: 'LLM security', label: ['Seguridad de LLM', 'LLM security'], group: 'ai', level: 'interest', detail: ['Protección de datos y evaluación de riesgos en aplicaciones con modelos de lenguaje.', 'Data protection and risk evaluation for applications powered by language models.'] },
  { name: 'Ciberseguridad / Cybersecurity', group: 'security', level: 'learning', detail: ['Máster en Ciberseguridad en curso.', 'Master’s in Cybersecurity in progress.'] },
  { name: 'JWT', group: 'security', level: 'acquired', detail: ['Autenticación mediante tokens.', 'Token-based authentication.'], projectIds: ['p3'] },
];

export const aiSkills = technologies.filter((item) => item.group === 'ai');
export const aiLevels = ['practice', 'interest'] as const;

type Milestone = { id: string; date: string; organization?: string; title: Copy; detail?: Copy; kind: 'work' | 'education'; current?: boolean };
export const milestones: Milestone[] = [
  { id: 'wul4', date: '2025–2026', kind: 'work', organization: 'WUL4', title: ['Full Stack Developer · Prácticas', 'Full Stack Developer · Internship'], detail: ['Interfaces con React, backend con Node.js e integración de APIs REST. Colaboración con Git y resolución de incidencias.', 'React interfaces, Node.js backend work and REST API integration. Collaborated using Git and resolved issues.'] },
  { id: 'amascotados', date: '2018', kind: 'work', organization: 'Amascotados', title: ['Soporte E-commerce y Gestión Web', 'E-commerce Support and Web Administration'], detail: ['Gestión de contenidos web y atención al cliente online.', 'Managed web content and provided online customer support.'] },
  { id: 'master', date: '', kind: 'education', current: true, title: ['Máster en Ciberseguridad', 'Master’s in Cybersecurity'] },
  { id: 'neoland', date: '2025–2026', kind: 'education', organization: 'Neoland', title: ['Bootcamp de desarrollo web Full Stack', 'Full Stack Web Development Bootcamp'], detail: ['Formación en desarrollo de aplicaciones web.', 'Training in web application development.'] },
  { id: 'comercio-internacional', date: '2016–2018', kind: 'education', organization: 'IES Luis de Góngora', title: ['Técnico Superior en Comercio Internacional', 'Higher Technician in International Trade'], detail: ['Ciclo formativo de grado superior.', 'Advanced vocational qualification.'] },
];

export const profile: Copy = [
  'Desarrollador Full Stack. Construyo interfaces con React y TypeScript y desarrollo APIs REST con Node.js. Uso asistentes de IA en mi flujo de desarrollo y curso un Máster en Ciberseguridad.',
  'Full Stack Developer. I build interfaces with React and TypeScript and develop REST APIs with Node.js. I use AI assistants in my development workflow and am pursuing a master’s in cybersecurity.',
];
