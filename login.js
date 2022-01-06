const dom = {
    form: document.querySelector('form'),
    emailInput:  document.querySelector('input[type="email"]'),
    passwordInput:  document.querySelector('input[type="password"]'),
    message: document.getElementById('message'),
  };
dom.form.onsubmit = (event) => {
    event.preventDefault();
    dom.message.innerHTML="";
    const formData = new FormData(event.target);
    const entries = Array.from(formData.entries());
    const formDataObj = Object.fromEntries(entries);
    let email=formDataObj.email;
    if(localStorage[email]!==undefined){
        const user =  JSON.parse(localStorage[email]);
            if(user.password===password){
                localStorage["currentUser"]=localStorage[email];
                location.href="cart.html";
             }
             else{
                dom.passwordInput.value="";
                dom.message.innerHTML="סיסמה שגויה";
             }
    }
    else{
        dom.message.innerHTML="כתובת המייל או הסיסמה אינם נכונים "+"<a href='enter.html'>הירשם</a>";
        
    }
  }
  