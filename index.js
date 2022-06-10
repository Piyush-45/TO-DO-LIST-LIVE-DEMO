let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});
// step 1 form validation
let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";

    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

// step 2 accepting data => we will store data in an array in the form of objects [{}]

let data = [{}];

// pushing data to let data {} we are using push data to   store data in an array in the form of objects [{}]

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

// step 4 using local storage to store data 
//  .. The localStorage object allows you to save key/value pairs in the browser...

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};
 
// step 3 Creating task 

let createTasks = () => {
  // step 5 using map function 
// as tasks.innerHTML +=  will keep adding divs repeatedly without deleting the previous one
// so we are using tasks.innerHTML = "";  to solve this problem => every time createTask function run 
// it is gonaa clean everythin than it will add new thing
  tasks.innerHTML = ""; 
  // ....  x targest all objects inside array one by one and y is seral number starts from zero 

  data.map((x, y) => {                        
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
          </span>
        </div>
    `); // // ... we are invoking createTasks() in deleteTak so that after every delete we run the entire function again to update the data
  });

  resetForm();
};
// 
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  // slice () will take two arguments first is = item to be deelted | second is number os item to be deelted. after splicing we need to store our updated data in local storage
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

// iife function => mmediately Invoked Function Expression

// An IIFE (Immediately Invoked Function Expression) is a JavaScript function that runs as soon as it is defined
// It is a design pattern which is also known as a Self-Executing Anonymous Function and contains two major parts:

    // The first is the anonymous function with lexical scope enclosed within the Grouping Operator (). This prevents accessing variables within the IIFE idiom as well as polluting the global scope.
    // The second part creates the immediately invoked function expression () through which the JavaScript engine will directly interpret the function.

(() => {
  data = JSON.parse(localStorage.getItem("data")) || []
  console.log(data);
  createTasks();
})();