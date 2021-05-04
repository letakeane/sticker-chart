import React from "react";

const Goal = ({ name, completion, updateCompletion, removeGoal }) => {
  const spaces = completion.map((day, index) => {
    return (
      <div
        key={`progress-${index}`}
        className={`goal-bubble ${day ? "color" + index : ""}`}
        onClick={() => updateCompletion(index)}
      ></div>
    );
  });

  return (
    <section className="goal-column">
      <h3>{name}</h3>
      {spaces}
      <button onClick={removeGoal}>X</button>
    </section>
  );
};

export default Goal;
