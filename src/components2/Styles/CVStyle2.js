import React from 'react';
import './style1.css';
import { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPhone, 
  faEnvelope, 
  faLocationDot, 
  faGlobe, 
  faCircle, 
  faDownload 
} from '@fortawesome/free-solid-svg-icons';

const RichardCV = ({ data, profileImage, setProfileImage }) => {
  const { 
    name, 
    email, 
    phone, 
    address, 
    profileSummary, 
    education, 
    skills,
    languages,
    website,
    experience,
    references,
    jobTitle
  } = data;

  const [show, setShow] = useState(false);
  const [btnshow, setbtnShow] = useState(false);
  const [textColor, setTextColor] = useState();
  const [Leftcolor, setLeftColor] = useState();
  const [Rightcolor, setRightColor] = useState();
  const [FontSizepara, setFontSizepara] = useState();

  const cvRef = useRef();

  const fontParaSize = ["1", "2", "3", "4", "5", "6"];
  const colors = [
    { name: "yellow", code: "warning" },
    { name: "blue", code: "primary" },
    { name: "red", code: "danger" },
    { name: "light blue", code: "info" },
    { name: "green", code: "success" },
    { name: "white", code: "light" },
    { name: "black", code: "dark" }
  ];

  const downloadCV = () => {
    const input = cvRef.current;
    
    // Hide buttons before capturing
    const buttons = input.querySelectorAll('button');
    buttons.forEach(btn => btn.style.display = 'none');
    
    html2canvas(input, {
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${name || 'cv'}_resume.pdf`);
      
      // Show buttons again after capturing
      buttons.forEach(btn => btn.style.display = '');
    });
  };

  return (
    <>
      <div className={`cv-bigcontainer container text-${textColor || 'white'}`}>
        <div className="d-flex justify-content-start gap-2 mb-2">
          <button onClick={() => setShow(!show)} className="btn btn-primary">Styling</button>
          <button onClick={downloadCV} className="btn btn-success">
            <FontAwesomeIcon icon={faDownload} className="me-2" />
            Download CV
          </button>
        </div>

        <div id='cv-container' className="cv-container container" ref={cvRef}>
          <div className="row">
            {/* Styling Sidebars */}
            <div className={`sidenav1 d-${show ? 'inline-block' : 'none'}`}>
              <button 
                onClick={() => setbtnShow(!btnshow)} 
                type="button" 
                className="btn btn-danger dropdown-toggle" 
                data-bs-toggle="dropdown" 
                aria-expanded="false"
              >
                Font Size
              </button>

              <div className={`btn-group d-${btnshow ? 'inline-block' : 'none'}`}>
                <button 
                  type="button" 
                  className="btn btn-danger dropdown-toggle" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  paragraph
                </button>
                <ul className="dropdown-menu bg-black">
                  {fontParaSize.map((size, i) => (
                    <li key={i}>
                      <button 
                        onClick={() => {setFontSizepara(size)}} 
                        className="btn btn-primary"
                      >
                        {size}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={`sidenav2 d-${show ? 'inline-block' : 'none'}`}>
              <div className="btn-group">
                <button 
                  type="button" 
                  className="btn btn-danger dropdown-toggle" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  Left
                </button>
                <ul className="dropdown-menu bg-black">
                  {colors.map((color, i) => (
                    <li key={i}>
                      <button 
                        onClick={() => {setLeftColor(color.code)}}  
                        className={`btn btn-${color.code}`}
                      >
                        {color.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="btn-group">
                <button 
                  type="button" 
                  className="btn btn-danger dropdown-toggle" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  Right
                </button>
                <ul className="dropdown-menu bg-black">
                  {colors.map((color, i) => (
                    <li key={i}>
                      <button 
                        onClick={() => {setRightColor(color.code)}}  
                        className={`btn btn-${color.code}`}
                      >
                        {color.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="btn-group">
                <button 
                  type="button" 
                  className="btn btn-danger dropdown-toggle" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  Text Color
                </button>
                <ul className="dropdown-menu bg-black">
                  {colors.map((color, i) => (
                    <li key={i}>
                      <button 
                        onClick={() => {setTextColor(color.code)}}  
                        className={`btn btn-${color.code}`}
                      >
                        {color.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
    {/* Left Column */}

    <div className={`col-md-4 left-column bg-${Leftcolor} text-${textColor? textColor: 'white'}`}>
      <div className="header-section d-flex justify-content-center align-items-center">
        {profileImage ? (
          <img className='mx-3 my-img' src={profileImage} alt="Profile" />
        ) : (
          <div className="profile-placeholder">
            <span>Profile Photo</span>
          </div>
        )}
      </div>

      {/* Contact Section */}
      {phone || email || address || website ? (
        <div className="section contact">
          <h3 className={`"section-title" text-${textColor? textColor: 'white'}`}>CONTACT</h3>
          {phone && <p className={`text-${textColor? textColor: 'white'}  fs-${FontSizepara}`}><FontAwesomeIcon icon={faPhone} className={`mx-2 icon text-${textColor? textColor: 'white'}`} />{phone}</p>}
          {email && <p className={`text-${textColor? textColor: 'white'} fs-${FontSizepara} `}><FontAwesomeIcon icon={faEnvelope} className={`mx-2 icon text-${textColor? textColor: 'white'}`}  />{email}</p>}
          {address && <p className={`text-${textColor? textColor: 'white'} fs-${FontSizepara} `}><FontAwesomeIcon icon={faLocationDot} className={`mx-2 icon text-${textColor? textColor: 'white'}`}  />{address}</p>}
          {website && <p className={`text-${textColor? textColor: 'white'} fs-${FontSizepara} `}><FontAwesomeIcon icon={faGlobe} className={`mx-2 icon text-${textColor? textColor: 'white'}`}  />{website}</p>}
        </div>
      ) : null}

      {/* Education Section */}
      {education.length > 0 && education[0].institution && (
        <div className={`"section" text-${textColor? textColor: 'white'}`}>
          <h3 className={`"section-title" text-${textColor? textColor: 'white'}`}>EDUCATION</h3>
          {education.map((edu, index) => (
            <div key={index} className={`"education-item" text-${textColor? textColor: 'white'} fs-${FontSizepara} `}>
              {edu.years && <p className={`"years "text-${textColor? textColor: 'white'} fs-${FontSizepara} `}>{edu.years}</p>}
             {edu.institution && <p className={`institution text-${textColor? textColor: 'white' } fs-${FontSizepara}`}>{edu.institution}</p>}
              {edu.degree && <p className={`"degree text-${textColor? textColor: 'white'} fs-${FontSizepara} `}>{edu.degree}</p>}
              {edu.gpa && <p className={`"gpa" text-${textColor? textColor: 'white'} fs-${FontSizepara} `}>{edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills Section */}
      {skills.length > 0 && (
        <div className={`"section" text-${textColor? textColor: 'white'}`}>
          <h3 className={`"section-title" text-${textColor? textColor: 'white'}`}>SKILLS</h3>
          <ul className="skills-list">
            {skills.map((skill, index) => (
              <li className={`fs-${FontSizepara}`} key={index}>
                <FontAwesomeIcon icon={faCircle} className="mx-2 fa-2xs" />
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Languages Section */}
      {languages.length > 0 && (
        <div className={`"section" text-${textColor? textColor: 'white'}`}>
          <h3 className={`"section-title" text-${textColor? textColor: 'white'}`}>LANGUAGES</h3>
          <ul className="languages-list">
            {languages.map((lang, index) => (
              <li className={`fs-${FontSizepara}`} key={index}>
                <FontAwesomeIcon icon={faCircle} className="mx-2 fa-2xs" />
                {lang}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

    {/* Right Column */}
    <div className={`col-md-8 right-column bg-${Rightcolor} text-${textColor? textColor: 'white'}`}>
      <div className="header-name">
        {name && <h1 className='name fs-100px '>{name}</h1>}
        {jobTitle && <h2 className='job'>{jobTitle}</h2>}
        {(name || jobTitle) && <div className="line"></div>}
      </div>

      {/* Profile Summary */}
      {profileSummary && (
        <div className={`"section" text-${textColor? textColor: 'white'}`}>
          <h3 className={`"section-title" text-${textColor? textColor: 'white'}`}>PROFILE</h3>
          <p className={`profile-text text-${textColor? textColor: 'white'} fs-${FontSizepara} `}>
            {profileSummary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {experience.length > 0 &&(
        <div className={`"section text-${textColor? textColor: 'white'}`}>
          <h3 className={`"section-title text-${textColor? textColor: 'white'}`}>WORK EXPERIENCE</h3>
          {experience.map((exp, index) => (
            <div key={index} className={`work-experience fs-${FontSizepara}`}>
              <h4 className={`title text-${textColor? textColor: 'white'}  fs-${FontSizepara}`}>{exp.title}</h4>
              <h4 className={`company text-${textColor? textColor: 'white'} fs-${FontSizepara}`}>{exp.company}</h4>
              {exp.duration && <p className={`duration text-${textColor? textColor: 'white'} fs-${FontSizepara}`}>{exp.duration}</p>}
              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <ul className={`"responsibilities text-${textColor? textColor: 'white'} fs-${FontSizepara}`}>
                  {exp.responsibilities.map((resp, i) => (
                    resp && <li key={i}>{resp}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* References */}
      {references.length > 0 && (
        <div className={`"section" text-${textColor? textColor: 'white'} `}>
          <h3 className={`"section-title" text-${textColor? textColor: 'white'}`}>REFERENCES</h3>
          {references.map((ref, index) => (
            <div key={index} className="reference">
                <p className={`"reference-name text-${textColor? textColor: 'white'} fs-${FontSizepara}`}>{ref.name}</p>
                {ref.position && <p className={`"reference-position text-${textColor? textColor: 'white'} fs-${FontSizepara}`}>{ref.position}</p>}
                {ref.phone && <p className={`"reference-contact text-${textColor? textColor: 'white'} fs-${FontSizepara}`}>Phone: {ref.phone}</p>}
                {ref.email && <p className={`"reference-contact text-${textColor? textColor: 'white'} fs-${FontSizepara}`}>Email: {ref.email}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
</div>
          </div>
      </>
  );
};

export default RichardCV;