// import React from "react";
// import Card from "../../Components/About/About";
// import { corePillars } from "../../store/CorePiller/CorePillers";

// const About: React.FC = () => {
//   return (
//     <div className="bg-gray-50  max-w-6xl mx-auto min-h-screen -m-14">
//       <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-38 px-40   text-center ">
//         <h1 className="text-4xl md:text-6xl font-bold mb-5">
//           About LandMark Developers
//         </h1>
//         <p className="text-lg md:text-2xl max-w-3xl mx-auto">
//           Building Trust. Creating Landmarks. Delivering Excellence in Real
//           Estate.
//         </p>
//       </section>

//       {/* ⚪ Who We Are Section */}
//       <section className="relative py-10 px-4 overflow-hidden">
//         <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl border-t-4 border-blue-800 p-10 md:p-16">
//           <div className="grid md:grid-cols-2 gap-12 items-center">
//             {/* Left Content */}
//             <div>
//               <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
//                 Who We Are
//               </h2>

//               <p className="text-gray-700 text-lg mb-6 leading-relaxed">
//                 LandMark Developers was founded with a vision to transform
//                 property aspirations into reality. We specialize in premium
//                 residential and commercial developments designed to deliver
//                 long-term value and modern living experiences.
//               </p>

//               <p className="text-gray-700 text-lg leading-relaxed">
//                 With a strong commitment to quality construction, transparency,
//                 and customer satisfaction, we help clients confidently invest,
//                 buy, and build their future.
//               </p>
//             </div>

//             {/* Right Image */}
//             <div>
//               <img
//                 src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
//                 alt="Real Estate"
//                 className="rounded-2xl shadow-lg w-full h-[350px] object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 🔵 What Makes Us Different */}
//       <section className="py-20 px-6 md:px-20 bg-blue-50">
//         <div className="max-w-6xl py-20  mx-auto text-center">
//           <h2 className="text-3xl md:text-5xl font-bold text-blue-900 mb-6">
//             What Makes Us Different?
//           </h2>

//           <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-16">
//             In a competitive real estate market, we stand out through strategic
//             planning, premium quality, and long-term client relationships.
//           </p>

//           <div className="grid md:grid-cols-3 gap-10">
//             <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
//               <h3 className="text-2xl font-bold text-blue-800 mb-4">
//                 Prime Locations
//               </h3>
//               <p className="text-gray-600">
//                 Carefully selected locations offering strong growth potential,
//                 accessibility, and lifestyle convenience.
//               </p>
//             </div>

//             <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
//               <h3 className="text-2xl font-bold text-blue-800 mb-4">
//                 Superior Construction
//               </h3>
//               <p className="text-gray-600">
//                 High-quality materials and modern architectural designs ensure
//                 durability, elegance, and long-term value.
//               </p>
//             </div>

//             <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300">
//               <h3 className="text-2xl font-bold text-blue-800 mb-4">
//                 Trusted Partnerships
//               </h3>
//               <p className="text-gray-600">
//                 Transparent dealings and dedicated support help us build lasting
//                 relationships with every client.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* 🔵 CTA Section */}
//       <section className="py-20 px-6 text-center">
//         <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
//           Ready to Find Your Dream Property?
//         </h2>

//         <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
//           Let us help you invest in a property that offers comfort, growth, and
//           long-term value.
//         </p>

//         <button className="px-10 py-4 bg-blue-800 hover:bg-blue-900 text-blue font-semibold rounded-xl shadow-md hover:shadow-xl transition duration-300">
//           Contact Us Today
//         </button>
//       </section>

//       {/* 🔵 Our Journey */}
//       <section className="py-20 px-6 md:px-20">
//         <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-10 md:p-16">
//           <h3 className="text-3xl font-bold text-blue-900 mb-8 text-center">
//             Our Journey
//           </h3>

//           <div className="text-gray-700 text-lg leading-relaxed space-y-6">
//             <p>
//               LandMark Developers was established with a mission to transform
//               the real estate landscape through quality construction and
//               innovative design. What started as a small team of passionate
//               builders has grown into a full-service real estate developer
//               trusted by hundreds of families and businesses.
//             </p>

//             <p>
//               Over the years, we've evolved from constructing individual homes
//               to developing comprehensive residential and commercial
//               communities, always staying true to our core values: integrity,
//               quality, and customer satisfaction.
//             </p>

//             <p>
//               Today, we continue to push boundaries, embrace modern
//               architectural trends, and deliver properties that make a real
//               difference in how people live and work.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* 🔵 Vision & Mission */}
//       <section className="py-20 px-6 md:px-20 bg-blue-50">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-4xl font-bold text-blue-900 mb-12">
//             Vision & Mission
//           </h2>

//           <div className="grid md:grid-cols-2 gap-10">
//             <div className="bg-white p-10 rounded-2xl shadow-lg">
//               <h3 className="text-2xl font-bold text-blue-800 mb-4">Vision</h3>
//               <p className="text-gray-600">
//                 To be the most trusted real estate developer that empowers
//                 families and businesses to find their perfect space by making
//                 quality housing accessible, practical, and transformative for
//                 people from all walks of life.
//               </p>
//             </div>

