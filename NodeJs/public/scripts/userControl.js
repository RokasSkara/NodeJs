/*
JS used to toggle between registration and login forms + change the toggler textContent in userControl.handlebars view
*/

document.querySelector('#toggler').addEventListener('click', () => {
    //selecting appropriate elements for form and text toggling
    const textToggler = document.querySelector('#toggler')
    const login = document.querySelector('#Login')
    const register = document.querySelector('#Register')
    // togling form visibility and button textcontent
    login.classList.toggle('hidden')
    register.classList.toggle('hidden')
    textToggler.textContent === 'Click here to register' ? textToggler.textContent = 'Click here to login' : textToggler.textContent = 'Click here to register' 
})