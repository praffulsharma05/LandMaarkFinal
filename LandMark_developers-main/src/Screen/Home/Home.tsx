import React from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import "./Home.css";
import "../PropertyPageDetails/PropertyDetailPage.css";
import { useTranslation } from "../../hooks/useTranslation";
import { LOTTIE_SRC } from "./HomeHelper";
import { useHome } from "./useHome";
import {
  HeroSection,
  PerfectHomeSection,
  WhyPropertiesSection,
  IconicPropertiesSection,
  LuxuryWorldSection,
  CollaborationsSection,
  CommunitiesSection,
  InvestSection,
  EnquiryFormSection,
} from "./components";

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { loading, hasError, homepageData, loadData } = useHome();

  if (loading) {
    return (
      <div className="error-wrapper-premium">
        <div className="error-content-premium">
          <div className="lottie-container-premium">
            <div className="lottie-player-premium">
              <DotLottieReact src={LOTTIE_SRC} loop autoplay />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="error-wrapper-premium">
        <div className="error-content-premium">
          <div className="lottie-container-premium">
            <div className="lottie-player-premium">
              <DotLottieReact src={LOTTIE_SRC} loop autoplay />
            </div>
          </div>
          <h1 className="error-title-premium">{t("errors.failedToLoadHome")}</h1>
          <p className="error-subtitle-premium">
            {t("errors.serverUnavailable")}
          </p>
          <button onClick={loadData} className="error-back-btn-premium">
            {t("common.retry")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <HeroSection hero={homepageData.hero} />
      <PerfectHomeSection section3={homepageData.section3} />
      <WhyPropertiesSection section={homepageData.section} />
      <IconicPropertiesSection section5={homepageData.section5} />
      <LuxuryWorldSection section6={homepageData.section6} />
      <CollaborationsSection section7={homepageData.section7} />
      <CommunitiesSection section8={homepageData.section8} />
      <InvestSection section9={homepageData.section9} />
      {homepageData.showEnquiryForm && <EnquiryFormSection />}
    </div>
  );
};

export default Home;
