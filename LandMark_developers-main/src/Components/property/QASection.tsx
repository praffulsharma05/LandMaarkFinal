import React from 'react';
import './QASection.css';
import { useTranslation } from '../../hooks/useTranslation';

const QASection = () => {
  const { t } = useTranslation();
  return (
    <div className="tab-content-card">
      <div className="qa-title">
        <span className="qa-title-underline">
          {t('property.qa.questionsAnswers')}
        </span>
      </div>
      <div className="qa-list">
        <div className="qa-item">
          <p className="qa-question">{t('property.qa.q1')}</p>
          <p className="qa-answer">{t('property.qa.a1')}</p>
          <p className="qa-date">{t('property.qa.answered6YearsAgo')}</p>
        </div>
        <div className="qa-item">
          <p className="qa-question">{t('property.qa.q2')}</p>
          <p className="qa-answer">{t('property.qa.a2')}</p>
          <p className="qa-date">{t('property.qa.answered6YearsAgo')}</p>
        </div>
      </div>
      <button className="qa-button" aria-label={t('property.qa.viewAllQuestions')}>
        <span className="qa-button-text">{t('property.qa.viewAllQuestions')}</span>
      </button>
    </div>
  );
};

export default QASection;