const dom = {
    productsContainer: document.querySelector('.products'),
    spanProductsNum: document.getElementById('productsNum'),
    navLinks: document.querySelectorAll('.nav ul a'),
    // searchInput: document.getElementById('search-input'),
    searchForm: document.querySelector('.form-inline'),
    sortPrice_htl:document.querySelector('#price-htl'),
    sortPrice_lth:document.querySelector('#price-lth'),
    sortName_htl:document.querySelector('#name-htl'),
    sortName_lth:document.querySelector('#name-lth'),
  };

  const data = {
    products: [],
    filteredProducts: [],  
    currentFilter: [],
  };

 
//events

dom.navLinks.forEach(a => {
  a.onclick = (event) =>{
    if(event.target.innerText.includes('כל המוצרים')){
      printProducts(data.products);
      return;
    }
    let stCategory = filterCategory(event.target.innerText);
    data.filteredProducts =  data.products.filter(product => product.category.includes(stCategory) || product.Type.includes(stCategory));
    printProducts(data.filteredProducts);
  }
});
dom.navLinks.forEach(a => {
  a.onmouseenter = (event) =>{
   a.style = "color:gray !important;  transition:0.3s";
  }
});
dom.navLinks.forEach(a => {
  a.onmouseleave = (event) =>{
   a.style = "color:black !important;";
  }
});

dom.searchForm.onsubmit = (event) => {event.preventDefault();}
dom.searchForm.txtSearch.onkeyup  = () =>{
  let st = dom.searchForm.txtSearch.value;
  data.filteredProducts =  data.products.filter(product => product.description.includes(st)|| JSON.stringify(product.price).includes(st) ||  product.category.includes(filterCategory(st)));
  printProducts(data.filteredProducts);
  if(data.filteredProducts.length === 0){
      dom.productsContainer.innerHTML = `<h3 style="margin:150px;"" >😕 לא נמצאו פריטים התואמים לחיפוש 😕</h3>`;
  }
}


//help-functions

const filterCategory = (st) =>{
  if(st.includes('לבית')){
    return 'bedding';
  }
  if(st.includes('נעליים')){
    return 'shoes';
  }
  if(st.includes('עקב')){
    return 'Tall';
  }
  if(st.includes('שטוחות')){
    return 'flat';
  }
  if(st.includes('סניקרס')){
    return 'Sneakers';
  }
  if(st.includes('אקססוריז')){
    return 'accessories';
  }
  if(st.includes('סיכות שיער')){
    return 'hairPins';
  }
  if(st.includes('קשתות')){
    return 'HairBows';
  }
  if(st.includes('כובעים')){
    return 'Hats';
  }
  if(st.includes('משקפיים')){
    return 'Glasses';
  }
  if(st.includes('תיקים')){
    return 'Bag';
  }
  if(st.includes('תיקי אלכסון')){
    return 'slant';
  }
  if(st.includes('תיקי אחיזה')){
    return 'hold';
  }
  if(st.includes('תיקי קש')){
    return 'Straw';
  }
  if(st.includes('נעלי בית')){
    return 'home';
  }
  if(st.includes('תיקי גב')){
    return 'Backpack';
  }
  if(st.includes('גומיות')){
    return 'Hair';
  }
}

