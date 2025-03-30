// script.js
document.getElementById('textButton').addEventListener('click', function() {
    document.getElementById('message').textContent = 'New Message';
});

document.getElementById('colorButton').addEventListener('click', function() {
    document.getElementById('box').style.backgroundColor = 'blue';
});

document.getElementById('add-item').addEventListener('click', function() {
    const ul = document.getElementById('item-list');
    const li = document.createElement('li');
    li.textContent = 'New Item';
    ul.appendChild(li);
    
    if (ul.children.length % 2 === 0) {
        li.style.fontStyle = 'italic';
        li.style.color = 'red';
    } else {
        li.style.fontWeight = 'bold';
        li.style.color = 'blue';
    }
});

document.getElementById('change-bg').addEventListener('click', function() {
    const color = document.getElementById('color-input').value.trim();
    if (color) {
        document.getElementById('target-div').style.backgroundColor = color;
    } else {
        alert('Invalid color name!');
    }
});

document.getElementById('update-text').addEventListener('click', function() {
    const text = document.getElementById('text-input').value.trim();
    if (text) {
        document.getElementById('target-div').textContent = text;
    } else {
        alert('Please enter some text!');
    }
});

document.getElementById('add-task').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }
    
    const taskList = document.getElementById('task-list');
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;
    
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', () => {
        taskItem.style.textDecoration = 'line-through';
    });
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
    });
    
    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
    
    taskInput.value = '';
});
