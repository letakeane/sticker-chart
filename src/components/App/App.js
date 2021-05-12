import React, { Component } from "react";
import Goals from "../Goals/Goals";
import { DateTime } from "luxon";
import initialData from "../../initialData";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      goals: initialData,
      date: DateTime.local().setZone("MST"),
    };
  }

  storeGoals = (goals) => {
    localStorage.setItem("goals", JSON.stringify(goals));
    this.setState({goals: goals});
  };

  checkForNewWeek = (goals) => {
    const {year, weekNumber} = this.state.date;

    if (!goals[year][weekNumber]) {
      goals[year][weekNumber] = {progress: []};
      goals[year][weekNumber - 1].progress.forEach(goal => {
        goals[year][weekNumber].progress.push({name: goal.name, completion: [false, false, false, false, false, false, false], ongoing: true})
      })
      goals[year][weekNumber].weekReward = "";
    } else if (!goals[year]) {
      goals[year] = { 1: { progress: [] } };
      goals[year-1][52].progress.forEach(goal => {
        goals[year][weekNumber].progress.push({name: goal.name, completion: [false, false, false, false, false, false, false], ongoing: true})
        goals[year][weekNumber].weekReward = "";
      })
    }
    return goals;
  }

  retrieveGoals = () => {
    const retrievedGoals = JSON.parse(localStorage.getItem("goals"));

    if (retrievedGoals) {
      const updatedGoals = this.checkForNewWeek(retrievedGoals);
      this.storeGoals(updatedGoals);
    } else {
      const updatedGoals = this.checkForNewWeek(initialData);
      this.storeGoals(updatedGoals);
    }
  };


  componentDidMount() {
    this.retrieveGoals();
  }

  updateProgress = (progressIndex) => {
    const updateCompletion = (completionIndex) => {
      const goalCopy = this.state.goals;

      goalCopy[this.state.date.year][this.state.date.weekNumber].progress[
        progressIndex
      ].completion[completionIndex] = !goalCopy[this.state.date.year][
        this.state.date.weekNumber
      ].progress[progressIndex].completion[completionIndex];

      this.storeGoals(goalCopy);
    };

    return updateCompletion;
  };

  removeGoal = (progressIndex) => {
    const goalCopy = this.state.goals;

    goalCopy[this.state.date.year][this.state.date.weekNumber].progress.splice(progressIndex, 1);

    this.storeGoals(goalCopy);
  }

  render() {
    return (
      <main className="App">
        <h1>⭐️ StickerChart ⭐️</h1>
        <h2>{this.state.date.toLocaleString(DateTime.DATE_HUGE)}</h2>
        {this.state.goals[this.state.date.year] && (
          <Goals
            weekGoals={
              this.state.goals[this.state.date.year][this.state.date.weekNumber] || {progress: []}
            }
            updateProgress={this.updateProgress}
            removeGoal={this.removeGoal}
          />
        )}
      </main>
    );
  }
}

export default App;
