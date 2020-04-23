import {
  Task,
  Streak,
  Daily,
  Challenge,
  Habit,
  Goal,
  Dream,
} from "../Tasks/classes";
function switchForPayload(task: any, stateHelpers: any): any {
  const { payload } = task;
  let _task;
  switch (payload) {
    case "Task":
      _task = new Task(task).transform(task, stateHelpers);
      break;
    case "Daily":
      _task = new Daily(task).transform(task, stateHelpers);
      break;
    case "Habit":
      _task = new Habit(task).transform(task, stateHelpers);
      break;
    case "Streak":
      _task = new Streak(task).transform(task, stateHelpers);
      break;
    case "Goal":
      _task = new Goal(task).transform(task, stateHelpers);
      break;
    case "Dream":
      _task = new Dream(task).transform(task, stateHelpers);
      break;
    case "Challenge":
      _task = new Challenge(task).transform(task, stateHelpers);
      break;

    default:
      break;
  }
  return _task;
}

export default switchForPayload;
export { switchForPayload };
