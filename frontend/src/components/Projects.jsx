import { useEffect, useRef } from 'react';
import './Projects.css';

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('section-visible');
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
        'Full-stack app with a Node.js backend and PostgreSQL database to securely manage user financial data.',
        'Implemented Plaid API with OAuth to link bank accounts and built a custom engine to categorize transactions automatically.',
        'React dashboard with Chart.js visualizes spending habits and provides actionable financial insights.',
      ],
      tech: ['Plaid API', 'React', 'Node.js', 'PostgreSQL', 'Chart.js', 'OAuth'],
      date: 'Feb 2025',
    },
    {
      id: 2,
      title: 'Multi-Cloud Data Platform',
      description: [
        'Authored Terraform scripts to provision the entire serverless infrastructure on AWS, ensuring 100% reproducibility.',
        'Event-driven pipeline using AWS S3 events and Lambda to automatically process data files upon upload.',
        'Unified React interface with cloud SDKs to manage files across both AWS S3 and Google Cloud Storage.',
      ],
      tech: ['AWS Lambda', 'S3', 'Terraform', 'GCP', 'React', 'Serverless'],
      date: 'Oct 2025',
    },
    {
      id: 3,
      title: 'RTX Certification Management',
      description: [
        'Web-based application tracking employee certification records with offline capability on Windows.',
        'Immutable audit logging via Windows Advanced Audit Policy and ETW for full compliance traceability.',
        'Automated lifecycle tracking and email alerts, cutting manual monitoring effort by ~85%.',
      ],
      tech: ['Angular', 'Windows', 'Active Directory', 'ETW'],
      date: 'Aug 2025 – Present',
    },
  ];

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// 03</span>
          <h2 className="section-title">Projects</h2>
        </div>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div key={project.id} className="project-card" style={{ '--delay': `${index * 0.12}s` }}>
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
