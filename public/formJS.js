const LogInBut = document.querySelector('#logIn');
const SignUpBut = document.querySelector('#signUp');

const LogInForm = document.querySelector('#LogInForm');
const SignUpForm = document.querySelector('#SignUpForm');

LogInBut.addEventListener('click', () => {
    LogInForm.classList.remove('d-none');
    if (!SignUpForm.classList.contains('d-none'))
        SignUpForm.classList.add('d-none');
});

SignUpBut.addEventListener('click', () => {
    SignUpForm.classList.remove('d-none');
    if (!LogInForm.classList.contains('d-none'))
        LogInForm.classList.add('d-none');
});