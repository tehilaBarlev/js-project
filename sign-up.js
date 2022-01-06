const dom={
    form: document.querySelector('#signUp-form'),
    message: document.getElementById('message'),
    spanProductsNum: document.getElementById('productsNum'),
}

//events

dom.form.firstName.onkeypress = (event) =>{lettersKeypress(event,dom.form.firstName.value,15);}
dom.form.lastName.onkeypress = (event) =>{lettersKeypress(event,dom.form.lastName.value,15);}
dom.form.phone.onkeypress = (event) =>{NumbersKeypress(event,dom.form.phone.value,15);}
dom.form.email.onkeypress = (event) =>{emailKeypress(event,dom.loginForm.email.value);}

//help-functions

const isValidForm = (formData) =>{
    if(!isValidText(formData.firstName,1)){
        dom.message.innerHTML = "יש להזין שם פרטי תקין";
        dom.form.firstName.classList.add('red-error');
        return false;  
    }
    if(!isValidText(formData.lastName,1)){
        dom.message.innerHTML = "יש להזין שם משפחה תקין";
        dom.form.lastName.classList.add('red-error');
        return false;  
    }
    if(!isValidPhone(formData.phone,9)){
        dom.message.innerHTML = "יש להזין פורמט טלפון תקין";
        dom.form.phone.classList.add('red-error');
        return false; 
    }
    if(!isValidEmailAddress(formData.email,1)){
      dom.message.innerHTML = "יש להזין שם פורמט אימייל תקין";
      dom.form.city.classList.add('red-error');
      return false;
    }
    return true;
  }


dom.form.onsubmit = (event) => {
    event.preventDefault();
    dom.message.innerHTML="";
    const formData = new FormData(event.target);
    const entries = Array.from(formData.entries());
    const formDataObj = Object.fromEntries(entries);
    if(!isValidForm(formDataObj)){
        return;
    }
    let email=formDataObj.email;
    if(localStorage[email]!==undefined){
        dom.message.innerHTML="כתובת מייל קיימת";
        return;
    }
    if(sessionStorage.cart === undefined) {formDataObj.cart =[];}
    else{ formDataObj.cart =JSON.parse(sessionStorage.getItem('cart')) }
    formDataObj.productsInCartNUm = formDataObj.cart.length;
    dom.spanProductsNum.innerHTML = formDataObj.cart.length;
    localStorage[email] = JSON.stringify(formDataObj);
    sessionStorage["currentUser"]=localStorage[email];
    location.href = '/home.html';
  }
  numOfProductsInCart(0);