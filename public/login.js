import {loginUser} from './firebase.js'

const btnLoginUser = document.getElementById('btnLoginUser');

btnLoginUser.addEventListener('click', async function () {
    const txtEmailUser = document.getElementById('txtEmailUser')
    const txtPasswordUser = document.getElementById('txtPasswordUser')

    let email = txtEmailUser.value;
    let password = txtPasswordUser.value;
    loginUser(email,password);                

    
})