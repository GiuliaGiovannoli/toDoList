

const addIcon = document.querySelector(".add");
const addForm = document.querySelector("#add-form");
const colseIcon = document.querySelector(".close");
const errorTag = document.querySelector(".error");
let editCardID = null;
const inputOne = document.querySelector(".todo-title");
const inputTwo = document.querySelector(".todo-description");

class Todo{
    constructor(){
        this.todoItems = [];
    }
    showForm = () =>{
        addForm.classList.add("active");
        errorTag.style.visibility = "hidden";
        if(!editCardID){
            inputOne.value = '';
            inputTwo.value = '';
        }
        inputOne.focus();
    };

    hideForm = () =>{
        addForm.classList.remove("active");
    };

    addTodo(title, description){
        const todo = {
            heading : title, 
            text : description,
            id: Date.now(),
        }
        this.todoItems.push(todo);
        this.renderTodo(todo);
    }

    editTodo(id, title, description){
        const index = this.todoItems.findIndex( item => item.id === id);
        this.todoItems[index].heading = title;
        this.todoItems[index].text = description;
        const card = document.querySelector(`[id='${id}']`);
        card.children[0].textContent = title;
    }

    renderTodo(todo){
        const cards = document.querySelector(".cards");
        const templateHTML = `<div class="card" id="${todo.id}" draggable="true" ondragstart="DragStart(event)" ondragend="DragEnd(event)">
                                <p class="card-text" data-id="${todo.id}" onClick="editCard(this)">${todo.heading}</p>
                                <div class="card-icon">
                                    <i class="fas fa-edit icon edit" data-id="${todo.id}" onclick="editCard(this)"></i>
                                    <i class="far fa-trash-alt icon delete" data-id="${todo.id}" onclick="deleteCard(this)"></i>
                                    <i class="far fa-clock icon clock" data-id="${todo.id}" onclick="showDueDate(this)"></i>
                                </div>
                            </div>`;
        cards.innerHTML += templateHTML;
    };

}

const myTodo = new Todo();

addIcon.addEventListener('click', myTodo.showForm);
colseIcon.addEventListener('click', myTodo.hideForm);
addForm.addEventListener('submit', saveTodo);


function saveTodo(event){
        event.preventDefault();
        const titleText = inputOne.value;
        const descriptionText = inputTwo.value;
        if(titleText !== ''){
            editCardID ? myTodo.editTodo(editCardID, titleText, descriptionText) : myTodo.addTodo(titleText, descriptionText);
            inputOne.value = '';
            inputTwo.value = '';
            inputOne.focus();
            errorTag.style.visibility = "hidden";
            addForm.classList.remove("active");
        }
        else{
            errorTag.style.visibility = "visible";
        }
        editCardID = null;
}

function deleteCard(obj){
    const id = obj.dataset.id;
    myTodo.todoItems = myTodo.todoItems.filter(item => item.id !== Number(id));
    const item = document.querySelector(`[id='${id}']`);
    item.remove();
}

function editCard(obj){
    const id = obj.dataset.id;
    let index = myTodo.todoItems.findIndex(item => item.id === Number(id));
    const editTodo = myTodo.todoItems[index];
    editCardID = editTodo.id;
    myTodo.showForm();
    inputOne.value = editTodo.heading;
    inputTwo.value = editTodo.text;
}

function showDueDate(){
    let dueDate = document.querySelector("input").value;
    alert(`The Due Date is: ${dueDate}`);
}

// Drag and Drop
let boxes = document.getElementsByClassName('box');
for(var box of boxes){
    box.addEventListener('dragover', DragOver);
    box.addEventListener('drop', Drop);
}

let startBox = null;
function DragStart(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    startBox = ev.target.closest(".box");
}

function Drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if(ev.target.classList.contains('cards')){
    }   ev.target.appendChild(document.getElementById(data));
}

 // call on Drag Over
function DragOver(ev) {
    ev.preventDefault()
    ev.target.closest(".box").style.border= "none";
}

// call on Drag End 
function DragEnd(ev){
    ev.preventDefault();
    for(var box of boxes){
        box.style.border= "2px solid lightslategray";
    }
    startBox = null;
}