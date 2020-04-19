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
  streak?: number;
  strikes?: number;
}
interface habitCreation extends taskCreation {
  streak?: number;
}

export type { helpers };
export type { taskCreation, streakCreation, habitCreation };
