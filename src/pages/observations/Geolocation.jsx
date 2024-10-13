import React from "react";

const GeoLocation = () => {
  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: new window.google.maps.LatLng(-33.91722, 151.23064),
      zoom: 16,
    });

    const iconBase =
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
    const icons = {
      parking: {
        icon: iconBase + "parking_lot_maps.png",
      },
      library: {
        icon: iconBase + "library_maps.png",
      },
      info: {
        icon: iconBase + "info-i_maps.png",
      },
    };
    const features = [
      { position: new window.google.maps.LatLng(-33.91721, 151.2263), type: "info" },
      { position: new window.google.maps.LatLng(-33.91539, 151.2282), type: "info" },
      { position: new window.google.maps.LatLng(-33.91747, 151.22912), type: "info" },
      { position: new window.google.maps.LatLng(-33.9191, 151.22907), type: "info" },
      { position: new window.google.maps.LatLng(-33.91725, 151.23011), type: "info" },
      { position: new window.google.maps.LatLng(-33.91872, 151.23089), type: "info" },
      { position: new window.google.maps.LatLng(-33.91784, 151.23094), type: "info" },
      { position: new window.google.maps.LatLng(-33.91682, 151.23149), type: "info" },
      { position: new window.google.maps.LatLng(-33.9179, 151.23463), type: "info" },
      { position: new window.google.maps.LatLng(-33.91666, 151.23468), type: "info" },
      { position: new window.google.maps.LatLng(-33.916988, 151.23364), type: "info" },
      { position: new window.google.maps.LatLng(-33.91662347903106, 151.22879464019775), type: "parking" },
      { position: new window.google.maps.LatLng(-33.916365282092855, 151.22937399734496), type: "parking" },
      { position: new window.google.maps.LatLng(-33.91665018901448, 151.2282474695587), type: "parking" },
      { position: new window.google.maps.LatLng(-33.919543720969806, 151.23112279762267), type: "parking" },
      { position: new window.google.maps.LatLng(-33.91608037421864, 151.23288232673644), type: "parking" },
      { position: new window.google.maps.LatLng(-33.91851096391805, 151.2344058214569), type: "parking" },
      { position: new window.google.maps.LatLng(-33.91818154739766, 151.2346203981781), type: "parking" },
      { position: new window.google.maps.LatLng(-33.91727341958453, 151.23348314155578), type: "library" },
    ];

    // Create markers.
    for (let i = 0; i < features.length; i++) {
      new window.google.maps.Marker({
        position: features[i].position,
        icon: icons[features[i].type].icon,
        map: map,
      });
    }
  };

  const loadScript = (url) => {
    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.defer = true;
    script.onload = initMap; // Initialize the map once the script loads
    document.body.appendChild(script);
  };

  React.useEffect(() => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBa37EdrOvxvXcegEsfxxm9YGOD8fQNZCQ&callback=initMap&v=weekly"
    );
  }, []);

  return (
    <div>
      <header>
        {/* Include your header component here */}
      </header>
      <main className="flex flex-col items-center py-12">
        <div className="container w-4/5">
          <div className="head flex flex-row items-end justify-end bg-gray-100 p-2 mb-4">
            <select className="h-8 mx-1">
              <option value="" selected disabled>
                Select Field
              </option>
              <option value="">Date</option>
              <option>Time</option>
              <option>City</option>
              <option>Temp.</option>
              <option>PH</option>
              <option>Depth</option>
              <option>O<sub>2</sub></option>
              <option>Conductivity</option>
              <option>Turbidity</option>
              <option>Chlorophyll</option>
              <option>SPM</option>
              <option>Lat.</option>
              <option>Long.</option>
              <option>Ref. R</option>
              <option>Ref. G</option>
              <option>Ref. B</option>
            </select>

            <select className="h-8 mx-1">
              <option value="" selected disabled>
                Select Operation
              </option>
              <option value="">&lt;</option>
              <option value="">&lt;=</option>
              <option value="">&gt;</option>
              <option value="">&gt;=</option>
              <option value="">=</option>
            </select>

            <input
              type="text"
              placeholder="Enter Value"
              className="h-8 mx-1 px-2"
            />
            <span className="flex flex-col items-end">
              <a href="" className="mb-1 text-blue-500 hover:underline">Go to Map</a>
              <input
                type="button"
                value="Search"
                className="cursor-pointer h-8 px-4 bg-blue-500 text-white rounded"
              />
            </span>
          </div>
          <div id="map" className="h-[400px] w-full"></div>
        </div>
      </main>
    </div>
  );
};

export default GeoLocation;