const currentCategory = () =>{
  if(sessionStorage.currentFilter !== undefined && sessionStorage.currentFilter !== ""){
    const currentFilter = sessionStorage.currentFilter;
    if(currentFilter.includes('כל המוצרים')){
      printProducts(data.products);
    }
    let stCategory = filterCategory(currentFilter);
    data.filteredProducts =  data.products.filter(product => product.category.includes(stCategory) || product.Type.includes(stCategory));
    printProducts(data.filteredProducts);
    sessionStorage.currentFilter = "";
  }
  if(sessionStorage.searchSt !== "" && sessionStorage.searchSt !== undefined){
    dom.searchForm.txtSearch.value = sessionStorage.searchSt;
    dom.searchForm.txtSearch.onkeyup();
    sessionStorage.searchSt = "";
  }
}

  //dom-manipulations

  const printProducts = (currentProducts) => {
      dom.productsContainer.innerHTML="";
      const divs = currentProducts.map(product => {
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
      span.innerHTML="בחר מידה";
      selectProductDIv.appendChild(span);
      const select = document.createElement('select');
      selectProductDIv.appendChild(select);
      for(i=product.size[0]; i<= product.size[1] ; i++){
        const option = document.createElement('option');
        option.innerHTML=i;
        select.appendChild(option);
      }
      const buttonsDiv = document.createElement('div');
      selectProductDIv.appendChild(buttonsDiv);
      const addButton = document.createElement('button');
      addButton.innerHTML = "הוסף לסל";
      const cancelButton = document.createElement('button');
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
      hoverSpan.innerHTML="+ הוסף לסל";
      hoverDiv.appendChild(hoverSpan);


      //product-events

    div.onmouseenter = () =>{
      hoverDiv.classList.remove('move-back');
      hoverDiv.classList.remove('appear');
      hoverDiv.classList.add('appear'); 
    }
    hoverDiv.onclick = () =>{
        div.onclick();
    }
    div.onclick = () => {
        selectProductDIv.classList.remove('move-back');
        selectProductDIv.classList.remove('appear');
        selectProductDIv.classList.add('appear');
        hoverDiv.classList.add('move-back');
        hoverDiv.classList.add('appear');
        hoverDiv.classList.remove('appear');
    }
    div.onmouseleave = () => {
        selectProductDIv.classList.remove('appear');
        selectProductDIv.classList.add('move-back');
        hoverDiv.classList.add('move-back');
        hoverDiv.classList.add('appear');
        hoverDiv.classList.remove('appear'); 
        
    }
    addButton.onclick = (event) => {
        numOfProductsInCart(1);
        product.selectedSize = select.value;
        let cart = user === null ? JSON.parse(sessionStorage.getItem('cart')) : selectUserStorage().cart;
        cart === null || cart === undefined ? cart=[product] : cart.push (product);
        if(user === null){
            sessionStorage.setItem('cart',JSON.stringify(cart));
        }
        else{
            selectUserStorage().cart = cart;
            updateUserStorage();
        } 

        selectProductDIv.classList.remove('appear');
        addButton.style = "background-color:black; color:white; transition: 0.08s; transform: scale(1.07);";
        setTimeout(() => {
            addButton.style = "background-color:rgba(255, 255, 255, 0.705); color:black; transition: 0.2s; transform: none;";
            selectProductDIv.style = "animation: leave 0.3s !important;";
        }, 200);
        setTimeout(() => {
            selectProductDIv.style = "animation: none ;";
            selectProductDIv.classList.add('move-back');
        },400);
    }

    cancelButton.innerHTML="ביטול";
    buttonsDiv.append(addButton,cancelButton);
    cancelButton.onclick = () => {
      selectProductDIv.classList.remove('appear');

        setTimeout(() => {
            selectProductDIv.style = "animation: leave 0.3s !important;";
        }, 100);
        setTimeout(() => {
            selectProductDIv.style = "animation: none ;";
            selectProductDIv.classList.add('move-back');
        },200);
    }
      return div;
    });
    dom.productsContainer.append(...divs);
  }
  
   const fetchProducts = () => {
    $.ajax({
      url: './data.json',
      success: (_data) => {
        data.products.push(..._data.products)
        printProducts(data.products);
        currentCategory();
      },
      error: (error) => {
          console.log(error);

      }
    });
    
  };
  
//up-scroll
$(document).ready(function() {
  $('#top').click(function(){
    $('html,  body').animate({scrollTop:50}, 'slow');
    return false;
  });
});

//modal-sale
if(sessionStorage.showed == undefined){
  setTimeout(() => {
    $('#sale').modal('show');
  
  }, 10000);
  sessionStorage.showed = true;
}

  fetchProducts();
  numOfProductsInCart(0);
  
  //filter&sorting
  dom.sortPrice_htl.onclick =() =>{
    data.filteredProducts = data.products;
    data.filteredProducts.sort((a,b)=>{return b.price-a.price});
    printProducts(data.filteredProducts);
  }

  dom.sortPrice_lth.onclick =() =>{
    data.filteredProducts = data.products;
    data.filteredProducts.sort((a,b)=>{return a.price-b.price});
    printProducts(data.filteredProducts);
  }
  dom.sortName_lth.onclick =() =>{
    data.filteredProducts = data.products;
    data.filteredProducts.sort((a,b)=>{return a.description.charCodeAt(0) - b.description.charCodeAt(0)});
    printProducts(data.filteredProducts);
  }
  dom.sortName_htl.onclick =() =>{
    data.filteredProducts = data.products;
    data.filteredProducts.sort((a,b)=>{return b.description.charCodeAt(0) - a.description.charCodeAt(0)});
    printProducts(data.filteredProducts);
  }
  

  
  

  