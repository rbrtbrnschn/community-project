import { helpers as helpersInterface } from "./interfaces";
import {
  taskCreation,
  streakCreation,
  habitCreation,
  challengeCreation,
} from "./interfaces";
import { hash } from "../snippets";
import { throws } from "assert";
import { faTags } from "@fortawesome/free-solid-svg-icons";

class Task {
  // Properties
  title?: String;
  notes?: String;
  payload?: String;
  id?: Number;
  isComplete?: Boolean;
  isPrivate?: Boolean;
  timestamps: Array<any>;
  createdOn: number;
  helpers?: any;

  constructor(setup: taskCreation) {
    this.createdOn = Date.now();
    this.timestamps = [];
    this.setup(setup);
  }

  _stamp(payload?: String, isComplete?: Boolean, date?: number | Date) {
    // * Returns Timestamp
    // * Alter Method Per Class To Your Liking

    payload = payload ? payload : "onCreate";
    isComplete = isComplete ? isComplete : false;
    date = date ? date : Date.now();
    let stamp = {
      key: date,
      payload: payload,
      isComplete: isComplete,
    };
    stamp = this._stampAdd(stamp);
    return this.timestamps?.push(stamp);
  }
  _stampAdd(stamp: any) {
    return stamp;
  }
  _needCheck() {
    return false;
  }
  isCompleted() {
    return this.isComplete;
  }
  transform(task: any, helpers?: any) {
    for (let key of Object.keys(task)) {
      // ! Typescript Error
      (this as any)[key] = (task as any)[key];
    }
    if (helpers) {
      (this as any).helpers = {};
      for (let h of Object.keys(helpers)) {
        (this as any).helpers[h] = (helpers as any)[h];
      }
    }
    return this;
  }
  setup(setup: taskCreation) {
    // * Interate Over Setup & Asign Each Property To Object
    const keys = Object.keys(setup);
    for (let key of keys) {
      //! Typescript Error
      (this as any)[key] = (setup as any)[key];
    }

    this.timestamps = [];
    this.id = hash();
    this.isComplete = false;
    this.createdOn = Date.now();
    if (!this.isPrivate) this.isPrivate = false;

    this.create(setup);
    this._stamp();
  }
  create(setup: taskCreation) {
    // * Asign Non Default Properties
  }

  complete() {
    // * Complete Task, Add Timestamp,
    // * Arhive & Use Helpers

    this.isComplete = true;
    this._stamp("onComplete", true);
    this.archive();

    // * Remove Task From Client
    return this.helpers ? this.helpers.deleteTask(this) : this;
  }

  fail() {
    // * A Necessary Placeholder
    // * Not To Throw An Error

    this.isComplete = false;
    this._stamp("onFail", false);
    this.archive();

    // * Remove Task From Client
    return this.helpers ? this.helpers.deleteTask(this) : this;
  }

  archive() {
    // * Send Completed Task To Backend Endpoint
    return this;
  }

  reset() {
    // * A Necessary Placeholder
    // * Not To Throw An Error
    console.log("its a task:", this);
    return this;
  }
}

class Streak extends Task {
  interval: number;
  streak: number;
  strikes: number;
  constructor(setup: streakCreation) {
    super(setup);
    this.interval = 1;
    this.streak = 0;
    this.strikes = 0;
    this.setup(setup);
  }
  _stampAdd(stamp: any) {
    stamp.streak = this.streak;
    return stamp;
  }
  _cleanUp() {
    delete this.helpers;
  }
  _isNewDay() {
    const lastStamp = this.timestamps[this.timestamps.length - 1];
    const { key, payload } = lastStamp;
    const last = new Date(key).getTime();
    const now = Date.now();
    const diff = (now - last) / 1000 / 3600 / 24;

    const exactDiff = parseInt(diff.toFixed(0));
    console.log("interval", this.interval);
    console.log("exactDiff", diff);
    console.log("lastStamp:", new Date(last).toDateString(), payload);
    if (exactDiff >= this.interval) {
      return true;
    } else {
      return false;
    }
  }
  _daysTillMonthEnd(d: Date) {
    let counter = 0;
    return daysTillMonthEnd(d);
    function daysTillMonthEnd(d: Date): number {
      const date = new Date(d);
      const month = date.getMonth();
      const tomorrow = new Date(date.getTime() + 86400000);
      const tMonth = tomorrow.getMonth();
      if (month === tMonth) {
        counter++;
        return daysTillMonthEnd(tomorrow);
      } else {
        const _counter = counter;
        counter = 0;
        return _counter;
      }
    }
  }

