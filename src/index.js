import "./styles/base.css";

import UI from './ui';

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

const TodosList = {
  getTodosByProjectId: function(todos, projectId) {
    return todos.filter(todo => todo.projectId === projectId);
  }
}


const appUI = new UI('.container', {
  changeActiveProject: (projectId) => {
    handleActiveProjectId(projectId);
  }
});

let activeProjectId;


const workProject = new Project('Work');
const defaultProject = new Project('Unassigned');

activeProjectId = workProject.id;

const todo = Todo({title: 'Swith on the computer', projectId: workProject.id});


appUI.renderNav([workProject, defaultProject], activeProjectId);
appUI.renderMain(TodosList.getTodosByProjectId([todo], activeProjectId));

const handleActiveProjectId = (projectId) => {
  activeProjectId = projectId;
  console.log(TodosList.getTodosByProjectId([todo], activeProjectId))
  appUI.renderNav([workProject, defaultProject]);
  appUI.renderMain(TodosList.getTodosByProjectId([todo], activeProjectId));
}