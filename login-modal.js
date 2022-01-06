dom.loginForm = document.querySelector('#login'),
dom.errorMessage =  document.getElementById('error');

if(location.href.includes("cart") || location.href.includes("home")){
    dom.loginForm.email.onkeypress = (event) =>{
        emailKeypress(event,dom.loginForm.email.value);
    }
}



dom.loginForm.onsubmit = (event) =>{
    event.preventDefault();
    dom.errorMessage.innerHTML = "";
    dom.loginForm.email.classList.remove('red-error');
    dom.loginForm.password.classList.remove('red-error');
    let email = dom.loginForm.email.value;
    let password = dom.loginForm.password.value;
    if(!isValidEmailAddress(email)){
        dom.errorMessage.innerHTML="כתובת המייל אינה תקינה";
        dom.loginForm.email.classList.add('red-error');
        return;
    }
    if(dom.loginForm.password.value.length <= 2){
        dom.errorMessage.innerHTML="אורך הסיסמה הנדרש - 3 תווים לפחות";
        dom.loginForm.password.classList.add('red-error');
        return;
    }
    
    if(localStorage[email]!==undefined){
        const user1 =  JSON.parse(localStorage[email]);
            if(user1.password===password){
                sessionStorage["currentUser"] = localStorage[email];
                if(user1.cart === undefined) {user1.cart = [];}
                if(sessionStorage.cart === undefined) {sessionStorage.cart = JSON.stringify([]);}
                user1.cart = user1.cart.concat(JSON.parse(sessionStorage.cart));
                user1.productsInCartNUm = user1.cart.length;
                localStorage[user1.email] = JSON.stringify(user1);
                dom.spanProductsNum.innerHTML = user1.cart.length;
                if(location.href.includes("cart.html")){
                    location.href = "payment.html";
                }
                $('#staticBackdrop').modal('hide');
             }
             else{
                dom.loginForm.password.value="";
                dom.errorMessage.innerHTML="כתובת המייל או הסיסמה אינם נכונים "+"<a href='sign-up.html'>הירשם</a>";
             }
    }
    else{
        dom.errorMessage.innerHTML="כתובת המייל או הסיסמה אינם נכונים "+"<a href='sign-up.html'>הירשם</a>";
        
    }
  }
  

