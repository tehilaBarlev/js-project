const dom = {
  form: document.payment2Form,
  message: document.querySelector('#message'),
  spanProductsNum: document.getElementById('productsNum'),
  h4Total: document.getElementById('total'),
};

//events
dom.form.id.onkeypress = (event) =>{NumbersKeypress(event,dom.form.id.value,9);}
dom.form.creditCardNum.onkeypress = (event) =>{NumbersKeypress(event,dom.form.creditCardNum.value,16);}
dom.form.validity.onkeypress = (event) =>{NumbersKeypress(event,dom.form.validity.value,4);}
dom.form.cvv.onkeypress = (event) =>{NumbersKeypress(event,dom.form.cvv.value,3);}

//help-functions
const fillFields = () =>{
  if(Cuser.paymentDetails2!== undefined){
    dom.form.id.value = Cuser.paymentDetails2.id;
    dom.form.creditCardNum.value = Cuser.paymentDetails2.creditCardNum;
    dom.form.validity.value = Cuser.paymentDetails2.validity;
    dom.form.cvv.value = Cuser.paymentDetails2.cvv;
  }
}
const removeErrorBorder = () =>{
  dom.form.id.classList.remove('red-error');
  dom.form.creditCardNum.classList.remove('red-error');
  dom.form.validity.classList.remove('red-error');
  dom.form.cvv.classList.remove('red-error');
}

const isValidForm = (formData) =>{
  let flag = true;
  if(!isValidNumbers(formData.id,9)){
      dom.message.innerHTML = "יש להזין מספר ת.ז תקין";
      dom.form.id.classList.add('red-error');
      return false;  
  }
  if(!isValidCreditCard(formData.creditCardNum,16)){
      dom.message.innerHTML = "יש להזין מספר כ.אשראי תקין";
      dom.form.creditCardNum.classList.add('red-error');
      return false; 
  }
  if(!isValidNumbers(formData.validity,4)){
      dom.message.innerHTML = "יש להזין תוקף כרטיס תקין, ב4 ספרות";
      dom.form.validity.classList.add('red-error');
      return false;  
  }
  if(!isValidNumbers(formData.cvv,3)){
    dom.message.innerHTML = "יש להזין את 3 הספרות בגב הכרטיס";
    dom.form.cvv.classList.add('red-error');
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
  Cuser.paymentDetails2 = formDataObj;
  Cuser.cart = undefined;
  sessionStorage.cart = "";
  Cuser.productsInCartNUm = undefined;
  localStorage[JSON.parse(sessionStorage.currentUser).email] = JSON.stringify(Cuser);
  location.href = '/payment3.html';
}
numOfProductsInCart(0);
let Cuser = JSON.parse(localStorage[JSON.parse(sessionStorage.currentUser).email]);
let totalSum = 0;
Cuser.cart.forEach(product => {
  totalSum += product.price;
});
dom.h4Total.innerHTML = `סה"כ להזמנה: ${totalSum}$`;
fillFields();

