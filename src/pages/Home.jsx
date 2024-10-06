// src/pages/Home.jsx
import React, { useState } from 'react';

const images = [
  "/assets/images/slider/1.jpg",
  "/assets/images/slider/2.jpg",
  "/assets/images/slider/3.jpg",
  "/assets/images/slider/5.jpg"
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Slider Section */}
      <section className="relative my-8">
        <img
          src={images[currentIndex]}
          alt={`Slider Image ${currentIndex + 1}`}
          className="w-full rounded-lg shadow-md transition-opacity duration-500"
        />
        <button 
          onClick={prevImage} 
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
          &lt;
        </button>
        <button 
          onClick={nextImage} 
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
          &gt;
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white rounded px-4 py-2">
          {currentIndex + 1} / {images.length}
        </div>
      </section>

      {/* Section 1 */}
      <section className="section-1">
        <div className="content flex flex-col md:flex-row">
          <div className="image flex-1 mb-4">
            <img
              src="/assets/images/baner1.jpg"
              alt="Banner"
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <div className="text flex-1 p-4 md:p-8">
      <p className="text-lg leading-relaxed mb-4">
        The sixth SDG (Sustainable Development Goal) of the 2030 UN agenda for sustainable development seeks to ensure availability and sustainable management of water and sanitation for all. The requirement of adequate fresh water quality and quantity is must for successful human consumption, irrigation, fishing, and recreational uses. Water quality is a blanket term for how physical, chemical, and biological characteristics of a water sample measure up to a set of standards.
      </p>
      <p className="text-lg leading-relaxed">
        Water quality can be evaluated through a number of tests such as transparency, colour, odour, temperature, acidity, bacteria content, and biological diversity. The purpose of this project is to develop a process of citizen science-based data collection system for determination of parameters to quantify water quality namely turbidity, chlorophyll, suspended sediment etc. The data collection will be supported by a mobile application which captures images of the water body and extracts vital parameters which can be quantified through Inherent Optical Properties (IOP) of water. Other chemical properties can be measured concurrently through instruments and fed through the mobile application using the mobile app as a tool. The pervasive data will be collected and integrated into a common repository.
      </p>
    </div>
        </div>
      </section>

      {/* Section 2: Target Beneficiaries */}
      <section className="section-2 my-8">
        <div className="content text-center">
          <h2 className="text-2xl font-bold mb-4">TARGET BENEFICIARIES</h2>
          <p className="mb-4">The proposed work can be of different use to different stakeholders under different operational modes.</p>
          <div className="section-2-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Observation-only app",
                content: "Can used just to observe the measured values for personal use. Farmers can use to check suitability of water for irrigation. Citizens can use for checking usability of water for drinking."
              },
              {
                title: "Crowd source enabled app",
                content: "The application can be used by the people who can conduct the monitoring and upload the results on common server hence creating CITIZEN SCIENTISTS from common people."
              },
              {
                title: "Decision support app",
                content: "Governments can use it for decision making. Mission with such objectives needs a lot of ground data which can be analyzed later to identify the causative factors of pollution."
              },
              {
                title: "Mobile lab",
                content: "The user can be a scientist or someone looking to answer a specific question that requires sophisticated monitoring..."
              }
            ].map((card, index) => (
              <div key={index} className="card bg-white rounded-lg shadow-md p-4">
                <div className="display-content font-bold">{card.title}</div>
                <div className="hidden-content text-sm">{card.content}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
