const taskContainer = document.querySelector(".task__container");
let globalStore = [];
console.log(taskContainer);

const generateNewCard = (taskData) => 

  `<div class="col-sm-12 col-md-6 col-lg-4 id=${taskData.id}">
    <div class="card">
      <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success"><i class="fas fa-edit "></i></button>
        <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button>
      </div>
      <div class="card-body">
        <img src=${taskData.imageUrl} class="card-img-top" alt="Image">
        <h5 class="card-title fw-bold text-primary mt-3">${taskData.taskTitle}</h5>
        <p class="card-text">${taskData.taskDescription}</p>
        <a href="#" class="btn btn-primary">Open Task</a>
      </div>
    </div>
  </div>`


// Function to load cards
const loadInitialCards = () => {

  // Local Strorage to get card data
  const getCardData = localStorage.getItem("hbID");

  // Convert to normal object
  const {cards} = JSON.parse(getCardData); //Convert into object : Reverse of stringify

  // Loop over those array of task object to create HTML card, then inject that card to DOM.
  cards.map((cardObject) => {
      taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

      // Update Global Store
      globalStore.push(cardObject);
    }
  )
};

// Delete Function

const deleteCard = (event) => {

  event = window.event;

  // Fetching ID of the event 
  const targetID = event.target.id;
  const tagName = event.target.tageName;

  //Update GlobalStore
  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  localStorage.setItem("hbID", JSON.stringify({cards: globalStore}));

  if(tagName === "BUTTON") {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }
  else {
    // This is for fafa icon which has 4 parents
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }

};

// Function to save changes
const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`,
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value
  };
  console.log(taskData);

  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

  globalStore.push(taskData);
  localStorage.setItem("hbID", JSON.stringify({cards: globalStore}));

};

// Issues

// 1. Page Refresh cause the data to be deleted
// API : Application Programming Interface
// Local Storage -> Accesing application via local storage
// Interface means middle man
// 2. Delete, Edit, open the card
