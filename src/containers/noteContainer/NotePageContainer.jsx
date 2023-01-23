import "./NotePageContainer.css";
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { Icon } from "@iconify/react";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../components/context/Context";
import { Context1 } from "../../components/context/Context";
import { Context2 } from "../../components/context/Context";
import { NoteForm } from "../../components/noteForm/NoteForm";
import { Context3 } from "../../components/context/Context";

export const NotePageContainer = () => {
  const [pageTitle, setPageTitle] = useContext(Context3);
  const [user, setUser] = useState(() => {
    let savedEmail = localStorage.getItem("email");
    let userSaved = localStorage.getItem(savedEmail);
    let userSavedValue = JSON.parse(userSaved);
    return userSavedValue;
  });

  const [tripIndex, setTripIndex] = useContext(Context1);
  const [noteIndex, setNoteIndex] = useContext(Context2);

  const [showTextForm, setShowTextForm] = useState(() => {
    if (user.trips[tripIndex].notes[noteIndex].description != "") {
      return false;
    }
    return true;
  });

  const addNoteInfo = () => {
    setUser(() => {
      let savedEmail = localStorage.getItem("email");
      let userSaved = localStorage.getItem(savedEmail);
      let userSavedValue = JSON.parse(userSaved);
      return userSavedValue;
    });
    setShowTextForm(() => {
      return false;
    });
  };

  useEffect(() => {
    localStorage.setItem(user.email, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("tripIndex", tripIndex);
  }, [tripIndex]);

  useEffect(() => {
    localStorage.setItem("noteIndex", noteIndex);
  }, [noteIndex]);

  useEffect(() => {
    setPageTitle(user.trips[tripIndex].notes[noteIndex].city);
  });

  return (
    <div className="note-page-wrapper">
      <div className="note-page container-note">
        <div className="note-page-content">
          <div className="note-page-back-link">
            <Link  to="/home/trippage">
              <Icon
                className=""
                icon="material-symbols:arrow-right-alt-rounded"
                hFlip={true}
                width="45"
              />
            </Link>
          </div>

          <div className="flex-container-note">
            <div className="note-page-content-child">
              <div className="note-page-note-title">
                <div className="flex-container-title">
                  <div>
                    <img
                      className="note-page-note-title-img"
                      src="../../images/img.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="note-page-note-title-city">
                      {user.trips[tripIndex].notes[noteIndex].city}
                    </p>
                  </div>
                </div>

                <div className="note-form-date-line"></div>
                <div>
                  <p className="note-page-note-title-date">
                    {user.trips[tripIndex].notes[noteIndex].date}
                  </p>
                </div>
              </div>
            </div>

            <div className="note-page-content-child">
              <div className="note-page-note-info">
                {showTextForm ? (
                  <div className="note-page-note-form">
                    <NoteForm />
                    <Button onClick={addNoteInfo} style="" text="Done!" />
                  </div>
                ) : (
                  <div className="note-page-note">
                    <div className="note-page-note-text-wrapper">
                      <div className="note-page-note-text">
                        <p>
                          {user.trips[tripIndex].notes[noteIndex].description}
                        </p>
                      </div>
                    </div>

                    <div className="note-page-note-photo">
                      {user.trips[tripIndex].notes[noteIndex].photo}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
