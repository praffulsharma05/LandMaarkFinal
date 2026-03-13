// import React from "react";
// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const containerStyle = {
//   width: "100%",
//   height: "100%",
// };

// const center = {
//   lat: -33.9,
//   lng: 151.2,
// };

// const beaches = [
//   { lat: -33.890542, lng: 151.274856, title: "Bondi Beach" },
//   { lat: -33.923036, lng: 151.259052, title: "Coogee Beach" },
//   { lat: -34.028249, lng: 151.157507, title: "Cronulla Beach" },
//   { lat: -33.800101, lng: 151.287478, title: "Manly Beach" },
//   { lat: -33.950198, lng: 151.259302, title: "Maroubra Beach" },
// ];

// const MapComponent: React.FC = () => {
//   return (
//     <div className="w-full h-full">
//       <LoadScript googleMapsApiKey="AIzaSyC2hpxQ1Rx_06kbwK65U8p9Z0k_JcVojGk">
//         <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
//           {beaches.map((beach, index) => (
//             <Marker
//               key={index}
//               position={{ lat: beach.lat, lng: beach.lng }}
//               title={beach.title}
//               icon={{
//                 url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
//               }}
//             />
//           ))}
//         </GoogleMap>
//       </LoadScript>
//     </div>
//   );
// };

// export default MapComponent;