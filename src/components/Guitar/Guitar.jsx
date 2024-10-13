import "./Guitar.css";
import { useState, useEffect } from "react";
import Tab from "../Tab/Tab.jsx";

function Guitar() {
  let defaultSets = 30;
  let arr = [];
  for (let i = 1; i <= defaultSets * 6; i++) {
    arr.push("");
  }
  const [notes, setNotes] = useState(arr);
  const [tabs, setTabs] = useState({});

  const [startingIndex, setStartingIndex] = useState(0);

  const [extraTabs, setExtraTabs] = useState(0);
  const [currentSong, setCurrentSong] = useState("");

  const [disabled, setDisabled] = useState(true);
  const [subdis, setSubdis] = useState(true);

  let counterForAddSet = 180;
  function createAdditionalSet() {
    const tabAdditional = document.createElement("div");
    tabAdditional.classList.add("tab");
    tabAdditional.classList.add("tab_additional");
    tabAdditional.setAttribute("id", "tab2");

    let counterTabNote = counterForAddSet;

    for (let i = 1; i <= 30; i++) {
      const tabSet = document.createElement("div");
      tabSet.classList.add("tab__set");

      for (let i = 1; i <= 6; i++) {
        const tabLine = document.createElement("div");
        tabLine.classList.add("tab__line");

        const tabNote = document.createElement("p");
        tabNote.classList.add("tab__note");
        tabNote.setAttribute("id", counterTabNote);

        tabLine.append(tabNote);

        tabSet.append(tabLine);

        counterTabNote += 1;
      }

      tabAdditional.append(tabSet);
    }

    const guitarTabs = document.querySelector(".guitar__tabs");

    guitarTabs.append(tabAdditional);

    counterForAddSet += 180;
  }

  function handleClickSong(e) {
    counterForAddSet = 180;
    const additionalTabs = document.querySelectorAll(".tab_additional");
    if (additionalTabs) {
      additionalTabs.forEach((i) => {
        i.remove();
      });
    }

    const extraTabs = tabs[e.target.textContent].length / 180 - 1;
    setExtraTabs(extraTabs);

    setCurrentSong(e.target.textContent);
    {
      /*

    for (let i = 0; i < 180; i++) {
      document.getElementById(i).textContent = "";
    }
      
    for (let i = 1; i < tabs[e.target.textContent].length / 180; i++) {
      createAdditionalSet();
    }
  

    let count = 0;
    tabs[e.target.textContent].forEach((i) => {
      if (i) {
        const note = document.getElementById(count);
        note.textContent = i;
        return (count += 1);
      }
      count += 1;
    });
  */
    }
  }

  useEffect(() => {
    populateTabs();
  }, [currentSong]);

  function populateTabs() {
    if (tabs[currentSong]) {
      for (let i = 0; i < tabs[currentSong].length; i++) {
        document.getElementById(`tab${i}`).textContent = "";
      }

      let count = 0;
      tabs[currentSong].forEach((i) => {
        if (i) {
          const note = document.getElementById(`tab${count}`);
          note.textContent = i;
          return (count += 1);
        }
        count += 1;
      });
    }
  }

  function handleClickAdd(e) {
    setDisabled(true);

    const form = document.getElementById("g");
    form.reset();

    setStartingIndex(startingIndex + defaultSets * 6);

    let notesExisting = [...notes];
    for (let i = 1; i <= 30 * 6; i++) {
      notesExisting.push("");
    }
    setNotes(notesExisting);
  }
  function handleNote(e) {
    const notesNew = [...notes];
    notesNew[e.target.id.replace("form", "")] = e.target.value;
    setNotes(notesNew);

    if (notesNew.length <= 180) {
      if (notesNew.slice(0, 180).some((i) => i)) {
        setSubdis(false);
      } else {
        setSubdis(true);
      }
    }

    const currentSetContainsNote = notesNew
      .slice(notesNew.length - 180, notesNew.length)
      .some((i) => i);
    if (currentSetContainsNote) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const notesCopy = [...notes];

    const currentSetContainsNote = notesCopy
      .slice(notesCopy.length - 180, notesCopy.length)
      .some((i) => i);
    if (!currentSetContainsNote) {
      notesCopy.splice(notesCopy.length - 180, 180);
    }

    const title = document.getElementById("title").value;
    setTabs({ ...tabs, [title]: notesCopy });

    const titleElement = document.createElement("p");
    titleElement.classList = "guitar__title";
    titleElement.textContent = title;
    document.querySelector(".guitar__sidebar").append(titleElement);

    e.target.reset();
    setNotes(arr);
    setStartingIndex(0);
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
            <p className="tab__note" id={counterTabNote}></p>
          </div>
        );
        counterTabNote += 1;
      }

      const setElement = <div className="tab__set">{elements2}</div>;
      elements.push(setElement);
    }
    return elements;
  }
  function createFormSets(numOfSets, startIndex) {
    let elements = [];
    let counterInput = startIndex;

    for (let i = 1; i <= numOfSets; i++) {
      let lineElement = [];

      for (let ii = 1; ii <= 6; ii++) {
        lineElement.push(
          <div className="tab__line tab__line_form">
            <input
              className="form__input form__input_g"
              id={`form${counterInput}`}
            ></input>
          </div>
        );
        counterInput += 1;
      }

      const setElement = <div className="tab__set">{lineElement}</div>;

      elements.push(setElement);
    }
    return elements;
  }

  function createTabComp(extraTabs) {
    let arr = [];

    for (let i = 180; i <= extraTabs * 180; i = i + 180) {
      arr.push(<Tab startIndex={i} />);
    }

    return arr;
  }

  return (
    <div className="guitar">
      <div className="guitar__sidebar" onClick={handleClickSong}></div>
      <div className="guitar__main">
        <form className="form" onSubmit={handleSubmit} id="g">
          <div className="tab" id="tab-form" onInput={handleNote}>
            {createFormSets(defaultSets, startingIndex)}
          </div>

          <input
            className="form__input form__input_title"
            id="title"
            placeholder="title"
            required
          ></input>
          <button className="form__button" type="submit" disabled={subdis}>
            log
          </button>
          <button
            className="form__button form__button_add"
            type="button"
            onClick={handleClickAdd}
            disabled={disabled}
          >
            add more
          </button>
        </form>

        <div className="guitar__tabs">
          <div className="guitar__letters">
            <p className="guitar__letter">e 1</p>
            <p className="guitar__letter">b</p>
            <p className="guitar__letter">g</p>
            <p className="guitar__letter">d</p>
            <p className="guitar__letter">a</p>
            <p className="guitar__letter">e 6</p>
          </div>

          {/*
          <div className="tab" id="tab">
            {createSets(defaultSets, 0)}
          </div>
  */}

          <Tab startIndex={0} />
          {createTabComp(extraTabs)}

          {/*
        <div className="tab">
          <div className="tab__set">
            <div className="tab__line">
              <p className="tab__note" id="0"></p>
            </div>
            ...
            <div className="tab__line">
              <p className="tab__note" id="5"></p>
            </div>  
          </div>
          <div className="tab__set">...</div>
        </div>
          */}
        </div>

        {/*
      <form className="form form_g" onSubmit={handleSubmit} id="g">
        <div className="tab">
          <div className="tab__set">
            <div className="tab__line tab__line_g">
              <input
                className="form__input form__input_g"
                id="0"
                onChange={handleNote}
              ></input>
            </div>
             <div className="tab__line tab__line_g">
              <input
                className="form__input form__input_g"
                id="5"
                onChange={handleNote}
              ></input>
            </div>
          </div>
          <div className="tab__set"></div>
        </div>

        <button className="form__button form__button_g" type="submit">
          log
        </button>
      </form>
        */}
      </div>
    </div>
  );
}

export default Guitar;
