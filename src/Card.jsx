import React from "react";

const Card = ({ image, name, move, power, index, onClick }) => {
  return (
    <div
      className="card"
      onClick={() => {
        onClick(index);
      }}
    >
      <h2>{name}</h2>

      <img className="Image" src={image}></img>
      <div className="red">
        <h3>{move}</h3>
        <h3>{power}</h3>
      </div>
    </div>
  );
};
export default Card;
