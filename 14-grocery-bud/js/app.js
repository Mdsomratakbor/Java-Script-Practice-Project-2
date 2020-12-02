const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');
const notification = document.getElementById("notification");
let timeout;
const milisecond = 5000;

//edit option
let editElement;
let editFlag = false;
let editID = "";
// Event Listners
form.addEventListener('submit', addItem)
    // clear button

clearBtn.addEventListener('click', cleareItems);
// function
function addItem(e) {
    e.preventDefault();
    const value = grocery.value;
    const id = new Date().getTime.toString();
    if (value && !editFlag) {
        const element = document.createElement('article');
        // add class
        element.classList.add('grocery-item');
        // add id
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `<p class='title'>${value}</p>
        <div class='btn-container'>
        <button type='button' class="edit-btn"><i class="fas fa-edit"></i></button>
        <button type='button' class="delete-btn"><i class="fas fa-trash"></i></button>
        </div>`;
        // append child
        list.appendChild(element);
        //display alert
        displayAlert("item added to the list !!", "success");
        // show container
        container.classList.add('show-container');

        // add to local storage
        addToLocalStorage(id, value);
        // set back to defalut;
        setBackToDefault();

    } else if (value && !editFlag) {
        console.log('editing');
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
    iconCross.addEventListener('click', () => {
        flag = true;
        clearNotification(flag, action, 1000);
    })
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
    const items = document.querySelectorAll('.grocery-item');
    if (items.length > 0) {
        items.forEach((item) => {
            list.removeChild(item);
        })
    }
    container.classList.remove("show-container");
    displayAlert('empty list', 'danger');
}

// set back to default
function setBackToDefault() {
    grocery.value = '';
    editFlag = false;
    editID = '';
    submitBtn.textContent = 'submit';
}


// local storage

function addToLocalStorage(id, value) {

}