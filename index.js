

const userRegex = /^(?=.*[a-z])(?=.*[0-9]).{6,10}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,10}$/;
const emailRegex =  /^\S+@\S+\.\S{3,4}$/;
const phonenumberRegex = /^[0-9]{6,16}$/;

// Creamos los selectores 2
const countries = document.querySelector("#countries");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const phoneCode = document.querySelector("#phone-code");
const phoneInput = document.querySelector("#phone");
const passwordInput = document.querySelector("#password");
const confirmPasswordInput = document.querySelector("#confirm-password");
const formBtn = document.querySelector("#form-btn");
const form = document.querySelector("#form");


//Validaciones
let usernameValidation = false;
let emailValidation = false;
let phoneValidation = false;
let passwordValidation = false;
let confirmPasswordValidation = false;
let countriesValidation = false;

//funcion de validacion

const validation = (e, validation,element) => {
    const information = e. target.parentElement.children[1];
    formBtn.disabled = !usernameValidation || !emailValidation || !phoneValidation || !passwordValidation || !confirmPasswordValidation || !countriesValidation ? true : false;
  if (validation) {
    element.classList.add('correct');
    element.classList.remove('incorrect');
    information.classList.remove('show-information');
  } else {
    element.classList.add('incorrect');
    element.classList.remove('correct');
    information.classList.add('show-information');
  }
 };

// Creamos un arreglo de paises 3

[...countries].forEach(option => {
  option.innerHTML = option.innerHTML.split('(')[0];
});


// Validación de nombre de usuario
usernameInput.addEventListener("input", e => {
  usernameValidation = userRegex.test(e.target.value);
  validation(e, usernameValidation, usernameInput);
});


// Validación de correo electrónico
emailInput.addEventListener("input", e => {
  emailValidation = emailRegex.test(e.target.value);
  validation(e, emailValidation, emailInput);
});

// Validación de codigo de país 
countries.addEventListener("input", e => {
  const optionSelected = [... e.target.children].find(option => option.selected);
  phoneCode.innerHTML = `+${optionSelected.value}`;
  countriesValidation = optionSelected.value !== "" ? true : false;
  countries.classList.add('correct');
  phoneCode.classList.add('correct');
  validation(e,null,null);
});

// validacion de numero de telefono
phoneInput.addEventListener("input", e => {
  phoneValidation = phonenumberRegex.test(e.target.value);
  const information = e. target.parentElement.parentElement.children[1];
  if (phoneValidation) {
    phoneInput.classList.add('correct');
    phoneInput.classList.remove('incorrect');
    information.classList.remove('show-information');
  } else {
    phoneInput.classList.add('incorrect');
    phoneInput.classList.remove('correct');
    information.classList.add('show-information');
  }
 });


 // Validación de contraseña
 passwordInput.addEventListener("input", e => {
  passwordValidation = passwordRegex.test(e.target.value);
  validation(e, passwordValidation, passwordInput);
 });


// Validación de confirmación de contraseña
confirmPasswordInput.addEventListener("input", e => {
  confirmPasswordValidation = e.target.value === passwordInput.value;
  validation(e, confirmPasswordValidation, confirmPasswordInput);
});

// Envío del formulario
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = {
    username: usernameInput.value,
    email: emailInput.value,
    phone: `${phoneCode.innerHTML} ${phoneInput.value}`,
    password: passwordInput.value,
  };
  console.log(user);
  alert(`Your data has been submitted:
    Username: ${user.username}
    Email: ${user.email}
    Phone: ${user.phone}`);
});

document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('countries');
    const phoneCode = document.getElementById('phone-code');

    // Mostrar el código del país seleccionado al cargar la página
    if (select.value) {
        phoneCode.textContent = '+' + select.value;
    }

    select.addEventListener('change', function() {
        if (select.value) {
            phoneCode.textContent = '+' + select.value;
        } else {
            phoneCode.textContent = '+#';
        }
    });
});