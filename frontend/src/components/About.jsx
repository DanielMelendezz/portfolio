import { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const languages = ['Python', 'C++', 'SQL', 'Java', 'HTML/CSS'];
  const devTools = [
    'AWS (IAM, S3, Lambda, API Gateway, EventBridge, DynamoDB)',
    'Terraform',
    'Google Cloud Platform (GCP)',
    'Amazon SageMaker',
    'Pandas',
    'Scikit-Learn',
    'Git',
    'Docker',
    'OpenAI API',
    'Plaid API',
    'Trading APIs (Alpaca)',
    'React',
    'Flask',
    'Node.js',
    'PostgreSQL',
    'MySQL',
    'Linux',
    'Visual Studio',
    'Pytest',
    'Agile Methodologies',
  ];

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">About Me</h2>

        <div className="about-grid">
          {/* Education */}
          <div className="about-card">
            <div className="card-icon">🎓</div>
            <h3>Education</h3>
            <div className="education-block">
              <div className="edu-header">
                <h4>University of Florida</h4>
                <span className="edu-location">Gainesville, FL</span>
              </div>
              <div className="edu-details">
                <p className="edu-degree">Bachelor of Science in Computer Science</p>
                <p className="edu-degree">Bachelor of Arts in Economics &amp; Statistics Minor</p>
                <div className="edu-meta">
                  <span className="edu-badge">GPA: 3.61</span>
                  <span className="edu-badge">May 2026</span>
                </div>
              </div>
              <div className="edu-courses">
                <p className="courses-label">Relevant Courses:</p>
                <p className="courses-list">
                  Data Structures &amp; Algorithms, Operating Systems, Competitive Programming, Software Engineering
                </p>
              </div>
            </div>
          </div>

          {/* Certificate */}
          <div className="about-card">
            <div className="card-icon">📜</div>
            <h3>Certificates</h3>
            <div className="certificate-item">
              <p className="cert-name">Certificate in AI Fundamentals and Applications</p>
              <p className="cert-issuer">University of Florida</p>
            </div>
          </div>

          {/* Languages */}
          <div className="about-card languages-card">
            <div className="card-icon">💻</div>
            <h3>Languages</h3>
            <div className="skills-grid">
              {languages.map((lang) => (
                <span key={lang} className="skill-tag language-tag">{lang}</span>
              ))}
            </div>
          </div>

          {/* Developer Tools */}
          <div className="about-card tools-card">
            <div className="card-icon">🛠️</div>
            <h3>Developer Tools &amp; Frameworks</h3>
            <div className="skills-grid">
              {devTools.map((tool) => (
                <span key={tool} className="skill-tag tool-tag">{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
