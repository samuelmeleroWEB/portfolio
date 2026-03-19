export interface Project {
    id: string;
    title: string;
    description: string;
    stack: string[];
    demoUrl?: string;
    githubUrl?: string;
    number: string;
    image?: string;
    badge?: string;
    badgeType?: 'warning' | 'info';
}

export interface Skill {
    name: string;
    category: 'Frontend' | 'Backend' | 'Herramientas';
    icon: string; // we can identify the icon name
    note: string;
}

export interface Certification {
    id: string;
    title: string;
    issuer: string;
    date: string; // YYYY-MM-DD for sorting
    image?: string;
    url?: string;
}
