import React from 'react';
import { profile } from '../data';
import './Footer.css';

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="container text-center">
                <p>Diseñado y Desarrollado por {profile.name}</p>
                <p className="copyright">&copy; {year} Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
