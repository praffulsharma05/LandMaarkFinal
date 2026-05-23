import React, { useState } from 'react';
import { Share2, Bookmark, CheckCircle2 } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';
import { COLORS } from '../../../styles/colors';
import './ActionButtons.css';

interface ActionButtonsProps {
  onShare?: () => void;
  onSave?: () => void;
  onAskDetails?: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onShare,
  onSave,
  onAskDetails,
}) => {
  const { t } = useTranslation();
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => setToast({ message: '', visible: false }), 2500);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: document.title,
      text: t('property.actions.checkOutProperty'),
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        showToast(t('property.actions.linkCopied'));
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
    onShare?.();
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isSaved;
    setIsSaved(next);
    showToast(next ? t('property.actions.propertySaved') : t('property.actions.removedFromSaved'));
    onSave?.();
  };

  return (
    <div className="action-buttons-container">
      <div className={`action-toast ${toast.visible ? 'action-toast-visible' : ''}`}>
        <CheckCircle2 size={16} />
        <span>{toast.message}</span>
      </div>

      <div className="buttons-layout">
        <button onClick={onAskDetails} className="primary-button" type="button" aria-label={t('property.actions.askForDetails')}>
          <span className="primary-button-text">{t('property.actions.askForDetails')}</span>
        </button>

        <div className="secondary-buttons-wrapper">
          <button onClick={handleShare} className="secondary-button" type="button" aria-label={t('property.actions.share')}>
            <Share2 size={16} />
            <span className="secondary-button-text">
              {copied ? t('property.actions.copied') : t('property.actions.share')}
            </span>
          </button>

          <button
            onClick={handleSave}
            className={`secondary-button ${isSaved ? 'saved' : ''}`}
            type="button"
            aria-label={isSaved ? t('property.actions.saved') : t('property.actions.save')}
          >
            <Bookmark
              size={16}
              fill={isSaved ? COLORS.bookmark : 'none'}
              stroke={isSaved ? COLORS.bookmark : 'currentColor'}
            />
            <span className="secondary-button-text">
              {isSaved ? t('property.actions.saved') : t('property.actions.save')}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;