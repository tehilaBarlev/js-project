const dom = {
    details: document.getElementById('details'),
}

let Cuser = JSON.parse(localStorage[JSON.parse(sessionStorage.currentUser).email]);
dom.details.innerHTML = `ההזמנה תגיע בעוד 6 ימים, אל: ${Cuser.paymentDetails.country} - ${Cuser.paymentDetails.city} - ${Cuser.paymentDetails.zip} - ${Cuser.paymentDetails.street} - ${Cuser.paymentDetails.houseNumber}`;