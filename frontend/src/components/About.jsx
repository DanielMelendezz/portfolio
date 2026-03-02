import { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
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

  const languages = ['Python', 'C++', 'Java', 'SQL', 'HTML/CSS'];
  const devTools = [
    'AWS (IAM, S3, Lambda, API Gateway, EventBridge, DynamoDB)',
    'Terraform', 'Google Cloud Platform',
    'Amazon SageMaker', 'Pandas', 'Scikit-Learn',
    'Git', 'Docker', 'React', 'Flask', 'Node.js',
    'PostgreSQL', 'MySQL', 'Linux',
    'OpenAI API', 'Plaid API', 'Alpaca API',
    'Pytest', 'Agile',
  ];

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// 01</span>
          <h2 className="section-title">About</h2>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <h3 className="card-title">Education</h3>
            <div className="edu-school">University of Florida</div>
            <div className="edu-location">Gainesville, FL</div>
            <div className="edu-degrees">
              <p>B.S. Computer Science</p>
              <p>B.A. Economics &amp; Statistics Minor</p>
            </div>
            <div className="edu-meta">
              <span className="badge">GPA 3.61</span>
              <span className="badge">May 2026</span>
            </div>
            <div className="edu-courses">
              <span className="courses-label">Relevant courses:</span>
              <span className="courses-text">
                Data Structures &amp; Algorithms · Operating Systems ·
                Competitive Programming · Software Engineering
              </span>
            </div>
          </div>

          <div className="about-card">
            <h3 className="card-title">Certifications</h3>
            <div className="cert-item">
              <div className="cert-name">Certificate in AI Fundamentals &amp; Applications</div>
              <div className="cert-issuer">University of Florida</div>
            </div>
          </div>

          <div className="about-card">
            <h3 className="card-title">Languages</h3>
            <div className="tags-list">
              {languages.map((lang) => (
                <span key={lang} className="tag tag-lang">{lang}</span>
              ))}
            </div>
          </div>

          <div className="about-card about-card--wide">
            <h3 className="card-title">Tools &amp; Frameworks</h3>
            <div className="tags-list">
              {devTools.map((tool) => (
                <span key={tool} className="tag">{tool}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
