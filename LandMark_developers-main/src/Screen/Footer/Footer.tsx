 

import React from "react";
import {
  Phone,
  MapPin,
  Mail,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  const locations = [
    
    {
      city: "Ajmer- LandMark Properties",
      address: "676H+2G2 -  Street New Salata, Doha, Qatar",
      phone: "CALL NOW",
    },
    
  ];

  const agencies = [
    ""
  ];

  const socialLinks = [
    {
      icon: Facebook,
      href: "https://facebook.com/damacproperties",
      label: "Facebook",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/damacproperties",
      label: "Twitter",
    },
    {
      icon: Instagram,
      href: "https://instagram.com/damacproperties",
      label: "Instagram",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/damacproperties",
      label: "YouTube",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/damac-properties",
      label: "LinkedIn",
    },
  ];

  return (
<footer className="bg-black text-white w-full h-full relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen pt-10 pb-0 px-4 md:px-36">
      <div className="max-w-7xl mx-auto">
        {/* DAMAC Logo with yellow accent */}
        <div className="mb-10 relative">
          <h1 className="text-4xl font-bold tracking-wider text-white">
            LandMaark
          </h1>
         </div>

        {/* Locations Grid */}
        

      
<div className="border-t border-gray-900 pt-5">
  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">

    {/* Locations */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {locations.map((location, index) => (
        <div
          key={index}
          className="border-t border-gray-800 pt-4 hover:border-yellow-400 transition-colors duration-300"
        >
          <h3 className="text-sm font-semibold mb-2 text-gray-300 flex items-start">
            <MapPin className="w-3 h-3 mr-1 text-yellow-400 flex-shrink-0 mt-0.5" />
            <span>{location.city}</span>
          </h3>

          <p className="text-xs text-gray-400 mb-3 leading-relaxed pl-4">
            {location.address}
          </p>

          <div className="flex items-center text-xs text-gray-300 pl-4">
            <Phone className="w-3 h-3 mr-1 text-yellow-400" />
            <span className="hover:text-yellow-400 cursor-pointer transition-colors">
              {location.phone}
            </span>
          </div>
        </div>
      ))}
    </div>

    {/* Social Media Links */}
    <div>
      <h3 className="text-sm font-semibold mb-4 text-gray-100 relative inline-block">
        Follow Us
        <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-yellow-400"></div>
      </h3>

      <div className="flex items-center space-x-4">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-yellow-400 transition-colors duration-300"
            aria-label={social.label}
          >
            <social.icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    </div>

  </div>
</div>
        {/* Contact Info Bar with yellow accent */}
        <div className="border-t border-gray-800 mt-8 pt-8 ">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <a
                href="mailto:info@damacproperties.com"
                className="flex items-center hover:text-yellow-400 transition-colors"
              >
                <Mail className="w-3 h-3 mr-1 text-yellow-400" />
                info@damacproperties.com
              </a>
              <a
                href="https://damacproperties.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center hover:text-yellow-400 transition-colors"
              >
                <Globe className="w-3 h-3 mr-1 text-yellow-400" />
                www.LandMarkproperties.com
              </a>
            </div>

            {/* Copyright */}
            <div className="text-xs mb-8 text-gray-500">
              <p>
                © {new Date().getFullYear()}LandMark Properties. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

