import React from "react";
import { Section8Type as Section8Item } from "../../../store/HomePage/section8Card";
import { useTranslation } from "../../../hooks/useTranslation";

interface CommunitiesSectionProps {
  section8: {
    title: string;
    subtitle: string;
    videoUrl: string;
    items: Section8Item[];
  };
}

export const CommunitiesSection: React.FC<CommunitiesSectionProps> = ({
  section8,
}) => {
  const { t } = useTranslation();
  const title = section8.title || "";
  const subtitle = section8.subtitle || "";
  const videoUrl = section8.videoUrl || "";
  const items = section8.items || [];

  return (
    <section className="home-section-8">
      <div className="section-8-inner">
        <div className="section-8-title">{title}</div>
        <p className="section-8-subtitle">{subtitle}</p>

        <div className="section-8-grid-wrapper">
          <ul className="section-8-points-list">
            {items.map((item) => (
              <li key={item.id} className="section-8-point-item">
                <span className="section-8-point-icon">{item.icon}</span>
                <span className="section-8-point-title">{item.title}</span>
              </li>
            ))}
          </ul>

          {videoUrl && (
            <div className="section-8-video-wrapper">
              <iframe
                src={videoUrl}
                title={t("home.videoTitle")}
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
