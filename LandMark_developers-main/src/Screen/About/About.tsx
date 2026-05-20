import React from "react";
import { motion } from "framer-motion";
import "./About.css";
import { useTranslation } from "../../hooks/useTranslation";

const About: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      title: t("about.feature1Title"),
      desc: t("about.feature1Desc"),
    },
    {
      title: t("about.feature2Title"),
      desc: t("about.feature2Desc"),
    },
    {
      title: t("about.feature3Title"),
      desc: t("about.feature3Desc"),
    },
  ];

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

      <section className="ab-section ab-section-light">
        <div className="ab-centered">
          <span className="ab-label">{t("about.ourAdvantageLabel")}</span>
          <h2 className="ab-heading">
            {t("about.whatMakesUsTitle")}<span>{t("about.whatMakesUsTitleHighlight")}</span>
          </h2>
          <p className="ab-text ab-text-max-w">
            {t("about.whatMakesUsDesc")}
          </p>
        </div>

        <div className="ab-feature-grid">
          {features.map((item, i) => (
            <div key={i} className="ab-feature-card">
              <h3 className="ab-feature-title">{item.title}</h3>
              <p className="ab-feature-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ab-cta">
        <h2 className="ab-heading">
          {t("about.ctaTitle")}<span>{t("about.ctaTitleHighlight")}</span>
        </h2>
        <p className="ab-text mx-auto ab-cta-text-max-w">
          {t("about.ctaDesc")}
        </p>
      </section>
    </div>
  );
};

export default About;