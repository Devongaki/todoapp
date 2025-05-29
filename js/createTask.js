const createTaskInput = document.getElementById('todo-input');
const createTaskButton =document.getElementById('add-todo-button');


export const creteTask = () => {
    const taskText = createTaskInput.value;
    return taskText
}

