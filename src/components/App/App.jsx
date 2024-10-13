import "./App.css";
/*import { Routes, Route } from "react-router-dom";*/
import { useState } from "react";
import Guitar from "../Guitar/Guitar";

function App() {
  return (
    <div className="page">
      <div className="page__content">{<Guitar />}</div>
    </div>
  );
}

export default App;
