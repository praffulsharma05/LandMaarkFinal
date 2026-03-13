import React from "react";
import "./Home.css";
import SectionCard from "../../Components/HomePage/sectionCard3";
import { sectionData } from "../../store/HomePage/section";
import Section3Card from "../../Components/HomePage/Section2Card";
import { Section3Data } from "../../store/HomePage/Section3";
import Section4Card from "../../Components/HomePage/Section3Card";
import { section4CardData } from "../../store/HomePage/section4Card";
import Section5Card from "../../Components/HomePage/Section5Card";
import { Section5Card as Section5Data } from "../../store/HomePage/Section5Card";
import Section6Card from "../../Components/HomePage/Section6Card";
import { Section6Data } from "../../store/HomePage/Section6Card";
import useCarousel from "../../Hooks/useCarousel";

import Section7Card from "../../Components/HomePage/Section7Card";
import { Section7Data } from "../../store/HomePage/section7Card";

import Section8Card from "../../Components/HomePage/Section8Card";
import { Section8Data } from "../../store/HomePage/section8Card";
import Section9Card from "../../Components/HomePage/section9Card";
import { Section9Data } from "../../store/HomePage/section9Card";
 
import AIPrompt from "../AIPrompt/AIPrompt";

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("Form Submitted");
};

const Home: React.FC = () => {
  const currentIndex = useCarousel(Section6Data.length, 5000);

  return (
     
    <div className="-m-8">
      {/* Main Header Section */}
      <section className="relative w-screen  h-screen overflow-hidden left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
       
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075"
            alt="Luxury Dubai Property"
            className="w-full h-full object-cover"
          />
         
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

         
        <div className="absolute top-27 right-15 z-25 text-right">
          <h2 className="text-2xl font-bold tracking-widest text-white">
            LANDMAARK 
          </h2>
          
        </div>

        <div className="relative z-10 h-full flex items-center top-0 pl-10">
          <div className="max-w-4xl text-left">
            <h1 className="text-4xl font-bold leading-tight tracking-wide text-white">
              A LEGACY OF EXCELLENCE IN
            </h1>

            <h1 className="text-4xl font-bold leading-tight tracking-wide text-white">
                LUXURY REAL ESTATE
            </h1>

             

            <p className="text-xs tracking-wide text-gray-200 mt-4">
              CHOOSE FROM A RANGE OF APARTMENTS,
              <br />
              VILLAS AND TOWNHOUSES
            </p>

            <div className="mt-10 flex gap-8">
            

              <button   onClick={() => {
    document.getElementById('enquiry-form')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  }} className="rounded-btn">ENQUIRE NOW</button>
            </div>
          </div>
          <AIPrompt />
        </div>
      </section>
     {/* Second Section */}
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-gray-100 py-10 px-4 md:px-32">
        
        <h2 className="text-4xl md:text-5xl tracking-[6px] font-serif text-teal-950 mb-10">
          FIND YOUR PERFECT HOME
        </h2>

         
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Section3Data.map((item) => (
            <Section3Card
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
              price={item.price}
            />
          ))}
        </div>

   
        <div className="mt-20">
          <button className="rounded-btn  ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 2a.5.5 0 0 1 .5.5V6h1V3.5a.5.5 0 0 1 1 0V6h1V4.5a.5.5 0 0 1 1 0V6h.5a2 2 0 0 1 2 2v1.5c0 2.5-2 4.5-4.5 4.5S4 12 4 9.5V6.5a.5.5 0 0 1 1 0V9a1 1 0 0 0 2 0V2.5a.5.5 0 0 1 .5-.5z" />
            </svg>
            VIEW MORE
          </button>
        </div>
      </section>
      {/* Third Section */}
        
      <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-[#f5f2ec] py-10 px-4 md:px-32">
        <div className="w-full px-6 lg:px-20">
          <div className="text-center mb-10">
            <h2 className="text-6xl tracking-wider text-teal-900 font-light">
              WHY LandMaark PROPERTIES?
            </h2>

            <p className="mt-4 text-gray-700 max-w-5xl mx-auto leading-relaxed text-lg">
              Renowned for iconic developments and exceptional craftsmanship,
              LandMaark Properties blends elegance, innovation, and world-class
              amenities.
            </p>
          </div>

           <div className="grid md:grid-cols-3 gap-10">
            {sectionData.map((item, index) => (
              <SectionCard
                key={index}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>

          <p className="text-sm text-gray-500 mt-12">*As of Dec, 2025</p>
        </div>
      </section>

      <section className="bg-[#f4f4f2] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen py-10 px-4 md:px-32">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl tracking-[3px] font-semibold text-[#1c3b2a] mb-6">
            EXPLORE OUR ICONIC PROPERTIES
          </h2>

          <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed mb-16 text-sm md:text-base">
            LandMaark Properties is renowned for crafting luxurious residential
            towers, world-class communities, and exclusive island resort
            residences. From elegant LandMaark apartments in Dubai to
            sophisticated urban sanctuaries, every property blends innovative
            design with exceptional amenities, delivering an unparalleled living
            experience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {Section5Data.map((item) => (
              <Section5Card key={item.id} property={item} />
            ))}
          </div>
          <p className="mt-10">
            Explore LandMaark townhouses in Dubai, exquisite DAMAC villas, and
            off-plan projects that redefine modern luxury. With flexible DAMAC
            payment plans and prime locations, investing in DAMAC real estate
            has never been more accessible.
          </p>
          <div className="mt-10">
            <button className="rounded-btn"> Enquire Now</button>
          </div>
        </div>
      </section>
      
       
      <section className="bg-[#f6f3ee] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen py-5 px-4 md:px-32 ">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl tracking-[3px] font-semibold text-[#1c3b2a] mb-6">
            A WORLD OF LUXURY
          </h2>

          <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed mb-10 text-sm md:text-base">
            Discover the finest in DAMAC Properties Dubai from expansive master
            communities to exclusive designer branded residences through the
            LandMaark Properties official website and experience extraordinary
            living, effortlessly within your reach.
          </p>

          <div className="relative w-full h-150 overflow-hidden ">
            {Section6Data.map((item, index) => (
              <Section6Card
                key={item.id}
                item={item}
                isActive={index === currentIndex}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen  py-5 px-4 md:px-32">
        <div className="max-w-7xl mx-auto mb-10 mt-1 text-center">
          <h2 className="text-4xl md:text-5xl tracking-[6px] font-semibold text-[#1c3b2a] mb-6">
            CURATED COLLABORATIONS
          </h2>

          <p className="max-w-4xl mx-auto text-gray-600 text-lg leading-relaxed mb-16">
            LandMaark Properties brings new and exciting living concepts to life,
            with superior designs and details, by working with the finest
            designers and partnering with some of the most prestigious fashion
            and lifestyle brands.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {Section7Data.map((item) => (
              <Section7Card key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#f4f1ea] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen  py-5 px-4 md:px-32">
        <div className="max-w-8xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl tracking-[6px] font-semibold text-[#0d2c24] mb-8">
            EMPOWERING COMMUNITIES, BUILDING FUTURES
          </h2>

          <p className="max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed mb-16">
            The LandMaark Properties Foundation is a testament to our commitment
            to creating a positive impact. From supporting the One Million Arab
            Coders Initiative to our sustainability efforts, we believe in
            building a better tomorrow. Discover how we’re making a difference,
            one initiative at a time.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {Section8Data.map((item) => (
                <Section8Card key={item.id} item={item} />
              ))}
            </div>

            <div className="aspect-video  overflow-hidden shadow-lg">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="LandMark Properties"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl md:text-5xl tracking-[6px] font-semibold text-[#0d2c24] mb-16">
            WHY INVEST IN Ajmer?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {Section9Data.map((item) => (
              <Section9Card key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
      <section   id="enquiry-form" className="w-full bg-[#f4f1ec] h-220  ">

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 -mt-10">
          <div className="px-4 md:px-16 py-20 flex flex-col justify-center">
            <div className="flex  flex-wrap">
                <h2 className="text-4xl md:text-5xl text-left font-serif tracking-wide text-[#0d2c24] leading-snug  mb-60">
             Where Luxury Meets Legacy <br />
            </h2>
            <p className="max-w-3xl text-gray-600 leading-relaxed mb-100  text-sm md:text-base"> Discover the perfect blend of luxury and legacy at LandMaark Properties. </p>
            </div>
          </div>
          <div className="bg-[#dedede] px-10 md:px-16 py-20 h-220">
           <h3 className="text-4xl text-left md:text-3xl text-center tracking-wide text-[#2f3e46] mt-0 mb-0 border-b-2 border-[#2f3e46]  inline-block">
  DISCOVER YOUR NEXT ADDRESS
</h3>
            <p className="text-center text-xm text-gray-600 mb-10">
              *All fields are compulsory
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title" className="sr-only">
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Title *"
                  required
                  className="w-full bg-transparent border-b border-gray-500 focus:outline-none py-2"
                />
              </div>

              <div>
                <label htmlFor="firstName" className="sr-only">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name *"
                  required
                  className="w-full bg-transparent border-b border-gray-500 focus:outline-none py-2"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="sr-only">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name *"
                  required
                  className="w-full bg-transparent border-b border-gray-500 focus:outline-none py-2"
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email *"
                  required
                  className="w-full bg-transparent border-b border-gray-500 focus:outline-none py-2"
                />
              </div>

              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 Phone *"
                  required
                  className="w-full bg-transparent border-b border-gray-500 focus:outline-none py-2"
                />
              </div>

              <div>
                <label htmlFor="country" className="sr-only">
                  Select Country
                </label>
                <select
                  id="country"
                  name="country"
                  required
                  className="w-full bg-transparent border-b border-gray-500 focus:outline-none py-2"
                >
                  <option value="">Select Country *</option>
                  <option value="India">India</option>
                  <option value="UAE">UAE</option>
                  <option value="UK">UK</option>
                </select>
              </div>

              <div>
                <label htmlFor="userType" className="sr-only">
                  User Type
                </label>
                <select
                  id="userType"
                  name="userType"
                  className="w-full bg-transparent border-b border-gray-500 focus:outline-none py-2"
                >
                  <option value="">Select Purpose</option>
                  <option value="Investor">Investor</option>
                  <option value="Buyer">Buyer</option>
                </select>
              </div>

              <div>
                <label htmlFor="comments" className="sr-only">
                  Comments
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  placeholder="Comments"
                  rows={3}
                  className="w-full bg-transparent border-b border-gray-500 focus:outline-none py-2 resize-none"
                />
              </div>

              {/* Submit */}
              <button className="rounded-btn">Get a call back!</button>
            </form>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="bg-[#e6e6e6] py-10">
          <h2 className="text-5xl md:text-6xl text-gray-500 px-10 md:px-20 font-light">
            Live the luxury
          </h2>
        </div>
      </section>
    </div>
  );
};

export default Home;















  // <section className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-black py-20 px-4 md:px-32">
  //       <div className="max-w-8xl  ">
  //         {/* Title */}
  //         <h2 className="text-6xl md:text-3xl text-white  font-bold text-center mb-3">
  //           A LEGACY OF EXCELLENCE IN
  //         </h2>
  //         <h3 className="text-5xl md:text-3.5xl font-bold text-amber-50 text-center mb-10">
  //           LUXURY REAL ESTATE
  //         </h3>

  //         {/* Description */}
  //         <p className="text-gray-300 text-lg text-center max-w-4xl mx-auto leading-relaxed mb-16">
  //           LandMaark Properties, a part of the prestigious DAMAC Group, has been
  //           redefining the luxury real estate landscape in the Middle East since
  //           1982, offering a portfolio of iconic residential, commercial, and
  //           leisure properties across the region and beyond.
  //         </p>
          // <div className="grid md:grid-cols-3 gap-10">
          //   {sectionData.map((item, index) => (
          //     <SectionCard
          //       key={index}
          //       title={item.title}
          //       description={item.description}
          //     />
          //   ))}
          // </div>
  //       </div>
  //       {/* Know More Button */}
  //       <div className="text-center mt-10">
  //         <button className="minor-btn">KNOW MORE {">>"}</button>
  //       </div>
  //       <p className="text-white mt-10">
  //         *Terms and conditions apply. **Based on branded projects in the last
  //         two years.
  //       </p>
  //     </section>
  