import React from "react";

const Card = ({ image, name, move, power, ind, onClick }) => {
  return (
    <div
      className="card"
      onClick={() => {
        onClick(ind);
      }}
    >
      <h2>{name}</h2>
      <img src={image}></img>
      <h3>{move}</h3>
      <h3>{power}</h3>
    </div>
  );
};
export default Card;
