const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const list = document.querySelector('#task-list');
const progress = document.querySelector('#progress');
const empty = document.querySelector('#empty-message');
const clearButton = document.querySelector('#clear-completed');

let tasks = JSON.parse(localStorage.getItem('task-board-tasks') || '[]');

function save() { localStorage.setItem('task-board-tasks', JSON.stringify(tasks)); }
function render() {
  list.innerHTML = '';
  tasks.forEach((task) => {
    const item = document.createElement('li');
    item.className = `task${task.done ? ' done' : ''}`;
    item.innerHTML = `<input type="checkbox" ${task.done ? 'checked' : ''} aria-label="${task.text} 완료" /><span></span><button class="delete" aria-label="${task.text} 삭제">×</button>`;
    item.querySelector('span').textContent = task.text;
    item.querySelector('input').addEventListener('change', () => { task.done = !task.done; save(); render(); });
    item.querySelector('.delete').addEventListener('click', () => { tasks = tasks.filter((entry) => entry.id !== task.id); save(); render(); });
    list.append(item);
  });
  const complete = tasks.filter((task) => task.done).length;
  progress.textContent = `${complete} / ${tasks.length} 완료`;
  empty.hidden = tasks.length > 0;
  clearButton.hidden = complete === 0;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.unshift({ id: crypto.randomUUID(), text, done: false });
  save(); render(); form.reset(); input.focus();
});
clearButton.addEventListener('click', () => { tasks = tasks.filter((task) => !task.done); save(); render(); });
render();
