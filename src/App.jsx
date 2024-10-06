import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import AppPage from './pages/App';
import CitizenScience from './pages/CitizenScience';
import ContactUs from './pages/ContactUs';
import Observations from './pages/Observations';
import Publications from './pages/Publications';
import VolunteerYourself from './pages/VolunteerYourself';
import './index.css';

const App = () => {
    return (
        <Router>
          <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/app" element={<AppPage />} />
                <Route path="/citizen-science" element={<CitizenScience />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/observations" element={<Observations />} />
                <Route path="/publications" element={<Publications />} />
                <Route path="/volunteer-yourself" element={<VolunteerYourself />} />
            </Routes>
        </Router>
    );
};

export default App;
