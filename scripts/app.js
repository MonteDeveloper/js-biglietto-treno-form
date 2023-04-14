// function updateTicketPrice() {
//     let userKm = document.getElementById("inputKm").value;
//     let userAge = document.getElementById("inputAge").value;
//     let ticketPrice = 0;

//     const pricePerKm = 0.21;
//     const numberOfDecimal = 2;

//     //accetto input KM utente anche con la virgola
//     userKm = userKm.replace(',', '.');

//     //solo se l'utente ha inserito dei valori e solo se sono numeri
//     if (!isNaN(userKm) && !isNaN(userAge) && userKm != "" && userAge != "") {
//         ticketPrice = userKm * pricePerKm;
//         let discount = 0;

//         //calcolo eventuale sconto
//         if (userAge < 18) {
//             discount = 20;
//         } else if (userAge > 65) {
//             discount = 40;
//         }

//         ticketPrice -= (ticketPrice / 100) * discount;
//     }

//     document.getElementById("result").innerHTML = `Prezzo: <span class="text-success"> ${ticketPrice.toFixed(numberOfDecimal)} </span> €`;
// }

