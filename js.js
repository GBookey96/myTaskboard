let allTasks = [];
loadFromLocalStorage()

// -----------------------------------------------------------------
function addTask() {  
    const taskDetails = document.getElementById("formTaskDetails").value
    const taskDueDate = document.getElementById("formTaskDueDate").value
    const taskDueTime = document.getElementById("formTaskDueTime").value
    
    let taskId = 1
    if(allTasks.length > 0) {
        for(task of allTasks) {
            if(task.id>=taskId) {
                taskId = task.id + 1
            }
        }
    }

    let newTask = {
        id: taskId,
        details: taskDetails,
        dueDate: taskDueDate,
        dueTime: taskDueTime
    }

    if(validateFields()) {
        allTasks.push(newTask)
        alert(`Success!
        You entered a new Task!
        ${newTask.details}
        Due on: ${newTask.dueDate} at ${newTask.dueTime}`)
        displayAllTasks()
        saveToLocalStorage()
        resetFormOnSubmit()
    }
}

// -----------------------------------------------------------------
// function confirmTaskAdd() {
//     const taskDetails = document.getElementById("formTaskDetails").value
//     const taskDueDate = document.getElementById("formTaskDueDate").value
//     const taskDueTime = document.getElementById("formTaskDueTime").value


//     confirm(`Please confirm that you want to add the following task:\n${taskDetails}\nDue on: ${taskDueDate} at ${taskDueTime}`)
// }

// -----------------------------------------------------------------
function validateFields() {
    const taskDetails = document.getElementById("formTaskDetails").value
    const taskDueDate = document.getElementById("formTaskDueDate").value
    const taskDueTime = document.getElementById("formTaskDueTime").value
   
    if(taskDetails == "" && taskDueDate == "" && taskDueTime == "") {
        document.getElementById("taskDetailsLabel").style.backgroundColor = "pink"
        document.getElementById("taskDueLabel").style.backgroundColor = "pink"
        document.getElementById("taskDueLabel").style.backgroundColor = "pink"
        alert("You did not enter any information about the task!!!")
        return false
    }
    else if(taskDetails == "") {
        document.getElementById("taskDetailsLabel").style.backgroundColor = "pink"
        alert("Error!\nYou did not enter details for this task!")
        return false
    }
    else if(taskDueDate == "") {
        document.getElementById("taskDueLabel").style.backgroundColor = "pink"
        alert("Error!\nYou did not enter a due date for this task!")
        return false
    }
    else if(taskDueTime == "") {
        document.getElementById("taskDueLabel").style.backgroundColor = "pink"
        alert("Error!\nYou did not enter a due time for this task!")
        return false
    }
    return true
}

// -----------------------------------------------------------------
function displayAllTasks() {
    let myTasks = document.getElementById("myTasks");
    let html = ""
    
    for(task of allTasks) {
            html += `<div class="card bg-transparent text-dark stickyNote">
                        <img src="pics/sticky_note.png" class="card-img">
                        <div class="deleteTask">
                            <button type="button" class="btn" onclick="deleteTask(${task.id})" title="Delete Task">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                </svg>    
                            </button>
                        </div>
                        <div class="card-img-overlay taskText">
                            <h5 class="card-title taskName" id="asd"><b>Task ${task.id}</b></h5>
                            <p class="card-text taskDetails">${task.details}</p>
                            <p class="card-text taskDue"><small><b>Due on <span class="dueDetails">${task.dueDate}</span> at <span class="dueDetails">${task.dueTime}</span></b></small></p>
                        </div>
                    </div>`
        }
        myTasks.innerHTML = html;
    }

// -----------------------------------------------------------------
function resetColors() {
    let taskDetailsLabel = document.getElementById("taskDetailsLabel")
    let taskDueLabel = document.getElementById("taskDueLabel")
    
    taskDetailsLabel.style.backgroundColor = ""
    taskDueLabel.style.backgroundColor = ""
    
}

// -----------------------------------------------------------------
function resetFormOnSubmit() {
    document.getElementById("enterNewTask").reset()
}

// -----------------------------------------------------------------
function resetFormButton() {
    if(confirm("Are you sure?")) {
        document.getElementById("enterNewTask").reset()
    }
}

// -----------------------------------------------------------------
function saveToLocalStorage() {
    let json = JSON.stringify(allTasks)
    localStorage.setItem("allTasks", json)
}

// -----------------------------------------------------------------
function loadFromLocalStorage() {
    const json = localStorage.getItem("allTasks")

    if(json) {
        allTasks = JSON.parse(json)
        document.getElementById("myTasks").innerHTML = ""
        displayAllTasks()
    }
}

// -----------------------------------------------------------------
function deleteTask(id) {
    let confirmDelete = confirm("Are you sure?")
    
    if(confirmDelete) {
        const deleteTask = allTasks.findIndex(task => task.id === id)
        allTasks.splice(deleteTask, 1)
        document.getElementById("myTasks").innerText = ""
        saveToLocalStorage()
        loadFromLocalStorage()
    }
}