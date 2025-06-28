
import React from 'react';
import './style2.css';
import './style1.css';

const NinaCV = ({ data }) => {
  const { 
    name, 
    email, 
    phone, 
    website, 
    summary, 
    education, 
    experience, 
    skills,
    interests
  } = data;

  return (
    <div className="nina-cv">
      {/* Main Content */}
      <div className="nina-main">
        {/* Profile */}
        <section className="nina-section">
          <h1>Profile</h1>
          <p className="nina-summary">{summary}</p>
        </section>

        {/* Experience */}
        {experience.length > 0 && experience[0].title && (
          <section className="nina-section">
            <h2>Experience</h2>
            {experience.map((exp, index) => (
              <div key={index} className="nina-experience-item">
                <h3>{exp.title}</h3>
                <p className="nina-company">{exp.company} | {exp.duration}</p>
                {exp.description && <p className="nina-experience-desc">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && education[0].degree && (
          <section className="nina-section">
            <h2>Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="nina-education-item">
                <h3>{edu.degree}</h3>
                <p>{edu.institution}</p>
                {edu.year && <p>Graduated: {edu.year}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Portfolio */}
        <section className="nina-section">
          <h2>Portfolio</h2>
          <div className="nina-portfolio-item">
            <p><strong>Social Media Campaign</strong> for Eco Wave Brand: Transformed their social media presence with cohesive visuals and engaging graphics.</p>
          </div>
          <div className="nina-portfolio-item">
            <p><strong>Event Branding</strong> for the annual NYC Art Expo: Developed event branding from logo to banners, enhancing attendee experience.</p>
          </div>
        </section>
      </div>

      {/* Sidebar */}
      <div className="nina-sidebar">
        {/* Header */}
        <header className="nina-header">
          <h1>{name}</h1>
          <h2>Graphic Designer</h2>
        </header>

        {/* Contact */}
        <section className="nina-section">
          <h3>Contact</h3>
          {email && <p>{email}</p>}
          {phone && <p>{phone}</p>}
          {website && <p>{website}</p>}
        </section>

        {/* Skills */}
        {skills.length > 0 && (
          <section className="nina-section">
            <h3>Skills</h3>
            <div className="nina-skills">
              {skills.map((skill, index) => (
                <span key={index}>{skill}</span>
              ))}
            </div>
          </section>
        )}

        {/* Interests */}
        {interests && interests.length > 0 && (
          <section className="nina-section">
            <h3>Interests</h3>
            <div className="nina-interests">
              {interests.map((interest, index) => (
                <span key={index}>{interest}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default NinaCV;