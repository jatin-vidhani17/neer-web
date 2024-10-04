// src/pages/Home.jsx
import React from 'react';
import './Home.css'; // Import the Home.css file

const Home = () => {
  return (
    <div className="container">
      <div className="flex-images">
        <div className="image-container">
          <img 
            alt="Scenic view of a water body with mountains in the background" 
            className="image" 
            src="https://storage.googleapis.com/a1aa/image/yD4Ni8yRzgLeN6t5qXGuutceUg91TaHzBiDw5cv8WwUS4eFnA.jpg" 
          />
        </div>
        <div>
          <p className="text">
            The sixth SDG (Sustainable Development Goal) of the 2030 UN agenda for sustainable development seeks to ensure availability and sustainable management of water and sanitation for all. The requirement of adequate fresh water quality and quantity is must for successful human consumption, irrigation, fishing and recreational uses. Water quality is a blanket term for how physical, chemical and biological characteristics of a water sample measure up to a set of standards.
          </p>
          <p className="text margin-top">
            Water quality can be evaluated through a number of tests such as transparency, colour, odour, temperature, acidity, bacteria content, and biological diversity. The purpose of this project is to develop a process of citizen science-based data collection system for determination of parameters to quantify water quality namely turbidity, chlorophyll, suspended sediment etc. The data collection will be supported by a mobile application which captures images of water body and extract vital parameters which can be quantified through Inherent Optical Properties (IOP) of water. Other chemical properties can be measured concurrently through instruments and fed through the mobile application using mobile app as a tool. The pervasive data will be collected and integrated on a common repository.
          </p>
        </div>
      </div>
      <div className="margin-bottom">
        <h2 className="title">TARGET BENEFICIARIES</h2>
        <p className="text">
          The proposed work can be of different use to different stakeholders under different operational modes.
        </p>
      </div>
      <div className="flex-images">
        <div className="image-container">
          <img 
            alt="Scenic view of a water body with mountains in the background" 
            className="image" 
            src="https://storage.googleapis.com/a1aa/image/yD4Ni8yRzgLeN6t5qXGuutceUg91TaHzBiDw5cv8WwUS4eFnA.jpg" 
          />
        </div>
        <div className="image-container">
          <img 
            alt="Close-up of flowers in a natural setting" 
            className="image" 
            src="https://storage.googleapis.com/a1aa/image/aMEwLHS83B5lMFGS5kqgtb76TLnN6EXIBzoG7mQT6hIFuv4E.jpg" 
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
