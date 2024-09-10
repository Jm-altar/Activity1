//use Array dur to sorting
let tasks: Array<{ text: string, created: string, expires: string, done: boolean }> = []; 

//-------------------------Functions------------------------------//
function retrieveTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

// Store tasks to localStorage
function storeTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Sort tasks by a specified type
function sortTasks(type: string) {
    switch (type) {
        case 'default':
            tasks.sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
            break;
        case 'alphabetical':
            tasks.sort((a, b) => a.text.localeCompare(b.text)); // compares strings
            break;
        case 'done':
            tasks.sort((a, b) => Number(a.done) - Number(b.done)); //boolean 0 = false, 1 = true
            break;
        default:
            break;
    }
}

// Display tasks on the page
function displayTasks() {
    const list = document.getElementById('tasks');
    if (!list) return;

    list.innerHTML = ''; // Clear the list

    tasks.forEach(taskData => {
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const currentDate = new Date();
        const expiryDate = new Date(taskData.expires);

        // Check if the task is expired
        if (currentDate > expiryDate) {
            task_el.style.backgroundColor = '#FF0000'; // Red background for expired tasks
        } else if (taskData.done) {
            task_el.style.opacity = '0.5'; // Lower opacity if task is done
        }

        const task_content = document.createElement('div');
        task_content.classList.add('content');

        const task_input = document.createElement('input');
        task_input.classList.add('text');
        task_input.type = 'text';
        task_input.value = taskData.text;
        task_input.setAttribute('readonly', 'readonly')

        const exp_date = document.createElement('p');
        exp_date.classList.add('expirylog');
        const ex_d = expiryDate.toLocaleDateString();
        const ex_t = expiryDate.toLocaleTimeString();
        exp_date.innerHTML = `Expires at:<br>${ex_d}<br>${ex_t}`;

        task_content.appendChild(exp_date);
        task_content.appendChild(task_input);

        const task_buttons = document.createElement('div');
        task_buttons.classList.add('buttons');

        const task_del = document.createElement('button');
        task_del.classList.add('del');
        task_del.innerHTML = 'Delete';

        task_buttons.appendChild(task_del);

        task_el.appendChild(task_content);
        task_el.appendChild(task_buttons);

        // Event listeners
        task_el.addEventListener('dblclick', () => {
            taskData.done = !taskData.done;
            storeTasks();
            displayTasks();
        });

        task_del.addEventListener('click', () => {
            tasks = tasks.filter(t => t !== taskData);
            storeTasks();
            displayTasks();
        });

        list.appendChild(task_el);
    });
}

//---------------------------------------------------------//

// Add event listener for page load
document.addEventListener('DOMContentLoaded', () => {
    retrieveTasks();
    displayTasks(); // Display tasks after retrieval
});

// Form submission handler
const form = document.getElementById('new_task') as HTMLFormElement;
const input = document.getElementById('newTask') as HTMLInputElement;
const isExpired = document.getElementById('dtTask') as HTMLInputElement;

if (form && input && isExpired) {
    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert("There's no task");
            return;
        }

        const newTask = {
            text: task,
            created: new Date().toISOString(),
            expires: new Date(isExpired.value).toISOString(), // Set expiry date
            done: false
        };

        tasks.push(newTask);

        storeTasks();
        displayTasks();

        input.value = '';
        isExpired.value = '';
    });
} else {
    alert('Something went wrong');
}

// Sorting event listeners
const dS = document.getElementById('defSort') as HTMLButtonElement;
const aS = document.getElementById('alphSort') as HTMLButtonElement;
const cS = document.getElementById('compSort') as HTMLButtonElement;

if (dS && aS && cS) {
    dS.addEventListener('click', () => {
        sortTasks('default');
        storeTasks();
        displayTasks();
    });

    aS.addEventListener('click', () => {
        sortTasks('alphabetical');
        storeTasks();
        displayTasks();
    });

    cS.addEventListener('click', () => {
        sortTasks('done');
        storeTasks();
        displayTasks();
    });
} else {
    console.warn('Sorting buttons are not available');
}