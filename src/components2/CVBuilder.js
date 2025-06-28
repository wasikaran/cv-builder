import React, { useState } from 'react';
import CVForm from './CVForm';
import CVStyleSelector from './CVStyleSelector';
import CVStyle1 from './Styles/CVStyle1';
import CVStyle2 from './Styles/CVStyle2';

const CVBuilder = () => {
    const [profileImage, setProfileImage] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    jobTitle: '',
    phone: '',
    email: '',
    address: '',
    website: '',
    profileSummary: '',
    education: [
      {
        years: '',
        institution: '',
        degree: '',
        gpa: ''
      }
    ],
    skills: [],
    languages: "",
    experience: [
      {
        title: '',
        company: '',
        duration: '',
        responsibilities: ['']
      }
    ],
    references: [
      {
        name: '',
        position: '',
        phone: '',
        email: ''
      }
    ]
  });

  const [selectedStyle, setSelectedStyle] = useState(null); // e.g. "style1"
  const [showPreview, setShowPreview] = useState(false);

  const renderCVPreview = () => {
    switch (selectedStyle) {
      case 'style1':
        return <CVStyle1 data={formData}         profileImage={profileImage}
        setProfileImage={setProfileImage}/>;
      case 'style2':
        return <CVStyle2 data={formData}         profileImage={profileImage}
        setProfileImage={setProfileImage}/>;
      default:
        return <p>Please select a style.</p>;
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>CV Builder</h2>
      <CVStyleSelector selected={selectedStyle} onSelect={setSelectedStyle} />
      {!showPreview ? (
        <CVForm
        profileImage={profileImage}
        setProfileImage={setProfileImage}
          formData={formData}
          setFormData={setFormData}
          onPreview={() => setShowPreview(true)}
        />
      ) : (
        <>
          <button onClick={() => setShowPreview(false)}>Back to Edit</button>
          {renderCVPreview()}
        </>
      )}
    </div>
  );
};

export default CVBuilder;
