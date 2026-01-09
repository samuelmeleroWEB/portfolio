import profileImg from './assets/fotolinkedin.png';

export const profile = {
  img: profileImg,
  name: "Melodev",
  title: "Full Stack Developer",
  description: "Transformando ideas en experiencias digitales escalables y elegantes.",
  about: "Desarrollador Full Stack especializado en JavaScript, con conocimientos sólidos en HTML, CSS, SCSS y frameworks frontend como React y Angular.En el backend desarrollo APIs REST con Node.js y Express, conectadas a bases de datos MongoDB, implementando autenticación segura mediante JWT y bcrypt.Me gusta escribir código limpio, modular y mantener una buena separación entre lógica de negocio y presentación, utilizando herramientas como Zustand para el estado global.",
  email: "samuelmelero98@gmail.com",
  linkedin: "https://linkedin.com/in/samuel-melero-dev",
  github: "https://github.com/samuelmeleroWEB",
};

export const skills = {
  frontend: [
    { name: "HTML5", icon: "html" },
    { name: "CSS3", icon: "css" },
    { name: "JavaScript", icon: "js" },
    { name: "React", icon: "react" },
    { name: "Angular", icon: "angular" },
    { name: "Next.js", icon: "next" },
    { name: "SCSS", icon: "scss" },
  ],
  backend: [
    { name: "Node.js", icon: "node" },
    { name: "Express", icon: "express" },
    { name: "MongoDB", icon: "mongo" },
  ],
  tools: [
    { name: "Git", icon: "git" },
    { name: "Zustand", icon: "state" }
  ]
};

export const projects = [
  {
    id: 1,
    title: "CineVerse — Plataforma web de gestión de cine",
    description: "Aplicación web Full Stack que simula el funcionamiento real de un cine. Permite a los usuarios consultar la cartelera, ver detalles de películas, seleccionar sesiones y butacas, añadir entradas y menús al carrito y finalizar la compra mediante autenticación.Incluye un panel de administración desde el que se gestionan películas, salas, sesiones, usuarios y el carrusel de películas destacadas.",
    tech: ["React", "Node", "MongoDB", "JavaScript", "Zustand","HTML", "CSS","Next","bcrypt","JWT"],
    github: "https://github.com/samuelmeleroWEB/frontendCineverse",
    demo: "https://ecommerce-demo.com",
    image: "ecommerce"
  },
  {
    id: 2,
        title: "Portfolio V1",
    description: "Portfolio personal desarrollado con React, JavaScript, HTML y CSS, donde presento mis proyectos, habilidades y experiencia como desarrollador web, con un diseño moderno y responsive.",
    tech: ["HTML", "CSS", "JavaScript","React"],
    github: "https://github.com/alexdev/portfolio-v1",
    demo: "https://portfolio-v1-demo.com",
    image: "portfolio"
  },
  
];
