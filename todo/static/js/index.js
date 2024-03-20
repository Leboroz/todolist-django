const closeButton = document.querySelector("#close");
const editButtons = document.querySelectorAll(".edit");
const grayScreen = document.querySelector("#grayScreen");
const addTask = document.querySelector("#addTask");
const updateButton = document.querySelector("#update");
const createButton = document.querySelector("#create");
const modalTitle = document.querySelector("#modalTitle");
const titleInput = document.querySelector('#id_task_title')
const descriptionInput = document.querySelector('#id_task_description')
const completedCheckBoxes = document.querySelectorAll('.completed')

closeButton.addEventListener("click", () => {
  grayScreen.removeAttribute("data-show");
});

addTask.addEventListener("click", () => {
  grayScreen.setAttribute("data-show", "true")
  modalTitle.innerText = "Create Task"

  if(!createButton.hasAttribute("data-show")){
    createButton.setAttribute('data-show', "")
  }

  if(updateButton.hasAttribute('data-show')){
    updateButton.removeAttribute("data-show")
  }
});

editButtons.forEach(editButton => {
  editButton.addEventListener("click", (e) => {
    grayScreen.setAttribute("data-show","true")
    modalTitle.innerText = "Update Task";
    const target = e.currentTarget;

    titleInput.value = target.getAttribute("data-title");
    descriptionInput.value = target.getAttribute("data-description");
    updateButton.value = target.getAttribute("data-id");

    if(createButton.hasAttribute('data-show')){
      createButton.removeAttribute("data-show");
    }

    if(!updateButton.hasAttribute("data-show")){
      updateButton.setAttribute('data-show', "");
    }
  });
});

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

completedCheckBoxes.forEach(completedCheckBox => {
  completedCheckBox.addEventListener('click', async (e)=> {
    const target = e.currentTarget;
    const id = target.getAttribute('data-id');

      const response = await fetch('/update-completed/', {
         method: "POST",
         headers: {
           "X-CSRFToken": getCookie("csrftoken"),
         },
         body: JSON.stringify({
            id,
            completed: target.checked
         }),
       }).then(res=> location.reload())
  })
});

