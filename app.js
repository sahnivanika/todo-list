document.addEventListener("DOMContentLoaded",()=>{
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))
    if(storedTasks)
    {
        storedTasks.forEach((task)=>tasks.push(task))
        updateTasksList();
        updateStats();
    }

})

let tasks = [];
const saveTasks =()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks))
}
const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim(); // Changed ariaValueMax to value

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = ""; // Clear input after task is added
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

const updateTasksList = () => {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = ''; // Clear current list

    tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" onclick="editTask(${index})" />
                    <img src="./img/bin.png" onclick="deleteTask(${index})" />
                </div>
            </div>
        `;

        // Add event listener for checkbox toggle
        listItem.addEventListener('change', () => toggleTaskComplete(index));
        taskList.append(listItem); // Add the task to the list
    });
};

// Additional functions to edit and delete tasks
const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed; // Toggle task completion status
    updateTasksList(); // Refresh the task list
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput')
    taskInput.value=tasks[index].text
    tasks.splice(index,1)
    updateTasksList();
    updateStats();
    saveTasks();

};
const toggleTastComplete =(index) =>
{
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateStats();
    saveTasks();
};
const deleteTask = (index) => {
    tasks.splice(index, 1); // Remove the task
    updateTasksList(); // Refresh the task list
    updateStats();
    saveTasks();
};

const updateStats =()=>
{
    const completeTasks = tasks.filter(task=>task.completed).length
    const totalTasks =tasks.length
    const progress = (completeTasks/totalTasks)*100
    const progressBar = document.getElementById('progress')
    progressBar.style.width=`${progress}%`;
    document.getElementById('numbers').innerText=`${completeTasks} / ${totalTasks}`
    if (totalTasks > 0 && completeTasks === totalTasks) {
        alert("Congratulations, you are all done!");
    }
}
 
// Event listener for the "Add" button
document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});
