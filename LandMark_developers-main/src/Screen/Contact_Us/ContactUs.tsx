 
 
import React from "react";

 const ContactUs: React.FC = () => {
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.3572654485392!2d75.83077757543877!3d26.892154476659382!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db73f355671c9%3A0x9f2324b9a7d96309!2sAlvion%20Technologies!5e0!3m2!1sen!2sin!4v1774440608643!5m2!1sen!2sin`;
  return (
    <div
      className="relative left-1/2 -m-8 right-1/2 -ml-[50vw] -mr-[50vw] w-screen min-h-screen
      bg-[radial-gradient(circle_at_top,_#1e293b,_#0f172a_40%,_#020617_100%)]
      text-white overflow-hidden"
    >
      {/* Ambient Glow */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-3xl" />

      {/* HEADER */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="w-full px-6 lg:px-16 py-4 flex items-center justify-center">
          <h1 className="text-sm md:text-base mt-30 font-semibold tracking-[0.4em] uppercase text-white/80">
            LANDMAARK DEVELOPERS
          </h1>
        </div>
        
      </header>

      {/* MAP SECTION */}
      <div className="relative w-full h-[450px] right-10  md:h-[450px] lg:h-[450px] mt-30 overflow-hidden rounded-2xl">
      <iframe
        title="Google Map of Location"
        src={mapUrl}
        className="absolute  left-[20%] w-250 h-full"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>

      {/* MAIN CONTENT */}
      <main className="w-full px-6 md:px-16 lg:px-32 py-20 grid lg:grid-cols-2 gap-20 items-start">

        {/* LEFT TEXT */}
        <div>
          
          <div className="  h-[400px] w-full">
      {/* Other Contact Content */}

     </div>
          <h2 className="text-5xl lg:text-6xl font-light leading-tight">
            Let’s Build Your
            <span className="block font-semibold text-amber-400">
              Luxury Future
            </span>
          </h2>

          <div className="mt-8 h-[2px] w-24 bg-gradient-to-r from-amber-400 to-transparent" />

          <p className="text-white/60 text-lg mt-8 leading-relaxed max-w-xl">
            Speak with our private advisors and gain exclusive access to Dubai’s
            most prestigious real estate developments and off-market
            opportunities.
          </p>
        </div>

        {/* CONTACT FORM */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]">
          <form className="space-y-8">

            {[
              {
                label: "Full Name",
                type: "text",
                placeholder: "Rahul",
              },
              {
                label: "Email",
                type: "email",
                placeholder: "rahul@gmail.com",
              },
              {
                label: "Phone",
                type: "tel",
                placeholder: "+91 4343422332",
              },
            ].map((field, index) => (
              <div key={index} className="space-y-3">
                <label className="text-xs tracking-[0.3em] uppercase text-amber-400">
                  {field.label}
                </label>

                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-300 placeholder:text-white/40"
                />
              </div>
            ))}

            <div className="space-y-3">
              <label className="text-xs tracking-[0.3em] uppercase text-amber-400">
                Investment in Ajmer
              </label>



              <select className="w-full bg-black/40 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all duration-300">
                <option>PanchSheel</option>
                <option>Gulab Bari</option>
                <option>Gandhi Nagar</option>
                <option>Vashali Nagar</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-semibold py-5 rounded-2xl tracking-[0.35em] uppercase text-xs shadow-[0_25px_60px_-10px_rgba(251,191,36,0.7)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300"
            >
              Request Private Call
            </button>

          </form>
        </div>

      </main>
    </div>
  );
};

export default ContactUs;
  