import React from "react";

const About = () => {
  return (
    <main className="flex flex-col items-center justify-center w-full px-12 py-0 mt-20">
      {/* Section 1: About NEER */}
      <section className="w-full border-b border-gray-300 mt-5" id="#aboutNeer">
        <div className="flex flex-col items-center justify-end w-full">
          <div className="w-full">
            <h1 className="text-center text-blue-600 m-0 p-0">About NEER</h1>
            <p className="text-justify text-lg text-gray-700 leading-7 my-2">
              Project NEER was conceived by the Department of Computer Science, Gujarat University under
              intellectual guidance from Space Application Centre (SAC), Indian Space Research Organisation
              (ISRO). The project is sponsored by the Department of Science and Technology (DST), India for
              the year 2021-2024. The main objective of the project is to exploit the power of Citizen Science
              tools in monitoring water bodies and managing water resources division support system.
            </p>
            <p className="text-justify text-lg text-gray-700 leading-7 my-2">
              NEER Application is used to determine the water quality in terms of the estimation of parameters
              like FUI Index, Turbidity, Chlorophyll, and SPM values.
            </p>
            <p className="text-justify text-lg text-gray-700 leading-7 my-2">
              These parameters are measured through camera clicking and Temp, PH, Depth, Dissolved oxygen,
              Conductivity, and Secchi depth are manually measured through instruments. Before that, the user
              has to set the location by GPS/Manually, and based on that Lat, Lon values can be easily fetched.
            </p>
            <p className="text-justify text-lg text-gray-700 leading-7 my-2">
              After selecting the water body, the user can select the relevant parameters of that corresponding
              water body.
            </p>
            <p className="text-justify text-lg text-gray-700 leading-7 my-2">
              The FUI index calculates the water index color through capturing the image of water. NEER has an
              easy-to-use interface that guides users through the collection of three images: a gray card image,
              a sky image, and a water image.
            </p>
            <p className="text-justify text-lg text-gray-700 leading-7 my-2">
              NEER App requires the use of an 18% photographer's gray card as a reference. Gray cards are
              widely available at photography shops and online.
            </p>
            <p className="text-justify text-lg text-gray-700 leading-7 my-2">
              Once the images are taken, they can be analyzed immediately. In the analysis of the images, NEER
              calculates the reflectance of the water body in the RGB color channels of the camera. It then uses
              the reflectance values to determine the turbidity of the water in NTU (nephelometric turbidity units).
            </p>
            <p className="text-justify text-lg text-gray-700 leading-7 my-2">
              The Secchi Disk is a round white disk, lowered into the water body to determine the SECCHI DEPTH,
              which measures the clarity of water.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Parameters Used */}
      <section className="w-full border-b border-gray-300 mt-5" id="#parametersUsed">
        <h1 className="text-center text-blue-600 m-0 p-0">What are the parameters used?</h1>
        <ul className="list-disc list-inside w-full px-7">
          <li className="text-justify text-lg text-gray-700 leading-7 my-2">Turbidity</li>
          <li className="text-justify text-lg text-gray-700 leading-7 my-2">FUI index</li>
          <li className="text-justify text-lg text-gray-700 leading-7 my-2">Chlorophyll</li>
          <li className="text-justify text-lg text-gray-700 leading-7 my-2">Temperature</li>
          <li className="text-justify text-lg text-gray-700 leading-7 my-2">pH</li>
          <li className="text-justify text-lg text-gray-700 leading-7 my-2">DO (Dissolved Oxygen)</li>
          <li className="text-justify text-lg text-gray-700 leading-7 my-2">Conductivity</li>
          <li className="text-justify text-lg text-gray-700 leading-7 my-2">Secchi depth</li>
        </ul>
      </section>

      {/* Section 3: What does this app do? */}
      <section className="w-full border-b border-gray-300 mt-5" id="#appDo">
        <h1 className="text-center text-blue-600 m-0 p-0">What does this App do?</h1>
        <p className="text-justify text-lg text-gray-700 leading-7 my-2">
          The NEER Application provides important information about the water quality parameters of inland
          water bodies. A registered volunteer (citizen scientist) captures a photo of the water body and measures
          chemical properties through instruments. The data is sent to a remote server tagged with the location,
          date, and time of the observation. The collected data repository is available for further analysis.
        </p>
      </section>

      {/* Section 4: Who are we? */}
      <section className="w-full border-b border-gray-300 mt-5" id="#weAre">
        <h1 className="text-center text-blue-600 m-0 p-0">Who are we?</h1>
        <p className="text-justify text-lg text-gray-700 leading-7 my-2">
          We are a collaborative workgroup of scientists (SAC), professors (Gujarat University), research scholars,
          and citizen scientists working together on major water issues.
        </p>
      </section>

      {/* Section 5: How to proceed */}
      <section className="w-full border-b border-gray-300 mt-5" id="#howToProceed">
        <h1 className="text-center text-blue-600 m-0 p-0">How to Proceed?</h1>
        <p className="text-justify text-lg text-gray-700 leading-7 my-2">
          Click the “Let’s get started” button to move on to the user information page. Set the location, select the
          water body, and enter the information manually. Images of water, a gray card, and the sky are taken for
          turbidity, chlorophyll, and FUI index estimation. Save the data on each page, and the final tab helps to
          submit the user data.
        </p>
      </section>

      {/* Section 6: How we use the data */}
      <section className="w-full border-b border-gray-300 mt-5" id="#dataUse">
        <h1 className="text-center text-blue-600 m-0 p-0">How will we use this data?</h1>
        <ol className="list-decimal list-inside w-full px-7">
          <li className="text-justify text-lg text-gray-700 leading-7 my-2">
            <h3 className="font-semibold text-lg text-blue-600">Observation-only app</h3>
            <p>Used to observe the measured values for personal use:</p>
            <ol className="list-alpha list-inside">
              <li className="text-justify text-lg text-gray-700 leading-7 my-2">Farmers can use it to check the suitability of water for irrigation.</li>
              <li className="text-justify text-lg text-gray-700 leading-7 my-2">Citizens can use it to check the usability of water for drinking.</li>
            </ol>
          </li>
          <li className="text-justify text-lg text-gray-700 leading-7 my-2">
            <h3 className="font-semibold text-lg text-blue-600">Crowd-sourced app</h3>
            <p>
              The app enables people to conduct monitoring and upload the results to a common server, making
              citizens active participants in water monitoring.
            </p>
          </li>
          <li className="text-justify text-lg text-gray-700 leading-7 my-2">
            <h3 className="font-semibold text-lg text-blue-600">Decision support app</h3>
            <p>
              Governments can use it for decision-making, such as in the Clean Ganga mission for pollution control
              and water management.
            </p>
          </li>
          <li className="text-justify text-lg text-gray-700 leading-7 my-2">
            <h3 className="font-semibold text-lg text-blue-600">Mobile lab</h3>
            <p>
              Scientists or individuals can use the app for sophisticated monitoring of water bodies.
            </p>
          </li>
        </ol>
      </section>

      {/* Section 7: Conclusion */}
      <section className="w-full border-b border-gray-300 mt-5" id="#conclusion">
        <h1 className="text-center text-blue-600 m-0 p-0">Conclusion</h1>
        <p className="text-justify text-lg text-gray-700 leading-7 my-2">
          Project NEER aims to empower citizens to become active participants in monitoring their water bodies,
          thus enhancing community involvement in water resource management and sustainability efforts.
        </p>
      </section>
    </main>
  );
};

export default About;
