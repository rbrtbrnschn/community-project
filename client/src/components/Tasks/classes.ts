import { hash } from "../snippets";
interface taskCreation {
  title: String;
  notes: String;
  payload: String;
}
interface challengeCreation extends taskCreation {
  start: Date;
  end: Date;
}

class Task {
  title: any;
  notes: any;
  payload: any;
  id: any;
  createdAt: any;
  completedAt: any;
  archivedAt: any;
  timestamps: any;
  isComplete: any;

  constructor(_task?: taskCreation) {
    this._create(_task);
  }
  _create(task?: any) {
    if (task) {
      const { title, notes, payload } = task;
      this.title = title;
      this.notes = notes;
      this.payload = payload;
      this.id = hash();
      this.createdAt = new Date().toLocaleDateString();
      this.timestamps = [
        { payload: "onCreate", key: Date.now(), isComplete: false },
      ];
      this.isComplete = false;
      return this;
    }
  }
  _complete(task: Task, helpers?: any) {
    const stamp = { payload: "onComplete", key: Date.now(), isComplete: true };
    task.timestamps.push(stamp);
    task.isComplete = true;
    task.completedAt = new Date().toLocaleDateString();
    if (helpers) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      };
      fetch("http://localhost:3000/api/task/complete", options);
      const { deleteTask } = helpers;
      deleteTask(task);
    }
    return task;
  }
  _archive(task: Task, helpers?: any) {
    const stamp = { payload: "onArchive", key: Date.now(), isComplete: false };
    task.timestamps.push(stamp);
    task.archivedAt = new Date().toLocaleDateString();
    if (helpers) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      };
      fetch("http://localhost:3000/api/task/archive", options);
      const { deleteTask } = helpers;
      deleteTask(task);
    }
    return task;
  }
  _reset(task?: any) {
    return;
  }
}

class Habit extends Task {
  constructor(task?: taskCreation) {
    super(task);
  }
}
class Daily extends Task {
  constructor(task?: taskCreation) {
    super(task);
  }
}
class Streak extends Task {
  streak: number;
  strikes: number;
  constructor(task?: taskCreation) {
    super(task);
    this.streak = 0;
    this.strikes = 0;
  }
  isNewDay(key: Date) {
    const today = new Date();
    return new Date(key) !== today ? true : false;
  }
  isNextDay(key: Date) {
    const today = new Date();
    return Math.abs(today.getDate() - new Date(key).getDate()) === 1
      ? true
      : false;
  }
  _complete(task: any, helpers?: any) {
    if (!task.isComplete) {
      const stamp = {
        payload: "onComplete",
        key: Date.now(),
        isComplete: true,
      };
      task.timestamps.push(stamp);
      task.isComplete = true;
      task.completedAt = new Date().toLocaleDateString();
      task.streak = task.streak + 1;
      if (helpers) {
        const { setTask } = helpers;
        setTask(task);
      }
    }
    return task;
  }
  _completeYesterday(task: Streak, helpers?: any) {
    if (!task.isComplete) {
      const dayInMs = 86400000;
      const yesterKey = Date.now() - dayInMs;
      const yesterDay = new Date(yesterKey);
      const yesterDate = yesterDay.getDate();

      const lastStamp = task.timestamps[task.timestamps.length - 1];
      const lastKey = lastStamp.key;
      const lastDay = new Date(lastKey);
      const lastDate = lastDay.getDate();

      const now = Date.now();
      const toDay = new Date(now);
      const toDate = toDay.getDate();

      if (lastDate === toDate) return;

      const yesterdayStamp = {
        payload: "onComplete",
        key: yesterKey,
        isComplete: true,
      };
      task.timestamps.push(yesterdayStamp);
      task.isComplete = false;
      task.completedAt = yesterDay.toLocaleDateString();
      task.streak = task.streak + 1;
      if (helpers) {
        const { setTask } = helpers;
        setTask(task);
      }
    }

    return task;
  }
  _fail(task: Streak, helpers?: any) {
    if (!task.isComplete) {
      const stamp = {
        payload: "onFail",
        key: Date.now(),
        isComplete: false,
      };
      task.isComplete = true;
      //task.isComplete only notifies handlers, that it cannot be manipulated anymore - no more completing, no failing
      //since u can only ever fail OR complete a task on the same day
      task.timestamps.push(stamp);
      task.strikes = task.strikes + 1;
      if(task.streak > 0){
      task.streak = 0;
      }
      else{
      task.streak= task.streak - 1;
      }
      if (helpers) {
        const { setTask } = helpers;
        return setTask(task);
      }
    }
    return task;
  }

