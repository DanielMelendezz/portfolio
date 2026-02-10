import { useEffect, useRef } from 'react';
import './Projects.css';

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Personal Finance Dashboard',
      description: [
        'Engineered a full-stack application using a Node.js backend and PostgreSQL database to securely manage user financial data.',
        'Implemented the Plaid API with OAuth to link bank accounts and developed a custom engine to automatically categorize transactions.',
        'Built an interactive React dashboard with Chart.js to visualize spending habits and provide users with actionable financial insights.',
      ],
      tech: ['Plaid API', 'React', 'Node.js', 'PostgreSQL', 'Chart.js', 'OAuth'],
      date: 'February 2025',
    },
    {
      id: 2,
      title: 'Multi-Cloud Data Platform',
      description: [
        'Authored Terraform scripts to provision and manage the entire serverless infrastructure on AWS, ensuring 100% reproducibility.',
        'Architected a scalable, event-driven pipeline using AWS S3 events and Lambda to automatically process data files upon upload.',
        'Developed a unified web interface using React and cloud SDKs to manage files across both AWS S3 and Google Cloud Storage.',
      ],
      tech: ['AWS Lambda', 'S3', 'Terraform', 'GCP', 'React', 'Serverless'],
      date: 'October 2025',
    },
    {
      id: 3,
      title: 'RTX Certification Management System',
      description: [
        'Developing a web-based application that tracks employee certification records with offline capability on Windows.',
        'Implemented immutable audit logging using Windows Advanced Audit Policy and ETW for full compliance traceability.',
        'Automated lifecycle tracking and email alerts, cutting manual monitoring effort by ~85% and eliminating missed expirations.',
      ],
      tech: ['Angular', 'Windows', 'Active Directory', 'ETW'],
      date: 'August 2025 – Present',
    },
  ];

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card"
              style={{ '--delay': `${index * 0.15}s` }}
            >
              <div className="project-header">
                <h3>{project.title}</h3>
                <span className="project-date">{project.date}</span>
              </div>
              <ul className="project-description">
                {project.description.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
              <div className="project-tech">
                {project.tech.map((tech, i) => (
                  <span key={i} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