  _daysBetween(first: Date, second: Date): number {
    let D1 = first.getDate();
    let D2 = second.getDate();

    if (first.getMonth() !== second.getMonth()) {
      if (D1 > D2) {
        const inc = this._daysTillMonthEnd(first);
        return Math.abs(D2 + inc);
      } else if (D1 === D2) {
        // * Dont Know The Right Algorithm For Date Calculation
        // * Ok As Long As Return Value !== 0
        return 69;
      } else {
        return this._daysBetween(second, first);
      }
    } else {
      return Math.abs(D1 - D2);
    }
  }
  _needCheck() {
    // * If More Days Than this.interval Have passed
    // * Checks If _daysBetween(lastCompleted, today) > this.interval
    const last = this.timestamps[this.timestamps.length - 1];
    const { key } = last;
    const now = new Date();
    const daysBetween = this._daysBetween(new Date(key), now);
    return daysBetween > this.interval;
  }
  _needResetIsComplete() {
    // * Checks If Last Timestamp === this.interval days ago
    // * Can Be Completed Or Fail Again Today
    const last = this.timestamps[this.timestamps.length - 1];
    const { key } = last;
    const now = new Date();
    const daysBetween = this._daysBetween(new Date(key), now);
    return daysBetween === this.interval;
  }
  _needCleanup() {
    const last = this.timestamps[this.timestamps.length - 1];
    const { key } = last;
    const now = new Date();
    const daysBetween = this._daysBetween(new Date(key), now);
    if (daysBetween % this.interval === 0) {
      this.isComplete = false;
    }
    return this;
  }

  _handleButtonColor(type: String) {
    const { payload } = this.timestamps[this.timestamps.length - 1];
    let tags = "";

    if (this.isComplete) {
      switch (type) {
        case "complete":
          if (payload === "onComplete") tags = " ";
          else if (payload === "onFail") tags = " is-outlined";
          break;
        case "fail":
          if (payload === "onComplete") tags = " is-outlined";
          else if (payload === "onFail") tags = " ";
          break;
        default:
          break;
      }
      return tags;
    } else {
      return " is-outlined";
    }
  }
  _handleStreakColor() {
    const s = this.streak;
    let color = "is-info";
    if (s <= -10) color = "is-warning";
    else if (s <= -5) color = "is-danger";
    else if (s < 0 && s > -5) color = "is-link";
    else if (s === 0) {
    } else if (s >= 5 && s < 10) color = "is-primary";
    else if (s >= 10) color = "is-success";
    return color;
  }

  reset() {
    if (this._needCheck()) {
      // * Has Not Been Completed / Failed On Time

      return this.failLastInterval();
      // * Fail Last Interval
    } else if (this._needResetIsComplete()) {
      // * Today Task Can Be Completed Or Failed Again
      // * this.streak Days Have Passed Since Last Completion/Fail

      this.isComplete = false;
      // * Allows Task To Be Completed
      return this;
    }
    // * If No Check Is Needed And Its Not Yet My Time Of The Month Again
    // * Leave Me Be
    return this;
  }
  create(setup: streakCreation) {
    // * Defaults Streak & Strikes To 0 If Not Given In setup
    this.streak = !setup.streak ? 0 : setup.streak;
    this.strikes = !setup.strikes ? 0 : setup.strikes;
    return this;
  }
  fail(helpers?: any) {
    if (!this.isComplete) {
      this.strikes++;
      if (this.streak <= 0) {
        this.streak--;
      } else {
        this.streak = 0;
      }
      this.isComplete = true;
      this._stamp("onFail", false);
      if (this.helpers) {
        this.helpers.setTask(this);
      }
      this._cleanUp();
      return this;
    }
  }
  failLastInterval() {
    this.strikes++;
    if (this.streak <= 0) {
      this.streak--;
    } else {
      this.streak = 0;
    }
    if (this.interval > 1) {
      this.isComplete = true;
    } else {
      this.isComplete = false;
    }
    const { key } = this.timestamps[this.timestamps.length - 1];
    const nextDate = new Date(key + this.interval * 86400000);
    this._stamp("onFail", false, nextDate.getTime());
    this._cleanUp();
    return this;
  }
  complete() {
    if (!this.isComplete) {
      if (this.streak < 0) {
        this.streak = 1;
      } else {
        this.streak++;
      }
      // ! Typescript Error
      this.isComplete = true;
      this._stamp("onComplete", true);
      if (this.helpers) {
        this.helpers.setTask(this);
      }
      this._cleanUp();
      return this;
    }
  }
  completeLastInterval() {
    if (this.streak < 0) {
      this.streak = 1;
    } else {
      this.streak++;
    }
    if (this.interval > 1) {
      this.isComplete = true;
    } else {
      this.isComplete = false;
    }
    const { key } = this.timestamps[this.timestamps.length - 1];
    const nextDate = new Date(key + this.interval * 86400000);
    this._stamp("onComplete", true, nextDate.getTime());
    this._cleanUp();
    return this;
  }
}

