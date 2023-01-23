import "./HomePageContainer.css";
import { Button } from "../../components/button/Button";
import { useState, useContext, useEffect } from "react";
import { Input } from "../../components/input/Input";
import { Link } from "react-router-dom";
import { Context } from "../../components/context/Context";
import { Context1 } from "../../components/context/Context";
import validator from "validator";
import { Context3 } from "../../components/context/Context";

export const HomePageContainer = () => {
  const [pageTitle, setPageTitle] = useContext(Context3);
  const [tripIndex, setTripIndex] = useContext(Context1);

  const [user, setUser] = useState(() => {
    let savedEmail = localStorage.getItem("email");
    let userSaved = localStorage.getItem(savedEmail);
    let userSavedValue = JSON.parse(userSaved);
    return userSavedValue;
  });

  const [trips, setTrips] = useState(user.trips);

  const [trip, setTrip] = useState(() => {
    return {
      country: "",
      start: "",
      end: "",
      notes: [],
    };
  });

  const [showTripForm, setShowTripForm] = useState(false);

  const addTrip = () => {
    setTrips([...trips, trip]);
    setUser({ ...user, trips: [...trips, trip] });
    setShowTripForm(false);
  };

  const deleteTrip = (index) => {
    const tripsCopy = [...trips];
    tripsCopy.splice(index, 1);
    setTrips([...tripsCopy]);
    setUser({ ...user, trips: [...tripsCopy] });
  };

  const readingInput = (event) => {
    event.persist();
    setTrip((prev) => {
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
    setPageTitle("My trips");
  });

  return (
    <div className="home-page-wrapper">
      <div className="home-page container-home">
        <div className="home-page-content">
          <div className="home-page-content-wrapper">
            <div className="home-page-info">
              <Button
                style="home-page-showForm-btn"
                onClick={() => {
                  setShowTripForm(true);
                }}
                text="+trip"
              />
            </div>

            <div className="flex-container">
              <div>
                <div className="home-page-trip-form">
                  {showTripForm ? (
                    <div>
                      <div>
                        <div className="home-page-trips-info flex-container">
                          <Input
                            name="country"
                            value={trip.country}
                            onChange={readingInput}
                            style="trip-form-country-input"
                            type="text"
                            placeholder="Enter country.."
                          />

                          <Button
                            onClick={addTrip}
                            style="home-page-addTrip-btn"
                            text="+"
                          />
                        </div>

                        <div className="flex-container">
                          <Input
                            name="start"
                            value={trip.start}
                            style="trip-form-date-input"
                            onChange={readingInput}
                            type="text"
                            placeholder="Date..."
                          />

                          <img
                            className="home-page-trip-form-img"
                            src="../../images/img.png"
                            alt=""
                          />

                          <Input
                            name="end"
                            value={trip.end}
                            style="trip-form-date-input"
                            onChange={readingInput}
                            type="text"
                            placeholder="Date..."
                          />
                        </div>
                      </div>

                      <div className="trip-form-date-line"></div>
                    </div>
                  ) : null}
                </div>

                <div className="home-page-trips-list">
                  <div className="trips-list-headline">
                    <p>Trips list:</p>
                  </div>
                  {trips.map((item, index) => (
                    <div className="home-page-trips-list-item" key={index}>
                      <div className="flex-container">
                        <Link
                          className="trips-list-item-link"
                          to="/home/trippage"
                        >
                          <p
                            onClick={() => {
                              setTripIndex(index);
                              setPageTitle(item.country);
                            }}
                            className="trips-list-item-country"
                          >
                            {item.country}
                          </p>
                        </Link>
                        <Button
                          onClick={() => deleteTrip(index)}
                          style="home-page-deleteTrip-btn"
                          text="-"
                        />
                      </div>
                      <div className="flex-container">
                        <p className="trips-list-item-date">{item.start}</p>
                        <img
                          className="home-page-trips-list-img"
                          src="../../images/img.png"
                          alt=""
                        />
                        <p className="trips-list-item-date">{item.end}</p>
                      </div>

                      <div className="trip-form-date-line"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="home-page-trips-map">
                <iframe
                  className="home-page-map"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d49655560.34820426!2d-8.863421631949782!3d40.56953148162607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sby!4v1673549935203!5m2!1sru!2sby"
                  allowFullScreen=""
                  loading="lazy"                  
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
