import { Skill } from '../types';

export const skills: Skill[] = [
    { name: 'React', category: 'Frontend', icon: 'react', note: 'Hooks, Context, Redux' },
    { name: 'Angular', category: 'Frontend', icon: 'angular', note: 'RxJS, Signals, NgRx' },
    { name: 'JavaScript', category: 'Frontend', icon: 'javascript', note: 'ES6+, DOM, Async' },
    { name: 'TypeScript', category: 'Frontend', icon: 'typescript', note: 'Tipado estricto, Interfaces' },
    { name: 'HTML5', category: 'Frontend', icon: 'html5', note: 'Semántico, Accesibilidad' },
    { name: 'CSS3', category: 'Frontend', icon: 'css3', note: 'Grid, Flexbox, Animation' },
    { name: 'SCSS', category: 'Frontend', icon: 'scss', note: 'Mixins, Variables, Nesting' },
    { name: 'Web Components', category: 'Frontend', icon: 'webcomponents', note: 'Shadow DOM, Custom Elements' },

    { name: 'Node.js', category: 'Backend', icon: 'nodejs', note: 'Express, NestJS, API REST' },
    { name: 'MongoDB', category: 'Backend', icon: 'mongodb', note: 'Mongoose, Aggregations' },

    { name: 'Git', category: 'Herramientas', icon: 'git', note: 'Control de versiones' },
    { name: 'GitFlow', category: 'Herramientas', icon: 'gitflow', note: 'Estrategia de ramas' },
    { name: 'GitHub / GitLab', category: 'Herramientas', icon: 'github', note: 'Repositorios, CI/CD' },
    { name: 'Jira', category: 'Herramientas', icon: 'jira', note: 'Gestión ágil, Scrum' },
    { name: 'Postman', category: 'Herramientas', icon: 'postman', note: 'Testing de APIs REST' },
    { name: 'VS Code', category: 'Herramientas', icon: 'vscode', note: 'Editor de código' }
];
