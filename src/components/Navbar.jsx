import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                <a href="#" className="logo">MELODEV</a>

                <div className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>

                <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
                    <li><a href="#about" onClick={() => setMenuOpen(false)}>Sobre mí</a></li>
                    <li><a href="#stack" onClick={() => setMenuOpen(false)}>Stack</a></li>
                    <li><a href="#projects" onClick={() => setMenuOpen(false)}>Proyectos</a></li>
                    <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contacto</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
