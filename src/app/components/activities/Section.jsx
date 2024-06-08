import React from 'react';

const Section = ({ title, children }) => (
  <section className="my-8">
    <h2 className="text-2xl font-semibold mb-4 p-4">{title}</h2>
    <div className="grid gap-4">{children}</div>
  </section>
);

export default Section;
