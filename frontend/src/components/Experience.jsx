import { useEffect, useRef } from 'react';
import './Experience.css';

const Experience = () => {
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

  const experiences = [
    {
      id: 1,
      role: 'RTX Automated Certification Management System',
      tech: 'Angular · Windows · Active Directory',
      company: 'RTX',
      location: '',
      period: 'Aug 2025 – Present',
      bullets: [
        'Developing a web-based application that tracks employee certification records and runs on a Windows platform with offline capability.',
        'Implemented immutable audit logging using Windows Advanced Audit Policy and ETW, providing full traceability for compliance.',
        'Automated lifecycle tracking and email alerts, cutting manual monitoring effort by ~85% and eliminating missed expirations.',
      ],
    },
    {
      id: 2,
      role: 'Information Technology Student Assistant',
      tech: null,
      company: 'UF Information Technology',
      location: 'Gainesville, FL',
      period: 'Jun 2025 – Present',
      bullets: [
        'Managed lifecycle of university property and capital assets, ensuring accurate inventory tracking and compliance with disposal rules.',
        'Performed secure data wiping on all electronic devices designated for surplus to protect sensitive institutional data.',
        'Developed automation scripts to streamline inventory management processes, improving efficiency and accuracy.',
      ],
    },
    {
      id: 3,
      role: 'Research Assistant — PhD Laura Cruz',
      tech: null,
      company: 'UF Herbert Wertheim College of Engineering',
      location: 'Gainesville, FL',
      period: 'Sep 2023 – Oct 2024',
      bullets: [
        'Engineered an automated data pipeline and KPI dashboard for the Department of Defense to track mission-critical performance metrics.',
        'Used Python, Google Drive, and OpenAI APIs to automate ingestion and summarization of Qualtrics survey data.',
        'Deployed the pipeline on HiPerGator, increasing processing efficiency by 400% to deliver daily insights for the DoD.',
      ],
    },
    {
      id: 4,
      role: 'Teaching Assistant (3 Positions)',
      tech: null,
      company: 'UF Herbert Wertheim College of Engineering',
      location: 'Gainesville, FL',
      period: 'Jul 2023 – Jan 2026',
      bullets: [
        'Data Structures & Algorithms: Leveraged Gradescope and Canvas APIs to automate AVL tree grading for 600 students, publishing feedback 25× faster than previous methods.',
        'Programming Fundamentals 2: Built a Python-based autograder to compile C++ projects and run tests via the Codio API, reducing lab transition times.',
        'Python for Engineers: Designed exam questions and Python-based test cases to assess student proficiency in language fundamentals.',
      ],
    },
  ];

  return (
    <section id="experience" className="experience" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-tag">// 02</span>
          <h2 className="section-title">Experience</h2>
        </div>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="timeline-item" style={{ '--delay': `${index * 0.12}s` }}>
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="exp-header">
                  <div className="exp-title-block">
                    <h3 className="exp-role">{exp.role}</h3>
                    {exp.tech && <span className="exp-tech">{exp.tech}</span>}
                    <p className="exp-company">{exp.company}</p>
                    {exp.location && <p className="exp-location">{exp.location}</p>}
                  </div>
                  <span className="exp-period">{exp.period}</span>
                </div>
                <ul className="exp-bullets">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
