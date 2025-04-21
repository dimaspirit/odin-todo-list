import "./styles/base.css";

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

class UI {
  constructor(containerQuery) {
    this.containerEl = document.querySelector(containerQuery);
    this.navEl = this.containerEl.querySelector('#nav');
  }

  renderNavItems(project) {
    const liEl = document.createElement('li');
    const buttonEl = document.createElement('button');
    buttonEl.dataset.id = project.id;
    buttonEl.textContent = project.name;

    liEl.appendChild(buttonEl);
    return liEl;
  }

  renderNav(projects) {
    const ulEl = document.createElement('ul');
    const buttonNewEl = document.createElement('button');
    buttonNewEl.textContent = `${String.fromCodePoint('0x1F680')} New Project`;

    projects.forEach(project => {
      ulEl.appendChild(this.renderNavItems(project));
    });

    this.navEl.appendChild(ulEl);
    this.navEl.appendChild(buttonNewEl);
  }
}

const appUI = new UI('.container');

const workProject = new Project('Work');
const defaultProject = new Project('Unassigned');

appUI.renderNav([workProject, defaultProject]);

const todo = Todo({title: 'Swith on the computer', projectId: workProject.id});