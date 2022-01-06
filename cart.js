const dom = {
    productsContainer: document.querySelector('.products'),
    spanProductsNum: document.getElementById('productsNum'),
    numOfProducts: document.getElementById('nump'),
    h4Total: document.getElementById('total'),
    payLink: document.querySelector('#payLink'),
  };
  
  const data = {
    products: [],
    currentFilter: [],
    totalSum: 0,
  };


  $(document).ready(function() {
    $('#top').click(function(){
      $('html,  body').animate({scrollTop:50}, 'slow');
      return false;
    });
  });
   
//events
dom.payLink.onclick = () =>{

  if(sessionStorage.currentUser === undefined){
    $('#staticBackdrop').modal('show');
  }
  else{
    location.href = "payment.html";
  }
}





  //dom-manipulations

  const noProductsInCart = () =>{
    const h2 = document.createElement('h2');
    h2.innerHTML = " 🙄אין עדיין מוצרים בסל🙄";
    h2.style="text-align:center; margin-top:50px; font-weight:lighter;";
    dom.productsContainer.appendChild(h2);
    dom.payLink.href = "";
  }

  const cartDetails = () =>
  {
      if(data.products !== undefined){
        dom.numOfProducts.innerHTML=` מוצרים בסל: ${data.products.length}` ;
        dom.h4Total.innerHTML = `סה"כ להזמנה: ${data.totalSum}$`;
      }
      if(data.products.length === 0){
          noProductsInCart();
      }
  }
  const printProducts = () => {
      dom.productsContainer.innerHTML="";
      const divs = data.products.map(product => {
      const div = document.createElement('div');
      div.classList.add("product");
      div.classList.add('m-3');
      const a = document.createElement('a');
      const image = document.createElement('img');
      image.src = `./assets/${product.image}`;
      image.classList.add('w-75');
      div.appendChild(image);

      const selectProductDIv = document.createElement('div');
      selectProductDIv.classList.add('selectProductDIv');
      selectProductDIv.classList.add('move-back');
      div.appendChild(selectProductDIv);
      const span = document.createElement('span');
      span.innerHTML=`מידה: ${product.selectedSize}`;
      selectProductDIv.appendChild(span);
      const buttonsDiv = document.createElement('div');
      selectProductDIv.appendChild(buttonsDiv);
      const removeButton = document.createElement('button');
      removeButton.innerHTML = "הסר מוצר";
      buttonsDiv.append(removeButton);
      const h4 = document.createElement('h4');
      h4.innerHTML = `${product.description}`;
      div.appendChild(h4);
      const p = document.createElement('p');
      p.innerHTML = `${product.price}$`;
      div.appendChild(p);
      const hoverDiv = document.createElement('div');
      hoverDiv.classList.add('selectProductDIv');
      hoverDiv.classList.add('move-back');
      hoverDiv.classList.add('hover');
      div.appendChild(hoverDiv);
      const hoverSpan = document.createElement('span');
      hoverSpan.innerHTML="פרטי מוצר";
      hoverDiv.appendChild(hoverSpan);

      //products-events

    div.onmouseenter = () =>{
        hoverDiv.classList.remove('move-back');
        hoverDiv.classList.remove('appear');
        hoverDiv.classList.add('appear'); 
    }
    div.onclick = () => {
        selectProductDIv.classList.remove('move-back');
        selectProductDIv.classList.remove('appear');
        selectProductDIv.classList.add('appear');
        hoverDiv.classList.add('move-back');
        hoverDiv.classList.add('appear');
        hoverDiv.classList.remove('appear'); 
    }
    hoverDiv.onclick = () =>{
        div.onclick();
    }
    div.onmouseleave = () => {
        selectProductDIv.classList.remove('appear');
        selectProductDIv.classList.add('move-back');
        hoverDiv.classList.add('move-back');
        hoverDiv.classList.add('appear');
        hoverDiv.classList.remove('appear'); 
        
    }
    removeButton.onclick = () => {
        data.products.splice(data.products.indexOf(product),1);
        data.totalSum -= product.price;
        numOfProductsInCart(-1);
        if(user === null){
            sessionStorage.setItem('cart',JSON.stringify(data.products));
        }
        else{
            selectUserStorage().cart = data.products;
            updateUserStorage();
        } 
        selectProductDIv.classList.remove('appear');
        removeButton.style = "background-color:black; color:white; transition: 0.08s; transform: scale(1.07);";
        
            removeButton.style = "background-color:rgba(255, 255, 255, 0.705); color:black; transition: 0.2s; transform: none;";
            selectProductDIv.style = "animation: leave 0.3s ;";
            
        document.querySelector('.products').innerHTML="";
        printProducts();
        cartDetails();
    }
      return div;
    });
    dom.productsContainer.append(...divs);
  }
  
  
   const fetchProducts = () => {
       if(user === null){
        if(sessionStorage.cart !== "" && sessionStorage.cart !== undefined)
              data.products =  JSON.parse(sessionStorage.cart); 
       }
       else{
           data.products = selectUserStorage().cart;
       }
       
       if(data.products !== null){
        printProducts();
       }

  }
  

  fetchProducts();
  numOfProductsInCart(0);
  data.totalSum = 0;
  if(data.products !== undefined){
    data.products.forEach(product => {
        data.totalSum += product.price;
    });
  }

  cartDetails();
   