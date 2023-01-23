import "./TripPageContainer.css";
import { Button } from "../../components/button/Button";
import { useState, useContext, useEffect } from "react";
import { Input } from "../../components/input/Input";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Context } from "../../components/context/Context";
import { Context1 } from "../../components/context/Context";
import { Context2 } from "../../components/context/Context";
import { Context3 } from "../../components/context/Context";

export const TripPageContainer = () => {
  const [pageTitle, setPageTitle] = useContext(Context3);

  const [user, setUser] = useState(() => {
    let savedEmail = localStorage.getItem("email");
    let userSaved = localStorage.getItem(savedEmail);
    let userSavedValue = JSON.parse(userSaved);
    return userSavedValue;
  });
  const [tripIndex, setTripIndex] = useContext(Context1);
  const [noteIndex, setNoteIndex] = useContext(Context2);

  const [notes, setNotes] = useState(user.trips[tripIndex].notes);

  const [note, setNote] = useState(() => {
    return {
      city: "",
      date: "",
      photo: "",
      description: "",
    };
  });

  const [showNoteForm, setShowNoteForm] = useState(false);

  const addNote = () => {
    setNotes([...notes, note]);
    let tripsCopy = user.trips;
    let result = tripsCopy.map(function (item, index) {
      if (index == tripIndex) {
        item.notes = [...notes, note];
        return item;
      }
      return item;
    });
    setUser({ ...user, trips: result });
    setShowNoteForm(false);
  };

  const deleteNote = (index) => {
    const notesCopy = [...notes];
    notesCopy.splice(index, 1);
    setNotes([...notesCopy]);
    let tripsCopy = user.trips;
    let result = tripsCopy.map(function (item, index) {
      if (index == tripIndex) {
        item.notes = [...notesCopy];
        return item;
      }
      return item;
    });
    setUser({ ...user, trips: result });
  };

  const readingInput = (event) => {
    event.persist();
    setNote((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
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
    setPageTitle(user.trips[tripIndex].country);
  });

  return (
    <div className="trip-page-wrapper">
      <div className="trip-page container-trip">
        <div className="trip-page-content">
          <div className="trip-page-content-top">
            <div className="trip-page-info">
              <Link to="/home">
                <Icon
                  className="trip-page-icon"
                  icon="material-symbols:arrow-right-alt-rounded"
                  hFlip={true}
                  width="45"
                />
              </Link>
              <Button
                style="trip-page-showForm-btn"
                onClick={() => {
                  setShowNoteForm(true);
                }}
                text="+note"
              />
            </div>

            <div className="trip-page-note-form">
              {showNoteForm ? (
                <div className="flex-container-form">
                  <div className="trip-page-note-form-child">
                    <div className="flex-container">
                      <img
                        className="trip-page-note-form-img"
                        src="../../images/img.png"
                        alt=""
                      />
                      <Button
                        onClick={addNote}
                        style="trip-page-addNote-btn"
                        text="+"
                      />

                      <Input
                        name="city"
                        value={note.city}
                        onChange={readingInput}
                        style="note-form-city-input"
                        type="text"
                        placeholder="Enter city..."
                      />
                    </div>
                    <div className="note-form-date-line"></div>
                    <div>
                      <Input
                        name="date"
                        value={note.date}
                        style="note-form-date-input"
                        onChange={readingInput}
                        type="text"
                        placeholder="Date..."
                      />
                    </div>
                  </div>

                  <div className="trip-page-note-form-child">
                    <div>
                      <Input
                        type="file"
                        name="photo"
                        value={note.photo}
                        style="trip-form-photo-input"
                        onChange={readingInput}
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="trip-page-notes-list">
            <div className="notes-list-headline">
              <p>Notes list:</p>
            </div>
            {notes.map((item, index) => (
              <div
                className="trip-page-notes-list-item flex-container"
                key={index}
              >
                <div className="trip-page-notes-list-child">
                  <div className="flex-container">
                    <img
                      className="trip-page-notes-list-img"
                      src="../../images/img.png"
                      alt=""
                    />
                    <Link className="notes-list-item-city" to="/home/notepage">
                      <p
                        onClick={() => {
                          setNoteIndex(index);
                          setPageTitle(item.city);
                        }}
                      >
                        {item.city}
                      </p>
                    </Link>
                  </div>
                  <div className="note-form-date-line"></div>

                  <div>
                    <p className="notes-list-item-date">{item.date}</p>
                  </div>
                </div>

                <div className="trip-page-notes-list-child flex-container">
                  <div className="notes-list-item-photo">
                    <div className="notes-list-item-title">{item.city}</div>
                    <img src={note.photo} alt="" />
                  </div>

                  <Link className="notes-list-item-link" to="/home/notepage">
                    <Icon
                      onClick={() => setNoteIndex(index)}
                      icon="material-symbols:play-arrow-rounded"
                    />
                  </Link>

                  <div>
                    <Button
                      onClick={() => deleteNote(index)}
                      style="trip-page-deleteNote-btn"
                      text="-note"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
