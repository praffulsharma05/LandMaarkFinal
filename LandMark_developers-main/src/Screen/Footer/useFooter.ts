import { useState, useEffect } from "react";
import { fetchHomepageData, FooterDetails } from "../../services/HomeService";
import { initialFooterDetails } from "./FooterHelper";

export const useFooter = () => {
  const [footerDetails, setFooterDetails] = useState<FooterDetails>(initialFooterDetails);

  useEffect(() => {
    const loadFooter = async () => {
      const data = await fetchHomepageData();
      if (data) {
        const footerSrc = data.footer || {};
        setFooterDetails({
          logoText: footerSrc.logoText || data.logoText || "LandMaark",
          locations: footerSrc.locations || data.locations || [],
          socialLinks: footerSrc.socialLinks || data.socialLinks || [],
          websiteUrl: footerSrc.websiteUrl || data.websiteUrl || "www.LandMaarkproperties.com",
          websiteHref: footerSrc.websiteHref || data.websiteHref || "https://www.LandMaarkproperties.com",
          copyrightPattern: footerSrc.copyrightPattern || data.copyrightPattern || "© {year} LandMaark Properties. All rights reserved."
        });
      }
    };
    loadFooter();
  }, []);

  const copyrightText = footerDetails.copyrightPattern.replace(
    "{year}",
    new Date().getFullYear().toString()
  );

  return {
    footerDetails,
    copyrightText,
  };
};
