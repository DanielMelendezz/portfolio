import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <p className="contact-text">
              I'm always open to discussing new projects, creative ideas, or 
              opportunities to be part of your visions. Feel free to reach out!
            </p>
            <div className="contact-links">
              <a href="mailto:your.email@example.com" className="contact-link">
                <span className="contact-icon">✉</span>
                your.email@example.com
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="contact-icon">💻</span>
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                <span className="contact-icon">🔗</span>
                LinkedIn
              </a>
            </div>
          </div>
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your Name" className="form-input" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" className="form-input" />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="5" className="form-input"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
