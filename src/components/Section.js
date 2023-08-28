import React from "react";
import Example from "./Example";
import { database } from "../database/database";
import { useFilterContext } from "../database/filterContext";
import "./Section.css";

const Section = () => {
  const { filters, setFilters } = useFilterContext();

  const section = database.find((section) => section.key === filters.section);

  if (!section) {
    return <div></div>;
  }

  return (
    <div className="section">
      <div className="summary">
        <h2>{section.name}</h2>
        <pre>
          <p dangerouslySetInnerHTML={{ __html: section.summary }} />
        </pre>
        <div className="button-container">
          {section.examples.map((ex) => {
            const isSelected = ex.id === filters.example;
            const paragraphClass = isSelected ? "active-example" : "";

            return (
              <button
                className={`button ${paragraphClass}`}
                key={ex.id}
                onClick={() => {
                  setFilters((prev) => {
                    return { ...prev, example: ex.id };
                  });
                }}
              >
                {ex.name}
              </button>
            );
          })}
        </div>
      </div>
      {filters.example > 0 && (
        <Example example={section.examples[filters.example - 1]} />
      )}
    </div>
  );
};

export default Section;
