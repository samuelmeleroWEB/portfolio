import React from 'react';
import { profile } from '../data';
import './About.css';

const About = () => {
    return (
        <section id="about" className="section about-section">
            <div className="container">
                <h2 className="section-title">Sobre mí</h2>
                <div className="about-content">
                    <div className="about-text">
                        <p>{profile.about}</p>
                        <div className="stats">
                            <div className="stat-item">
                                <span className="stat-number">1+</span>
                                <span className="stat-label">Años de experiencia</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">2+</span>
                                <span className="stat-label">Proyectos completados</span>
                            </div>
                        </div>
                    </div>
                    {/* Optional: Add an image here or a visual element */}
                </div>
            </div>
        </section>
    );
};

export default About;