  _failYesterday(task: Streak, helpers?: any) {
    const {key, value, payload } = task.timestamps[task.timestamps - 1];
    const lastDate = new Date(value).getDate();
    const toDay = new Date();
    const toDate = toDay.getDate();
    const yesterDay = new Date();
    yesterDay.setDate(toDay.getDate() - 1);

    if(payload === "onFail" && Math.abs(toDate - lastDate) === 1){
    console.log("was failed manually yesterday");
    return;}

    const stamp = {
      payload: "onFail",
      key: yesterDay.getTime(),
      isComplete: false,
    };
    task.isComplete = false;
    task.timestamps.push(stamp);
    task.strikes = task.strikes + 1;
    if(task.streak > 0){
    task.streak = 0;
    }
    else{
    task.streak--;
    }
    if (helpers) {
      const { setTask } = helpers;
      return setTask(task);
    }
    return task;
  }
  _reset(task: any, helpers?: any) {
    const lastStamp = task.timestamps[task.timestamps.length - 1];
    const { key } = lastStamp;
    const lastDate = new Date(key);
    const toDate = new Date();
    const lastDay = lastDate.getDate();
    const toDay = toDate.getDate();
    if (helpers) {
      const { setTask } = helpers;
      if (Math.abs(toDay - lastDay) === 1) {
        if (task.timestamps[task.timestamps.length - 1].isComplete) {
          task.isComplete = false;
          console.log("Completed Yesterday:", task.title);
          return setTask(task);
        } else {
          console.log("Failed yesterday:", task.title);
          return this._failYesterday(task, helpers);
        }
      } else if (toDay !== lastDay) {
        console.log("failed streak NOT SURE WHAT DIS IS");
        return this._failYesterday(task, helpers);
      }
    }
    return task;
  }
}
class Goal extends Task {
  constructor(task?: taskCreation) {
    super(task);
  }
}
class Dream extends Task {
  constructor(task?: taskCreation) {
    super(task);
  }
}
class Challenge extends Streak {
  start: Date;
  end: Date;
  constructor(task?: challengeCreation) {
    super(task);
    this.start = task ? task.start : new Date();
    this.end = task ? task.end : new Date(this.start.getTime() + 86400000 * 30);
  }
  checkTimeUp(task: any, helpers: any) {
    const toDay = new Date();
    return toDay > task.end ? true : false;
  }
  _reset(task: any, helpers: any) {
    const lastStamp = task.timestamps[task.timestamps.length - 1];
    const { key } = lastStamp;
    const lastDay = new Date(key);
    if (helpers) {
      const { setTask } = helpers;
      if (task.over) {
        console.log("Challenge Over.");
        return;
      }
      if (this.checkTimeUp(task, helpers)) {
        task.over = true;
        console.log("Challenge Finished.");
        return setTask(task);
      }
      if (this.isNextDay(key)) {
        if (task.timestamps[task.timestamps.length - 1].isComplete) {
          task.isComplete = false;
          console.log("Completed Yesterday:", task.title);
          return setTask(task);
        } else {
          console.log("Failed yesterday:", task.title);
          return this._failYesterday(task, helpers);
        }
      } else if (this.isNewDay(key)) {
        console.log("failed challenge, youve been absent for more than 1 day");
        return this._failYesterday(task, helpers);
      }
    }
  }
}

export { Task, Habit, Daily, Streak, Goal, Dream, Challenge };
