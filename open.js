const dom = {
    spanProductsNum: document.getElementById('productsNum'),
    categories:  document.querySelectorAll('.category'),
  };
const data = {
    products: [],
}
  
  numOfProductsInCart(0);
  
  document.getElementById('bedding').onclick =() =>{
    sessionStorage.currentFilter = "לבית";
    location.href ="home.html";
  }
  document.getElementById('shoes').onclick =() =>{
    sessionStorage.currentFilter = "נעליים";
    location.href ="home.html";
  }
  document.getElementById('accessories').onclick =() =>{
    sessionStorage.currentFilter = "אקססוריז";
    location.href ="home.html";
  }
  document.getElementById('Bag').onclick =() =>{
    sessionStorage.currentFilter = "תיקים";
    location.href ="home.html";
  }

 

  