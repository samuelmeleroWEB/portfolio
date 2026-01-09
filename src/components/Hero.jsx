import React, { useEffect, useState } from 'react';
import { profile } from '../data';
import './Hero.css';

const Hero = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <section className="hero">
            <div className="hero-bg"></div>
            <div className={`container hero-container ${loaded ? 'animate-fade-in' : ''}`}>
                <div className="hero-text">
                    <p className="hero-greeting">Hola, soy {profile.name}</p>
                    <h1 className="hero-title">{profile.title}</h1>
                    <p className="hero-description">{profile.description}</p>
                    <div className="hero-actions">
                        <a href="#projects" className="btn btn-primary">Ver Proyectos</a>
                        <a href="#contact" className="btn btn-secondary">Contactar</a>
                    </div>
                </div>
                <div className="hero-image-wrapper">
                    <img src={profile.img} alt={profile.name} className="hero-img" onError={(e) => e.target.style.display = 'none'} />
                </div>
            </div>
            <div className="scroll-indicator">
                <span className="mouse">
                    <span className="wheel"></span>
                </span>
            </div>
        </section>
    );
};

export default Hero;
