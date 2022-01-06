//validations

const isValidEmailAddress = (email) =>{
    return email.match(/^(\w)+@(\w)+\.(\w){2,}$/) !==null;
}

const isValidPhone = (phone) => {
    return phone.match(/^0\d{1,2}-?\d{7}/);
}
const isValidCreditCard = (cc) => {
    return cc.match(/^\d{16,16}/);
}
const isValidID = (id) => {
    return id.match(/^0\d{1,2}-?\d{7}/);
}
const isValidText = (st ,minLength) =>{
    let flag = true;
    for( i =0; i< minLength; i++) {
        if(st.match(/[a-zA-Zא-ת ]{1,1}/) === null)
         flag = false;
    }
    return flag;
}
const isValidTextOnlyEnglish = (st ,minLength) =>{
    let flag = true;
    for( i =0; i< minLength; i++) {
        if(st.match(/[a-zA-Z ]{1,1}/) === null)
         flag = false;
    }
    return flag;
}
    
const isValidNumbers = (st, minLength) =>{
    let flag = true;
    for( i =0; i< minLength; i++){
        if(st.match(/[0-9]{1,1}/) === null)
        flag = false;
    }
    return flag;
}

//key-press events

const NumbersKeypress = (event,value, max) => {
    if (event.key.match(/[0-9]/) === null || value.length > max){
        event.preventDefault();
    }
}
const EnglishLettersKeypress = (event,value, max) => {

    if (event.key.match(/[A-Za-z]/) === null || value.length > max){
        event.preventDefault();
    }
}
const lettersKeypress = (event,value, max) => {
    if (event.key.match(/[a-zA-Zא-ת ]/) === null || value.length > max){
        event.preventDefault();
    }
}
const emailKeypress = (event,value, max) => {
    if (event.key.match(/[0-9A-Za-z@.]/) === null || value.length > max){
        event.preventDefault();
    }
}



