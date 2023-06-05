import "./index.css";

const AppointmentItem = (props) => {
  const { appointment, makeFavourite, isMarked } = props;
  // console.log(isMarked);
  const markFavourite = () => {
    makeFavourite(appointment.id);
  };
  const starImage = isMarked
    ? "https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
    : "https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png";
  return (
    <>
      <li className="appointment-item-component-container">
        <div className="top-section">
          <h5>{appointment.title}</h5>
          <div className="appointment-item-component-button-contanier">
            <button
              onClick={markFavourite}
              className="appointment-item-component-button"
            >
              <img src={starImage} alt="appointemt" />
            </button>
          </div>
        </div>
        <div className="bottom-section">
          <p>{appointment.date}</p>
        </div>
      </li>
    </>
  );
};

export default AppointmentItem;
