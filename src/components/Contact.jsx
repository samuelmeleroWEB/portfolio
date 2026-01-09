import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { profile } from '../data';
import './Contact.css';

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Mensaje enviado (Simulación)");
    };

    return (
        <section id="contact" className="section contact-section">
            <div className="container center-content">
                <h2 className="section-title text-center">Contacto</h2>
                <p className="contact-intro text-center">
                    ¿Tienes algún proyecto en mente o simplemente quieres saludar?
                    ¡Mi bandeja de entrada siempre está abierta!
                </p>

                <div className="contact-wrapper">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input type="text" id="name" name="name" required placeholder="Tu nombre" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required placeholder="tucorreo@ejemplo.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Mensaje</label>
                            <textarea id="message" name="message" rows="5" required placeholder="Hola..."></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
                    </form>

                    <div className="social-links text-center">
                        <a href={`mailto:${profile.email}`} className="btn btn-secondary email-btn">Escribir Email</a>
                        <div className="social-icons">
                            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <FaLinkedin />
                            </a>
                            <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <FaGithub />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
