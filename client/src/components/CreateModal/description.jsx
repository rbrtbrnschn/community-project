import React from "react";

const Description = (props) => {
  const { title, sub } = props;
  return (
    <section className="hero has-text-justified is-link">
      <div className="hero-body">
        <div className="container">
          <h1 className="title is-capitalized">{title}</h1>
          <h2 className="subtitle">{sub}</h2>
        </div>
      </div>
    </section>
  );
};

export default Description;
