import React from 'react';
import CVBuilder from './components2/CVBuilder';
import Navbar from './components2/Navbar';
function App() {
  return (
    // <Router>
    //   <Navbar/>
    //   <div className="App">
    //     <Routes>
    //       <Route path="/login" element={<LogIn />} />
    //       <Route path="/signup" element={<SignUp />} />
    //       <Route path="/mycvs" element={<MyCvs />} />
    //       <Route path="/edit-cv" element={<CVitem />} />
    //       <Route path="/home" element={<CVitem />} />
    //     </Routes>
    //   </div>
    // </Router>
  
    <div className="App">
      <Navbar 
      />
     <CVBuilder />
      {/* Other components go here */}
    </div>
      );
}

export default App;
