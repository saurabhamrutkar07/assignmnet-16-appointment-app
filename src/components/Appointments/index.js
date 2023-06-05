import "./index.css";

import AppointmentItem from "../AppoinmentItem";
import { Component } from "react";
import { v4 as uniqueId } from "uuid";

const initalAppointmentArray = [];

class Appointments extends Component {
  state = {
    array: initalAppointmentArray,
    title: "",
    date: "",
    displayStar: false,
    filter: false,
  };

  getTitle = (e) => {
    this.setState({ title: e.target.value });
  };

  getDate = (e) => {
    this.setState({ date: e.target.value });
  };
  submitForm = (e) => {
    e.preventDefault();
    const { title, date } = this.state;

    // console.log(title, date);
    const newAppointment = {
      id: uniqueId(),
      title,
      date,
      isStarred: false,
    };
    this.setState((prevState) => ({
      array: [...prevState.array, newAppointment],
      title: "",
      date: "",
    }));
  };

  makeFavourite = (id) => {
    // console.log("Appointment Mark As Favourite");
    const { array } = this.state;

    this.setState((prevState) => ({
      array: prevState.array.map((eachAppointment) => {
        if (eachAppointment.id === id) {
          return { ...eachAppointment, isStarred: !eachAppointment.isStarred };
        }
        return eachAppointment;
      }),
    }));
  };

  displayStaredAppointment = () => {
    // console.log("Display Starred Appointment");
    const { filter } = this.state;

    this.setState((prevState) => ({ filter: !prevState.filter }));
  };
  render() {
    const { title, date, array, filter } = this.state;
    const filterList = array.filter((item) => {
      return item.isStarred === true;
    });

    const unfilterList = array.map((item) => item);

    const displayList = filter ? filterList : unfilterList;
    console.log(filter);
    console.log(displayList);

    return (
      <>
        <div className="main-container">
          <div className="appointment-container">
            <div className="details-container">
              <h1 className="main-heading">Add Appointment</h1>
              <form onSubmit={this.submitForm}>
                <div className="title-container">
                  <p className="title">TITLE</p>
                  <input
                    type="text"
                    className="appointment-input"
                    placeholder="Title"
                    onChange={this.getTitle}
                    value={title}
                  />
                </div>
                <div className="date-container">
                  <p className="date">DATE</p>
                  <input
                    onChange={this.getDate}
                    type="date"
                    className="date-input"
                    value={date}
                  />
                </div>
                <div>
                  <button type="submit" className="add-button">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div className="image-contanier">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-image"
              />
            </div>
          </div>
          <hr />
          <div className="appointment-item-container">
            <div className="appointment-item-top-section">
              <h1 className="appointment-item-top-section-heading">
                Appointments
              </h1>
              <div className="appointment-item-top-section-button-container">
                <button
                  onClick={this.displayStaredAppointment}
                  className="appointment-item-top-section-button"
                >
                  Starred
                </button>
              </div>
            </div>
            <ul>
              {displayList.map((item) => (
                <AppointmentItem
                  key={item.id}
                  appointment={item}
                  makeFavourite={this.makeFavourite}
                  isMarked={item.isStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
}

export default Appointments;
