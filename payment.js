const dom = {
  form: document.paymentForm,
  message: document.querySelector('#message'),
  spanProductsNum: document.getElementById('productsNum'),
  h4Total: document.getElementById('total'),
};

//events
dom.form.firstName.onkeypress = (event) =>{lettersKeypress(event,dom.form.firstName.value,15);}
dom.form.lastName.onkeypress = (event) =>{lettersKeypress(event,dom.form.lastName.value,15);}
dom.form.phone.onkeypress = (event) =>{NumbersKeypress(event,dom.form.phone.value,15);}
dom.form.zip.onkeypress = (event) =>{NumbersKeypress(event,dom.form.zip.value,6);}
dom.form.houseNumber.onkeypress = (event) =>{NumbersKeypress(event,dom.form.houseNumber.value,5);}
dom.form.city.onkeypress = (event) =>{lettersKeypress(event,dom.form.city.value,15);}

//help-functions

const fillFields = () =>{
  dom.form.firstName.value = Cuser.firstName;
  dom.form.lastName.value = Cuser.lastName;
  dom.form.phone.value = Cuser.phone;
  if(Cuser.paymentDetails !== undefined){
    dom.form.city.value = Cuser.paymentDetails.city;
    dom.form.country.value = Cuser.paymentDetails.country;
    dom.form.zip.value = Cuser.paymentDetails.zip;
    dom.form.street.value = Cuser.paymentDetails.street;
    dom.form.houseNumber.value = Cuser.paymentDetails.houseNumber;
  }
}

const removeErrorBorder = () =>{
  dom.form.firstName.classList.remove('red-error');
  dom.form.lastName.classList.remove('red-error');
  dom.form.phone.classList.remove('red-error');
  dom.form.city.classList.remove('red-error');
  dom.form.country.classList.remove('red-error');
  dom.form.zip.classList.remove('red-error');
  dom.form.street.classList.remove('red-error');
  dom.form.houseNumber.classList.remove('red-error');
}

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
  if(!isValidText(formData.city,1)){
    dom.message.innerHTML = "יש להזין שם עיר תקין";
    dom.form.city.classList.add('red-error');
    return false;
  }
  if(dom.form.country.value.length === 0){
    dom.message.innerHTML = "יש לבחור מדינה";
    dom.form.country.classList.add('red-error');
    return false;
  }
  if(!isValidNumbers(formData.zip,5)){
    dom.message.innerHTML = "יש להזין מיקוד תקין";
    dom.form.zip.classList.add('red-error');
    return false; 
  }
  if(!isValidText(formData.street,1)){
    dom.message.innerHTML = "יש להזין שם רחוב תקין";
    dom.form.street.classList.add('red-error');
    return false; 
  }
  if(!isValidNumbers(formData.houseNumber,1)){
    dom.message.innerHTML = "יש להזין מספר בית תקין";
    dom.form.houseNumber.classList.add('red-error');
    return false;
  }
  return true;
}

dom.form.onsubmit = (event) => {
removeErrorBorder();
event.preventDefault();
dom.message.innerHTML="";
const formData = new FormData(event.target);
const entries = Array.from(formData.entries());
const formDataObj = Object.fromEntries(entries);
if(!isValidForm(formDataObj)){
    return;
}
Cuser.paymentDetails = formDataObj;
localStorage[JSON.parse(sessionStorage.currentUser).email] = JSON.stringify(Cuser);
location.href = '/payment2.html';
}
numOfProductsInCart(0);

let Cuser = JSON.parse(localStorage[JSON.parse(sessionStorage.currentUser).email]);


let totalSum = 0;
Cuser.cart.forEach(product => {
  totalSum += product.price;
});
dom.h4Total.innerHTML = `סה"כ להזמנה: ${totalSum}$`;
fillFields();
