import { saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask, uploadImage} from './firebase.js'

const taskContainer = document.getElementById('task-container')
const btnSave = document.getElementById('btnSave');
const btnUpdate = document.getElementById('btnSaveTwo');
const btnSaveImage = document.getElementById('btnSaveThree');
const emailUser = sessionStorage.getItem("emailUser");
const btnLogOut = document.getElementById("btnLogOut");

window.addEventListener('DOMContentLoaded', async () => {

  onGetTasks((querySnapshot) => {
    let html = ''
    querySnapshot.forEach(doc => {
      const task = doc.data()    
      
      if(emailUser == task.emailUser){
        html += `
        <ul class="list-group list-group-horizontal rounded-0">
            <li
                class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                <div class="form-check">
                    <input class="form-check-input me-0" type="checkbox" value="">
                </div>
            </li>
            <li
                class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                <p class="lead fw-normal mb-0">${task.title}</p>
            </li>
            <li class="list-group-item px-3 py-1 d-flex align-items-center border-0 bg-transparent">
                <div
                    class="py-2 px-3 me-2 border border-success rounded-3 d-flex align-items-center bg-light">
                    <p class="small mb-0">
                        <a data-mdb-toggle="tooltip" title="Due on date">
                            <i class="fas fa-hourglass-half me-2 text-success"></i>
                        </a>
                        ${task.duedate}
                    </p>
                </div>
            </li>                          
            <li class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                <div class="d-flex flex-row justify-content-end mb-1">
                    <a href="#!" class="text-secondary" data-mdb-toggle="tooltip" title="Edit todo"><i class="fas fa-paperclip me-3 btn-attach" data-id='${doc.id}'></i></a>
                    <a href="#!" class="text-primary" data-mdb-toggle="tooltip" title="Edit todo"><i class="fas fa-eye me-3 btn-detail" data-id='${doc.id}'></i></a>
                    <a href="#!" class="text-warning" data-mdb-toggle="tooltip" title="Edit todo"><i class="fas fa-pencil-alt me-3 btn-edit" data-id='${doc.id}'></i></a>                  
                    <a href="#!" class="text-danger " data-mdb-toggle="tooltip" title="Edit todo"><i class="fas fa-trash-alt btn-delete" data-id='${doc.id}'></i></a>                                                      
                </div>
                <div class="text-end text-muted">
                    
                        <p class="small mb-0"><i class="fas fa-info-circle me-2"></i>${task.registerdate}
                        </p>
                    
                </div>
            </li>
        </ul>`
      }      
    });

    taskContainer.innerHTML = html

    const btnsDelete = taskContainer.querySelectorAll('.btn-delete')

    btnsDelete.forEach(btn => {
      btn.addEventListener('click', ({ target: { dataset } }) => {
        deleteTask(dataset.id);
      });
    });

    const btnsEdit = taskContainer.querySelectorAll('.btn-edit')
    btnsEdit.forEach(btn => {
      btn.addEventListener('click', async ({ target: { dataset } }) => {
        const doc = await getTask(dataset.id)
        const task = doc.data()
        const title = document.getElementById('txtTitleTwo');
        const description = document.getElementById('txtDescriptionTwo');
        const dueDate = document.getElementById('txtDueDateTwo');
        const hideTxt = document.getElementById('txtHidenId');   
        const btnSaveTwo = document.getElementById('btnSaveTwo');
        const btnCancelTwo = document.getElementById('btnCancelTwo');     
      

        $('#exampleModalTwo').modal('show');
        
        title.value = task.title
        description.value = task.description
        dueDate.value = task.duedate     
        hideTxt.value = dataset.id;

        title.disabled = false;
        description.disabled = false;
        dueDate.disabled = false;
        hideTxt.disabled = false;
        btnSaveTwo.classList.remove('d-none')
        btnCancelTwo.classList.remove('d-none')

      });
    });

    const btnsDetail = taskContainer.querySelectorAll('.btn-detail')
    btnsDetail.forEach(btn => {
      btn.addEventListener('click', async ({ target: { dataset } }) => {
        const doc = await getTask(dataset.id)
        const task = doc.data()
        const title = document.getElementById('txtTitleTwo');
        const description = document.getElementById('txtDescriptionTwo');
        const dueDate = document.getElementById('txtDueDateTwo');
        const hideTxt = document.getElementById('txtHidenId');
        const btnSaveTwo = document.getElementById('btnSaveTwo');
        const btnCancelTwo = document.getElementById('btnCancelTwo');
        const imgTask = document.getElementById('imgTask');

        
        
        $('#exampleModalTwo').modal('show');
        
        title.value = task.title
        description.value = task.description
        dueDate.value = task.duedate     
        hideTxt.value = dataset.id;
        
        title.disabled = true;
        description.disabled = true
        dueDate.disabled = true
        hideTxt.disabled = true
        btnSaveTwo.classList.add('d-none')
        btnCancelTwo.classList.add('d-none')
        
        if(task.imgURL){
          imgTask.src = task.imgURL;
        }

      });
    });

    const btsnAttach = taskContainer.querySelectorAll('.btn-attach')
    btsnAttach.forEach(btn => {
      btn.addEventListener('click', async ({ target: { dataset } }) => {
        const doc = await getTask(dataset.id)        
        const hideTxt = document.getElementById('txtHidenIdImage');        

        $('#exampleModalThree').modal('show');
                   
        hideTxt.value = dataset.id;                 

      });
    });

  })
})

btnSave.addEventListener('click', function () {
  const title = document.getElementById('txtTitle');
  const description = document.getElementById('txtDescription');
  const dueDate = document.getElementById('txtDueDate');

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();  
  today = yyyy + '-' + mm + '-' + dd;

  
  saveTask(title.value, description.value, dueDate.value, today, emailUser);

  title.value = ''
  description.value = ''
  dueDate.value = ''

  $('#exampleModal').modal('hide');
  
})


btnUpdate.addEventListener('click', function () {
  const title = document.getElementById('txtTitleTwo');
  const description = document.getElementById('txtDescriptionTwo');
  const dueDate = document.getElementById('txtDueDateTwo');
  let idTaskEdit = document.getElementById('txtHidenId').value;

  
    let jsonData = {
      title: title.value,
      description: description.value,
      duedate : dueDate.value
    }

    updateTask(idTaskEdit, jsonData);
    
  
    title.value = ''
    description.value = ''
    dueDate.value = ''

    $('#exampleModalTwo').modal('hide');
})


btnSaveImage.addEventListener('click', function () {
  let imgFile = document.getElementById('fileUpload').files[0];
  let idTask = document.getElementById('txtHidenIdImage').value;
  let imageName = imgFile.name;

  if(uploadImage(imgFile,imageName, idTask)){
    const fileImage = document.getElementById('fileUpload')

    fileImage.value = '';
    
    $('#exampleModalThree').modal('hide');

  }

})

btnLogOut.addEventListener('click', function () {
  sessionStorage. removeItem('emailUser');
  window.location='index.html';
})