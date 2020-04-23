interface helpers {
  setTask: Function;
  setTasks: Function;
  addTask: Function;
  deleteTask: Function;
}
interface taskCreation {
  title: String;
  notes: String;
  payload: String;
  isPrivate?: Boolean;
  proto?: Boolean;
}
interface streakCreation extends taskCreation {
  inerval?: number;
  streak?: number;
  strikes?: number;
}
interface habitCreation extends taskCreation {
  streak?: number;
}
interface challengeCreation extends streakCreation {
  interval?: number;
  start: number | Date;
  end: number | Date;
}

export type { helpers };
export type { taskCreation, streakCreation, habitCreation, challengeCreation };
