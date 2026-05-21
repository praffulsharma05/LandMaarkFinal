import React from "react";
import { motion } from "framer-motion";
import "./About.css";
import { useTranslation } from "../../hooks/useTranslation";

const About: React.FC = () => {
  const { t } = useTranslation();



  return (
    <div className="ab-page">
      <section className="ab-hero">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
          className="ab-hero-img"
          alt={t("about.altHero")}
          loading="lazy"
        />
        <div className="ab-hero-overlay" />
        <div className="ab-hero-content">
          <h1 className="ab-hero-title">
            {t("about.heroTitle")}<span>{t("about.heroTitleHighlight")}</span>
          </h1>
          <p className="ab-hero-desc">
            {t("about.heroDesc")}
          </p>
        </div>
      </section>

      <section className="ab-section">
        <div className="ab-grid">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="ab-label">{t("about.establishedLabel")}</span>
            <h2 className="ab-heading">
              {t("about.whoWeAreTitle")}<span>{t("about.whoWeAreTitleHighlight")}</span>
            </h2>
            <p className="ab-text">
              {t("about.whoWeAreDesc1")}
            </p>
            <p className="ab-text ab-text-muted">
              {t("about.whoWeAreDesc2")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="ab-image-wrapper"
          >
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa"
              className="ab-img"
              alt={t("about.altOffice")}
              loading="lazy"
            />
            <div className="ab-img-overlay" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="ab-section ab-section-stats">
        <div className="ab-stats-grid">
          <div className="ab-stat-item">
            <h3 className="ab-stat-value">{t("about.stats1Val")}</h3>
            <p className="ab-stat-label">{t("about.stats1Lbl")}</p>
          </div>
          <div className="ab-stat-item">
            <h3 className="ab-stat-value">{t("about.stats2Val")}</h3>
            <p className="ab-stat-label">{t("about.stats2Lbl")}</p>
          </div>
          <div className="ab-stat-item">
            <h3 className="ab-stat-value">{t("about.stats3Val")}</h3>
            <p className="ab-stat-label">{t("about.stats3Lbl")}</p>
          </div>
          <div className="ab-stat-item">
            <h3 className="ab-stat-value">{t("about.stats4Val")}</h3>
            <p className="ab-stat-label">{t("about.stats4Lbl")}</p>
          </div>
        </div>
      </section>



      {/* Core Values Section */}
      <section className="ab-section">
        <div className="ab-centered">
          <span className="ab-label">{t("about.ourAdvantageLabel")}</span>
          <h2 className="ab-heading">
            {t("about.valuesTitle")}<span>{t("about.valuesTitleHighlight")}</span>
          </h2>
        </div>
        <div className="ab-values-grid">
          <div className="ab-value-card">
            <div className="ab-value-icon">🛡️</div>
            <h3 className="ab-value-title">{t("about.value1Title")}</h3>
            <p className="ab-value-desc">{t("about.value1Desc")}</p>
          </div>
          <div className="ab-value-card">
            <div className="ab-value-icon">💎</div>
            <h3 className="ab-value-title">{t("about.value2Title")}</h3>
            <p className="ab-value-desc">{t("about.value2Desc")}</p>
          </div>
          <div className="ab-value-card">
            <div className="ab-value-icon">🤝</div>
            <h3 className="ab-value-title">{t("about.value3Title")}</h3>
            <p className="ab-value-desc">{t("about.value3Desc")}</p>
          </div>
          <div className="ab-value-card">
            <div className="ab-value-icon">💡</div>
            <h3 className="ab-value-title">{t("about.value4Title")}</h3>
            <p className="ab-value-desc">{t("about.value4Desc")}</p>
          </div>
        </div>
      </section>




    </div>
  );
};

export default About;