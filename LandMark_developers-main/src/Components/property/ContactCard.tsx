import React from 'react';
import { Building, Award, Check, User, Phone, Mail } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import './ContactCard.css';

const ContactCard = () => {
  const { t } = useTranslation();
  return (
    <div className="contact-card-container">
      <div className="contact-header">
        <div className="contact-icon-wrapper">
          <Building className="contact-main-icon" />
        </div>
        <h1 className="contact-title">{t('property.contact.voltGroup')}</h1>
        <p className="expert-badge">
          <Award className="expert-icon" />
          {t('property.contact.housingExpertPro')}
        </p>
      </div>

      <div className="contact-body">
        <div className="choice-highlight">
          <Check className="choice-icon" />
          <span className="choice-text">{t('property.contact.greatChoice')}</span>
        </div>

        <div className="form-section">
          <p className="form-instruction">{t('property.contact.shareContact')}</p>
          <div className="input-group">
            <div className="input-relative">
              <User className="input-icon" />
              <input 
                type="text" 
                placeholder={t('property.contact.namePlaceholder')}
                className="contact-input"
              />
            </div>
            <div className="input-relative">
              <Phone className="input-icon" />
              <input 
                type="tel" 
                placeholder={t('property.contact.phonePlaceholder')}
                className="contact-input"
              />
            </div>
            <div className="input-relative">
              <Mail className="input-icon" />
              <input 
                type="email" 
                placeholder={t('property.contact.emailPlaceholder')}
                className="contact-input"
              />
            </div>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" className="contact-checkbox" />
              <span className="checkbox-text">{t('property.contact.agreeContact')}</span>
            </label>
            <label className="checkbox-label">
              <input type="checkbox" className="contact-checkbox" />
              <span className="checkbox-text">{t('property.contact.interestedHomeLoans')}</span>
            </label>
          </div>

          <button className="submit-button">
            {t('property.contact.getContactDetails')}
          </button>

          <p className="form-disclaimer">
            {t('property.contact.byProceeding')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;