import React from "react";
import "./Sidebar.css";
import { database } from "../database/database";
import { useFilterContext } from "../database/filterContext";

const Sidebar = () => {
  const { filters, setFilters } = useFilterContext();

  return (
    <div className="sidebar">
      <div className="sections">
        <h1>Sections</h1>
        {database &&
          database.map((section) => {
            const isSelected = section.key === filters.section;
            const paragraphClass = isSelected ? "active-section" : "";

            return (
              <p
                className={paragraphClass}
                key={section.key}
                onClick={() => {
                  setFilters((prev) => {
                    return { section: section.key, example: 0 };
                  });
                }}
              >{`${section.key}. ${section.name}`}</p>
            );
          })}
      </div>
    </div>
  );
};

export default Sidebar;
