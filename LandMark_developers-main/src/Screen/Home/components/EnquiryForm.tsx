import React, { useCallback } from "react";
import { useTranslation } from "../../../hooks/useTranslation";

interface EnquiryFormProps {
  formClassName: string;
  inputClassName: string;
  textareaClassName: string;
  buttonClassName: string;
}

const EnquiryForm: React.FC<EnquiryFormProps> = ({
  formClassName,
  inputClassName,
  textareaClassName,
  buttonClassName,
}) => {
  const { t } = useTranslation();

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.warn("Form Submitted");
  }, []);

  return (
    <form className={formClassName} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={t("home.firstNamePlaceholder")}
        required
        className={inputClassName}
      />

      <input
        type="email"
        placeholder={t("home.emailPlaceholder")}
        required
        className={inputClassName}
      />

      <input
        type="tel"
        placeholder={t("home.phonePlaceholder")}
        required
        className={inputClassName}
      />

      <textarea
        rows={4}
        placeholder={t("home.commentsPlaceholder")}
        className={textareaClassName}
      />

      <button className={buttonClassName}>
        {t("home.getCallback")}
      </button>
    </form>
  );
};

export default EnquiryForm;
