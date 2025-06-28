import React, { useState } from 'react';
import './inputCV.css'; // ⬅️ External CSS file for clean styling

const LearnCV = ({ formData, setFormData, onPreview, profileImage, setProfileImage }) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEducationChange = (index, e) => {
    const updated = [...formData.education];
    updated[index][e.target.name] = e.target.value;
    setFormData(prev => ({ ...prev, education: updated }));
  };

  const handleExperienceChange = (index, e) => {
    const updated = [...formData.experience];
    updated[index][e.target.name] = e.target.value;
    setFormData(prev => ({ ...prev, experience: updated }));
  };
  const handleReferencesChange = (index, e) => {
    const updated = [...formData.references];
    updated[index][e.target.name] = e.target.value;
    setFormData(prev => ({ ...prev, references: updated }));
  };

  const handleSkillsChange = (e) => {
    const skillArray = e.target.value.split(',').map(skill => skill.trim());
    setFormData(prev => ({ ...prev, skills: skillArray }));
  };

  const handleInterestsChange = (e) => {
    const interestArray = e.target.value.split(',').map(i => i.trim());
    setFormData(prev => ({ ...prev, interests: interestArray }));
  };

  const handleLanguagesChange = (e) => {
    const languageArray = e.target.value.split(',').map(l => l.trim());
    setFormData(prev => ({ ...prev, languages: languageArray }));
  };

  const handleAddEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", year: "" }]
    }));
  };

  const handleAddExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { title: "", company: "", duration: "", description: "" }]
    }));
  };
  const handleAddReferences = () => {
    setFormData(prev => ({
      ...prev,
      references: [...prev.references, { name: "", position: "", phone: "", email: "" }]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Form is incomplete.");
      return;
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      summary: "",
      linkedin: "",
      website: "",
      skills: [],
      interests: [],
      languages: [],
      education: [{ degree: "", institution: "", year: "" }],
      experience: [{ title: "", company: "", duration: "", responsibilities: "" }]
    });
  };

  const isFormValid = () => {
    const { name, jobTitle, email, skills, education, experience } = formData;

    return (
      name.trim() !== '' &&
      email.trim() !== '' &&
      jobTitle.trim() !== '' &&
      skills.length > 0 &&
      education.every(e => e.degree && e.institution && e.year) &&
      experience.every(e => e.title && e.company && e.duration)
    );
  };

  const handlePreviewClick = () => {
    if (!isFormValid()) {
      alert("Please fill in all fields before previewing.");
      return;
    }
    onPreview();
  };

    const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="cv-form-container">
      <h2>Professional CV Builder</h2>
      <button type="button" className="preview-btn" onClick={handlePreviewClick}>
        Preview CV
      </button>

      <form onSubmit={handleSubmit} className="cv-form">
        <section>
          <h3>Personal Info</h3>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                  accept="image/*"
                />
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" />
          <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
          <input type="text" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="LinkedIn Profile" />
          <input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="Personal Website" />
          <textarea name="profileSummary" value={formData.profileSummary} onChange={handleChange} placeholder="Profile Summary" rows={4}></textarea>
        </section>

        <section>
          <h3>Education</h3>
          {formData.education.map((edu, index) => (
            <div key={index} className="cv-card">
              <input name="degree" value={edu.degree} onChange={(e) => handleEducationChange(index, e)} placeholder="Degree" />
              <input name="institution" value={edu.institution} onChange={(e) => handleEducationChange(index, e)} placeholder="Institution" />
              <input name="year" value={edu.year} onChange={(e) => handleEducationChange(index, e)} placeholder="Year" />
            </div>
          ))}
          <button type="button" onClick={handleAddEducation}>+ Add Education</button>
        </section>

        <section>
          <h3>Experience</h3>
          {formData.experience.map((exp, index) => (
            <div key={index} className="cv-card">
              <input name="title" value={exp.title} onChange={(e) => handleExperienceChange(index, e)} placeholder="Job Title" />
              <input name="company" value={exp.company} onChange={(e) => handleExperienceChange(index, e)} placeholder="Company" />
              <input name="duration" value={exp.duration} onChange={(e) => handleExperienceChange(index, e)} placeholder="Duration" />
              <input name="responsibilities" value={exp.responsibilities}                           onChange={(e) => {
                            const updatedExp = [...formData.experience];
                            updatedExp[index].responsibilities = e.target.value.split('\n').filter(r => r);
                            setFormData(prev => ({
                              ...prev,
                              experience: updatedExp
                            }));
                          }} placeholder="responsibilities" ></input>
            </div>
          ))}
          <button type="button" onClick={handleAddExperience}>+ Add Experience</button>
        </section>
        <section>
          <h3>References</h3>
          {formData.references.map((ref, index) => (
            <div key={index} className="cv-card">
              <input name="name" value={ref.name} onChange={(e) => handleReferencesChange(index, e)} placeholder="name" />
              <input name="position" value={ref.position} onChange={(e) => handleReferencesChange(index, e)} placeholder="position" />
              <input name="phone" value={ref.phone} onChange={(e) => handleReferencesChange(index, e)} placeholder="phone" />
              <input name="email" value={ref.email} onChange={(e) => handleReferencesChange(index, e)} placeholder="email"></input>
            </div>
          ))}
          <button type="button" onClick={handleAddReferences}>+ Add References</button>
        </section>

        <section>
          <h3>Skills</h3>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleSkillsChange}
            placeholder="e.g. HTML, CSS, React"
          />
        </section>

        <section>
          <h3>Interests</h3>
          <input
            type="text"
            name="interests"
            value={formData.interests}
            onChange={handleInterestsChange}
            placeholder="e.g. Reading, Traveling"
          />
        </section>

        <section>
          <h3>Languages</h3>
          <input
            type="text"
            name="languages"
            value={formData.languages}
            
            onChange={handleLanguagesChange}
            placeholder="e.g. English, Urdu, Arabic"
          />
        </section>

        <button type="submit" className="submit-btn">Build CV</button>
      </form>
    </div>
  );
};

export default LearnCV;
