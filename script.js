// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const taskCount = document.getElementById('taskCount');

// Load tasks from local storage on page load
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Initialize the app
function init() {
    renderTasks();
    updateTaskCount();
}

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    updateTaskCount();
}

// Function to update task counter
function updateTaskCount() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    taskCount.textContent = `Total tasks: ${total} | Completed: ${completed}`;
}

// Function to render all tasks
function renderTasks() {
    todoList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        
        const span = document.createElement('span');
        span.className = 'todo-text';
        if (task.completed) {
            span.classList.add('completed');
        }
        span.textContent = task.text;
        
        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-btn';
        completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
        completeBtn.onclick = () => toggleComplete(index);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteTask(index);
        
        li.appendChild(span);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        
        todoList.appendChild(li);
    });
}

// Function to add a new task
function addTask() {
    const text = taskInput.value.trim();
    
    if (text === '') {
        alert('Please enter a task!');
        return;
    }
    
    const newTask = {
        text: text,
        completed: false
    };
    
    tasks.push(newTask);
    taskInput.value = '';
    saveTasks();
    renderTasks();
}

// Function to toggle task completion
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }
}

// Event Listeners
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Initialize the app
init();