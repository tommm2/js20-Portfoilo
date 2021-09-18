let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let password2 = document.getElementById('password2');
let form = document.getElementById('form');

//show error message
function showError(input,message){
    let parent = input.parentElement;
    parent.className = "form-control error";
    let small = parent.querySelector('small');
    small.innerText = message;
}
//show success message
function showSuccess(input){
    let parent = input.parentElement;
    parent.className = "form-control success";
}

//upper first word
function upperFirst(input) {
   return input.charAt(0).toUpperCase() + input.slice(1);
}

// check input is valid
function checkRequired(inputArr) {
    inputArr.forEach(item => {
        if(item.value.trim() === "")
        {
            showError(item,`${upperFirst(item.id)} is required`);
        }
        else{
            showSuccess(item);
        }
    });
}

//check email valid
function checkEmailValid(input){
    let re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    if(!re.test(input.value.trim()))
    {
        showError(input,`${upperFirst(input.id)} is not valid`);
    }
    else
    {
        showSuccess(input);
    }
}

//check username and password length
function checkLength(input,min,max){
    if(input.value.length < min)
    {
        showError(input,`${upperFirst(input.id)} must more than ${min} words`);
    }
    else if(input.value.length > max)
    {
        showError(input,`${upperFirst(input.id)} must less than ${max} words`);
    }
    else
    {
        showSuccess(input);
    }
}
// check password and password2 is different or not
function checkConfirm(input1,input2){
    if(input1.value !== input2.value)
    {
        showError(input2,`${upperFirst(input1.id)} and ${upperFirst(input2.id)} is not match`);
    }
}

form.addEventListener('submit',function(e){
    e.preventDefault();
    checkRequired([username,email,password,password2]);
    checkConfirm(password,password2);
    checkEmailValid(email);
    checkLength(username,3 ,12);
    checkLength(password,6 ,24);  
})
