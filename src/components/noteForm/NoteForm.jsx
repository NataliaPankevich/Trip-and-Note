import "./NoteForm.css";
import React from "react";
import { Input } from "../input/Input";
import { Button } from "../button/Button";
import { useState, useContext, useEffect, useRef } from "react";
import { Context1 } from "../../components/context/Context";
import { Context2 } from "../../components/context/Context";
import { Icon } from "@iconify/react";

export const NoteForm = () => {
  const [user, setUser] = useState(() => {
    let savedEmail = localStorage.getItem("email");
    let userSaved = localStorage.getItem(savedEmail);
    let userSavedValue = JSON.parse(userSaved);
    return userSavedValue;
  });

  const [tripIndex, setTripIndex] = useContext(Context1);
  const [noteIndex, setNoteIndex] = useContext(Context2);

  const [text, setText] = useState({
    align: "",
    font: "",
    fontSize: "",
    fontWeight: "",
  });

  let style = `note-text ${text.align} ${text.font} ${text.fontSize} ${text.fontWeight}`;

  const readingText = (event) => {
    let tripsCopy = user.trips;
    let result = tripsCopy.map(function (item, index) {
      if (index == tripIndex) {
        let notesCopy = item.notes;
        let result2 = notesCopy.map(function (item, index) {
          if (index == noteIndex) {
            item.description = event.target.value;
            return item;
          }
          return item;
        });
        item.notes = result2;
        return item;
      }
      return item;
    });

    setUser({ ...user, trips: result });
  };

  const textAlignRight = () => {
    setText({ ...text, align: "align-right" });
  };
  const textAlignLeft = () => {
    setText({ ...text, align: "align-left" });
  };
  const textAlignCenter = () => {
    setText({ ...text, align: "align-center" });
  };
  const textAlignJustify = () => {
    setText({ ...text, align: "align-justify" });
  };

  useEffect(() => {
    // storing
    localStorage.setItem(user.email, JSON.stringify(user));
  }, [user]);

  return (
    <div className="note-form">
      <div className="note-form-tools">
        <button onClick={textAlignLeft}>
          <Icon icon="clarity:align-left-text-line" />
        </button>
        <button onClick={textAlignCenter}>
          <Icon icon="clarity:center-text-line" />
        </button>
        <button onClick={textAlignJustify}>
          <Icon icon="clarity:justify-text-line" />
        </button>
        <button onClick={textAlignRight}>
          <Icon icon="clarity:align-right-text-line" />
        </button>
        <select
          value={text.font}
          onChange={(event) => {
            setText({ ...text, font: event.target.value });
          }}
        >
          <option defaultValue="times">Times New</option>
          <option value="comic">Comic Sans</option>
          <option value="arial">Arial</option>
          <option value="georgia">Georgia</option>
          <option value="verdana">Verdana</option>
        </select>
        <select
          value={text.fontWeight}
          onChange={(event) => {
            setText({ ...text, fontWeight: event.target.value });
          }}
        >
          <option defaultValue="weight-Regular">Regular</option>
          <option value="weight-Bold">Bold</option>
          <option value="weight-Italic">Italic</option>
        </select>
        <select
          value={text.fontSize}
          onChange={(event) => {
            setText({ ...text, fontSize: event.target.value });
          }}
        >
          <option defaultValue="size-12"> 12</option>
          <option value="size-14">14</option>
          <option value="size-16">16</option>
          <option value="size-18">18</option>
        </select>
      </div>
      <textarea
        className={style}
        value={user.trips[tripIndex].notes[noteIndex].description}
        onChange={readingText}
        placeholder="Add text..."
      ></textarea>
      <div></div>
    </div>
  );
};
