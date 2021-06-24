// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********

// submit form
form.addEventListener('submit', addItem);

// clear Items
clearBtn.addEventListener('click', clearItems);

// load items
window.addEventListener('DOMContentLoaded', setupItems);

// const deleteBtn =document.querySelector('.delete-btn');
// console.log(deleteBtn);

// ****** FUNCTIONS **********
function addItem(e) {
    e.preventDefault();
    //console.log(grocery.value)
    const value = grocery.value;

    const id = new Date().getTime().toString()
    //console.log(id);
    if(value && !editFlag)  {
        //console.log("add item to the list");
        
        createListItem(id, value);
        //display alert
        displayAlert('item added to the list', 'success');
        // show container
        container.classList.add("show-container");
        // add to local storage
        addToLocalStorage(id, value);
        // set back to default
        setBackToDefault();
    }
    else if (value && editFlag) {
        //console.log("editing");
        editElement.innerHTML = value;
        displayAlert('value changed', 'success');
        // edit local storage
        editLocalStorage(editID, value);
        setBackToDefault();
    }
    else {
        displayAlert("please enter value", "danger")
    }    
}

// display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    //remove alert
    setTimeout(function() {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);


    },1000) 
}

// clear items
function clearItems() {
    const items = document.querySelectorAll('.grocery-item');

    if(items.length>0) {
        items.forEach(function(item){
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    setBackToDefault();
    localStorage.removeItem('list');
}

// delete function
function deleteItem(e) {
    //console.log('item delete')
    //console.log(e.currentTarget);
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0) {
        container.classList.remove("show-container");
    }
    displayAlert('item removed', 'danger');
    setBackToDefault();
    // remove from local storage
    removeFromLocalStorage(id);
}

// edit function
function editItem(e) {
    //console.log('edit item');

    const element = e.currentTarget.parentElement.parentElement;
    //console.log(element);
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    // console.log(e.currentTarget);
    // console.log(e.currentTarget.parentElement);
    //console.log(editElement);

    // set form value
    grocery.value = editElement.innerHTML;  
    //console.log(grocery.value);
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "edit";
}

// set backto deafult
function setBackToDefault() {
    //console.log('set back to default')
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}

// ****** LOCAL STORAGE **********

function addToLocalStorage(id, value) {
    //console.log("added to local storage");
    const grocery = {id:id,value:value};
    let items = getLocalStorage();

    //console.log(items);

    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));
    //console.log(grocery);
}

function removeFromLocalStorage(id) {
    let items = getLocalStorage();

    items = items.filter(function(item){
        if (item.id !== id) {
            return item
        }
    })
    localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map(function(item) {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    })
    localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem('list')) : [];  // here '?' will check if there is data when calling getItem, if true it will parse the data, if false it will pass in zero array
} 

// local storage API
// set item
// get item
// removeItem
//save as string



// examples
// localStorage.setItem('orange', JSON.stringify(['item', 'item 2']));
// const oranges = JSON.parse(localStorage.getItem('orange'))
// console.log(oranges);

//localStorage.removeItem('list');


// ****** SETUP ITEMS **********
function setupItems() {
    let items = getLocalStorage();
    if (items.length > 0) {
        items.forEach(function(item) {
            createListItems(item.id, item.value);
        })
        container.classList.add('show-container');
    }
}

function createListItem (id, value) {
    const element = document.createElement('article');
    // add class
    element.classList.add('grocery-item');
    // add id
    const attr = document.createAttribute('data-id');
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <!-- edit btn -->
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <!-- delete btn -->
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`;

    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');
    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);

    // append child
    list.appendChild(element);
}