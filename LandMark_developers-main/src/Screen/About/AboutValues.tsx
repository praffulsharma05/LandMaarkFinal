import React from "react";
import { useTranslation } from "../../hooks/useTranslation";

interface AboutValuesProps {
  isMobile: boolean;
}

const AboutValues: React.FC<AboutValuesProps> = ({ isMobile }) => {
  const { t } = useTranslation();

  if (isMobile) {
    return (
      <div className="section-8-grid-wrapper">
        <ul className="section-8-points-list ab-no-margin">
          <li className="section-8-point-item">
            <span className="section-8-point-icon">🛡️</span>
            <div>
              <p className="section-8-point-title ab-left-nomargin font-bold">
                {t("about.value1Title")}
              </p>
              <p className="ab-value-desc">
                {t("about.value1Desc")}
              </p>
            </div>
          </li>
          <li className="section-8-point-item">
            <span className="section-8-point-icon">💎</span>
            <div>
              <p className="section-8-point-title ab-left-nomargin font-bold">
                {t("about.value2Title")}
              </p>
              <p className="ab-value-desc">
                {t("about.value2Desc")}
              </p>
            </div>
          </li>
          <li className="section-8-point-item">
            <span className="section-8-point-icon">🤝</span>
            <div>
              <p className="section-8-point-title ab-left-nomargin font-bold">
                {t("about.value3Title")}
              </p>
              <p className="ab-value-desc">
                {t("about.value3Desc")}
              </p>
            </div>
          </li>
          <li className="section-8-point-item">
            <span className="section-8-point-icon">💡</span>
            <div>
              <p className="section-8-point-title ab-left-nomargin font-bold">
                {t("about.value4Title")}
              </p>
              <p className="ab-value-desc">
                {t("about.value4Desc")}
              </p>
            </div>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="ab-values-grid">
      <div className="ab-value-card">
        <div className="ab-value-icon">🛡️</div>
        <p className="ab-value-title font-bold">{t("about.value1Title")}</p>
        <p className="ab-value-desc">{t("about.value1Desc")}</p>
      </div>
      <div className="ab-value-card">
        <div className="ab-value-icon">💎</div>
        <p className="ab-value-title font-bold">{t("about.value2Title")}</p>
        <p className="ab-value-desc">{t("about.value2Desc")}</p>
      </div>
      <div className="ab-value-card">
        <div className="ab-value-icon">🤝</div>
        <p className="ab-value-title font-bold">{t("about.value3Title")}</p>
        <p className="ab-value-desc">{t("about.value3Desc")}</p>
      </div>
      <div className="ab-value-card">
        <div className="ab-value-icon">💡</div>
        <p className="ab-value-title font-bold">{t("about.value4Title")}</p>
        <p className="ab-value-desc">{t("about.value4Desc")}</p>
      </div>
    </div>
  );
};

export default AboutValues;
