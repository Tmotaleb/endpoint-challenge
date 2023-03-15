import * as moment from "moment";

const isOverdue = (item) => {
  if (!item.isComplete && item.dueDate) {
    const today = new Date();
    const dueDate = new Date(item.dueDate);
    return dueDate < today;
  }
  return false;
};

const formattedDate = (date) => {
  if (date !== null) {
    return moment(date).format("MM/DD/YYYY");
  }
};

const sortTodos = (todos) => {
  todos.sort((a, b) => {
    if (a.isComplete && !b.isComplete) return 1;
    if (!a.isComplete && b.isComplete) return -1;
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;

    if (a.dueDate && b.dueDate) {
      const dueDateA = new Date(a.dueDate);
      const dueDateB = new Date(b.dueDate);
      return dueDateA - dueDateB;
    }

    return a.description.localeCompare(b.description);
  });
};

export { isOverdue, formattedDate, sortTodos };
