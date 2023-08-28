import React from "react";
import "./App.css";
import Section from "./components/Section";
import Sidebar from "./components/Sidebar";
import { FilterContextProvider } from "./database/filterContext";

function App() {
  return (
    <FilterContextProvider>
      <div className="app-container">
        <Sidebar />
        <Section />
      </div>
    </FilterContextProvider>
  );
}

export default App;
