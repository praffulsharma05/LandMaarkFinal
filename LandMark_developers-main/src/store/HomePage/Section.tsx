import React, { FC, FormEvent } from "react";
import { useTranslation } from "../../hooks/useTranslation";

interface SectionProps {
  FormComponent: React.ComponentType<{
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  }>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const Section: FC<SectionProps> = ({ FormComponent, onSubmit }) => {
  const { t } = useTranslation();

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="p-10">
        <h1 className="text-4xl">{t('section.title')}</h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="p-10">
        <FormComponent onSubmit={onSubmit} />
      </div>
    </section>
  );
};

export default Section;
