import React from "react";
import { Phone, MapPin, Globe } from "lucide-react";
import { getSocialIcon } from "./FooterHelper";
import { useFooter } from "./useFooter";
import "./Footer.css";
import { useTranslation } from "../../hooks/useTranslation";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { footerDetails, copyrightText } = useFooter();

  return (
    <footer className="footer-container">
      <div className="footer-max-width">
        <div className="footer-logo-section">
          <h1 className="footer-title">{footerDetails.logoText}</h1>
        </div>

        <div className="footer-divider">
          <div className="footer-grid">
            <div className="footer-locations">
              <div className="locations-grid">
                {footerDetails.locations.map((location, index) => (
                  <div key={index} className="location-item">
                    <h2 className="location-title">
                      <MapPin className="location-icon" />
                      <span>{location.city}</span>
                    </h2>
                    <p className="location-address">{location.address}</p>
                    <div className="location-contact">
                      <Phone className="location-icon" />
                      <span className="contact-phone-label">{location.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="footer-social-section">
              <h2 className="social-heading">
                {t("footer.followUs")}
                <div className="social-heading-underline"></div>
              </h2>

              <div className="social-icons">
                {footerDetails.socialLinks.map((social, index) => {
                  const IconComponent = getSocialIcon(social.platform);
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon-link"
                      aria-label={social.platform}
                    >
                      <IconComponent size={24} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div className="footer-bottom-flex">
            <div className="contact-links">
              <a
                href={footerDetails.websiteHref}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link-item"
              >
                <Globe className="location-icon" />
                {footerDetails.websiteUrl}
              </a>
            </div>

            <div className="copyright-text">
              <p>{copyrightText}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
