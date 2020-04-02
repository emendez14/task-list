let task_Form = document.querySelector('.task-form'), // task forms
    filter_Form = document.querySelector('.filter-form'),
    task_Input = document.querySelector('.task-input'), // task input field
    filter_Input = document.querySelector('.filter-input'), // filter input field
    add_To_LS = document.querySelector('.addToLSButton'), // button selectors
    remove_From_Ls = document.querySelector('.RmLsButton'),
    task_List = document.querySelector('.collection'); // list of tasks

// now I want to create elements, append them to the DOOM, everytime I click submit the form, essentially.

loadEventListeners();

function loadEventListeners(){
    document.addEventListener('DOMContentLoaded', getTasks);
    task_Form.addEventListener('submit', addToLs);
    task_List.addEventListener('click', removeItem);
    remove_From_Ls.addEventListener('click', clearTasks);
    filter_Input.addEventListener('keyup', filterTasks);
}

function getTasks(){

    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task)=>{
        let li  = document.createElement('li');
        li.className = "task-item";
        li.appendChild(document.createTextNode(task));
        let remove_item = document.createElement('a');
        remove_item.setAttribute('href', '#');
        remove_item.className = "remove-item-button";
        remove_item.innerHTML = `<i class="remove-item">x</i>`;
        li.appendChild(remove_item);
        task_List.appendChild(li);
    })
}

function addToLs(e){

    let li  = document.createElement('li');
    li.className = "task-item";
    li.appendChild(document.createTextNode(task_Input.value));
    let remove_item = document.createElement('a');
    remove_item.setAttribute('href', '#');
    remove_item.className = "remove-item-button";
    remove_item.innerHTML = `<i class="remove-item">x</i>`;
    li.appendChild(remove_item);
    task_List.appendChild(li);

    e.preventDefault();
    
    storeTaskLS(task_Input.value);

}

function storeTaskLS(task){

    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function removeFromLS(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task, index)=>{
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeItem(e){

    if(e.target.parentElement.parentElement.classList.contains('task-item')){
        e.target.parentElement.parentElement.classList.contains('task-item');
        if(confirm('are you sure?')){
            e.target.parentElement.parentElement.remove();
            removeFromLS(e.target.parentElement.parentElement);
        }
    }
}

function clearTasks(){
    // task_List.innerHTML = '';
    while(task_List.firstChild){
        task_List.removeChild(task_List.firstChild);
    }
}

function filterTasks(e){
   const text = e.target.value;

   document.querySelectorAll('.task-item').forEach((task)=>{
       const item = task.firstChild.textContent;
       if(item.indexOf(text) != -1){
           task.style.display = "block";
       } else {
           task.style.display = "none";
       }
   })
}