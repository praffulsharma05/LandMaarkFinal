// export interface Property {
//   id: number;
//   title: string;
//   location: string;
//   price: string;
//   image: string;
// }

// export const propertiesData: Property[] = [
//   {
//     id: 1,
//     title: "LandMark Riverside Views",
//     location: "Dubai Investment Park 2, UAE",
//     price: "FROM INR 2.9 CRORES",
//     image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
//   },
//   {
//     id: 2,
//     title: "DAMAC Islands 2",
//     location: "Dubailand, Dubai, UAE",
//     price: "FROM INR 6.7 CRORES",
//     image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
//   },
//   {
//     id: 3,
//     title: "Chelsea Residences",
//     location: "Dubai Maritime City, UAE",
//     price: "FROM INR 5.4 CRORES",
//     image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
//   },
//   {
//     id: 4,
//     title: "Canal Heights II",
//     location: "Business Bay, Dubai, UAE",
//     price: "FROM INR 6.8 CRORES",
//     image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
//   },
// ];
export interface Property {
  id: number;
  title: string;
  price: string;
  location: string;
  
  area: string;
  image: string;
  tag: string;
}

export const propertiesData: Property[] = [
  {
    id: 1,
    title: "Azure Bay Villa",
    price: "$1,250,000",
    location: "Gulab Bari, Ajmer",
    
    area: "3,200 sqft",
    tag: "FOR SALE",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC2ASbkM2Z5XfrmbA6bCMcT5P12r7DFw_4c5d_4Kn5PqUdWKgqSd831In0qO08DvCGYLBCZsaaac27nl8V4lQF4FPcGQEwZn-HiTGZ_9d6G8gtvzVQUm_TUap1eqT3ehYfjVCTBMXaB_u93RLaNSYnm8HnMbR_jxA0dCGSvvB2Kl_HFF3uwUdwPnfjpK5tCJ3brsnhu6d1KoOsmTAJNMnBEFtcIxok1-V8catRs4SchijbSC5q02jnmLpWWzQXE48ZSAVG2Qi_mFIY",
  },
  {
    id: 2,
    title: "The Pine Ridge",
    price: "$4,500/mo",
    location: "panchsheel,Ajmer",
    
    area: "2,100 sqft",
    tag: "FOR RENT",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAAebCCsuZi9rALNKxGSLk0B_wbPuh-jj-YL_sgx4C4xwVfwIODtilis1sKI2El3xr4V3IwpMYEQ4rnVuQuR0R1Iq-mMbtxMzBSL5CLRZ4CB015nM8T5j6vRRcBhbo2WYf6_GL99CbLqBTcJiCjxaGj2gt_-XWUCtpa1pDXfxXHYd3LGOhc6pKCSw_yu16Zg0jSdY66_Q9r4dDcPVB-tG_Cy_GhB5u4gxZYathTLockDerTPfEX50dYgtNL-rkx4MzSPmLHehFLR6w",
  },
  {
    id: 3,
    title: "Skyline Heights",
    price: "$2,800,000",
    location: "Ramganj, Ajmer",
    
    area: "2,850 sqft",
    tag: "PREMIUM",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA8Bu7JfdLKxoU5nWGMvKWVk_7OQ7i_QPKDmcBGPefZYSoclgO939zoZlJyx9Eqne_0Mnc4N2HxQv28geheXtbF-YCrX5eFKkLzBiZ-jVY4Q_Tqz0Oam02bSXW4OXOfWbliqZ5xlRnTHMuPr7-dyJdLJj2T8vLie-wJQpm0tp99qsEg882_u77yxc4dPYl2P0-Mmvcynap4FyP6X0G7WPjdz-F6HL5y9XJ9JTOzmtylF7vE7RTjxkxxCG88Ct8bLtxn_bs5fPqNgB4",
  },
    {
    id: 4,
    title: "LandMark Riverside Views",
    location: "Vashali, Ajmer",
      price: "FROM INR 2.9 CRORES",
    
    area: "2,850 sqft",
    tag: "PREMIUM",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: 5,
    title: "DAMAC Islands 2",
    location: "Near Anant Vihar, Ajmer",
    price: "FROM INR 6.7 CRORES",
     
    area: "2,850 sqft",
    tag: "PREMIUM",
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
  },
  {
    id: 6,
    title: "Chelsea Residences",
    location: "Pahar Ganj, Ajmer",
    price: "FROM INR 5.4 CRORES",
     
    area: "2,850 sqft",
    tag: "PREMIUM",
    image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c",
  },
  {
    id: 7,
    title: "Canal Heights II",
    location: "Dhanmandi, Ajmer",
    price: "FROM INR 6.8 CRORES",
     
    area: "2,850 sqft",
    tag: "PREMIUM",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },

];