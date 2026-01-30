import './Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'Project One',
      description: 'A modern web application built with React and Node.js, featuring real-time updates and a beautiful UI.',
      tech: ['React', 'Node.js', 'Express'],
    },
    {
      id: 2,
      title: 'Project Two',
      description: 'An innovative solution that combines cutting-edge technology with user-friendly design.',
      tech: ['React', 'TypeScript', 'CSS3'],
    },
    {
      id: 3,
      title: 'Project Three',
      description: 'A full-stack application showcasing modern development practices and best coding standards.',
      tech: ['React', 'Express', 'MongoDB'],
    },
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-header">
                <h3>{project.title}</h3>
              </div>
              <p className="project-description">{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech, index) => (
                  <span key={index} className="tech-badge">{tech}</span>
                ))}
              </div>
              <div className="project-links">
                <a href="#" className="project-link">View Project</a>
                <a href="#" className="project-link">GitHub</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
