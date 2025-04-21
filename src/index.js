const Todo = ({title, description, dueDate, priority, projectId} = {}) => {
  return {
    title,
    description,
    dueDate,
    priority,
    projectId,
  }
}

class Project {
  #uuid = crypto.randomUUID();

  constructor(name, description = '') {
    this.name = name;
    this.description = description;
  }

  get id() {
    return this.#uuid;
  }
}

const home = new Project('Home');
const work = new Project('Work');
const defaultProject = new Project('Unassigned');

const todo = Todo({title: 'Swith on the computer', projectId: work.id});
console.log(todo);

