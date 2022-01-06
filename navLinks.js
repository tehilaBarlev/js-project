dom.navLinks = document.querySelectorAll('.nav ul a');
dom.navLinks.forEach(a => {
    a.onclick = (event) =>{
      dom.productsContainer.innerHTML = "";
      if(event.target.innerText.includes('כל המוצרים')){
        printProducts(data.products);
        return;
      }
      let stCategory = filterCategory(event.target.innerText);
      data.filteredProducts =  data.products.filter(product => product.category.includes(stCategory) || product.Type.includes(stCategory));
      dom.productsContainer.innerHTML = "";
      printProducts(data.filteredProducts);
    }
  });
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

