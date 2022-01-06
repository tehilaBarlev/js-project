let user = JSON.parse(sessionStorage.getItem('currentUser'));

//help-functions

const selectUserStorage = () =>{
    user = JSON.parse(localStorage.getItem(`${user.email}`));
    return user;
}
const updateUserStorage = () =>{
  localStorage.setItem(`${user.email}`,JSON.stringify(user));
}



const numOfProductsInCart = (n) =>{
    
  let num = user === null ? parseInt(JSON.parse(sessionStorage.getItem('productsInCartNUm'))) : parseInt(selectUserStorage().productsInCartNUm);
  if(!isFinite(num)){
      num = 0;
  }
  num+=n;
  if(user === null){
      sessionStorage.setItem('productsInCartNUm',JSON.stringify(num));
  }
  else{
     selectUserStorage().productsInCartNUm = num;
     updateUserStorage();
  }
  dom.spanProductsNum.innerHTML = num;
}