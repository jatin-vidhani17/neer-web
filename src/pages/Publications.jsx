import React, { useEffect, useState } from 'react';

const Publications = () => {
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    // Set your URL directly here
    const url = 'http://localhost:5173/assets/GEOSPATIAL_BASED_CITIZEN_CENTRIC_WATER_QUALITY_MEA.pdf';
    setPdfUrl(url);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow flex items-center justify-center">
        <section className="h-[85vh] w-full flex items-center justify-center mt-12">
          {pdfUrl ? (
            <iframe 
              src={pdfUrl} 
              title="PDF Viewer" 
              className="h-full w-[95%]" 
              allowFullScreen
            />
          ) : (
            <p className="text-gray-500">Loading PDF...</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Publications;
