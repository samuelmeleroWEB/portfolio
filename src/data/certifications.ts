import { Certification } from '../types';
import google1 from '../assets/images/googleactivate1.jpg';
import google2 from '../assets/images/googleactivate2.jpg';
import neoland from '../assets/images/Neolandcertificate.jpg';
import jsCert from '../assets/images/imgJs.jpg';
import devAppMobile from '../assets/images/devappmobile.jpg';

export const certifications: Certification[] = [
    {
        id: 'cert-1',
        title: 'Introducción a la programación I',
        issuer: 'Google Activate',
        date: '2022-05-20',
        image: google1,
        url: '#'
    },
    {
        id: 'cert-2',
        title: 'Introducción a la programación II',
        issuer: 'Google Activate',
        date: '2022-05-20',
        image: google2,
        url: '#'
    },
    {
        id: 'cert-3',
        title: 'Desarrollador de app móviles',
        issuer: 'Google Activate',
        date: '2022-05-20',
        image: devAppMobile,
        url: '#'
    },
    {
        id: 'cert-4',
        title: 'Desarrollador full stack',
        issuer: 'Neoland',
        date: '2025-08-10',
        image: neoland,
        url: '#'
    },
    {
        id: 'cert-5',
        title: 'INF-302: Javascript',
        issuer: 'Information Technology Specialist',
        date: '2026-03-18',
        image: jsCert,
        url: '#'
    }
];
