import React from "react";

export default function ListqualitiesItem(props) {
  const getqualitiesItemClasses = (color) => {
    let classes = "badge m-2 bg-";
    classes += color;
    return classes;
  };

  return (
    <>
      {props.qualities.map((q) => (
        <span className={getqualitiesItemClasses(q.color)}>{q.name}</span>
      ))}
    </>
  );
}
