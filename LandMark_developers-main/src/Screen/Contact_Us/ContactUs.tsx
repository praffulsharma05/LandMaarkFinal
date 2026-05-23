import React from "react";
import "./ContactUs.css";
import { useTranslation } from "../../hooks/useTranslation";

const ContactUs: React.FC = () => {
  const { t } = useTranslation();
  const mapUrl = `https://www.google.com/maps?q=26.5395603,74.662056&output=embed`;

  return (
    <div className="cu-page">
      <div className="cu-glow-top" />
      <div className="cu-glow-bottom" />

      <div className="cu-map-section">
        <div className="cu-map-container">
          <iframe
            title={t("contact.mapTitle")}
            src={mapUrl}
            className="cu-map-iframe"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      <main className="cu-main">
        <div className="cu-text-content">
          <h1 className="cu-heading">
            {t("contact.heading")}
            <span className="cu-heading-highlight">{t("contact.headingHighlight")}</span>
          </h1>
          <div className="cu-divider" />
          <p className="cu-description">
            {t("contact.description")}
          </p>
        </div>

        <div className="cu-form-card">
          <form className="cu-form">
            {[
              { labelKey: "contact.fullNameLabel", type: "text", placeholderKey: "contact.fullNamePlaceholder" },
              { labelKey: "contact.emailLabel", type: "email", placeholderKey: "contact.emailPlaceholder" },
              { labelKey: "contact.phoneLabel", type: "tel", placeholderKey: "contact.phonePlaceholder" },
            ].map((field, index) => (
              <div key={index} className="cu-field">
                <label className="cu-label">{t(field.labelKey)}</label>
                <input
                  type={field.type}
                  placeholder={t(field.placeholderKey)}
                  className="cu-input"
                />
              </div>
            ))}
            <div className="cu-field">
              <label className="cu-label">{t("contact.investmentLabel")}</label>
              <select className="cu-select">
                <option>{t("contact.location1")}</option>
                <option>{t("contact.location2")}</option>
                <option>{t("contact.location3")}</option>
                <option>{t("contact.location4")}</option>
              </select>
            </div>
            <button type="submit" className="cu-submit-btn">
              {t("contact.submitBtn")}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;