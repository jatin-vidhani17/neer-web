import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import AppPage from './pages/App';
import CitizenScience from './pages/CitizenScience';
import ContactUs from './pages/ContactUs';
import Observations from './pages/Observations';
import GeoLocation from './pages/observations/Geolocation';
import Charts from './pages/observations/charts';
import DataTable from './pages/observations/datatable';
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
                <Route path="/observations/data-table" element={<DataTable />} />
                <Route path="/observations/charts" element={<Charts />} />
                <Route path="/observations/map" element={<GeoLocation />} />
                <Route path="/publications" element={<Publications />} />
                <Route path="/volunteer-yourself" element={<VolunteerYourself />} />
            </Routes>
        </Router>
    );
};

export default App;
