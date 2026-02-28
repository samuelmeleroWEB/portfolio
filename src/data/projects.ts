import { Project } from '../types';

import weatherImg from '../assets/images/projects/weather.jpg';
import restaurantImg from '../assets/images/projects/restaurant.jpg';
import cinemaImg from '../assets/images/projects/cinema.jpg';
import calendarImg from '../assets/images/projects/calendar.jpg';
import organizatorImg from '../assets/images/projects/organizatorimg.jpg';
import portfolioImg from '../assets/images/projects/imgporfolio.jpg';

export const projects: Project[] = [
    {
        id: 'p1',
        number: '01',
        title: 'Weather App',
        description: 'Aplicación del tiempo con geolocalización y previsión de 7 días.',
        stack: ['React', 'TypeScript', 'API REST'],
        demoUrl: 'https://weatherappui.vercel.app/',
        githubUrl: 'https://github.com/samuelmeleroWEB/weather-app',
        image: weatherImg
    },
    {
        id: 'p2',
        number: '02',
        title: 'Restaurant Manager',
        description: 'Sistema de gestión de mesas, pedidos y carta para restaurantes.',
        stack: ['React', 'Node.js', 'MongoDB'],
        demoUrl: '#',
        githubUrl: 'https://github.com/samuelmeleroWEB/restaurant-manager',
        image: restaurantImg,
        badge: 'En Desarrollo',
        badgeType: 'warning'
    },
    {
        id: 'p3',
        number: '03',
        title: 'Gestión de Cine',
        description: 'Plataforma de administración de salas, películas y reservas de entradas.',
        stack: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
        demoUrl: 'https://frontend-cineverse.vercel.app/',
        githubUrl: 'https://github.com/samuelmeleroWEB/Cineverse',
        image: cinemaImg
    },
    {
        id: 'p4',
        number: '04',
        title: 'Reminder Calendar',
        description: 'Herramienta de planificación diaria con tareas, bloques horarios y prioridades.',
        stack: ['Angular', 'TypeScript', 'SCSS'],
        demoUrl: 'https://samuelmeleroweb.github.io/ReminderCalendar/today',
        githubUrl: 'https://github.com/samuelmeleroWEB/ReminderCalendar',
        image: calendarImg,
        badge: 'Mejorando',
        badgeType: 'info'
    },
    {
        id: 'p5',
        number: '05',
        title: 'Organizador de Día',
        description: 'App de organización personal con categorías, recordatorios y vista semanal.',
        stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
        demoUrl: 'https://organizator-web.vercel.app/',
        githubUrl: 'https://github.com/samuelmeleroWEB/organizator-web',
        image: organizatorImg,
        badge: 'Mejorando',
        badgeType: 'info'
    },
    {
        id: 'p6',
        number: '06',
        title: 'Portfolio Personal',
        description: 'Este mismo portafolio — diseño terminal futurista, animaciones y Web Components.',
        stack: ['React', 'TypeScript', 'SCSS', 'Framer Motion'],
        demoUrl: 'https://portfoliosamuelmelero.vercel.app/',
        githubUrl: 'https://github.com/samuelmeleroWEB/portfolio',
        image: portfolioImg
    }
];