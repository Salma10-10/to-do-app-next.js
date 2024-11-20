// app.js

let tasks = []; // Array to store tasks

// Function to add a task
function addTask() {
    const taskInput = document.getElementById('task-input');
    const task = taskInput.value.trim();

    if (task !== '') {
        tasks.push({ text: task, done: false });
        taskInput.value = ''; // Clear the input field
        displayTasks(); // Re-render the task list
    }
}

// Function to display all tasks
function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear the current list

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        // Create task text element
        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        if (task.done) taskItem.classList.add('done');
        taskItem.appendChild(taskText);

        // Add 'Mark as Done' button
        const doneButton = document.createElement('button');
        doneButton.textContent = task.done ? 'Undo' : 'Done';
        doneButton.onclick = () => toggleDone(index);
        taskItem.appendChild(doneButton);

        // Add 'Edit' button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTask(index);
        taskItem.appendChild(editButton);

        // Add 'Delete' button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}

// Function to mark a task as done
function toggleDone(index) {
    tasks[index].done = !tasks[index].done;
    displayTasks(); // Re-render tasks
}

// Function to edit a task
function editTask(index) {
    const newTaskText = prompt('Edit Task', tasks[index].text);
    if (newTaskText !== null && newTaskText.trim() !== '') {
        tasks[index].text = newTaskText.trim();
        displayTasks(); // Re-render tasks
    }
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks(); // Re-render tasks
}

// Function to search tasks
function searchTasks() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchInput));
    displayFilteredTasks(filteredTasks); // Display filtered tasks
}

// Function to display filtered tasks (for search)
function displayFilteredTasks(filteredTasks) {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Clear current tasks

    filteredTasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const taskText = document.createElement('span');
        taskText.textContent = task.text;
        if (task.done) taskItem.classList.add('done');
        taskItem.appendChild(taskText);

        const doneButton = document.createElement('button');
        doneButton.textContent = task.done ? 'Undo' : 'Done';
        doneButton.onclick = () => toggleDone(index);
        taskItem.appendChild(doneButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTask(index);
        taskItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);
        taskItem.appendChild(deleteButton);

        taskList.appendChild(taskItem);
    });
}

// Initial display
displayTasks();
