import { helpers as helpersInterface } from "./interfaces";
import { taskCreation, streakCreation, habitCreation } from "./interfaces";
import { hash } from "../snippets";
import { throws } from "assert";

class Task {
  // Properties
  title?: String;
  notes?: String;
  payload?: String;
  id?: Number;
  isComplete?: Boolean;
  isPrivate?: Boolean;
  timestamps?: Array<any>;
  helpers?: any;

  constructor(setup?: taskCreation) {
    if (setup) this.setup(setup);
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
  streak: any;
  strikes: number;
  constructor(setup?: streakCreation) {
    super();
    this.streak = 0;
    this.strikes = 0;
    if (setup) this.setup(setup);
  }
  _stampAdd(stamp: any) {
    stamp.streak = this.streak;
    return stamp;
  }
  _cleanUp() {
    delete this.helpers;
  }
  reset() {
    const { key, payload } = this.timestamps
      ? this.timestamps[this.timestamps.length - 1]
      : Date.now();
    const lastDate = new Date(key).getDate();
    const lastMonth = new Date(key).getMonth();
    const now = new Date();
    const toDate = now.getDate();
    const toMonth = now.getMonth();
    const diff = Math.abs(toDate - lastDate);

    if (lastDate !== toDate) {
      // * New Day
      if (diff === 1) {
        // * Yesterday, has been completed or failed
        // * No Reset necessary
        this.isComplete = false;
      } else if (diff !== 1) {
        // * Last Completed Or Failed > 1 Days Ago
        // * Fail Task Yesterday
        this.failYesterday();
      }
    }

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
  failYesterday(helpers?: any) {
    this.strikes++;
    if (this.streak <= 0) {
      this.streak--;
    } else {
      this.streak = 0;
    }
    this.isComplete = false;
    this._stamp("onFail", false, Date.now() - 86400000);
    this._cleanUp();
    return this;
  }
  complete(helpers?: any) {
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
  completeYesterday(helpers?: any) {
    if (this.streak < 0) {
      this.streak = 1;
    } else {
      this.streak++;
    }
    this.isComplete = false;
    this._stamp("onComplete", true, Date.now() - 86400000);
    this._cleanUp();
    return this;
  }
}
class Habit extends Streak {
  constructor(setup?: habitCreation) {
    super(setup);
  }
}
class Challenge extends Streak {
  constructor(setup?: habitCreation) {
    super(setup);
  }
}
class Daily extends Streak {
  constructor(setup?: habitCreation) {
    super(setup);
  }
}
class Dream extends Streak {
  constructor(setup?: habitCreation) {
    super(setup);
  }
}
class Goal extends Streak {
  constructor(setup?: habitCreation) {
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