//             <div className="bg-white p-10 rounded-2xl shadow-lg">
//               <h3 className="text-2xl font-bold text-blue-800 mb-4">Mission</h3>
//               <p className="text-gray-600">
//                 We exist to deliver exceptional properties that solve real
//                 living and business needs through innovative design, quality
//                 construction, and unwavering commitment to customer
//                 satisfaction.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 px-6 md:px-20">
//         <div className="max-w-6xl mx-auto">
//           <h2 className="text-4xl font-bold text-blue-900 text-center mb-12">
//             Our Core Pillars
//           </h2>

//           <div className="grid md:grid-cols-3 gap-10">
//             {corePillars.map((pillar, index) => (
//               <Card
//                 key={index}
//                 image={pillar.image}
//                 title={pillar.title}
//                 description={pillar.description}
//               />
//             ))}
//           </div>
//         </div>
//       </section>
//       {/* 🔵 Our Expertise */}
//       <section className="py-20 px-6 md:px-20 bg-blue-50">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-4xl font-bold text-blue-900 mb-12">
//             Our Expertise
//           </h2>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 title: "Residential Projects",
//                 desc: "Luxury apartments and villas",
//               },
//               {
//                 title: "Commercial Spaces",
//                 desc: "Modern office and retail spaces",
//               },
//               {
//                 title: "Property Management",
//                 desc: "End-to-end property solutions",
//               },
//               {
//                 title: "Interior Design",
//                 desc: "Contemporary interior solutions",
//               },
//               {
//                 title: "Project Consulting",
//                 desc: "Expert real estate advisory",
//               },
//               {
//                 title: "Land Development",
//                 desc: "Strategic land acquisition & development",
//               },
//             ].map((tech, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
//               >
//                 <h4 className="text-xl font-bold text-blue-800 mb-2">
//                   {tech.title}
//                 </h4>
//                 <p className="text-gray-600">{tech.desc}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* 🔵 CTA Section */}
//       <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white text-center py-20 px-6">
//         <h2 className="text-4xl font-bold mb-6">
//           Ready to Find Your Perfect Property?
//         </h2>
//         <p className="text-lg max-w-2xl mx-auto mb-8">
//           Partner with LandMark Developers and discover how the right property
//           can transform your living and working experience.
//         </p>

//         <button
//           onClick={() =>
//             window.open("https://landmarkdevelopers.com/contact", "_blank")
//           }
//           className="bg-white text-blue-900 font-semibold px-10 py-4 rounded-xl shadow-lg hover:scale-105 transition duration-300"
//         >
//           Get In Touch
//         </button>
//       </section>
//     </div>
//   );
// };

// export default About;
 import React from "react";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    // <div className="bg-white max-w-7xl mx-auto -mt-8 min-h-screen">
<div className="relative left-1/2 right-1/2 w-screen -ml-[50vw] -mr-[50vw] bg-white -mt-8 min-h-screen">
  <section className="relative h-[80vh] flex items-center justify-center text-center text-white">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6">
            About <span className="font-bold">LANDMAARK DEVELOPERS</span>
          </h1>

          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200">
            Building Trust. Creating Landmaarks. Delivering Excellence in Real Estate.
          </p>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-28 px-6 md:px-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .6 }}
          >
            <span className="text-sm tracking-widest text-gray-800 block mb-3">
              ESTABLISHED
            </span>

            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Who <span className="font-bold">We Are</span>
            </h2>

            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              LaandMark Developers was founded with a vision to transform
              property aspirations into reality. We specialize in premium
              residential and commercial developments designed to deliver
              long-term value and modern living experiences.
            </p>

            <p className="text-gray-600 text-lg leading-relaxed">
              With a strong commitment to quality construction, transparency,
              and customer satisfaction, we help clients confidently invest,
              buy, and build their future.
            </p>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .6 }}
            className="relative group"
          >
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
              className="rounded-xl shadow-2xl w-full h-[420px] object-cover"
            />

            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition rounded-xl"></div>
          </motion.div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="py-28 bg-gray-50 px-6 md:px-20">

        <div className="text-center mb-20">
          <span className="text-sm tracking-widest text-gray-400 block mb-3">
            OUR ADVANTAGE
          </span>

          <h2 className="text-4xl md:text-5xl font-light mb-6">
            What Makes Us <span className="font-bold">Different</span>
          </h2>

          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            In a competitive real estate market, we stand out through strategic planning,
            premium quality, and long-term client relationships.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {[
            {
              title: "Prime Locations",
              desc: "Carefully selected locations offering strong growth potential and accessibility.",
            },
            {
              title: "Superior Construction",
              desc: "High-quality materials and modern architectural designs ensure durability.",
            },
            {
              title: "Trusted Partnerships",
              desc: "Transparent dealings and dedicated support build lasting client relationships.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-10 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-t-4 border-black"
            >
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
<section className="py-28 text-center bg-[#f5f2ec] text-black px-6">
        <h2 className="text-4xl md:text-5xl font-light mb-6">
          Ready to Find Your <span className="font-bold">Dream Property?</span>
        </h2>

<p className="max-w-2xl mx-auto mb-10 text-gray-900">          Let us help you invest in a property that offers comfort,
          growth, and long-term value.
        </p>

        <button className="px-12 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition">
          Contact Us Today
        </button>

      </section>

    </div>
  );
};

export default About;