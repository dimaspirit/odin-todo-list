export default class UI {
  constructor(containerQuery, {changeActiveProject}) {
    this.containerEl = document.querySelector(containerQuery);

    this.handlers = {
      changeActiveProject,
    }

    const navName = 'nav';
    this.navEl = document.createElement('nav');
    this.navEl.classList.add(navName);
    this.navEl.id = navName;
    this.containerEl.appendChild(this.navEl);

    const mainName = 'main';
    this.mainEl = document.createElement('main');
    this.mainEl.classList.add(mainName);
    this.mainEl.id = mainName;
    this.containerEl.appendChild(this.mainEl);
  }

  cleanUpSection(sectionEl) {
    while(sectionEl.firstChild) {
      sectionEl.removeChild(sectionEl.lastChild);
    }
  }

  renderNavItems(project, isActive = false) {
    const liEl = document.createElement('li');
    const buttonEl = document.createElement('button');
    buttonEl.dataset.id = project.id;
    buttonEl.textContent = project.name;

    if(isActive) {
      buttonEl.classList.add('active');
    } else {
      buttonEl.addEventListener('click', () => this.handlers.changeActiveProject(project.id))
    }

    liEl.appendChild(buttonEl);
    return liEl;
  }

  renderNav(projects, activeProjectId) {
    this.cleanUpSection(this.navEl);

    const ulEl = document.createElement('ul');
    const buttonNewEl = document.createElement('button');
    buttonNewEl.textContent = `${String.fromCodePoint('0x1F680')} New Project`;

    projects.forEach(project => {
      const isActive = (activeProjectId && activeProjectId === project.id) ? true : false;
      ulEl.appendChild(this.renderNavItems(project, isActive));
    });

    this.navEl.appendChild(ulEl);
    this.navEl.appendChild(buttonNewEl);
  }

  renderMain(todos) {
    this.cleanUpSection(this.mainEl);

    if(!todos.length) {
      const emptyStateEl = document.createElement('div');
      const emptyStateText = document.createElement('h4');
      emptyStateText.textContent = 'Nothing here :(';
      emptyStateEl.appendChild(emptyStateText);
      this.mainEl.appendChild(emptyStateEl);
      return;
    }

    const listEl = document.createElement('ul');

    todos.forEach(todo => {
      const itemEl = document.createElement('li');
      itemEl.textContent = todo.title;
      listEl.appendChild(itemEl);
    });

    this.mainEl.appendChild(listEl);
  }
}