import { saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask} from './firebase.js'

const taskForm = document.getElementById('task-form')
const taskContainer = document.getElementById('task-container')
let editStatus = false;
let idTaskEdit = '';

window.addEventListener('DOMContentLoaded', async () => {

  onGetTasks((querySnapshot) => {
    let html = ''
    querySnapshot.forEach(doc => {
      const task = doc.data()
      html += `
      <div>
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <button class='btn-delete' data-id='${doc.id}'>Delete</button>
        <button class='btn-edit' data-id='${doc.id}'>Edit</button>
      </div>
    `
    });

    taskContainer.innerHTML = html

    const btnsDelete = taskContainer.querySelectorAll('.btn-delete')
    btnsDelete.forEach(btn => {
      btn.addEventListener('click', ({target: {dataset}}) => {
        deleteTask(dataset.id);
      });
    });
    
    const btnsEdit = taskContainer.querySelectorAll('.btn-edit')
    btnsEdit.forEach(btn => {
      btn.addEventListener('click',async ({target: {dataset}}) => {              
        const doc = await getTask(dataset.id)
        const task = doc.data()

        taskForm['task-title'].value = task.title
        taskForm['task-description'].value = task.description
        idTaskEdit = dataset.id;        

        editStatus = true
      });
    });
    
  })
})


taskForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const title = taskForm['task-title']
  const description = taskForm['task-description']

  if(editStatus){
    let jsonData = {
      title: title.value, 
      description: description.value}

    updateTask(idTaskEdit,jsonData);
    editStatus = false;
  }else{
    saveTask(title.value, description.value);
  }

  taskForm.reset()
})