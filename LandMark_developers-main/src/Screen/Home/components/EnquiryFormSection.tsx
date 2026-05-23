import React from "react";
import { useTranslation } from "../../../hooks/useTranslation";
import EnquiryForm from "./EnquiryForm";

export const EnquiryFormSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <section id="enquiry-form" className="enquiry-section-desktop">
        <div className="enquiry-grid-desktop">
          {/* Left Text */}
          <div className="enquiry-left-desktop">
            <div className="enquiry-left-title-desktop">
              {t("home.luxuryMeetsLegacy")}
            </div>

            <p className="enquiry-left-desc-desktop">
              {t("home.luxuryMeetsLegacyDesc")}
            </p>
          </div>

          {/* Form */}
          <div className="enquiry-right-desktop">
            <div className="enquiry-right-title-desktop">
              {t("home.discoverNextAddress")}
            </div>

            <p className="enquiry-mandatory-text">
              {t("home.fieldsCompulsory")}
            </p>

            <EnquiryForm
              formClassName="enquiry-form-wrapper"
              inputClassName="enquiry-input"
              textareaClassName="enquiry-textarea"
              buttonClassName="rounded-btn text-sm"
            />
          </div>
        </div>

        <div className="enquiry-footer-desktop">
          <div className="enquiry-footer-title-desktop">
            {t("home.liveTheLuxury")}
          </div>
        </div>
      </section>

      <section className="enquiry-section-mobile">
        <div className="enquiry-title-mobile">
          {t("home.luxuryMeetsLegacy")}
        </div>

        <p className="enquiry-desc-mobile">
          {t("home.luxuryMeetsLegacyDesc")}
        </p>

        <div className="enquiry-form-card-mobile">
          <div className="enquiry-form-title-mobile">
            {t("home.discoverNextAddress")}
          </div>

          <p className="enquiry-mandatory-text">
            {t("home.fieldsCompulsory")}
          </p>

          <EnquiryForm
            formClassName="enquiry-form-mobile"
            inputClassName="enquiry-input-mobile"
            textareaClassName="enquiry-textarea-mobile"
            buttonClassName="rounded-btn enquiry-btn-mobile"
          />
        </div>
      </section>
    </>
  );
};
