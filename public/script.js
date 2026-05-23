const loginbtn = document.querySelector('#login-btn')
const registerbtn = document.querySelector('#register-btn')

loginbtn.addEventListener('click', function(){
    window.location.href = "/login";
})

registerbtn.addEventListener('click', function(){
    window.location.href = "/register";
})