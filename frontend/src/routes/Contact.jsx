import React from "react";
import "../styles/Contact.css";
import TopNav from "../components/TopNav.jsx";
import Footer from "../components/Footer.jsx";

const Contact = () => {
  return (
    <div className="app-container">
      <TopNav />
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Reach out to our team or connect with us on social media.</p>
        </div>

        <div className="connect-section">
          <h2>Connect With Us</h2>
          <div className="connect-grid">
            <div className="connect-item">
              <div className="connect-icon">📱</div>
              <h3>Social Media</h3>
              <p>Follow TAMID at Northeastern:</p>
              <a href="https://www.instagram.com/tamidatnu/?hl=en" target="_blank" rel="noopener noreferrer">
                Instagram: @tamidatnu
              </a>
            </div>

            <div className="connect-item">
              <div className="connect-icon">💻</div>
              <h3>GitHub</h3>
              <p>Check out our code repository:</p>
              <a href="https://github.com/IpDaniel/tanews/" target="_blank" rel="noopener noreferrer">
                github.com/IpDaniel/tanews
              </a>
            </div>

            <div className="connect-item">
              <div className="connect-icon">🏢</div>
              <h3>TAMID</h3>
              <p>Learn more about TAMID at Northeastern:</p>
              <a href="https://www.nutamid.org/" target="_blank" rel="noopener noreferrer">
                nutamidtech.org
              </a>
            </div>
            
          </div>
        </div>
</div>
      <Footer />
    </div>
  );
};

export default Contact;