class Daily extends Streak {
  constructor(setup: streakCreation) {
    super(setup);
    this.interval = 1;
    this.streak = 0;
    this.setup(setup);
  }
}
class Habit extends Streak {
  constructor(setup: habitCreation) {
    super(setup);
    this.streak = 0;
    this.setup(setup);
  }
  //TODO Setup no reset / I Think that might just do
  //TODO It wont, rewrite complete,fail
  reset() {
    return this;
  }
  complete() {
    this.streak++;
    if (this.helpers) {
      this.helpers.setTask(this);
    }
    return this;
  }
  fail() {
    this.streak--;
    if (this.helpers) {
      this.helpers.setTask(this);
    }
    return this;
  }
}
class Challenge extends Streak {
  start: Date | number | any;
  end: Date | number | any;
  isOngoing: Boolean;
  rip: any;
  constructor(setup: challengeCreation) {
    super(setup);
    this.isOngoing = false;
    this.setup(setup);
  }
  create(setup: challengeCreation) {
    this._isOngoing();
    return this;
  }
  _isOngoing() {
    const start = new Date(this.start).getTime();
    const end = new Date(this.end).getTime();
    const today = Date.now();

    if (start < today && today < end) {
      // * Challenge Hast Started But Not Finished

      this.isOngoing = true; // * Necessary side effect
      this.isComplete = false;
    } else {
      // * Either Has Not Started
      // * Or Is Finished

      this.isOngoing = false; // * Necessary side effect
      this.isComplete = true;
    }
  }
  _needCheck() {
    // * If More Days Than this.interval Have passed
    // * Checks If _daysBetween(lastCompleted, today) > this.interval
    const last = this.timestamps[this.timestamps.length - 1];
    let { key } = last;
    const now = new Date();

    if (key < new Date(this.start).getTime()) {
      // * Check If Last Stamp < this.start
      key = new Date(this.start).getTime();
    }

    const daysBetween = this._daysBetween(new Date(key), now);
    return daysBetween > this.interval;
  }
  reset() {
    this._isOngoing();
    // * Checks If Challenge Is Over Or Not
    // * Reset this.isOngoing If Necessary

    if (this.isOngoing) {
      if (this._needCheck()) {
        // * Has Not Been Completed / Failed On Time

        return this.failLastInterval();
        // * Fail Last Interval
      } else if (this._needResetIsComplete()) {
        // * Today Task Can Be Completed Or Failed Again
        // * this.streak Days Have Passed Since Last Completion/Fail

        this.isComplete = false;
        // * Allows Task To Be Completed
        return this;
      }
    }
    // * If No Check Is Needed And Its Not Yet My Time Of The Month Again
    // * Leave Me Be
    return this;
  }
}
class Dream extends Task {
  constructor(setup: taskCreation) {
    super(setup);
  }
}
class Goal extends Task {
  constructor(setup: taskCreation) {
    super(setup);
  }
}

export { Task, Streak, Challenge, Daily, Dream, Goal, Habit };

/*
const task = new Task({
  title: "test",
  notes: "test",
  payload: "Task",
  isPrivate: true,
});
const streak = new Streak({
  title: "test",
  notes: "test",
  payload: "Streak",
  isPrivate: true,
}); /*
//task.complete();
//streak.complete();

/*task
  .transform(task, {
    setTask: () => {
      console.log("set Task xD");
    },
    deleteTask: () => {
      console.log("deleted task xD");
    },
  })
  .complete();

console.log(task); 
*/
