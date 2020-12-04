const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
const notification = document.getElementById("notification");
let timeout;
const milisecond = 2000;

//edit option
let editElement;
let editFlag = false;
let editID = "";
// Event Listners
form.addEventListener("submit", addItem);
// clear button
clearBtn.addEventListener("click", cleareItems);
// load items
window.addEventListener('DOMContentLoaded', setUpItems)
    // function
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime().toString();
    if (value && !editFlag) {
        createListItem(id, value)
            //display alert
        displayAlert("item added to the list !!", "success");
        // show container
        container.classList.add("show-container");

        // add to local storage
        addToLocalStorage(id, value);
        // set back to defalut;
        setBackToDefault();
    } else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('value changed', 'success')
            // edit local storage
        editLocalStorage(editID, value);
        setBackToDefault();
    } else {
        displayAlert("please enter value !!", "danger");
    }
}
// display alert 
function displayAlert(text, action) {
    alert.appendChild(iconChangeOnClick(text, action));
    alert.classList.add(`alert-${action}`);
}

function iconChangeOnClick(text, action) {
    let flag = true;
    notification.innerHTML = `${text}<span id="cross" class="m-r"><i class="fas fa-times"></i></span><span id="pause-play" class="m-r"><i class="fas fa-pause"></i></span>`;
    notification.style.display = "block";
    const iconPausePlay = document.getElementById("pause-play");
    const iconCross = document.getElementById("cross");
    let icon;
    iconPausePlay.addEventListener("click", () => {
        if (iconPausePlay.innerHTML === '<i class="fas fa-play"></i>') {
            icon = '<i class="fas fa-pause"></i>';
            flag = true;
        } else {
            icon = '<i class="fas fa-play"></i>';
            flag = false;
        }
        iconPausePlay.innerHTML = icon;
        clearNotification(flag, action, milisecond);
    });
    iconCross.addEventListener("click", () => {
        flag = true;
        clearNotification(flag, action, 1000);
    });
    clearNotification(flag, action, milisecond);
    return notification;
}

function clearNotification(flag, action, milisec) {
    //remove alert
    if (flag) {
        timeout = setTimeout(() => {
            notification.textContent = "";
            alert.classList.remove(`alert-${action}`);
        }, milisec);
    } else {
        clearTimeout(timeout);
    }
}

// clear items
function cleareItems() {
    const items = document.querySelectorAll(".grocery-item");
    if (items.length > 0) {
        items.forEach((item) => {
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    console.log(container.classList);
    displayAlert("empty list", "danger");
    localStorage.removeItem('list');
    setBackToDefault();
}

// delete function
function deleteItem(e) {
    let element = e.currentTarget.parentElement.parentElement;
    let id = element.dataset.id;
    list.removeChild(element);
    if (list.children.length === 0) {
        container.classList.remove("show-container");
    }
    setBackToDefault();

    // remove from local storage
    removeFromLocalStorage(id);
}
// edit function
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    //set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;

    // set from value 
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = 'Edit'

}
// set back to default
function setBackToDefault() {
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit";
}
// local storage
function addToLocalStorage(id, value) {
    let grocery = { id, value };
    let items = getLocalStorage();
    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items))
}
// remove item in local storage
function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    items = items.filter((item) => {
        if (item.id !== id) {
            return item;
        }
    })
    localStorage.setItem('list', JSON.stringify(items))
}

function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map((item) => {
        if (item.id === id) {
            item.value = value
        }
        return item;
    })
    localStorage.setItem('list', JSON.stringify(items))
}

function getLocalStorage() {
    return localStorage.getItem("list") ?
        JSON.parse(localStorage.getItem("list")) : [];
}

function setUpItems() {
    let items = getLocalStorage();
    if (items.length > 0) {
        items.forEach((item) => {
            createListItem(item.id, item.value);
        });
        container.classList.add('show-container')
    }
}

function createListItem(id, value) {
    const element = document.createElement("article");
    // add class
    element.classList.add("grocery-item");
    // add id
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = `<p class='title'>${value}</p>
        <div class='btn-container'>
        <button type='button' class="edit-btn"><i class="fas fa-edit"></i></button>
        <button type='button' class="delete-btn"><i class="fas fa-trash"></i></button>
        </div>`;
    const deleteBtn = element.querySelector(".delete-btn");
    const editBtn = element.querySelector(".edit-btn");
    deleteBtn.addEventListener("click", deleteItem);
    editBtn.addEventListener("click", editItem);

    // append child
    list.appendChild(element);
}