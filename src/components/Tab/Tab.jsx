import "./Tab.css";
import { useState } from "react";

function Tab({ startIndex }) {
  let defaultSets = 30;
  let arr = [];
  for (let i = 1; i <= defaultSets * 6; i++) {
    arr.push("");
  }

  function createSets(numOfSets, startIndex) {
    let elements = [];
    let counterTabSet = 0;
    let counterTabLine = 0;
    let counterTabNote = startIndex;

    for (let i = 1; i <= numOfSets; i++) {
      let elements2 = [];

      for (let ii = 1; ii <= 6; ii++) {
        elements2.push(
          <div className="tab__line">
            <p className="tab__note" id={`tab${counterTabNote}`}></p>
          </div>
        );
        counterTabNote += 1;
      }

      const setElement = <div className="tab__set">{elements2}</div>;
      elements.push(setElement);
    }
    return elements;
  }

  return <div className="tab">{createSets(defaultSets, startIndex)}</div>;
}

export default Tab;
