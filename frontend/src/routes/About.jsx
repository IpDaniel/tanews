import React from "react";
import "../styles/About.css";
import TopNav from "../components/TopNav.jsx";
import Footer from "../components/Footer.jsx";

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Daniel Ip",
      role: "Liason 🥸",
      description: "Daniel helped us a lot",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Patty",
      role: "Developer",
      description: "Worked a lot on backend and admin routes",
      imageUrl:
        "https://media.licdn.com/dms/image/v2/D4E03AQHT9SZ3V5J8DQ/profile-displayphoto-shrink_400_400/B4EZSyhNeLHgAg-/0/1738161838867?e=1749686400&v=beta&t=b-HrVaUgjs5HsFY7lI4x2HFgz6Wj_yFeZHrbiNkouas",
    },
    {
      id: 3,
      name: "Connor Karr",
      role: "Developer",
      description: "Developer",
      imageUrl:
        "https://media.licdn.com/dms/image/v2/D4E03AQHhOpjA9BlKFA/profile-displayphoto-shrink_400_400/B4EZSby6pMHAAg-/0/1737780604088?e=1749686400&v=beta&t=9iAuRBbGJnP43iVgRJb6RegqDIZxDr82kXD8MA-6mqs",
    },
    {
      id: 4,
      name: "Rishi Dilip",
      role: "Developer",
      description: "Git is this mans worst enemy",
      imageUrl:
        "https://media.licdn.com/dms/image/v2/D5603AQEhJSSwLIdILQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1722561051233?e=1749686400&v=beta&t=2yiGr_dptaGDH9ft08HpinmOg6W0zs69BOyuhw_Lolg",
    },
    {
      id: 5,
      name: "Naman ",
      role: "Developer",
      description: "",
      imageUrl:
        "https://media.licdn.com/dms/image/v2/D5603AQFrnFG94SE_Kw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1702636764199?e=1749686400&v=beta&t=bG_RyNuQ_X_L3iJMPNrvfucNJPQaowQS6I6MJ80ZyYk",
    },
  ];

  return (
    <>
      <TopNav />
      <div className="about-container">
        <div className="about-header">
          <h1>About Us</h1>
          <p>
            We are dedicated to delivering accurate, timely, and relevant news
            to the five people who developed this website
          </p>
        </div>

        <div className="mission-section">
          <h2>Our Mission</h2>
          <p>TaNews</p>
        </div>

        <div className="team-section">
          <h2>Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-member">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="member-image"
                />
                <h3>{member.name}</h3>
                <h4>{member.role}</h4>
                <p>{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="features-section">
          <h2>Platform Features</h2>
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">📰</div>
              <h3>Real-Time News Updates</h3>
              <p>
                Stay informed with the latest breaking news and updates from
                around the world.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🔍</div>
              <h3>Advanced Search</h3>
              <p>
                Find exactly what you're looking for with our powerful search
                functionality.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <h3>Fast Performance</h3>
              <p>
                Optimized for speed to deliver content quickly and efficiently
                to all devices.
              </p>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <h3>Secure Platform</h3>
              <p>
                Your data is protected with our state-of-the-art security
                measures and totally secured
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
