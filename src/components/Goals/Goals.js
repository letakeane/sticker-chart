import React from "react";
import Goal from "../Goal/Goal";
import "./Goals.css";

const Goals = ({ weekGoals, updateProgress, removeGoal }) => {
  const { weekReward, progress } = weekGoals;
  const goals = progress.map((goal, index) => {
    return (
      <Goal
        name={goal.name}
        completion={goal.completion}
        updateCompletion={updateProgress(index)}
        removeGoal={() => removeGoal(index)}
        key={`goal-${index}`}
      />
    );
  });

  return (
    <>
      <section className="goals-section">{goals}</section>
      {weekReward &&
        <h4>Reward: {weekReward}</h4>
      }
    </>
  );
};

export default Goals;
