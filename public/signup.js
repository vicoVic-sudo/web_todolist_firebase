import {createUser} from './firebase.js'

const btnRegisterUser = document.getElementById('btnRegisterUser');

btnRegisterUser.addEventListener('click', function () {
    const txtEmailUser = document.getElementById('txtEmailUser')
    const txtPasswordUser = document.getElementById('txtPasswordUser')

    let email = txtEmailUser.value;
    let password = txtPasswordUser.value;
    createUser(email,password)

        Swal.fire({
            title: 'Signing up successful',
            icon: 'success',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            onClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            window.location='index.html';
        })
            

})