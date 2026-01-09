import React from 'react';
import { skills } from '../data';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaAngular, FaSass, FaCode, FaLayerGroup } from 'react-icons/fa';
import { SiNextdotjs, SiMongodb, SiExpress } from 'react-icons/si';
import './TechStack.css';

const iconMap = {
    HTML5: <FaHtml5 color="#E34F26" />,
    CSS3: <FaCss3Alt color="#1572B6" />,
    JavaScript: <FaJs color="#F7DF1E" />,
    React: <FaReact color="#61DAFB" />,
    Angular: <FaAngular color="#DD0031" />,
    "Next.js": <SiNextdotjs color="#ffffff" />,
    SCSS: <FaSass color="#CC6699" />,
    "Node.js": <FaNodeJs color="#339933" />,
    Express: <SiExpress color="#ffffff" />,
    MongoDB: <SiMongodb color="#47A248" />,
    Git: <FaGitAlt color="#F05032" />,
    Zustand: <FaLayerGroup color="#443E38" />,
};

const TechStack = () => {
    return (
        <section id="stack" className="section stack-section">
            <div className="container">
                <h2 className="section-title">Stack Tecnológico</h2>
                <div className="stack-categories">
                    <div className="stack-category">
                        <h3 className="category-title">Frontend</h3>
                        <div className="skills-grid">
                            {skills.frontend.map((skill, index) => (
                                <div className="skill-card" key={index}>
                                    <div className="skill-icon">
                                        {iconMap[skill.name] || <FaCode color="#888" />}
                                    </div>
                                    <span className="skill-name">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="stack-category">
                        <h3 className="category-title">Backend</h3>
                        <div className="skills-grid">
                            {skills.backend.map((skill, index) => (
                                <div className="skill-card" key={index}>
                                    <div className="skill-icon">
                                        {iconMap[skill.name] || <FaCode color="#888" />}
                                    </div>
                                    <span className="skill-name">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="stack-category">
                        <h3 className="category-title">Herramientas</h3>
                        <div className="skills-grid">
                            {skills.tools.map((skill, index) => (
                                <div className="skill-card" key={index}>
                                    <div className="skill-icon">
                                        {iconMap[skill.name] || <FaCode color="#888" />}
                                    </div>
                                    <span className="skill-name">{skill.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechStack;
