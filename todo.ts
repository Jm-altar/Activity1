const form = document.getElementById('new_task');
const input = document.getElementById('newTask') as HTMLInputElement;
const list = document.getElementById('tasks');
let isTaskDone = false   //let because the value is changes

if(form && input && list){   //if statement here to make sure values are not null
    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
    
        const task = input.value;
    
        if(!task){
            alert("There's no task")
            return
        }
    
        const  task_el = document.createElement("div")   //main div container
        task_el.classList.add("task")
    
        const task_content = document.createElement("div")  // container for the task
        task_content.classList.add("content")
    
        task_el.appendChild(task_content)  // puts the task container into the main container
    
        const task_input = document.createElement("input") // the written content of the task
        task_input.classList.add("text")
        task_input.type = "text"
        task_input.value = task
        task_input.setAttribute("readonly", "readonly")
    
        task_content.appendChild(task_input)  //places the content inside the task container
    
        const task_buttons = document.createElement("div") // main container for buttons
        task_buttons.classList.add("buttons")
    
        const task_edit = document.createElement("button")  // creates Edit/Save button
        task_edit.classList.add("edit")
        task_edit.innerHTML = "Edit"
    
        const task_del = document.createElement("button")  // creates Delete button
        task_del.classList.add("del")
        task_del.innerHTML = "Delete"
    
        task_buttons.appendChild(task_edit)   // Places button inside each individual button container
        task_buttons.appendChild(task_del)
    
        task_el.appendChild(task_buttons)  // places the buttons inside the task container
    
        list.appendChild(task_el) // places all tasks in one place like a list
    
        input.value =''
    
        function taskDone(){    // marks tasks to done or not done
            if(isTaskDone == true){
                task_el.style.opacity = '0.3'
            }else{
                task_el.style.opacity = '1'
            }
        }
    
        task_el.addEventListener('dblclick', () => {  //reverts changes to undo marking
            if(isTaskDone == true){
                isTaskDone = false
            }else {
                isTaskDone = true
            }
    
            taskDone()
    
        })
    
        task_edit.addEventListener('click', () => {
            if(task_edit.innerText.toLowerCase() == 'edit'){
                task_input.removeAttribute("readonly")
                task_input.focus()
                task_edit.innerText = "Save"  
            } else {
                task_input.setAttribute("readonly", "readonly")
                task_edit.innerText = "Edit"  
            }
              
        })
    
        task_del.addEventListener('click', ()=>{
            list.removeChild(task_el)
        })
    })
}else {
    alert('Something went wrong')
}