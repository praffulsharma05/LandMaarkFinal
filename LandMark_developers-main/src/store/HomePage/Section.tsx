import React, { FC, FormEvent } from "react";

interface SectionProps {
  FormComponent: React.ComponentType<{
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  }>;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const Section: FC<SectionProps> = ({ FormComponent, onSubmit }) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="p-10">
        <h2 className="text-4xl">Your Section Title</h2>
      </div>

      {/* RIGHT SIDE */}
      <div className="p-10">
        <FormComponent onSubmit={onSubmit} />
      </div>
    </section>
  );
};

export default Section;
