function getTicketPrice(age, km){
    let ticketPrice = 0;

    const pricePerKm = 0.21;
    const numberOfDecimal = 2;

    ticketPrice = km * pricePerKm;
    let discount = 0;

    //calcolo eventuale sconto
    if (age < 18) {
        discount = 20;
    } else if (age > 65) {
        discount = 40;
    }

    ticketPrice -= (ticketPrice / 100) * discount;

    return `${ticketPrice.toFixed(numberOfDecimal)} €`;
}

function getNextDeparture(){
    const today = new Date();
    let departureHours = today.getHours();
    let departureMinutes = today.getMinutes();

    //incremento i minuti di mezz'ora e li arrotondo rendendoli multipli di 5
    departureMinutes = roundNearest5(departureMinutes + 30);

    //faccio in modo che l'orario sia sempre compreso tra 00 e 23 e i minuti tra 00 e 59
    if(departureMinutes >= 60){
        departureMinutes -= 60;
        departureHours += 1;
        if(departureHours >= 24){
            departureHours -= 24;
        }
    }

    //format to '00'
    departureHours = ("0" + departureHours).slice(-2);
    departureMinutes = ("0" + departureMinutes).slice(-2);

    return `${departureHours}:${departureMinutes}`;
}

function roundNearest5(num) {
    return Math.round(num / 5) * 5;
}

function getArrive(departureStr, km){
    const trainVelocityKmH = 150; //km/h

    timeTravel = convertNumToTime(km / trainVelocityKmH);

    let totalInMinutes = (parseInt(timeTravel.split(":")[0]) * 60) + parseInt(timeTravel.split(":")[1]);
    let otherMinutes = (parseInt(departureStr.split(":")[0]) * 60) + parseInt(departureStr.split(":")[1]);

    let grandTotal = otherMinutes + totalInMinutes;

    let finalHours = Math.floor(grandTotal / 60);
    let finalMinutes = grandTotal % 60;

    //format to '00'
    finalHours = ("0" + finalHours).slice(-2);
    finalMinutes = ("0" + finalMinutes).slice(-2);

    return finalHours + ':' + finalMinutes;
}

function convertNumToTime(number) {
    // Check sign of given number
    var sign = (number >= 0) ? 1 : -1;

    // Set positive value of number of sign negative
    number = number * sign;

    // Separate the int from the decimal part
    var hour = Math.floor(number);
    var decpart = number - hour;

    var min = 1 / 60;
    // Round to nearest minute
    decpart = min * Math.round(decpart / min);

    var minute = Math.floor(decpart * 60) + '';

    // Add padding if need
    if (minute.length < 2) {
    minute = '0' + minute; 
    }

    // Add Sign in final result
    sign = sign == 1 ? '' : '-';

    // Concate hours and minutes
    time = sign + hour + ':' + minute;

    return time;
}

function getRandomInt(num){
    let finalNum = "";

    while(num > 0){
        num--;

        finalNum += Math.floor(Math.random() * 10);
    }

    return parseInt(finalNum);
}

function getRandomChar(){
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    result = characters.charAt(Math.floor(Math.random() * charactersLength));

    return result;
}

function getAgeFromDate(bdValue){
    let today = new Date();
    let birthDate = new Date(bdValue);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
}

function getDiscountType(age){
    if(age < 18){
        return "JUNIOR";
    }else if(age > 65){
        return "SENIOR";
    }else{
        return "NONE";
    }
}

const elGenerateButton = document.getElementById("generateButton");

elGenerateButton.addEventListener("click", function () {
    let firstNameValue = document.getElementById("firstName").value;
    let lastNameValue = document.getElementById("lastName").value;
    let birthdayValue = document.getElementById("datepicker").value;
    let kmValue = document.getElementById("kmInput").value;
    let classValue = document.getElementById("classSelect").value;

    let departure = getNextDeparture();
    let arrive = getArrive(departure, kmValue);
    let train = getRandomInt(4);
    let platform = getRandomInt(1);
    let carriage = getRandomInt(1);
    let seat = getRandomChar() + getRandomInt(2);
    let userAge = getAgeFromDate(birthdayValue);
    let price = getTicketPrice(userAge, kmValue);
    let ticketId = "T" + getRandomInt(10);
    let todayDate = (new Date()).toLocaleDateString();
    let discountType = getDiscountType(userAge);

    //controllo se tutti gli input sono stati riempiti dall'utente
    // if (
    //     (firstNameValue != "" && firstNameValue != null) &&
    //     (lastNameValue  != "" && lastNameValue  != null) &&
    //     (birthdayValue  != "" && birthdayValue  != null) &&
    //     (kmValue        != "" && kmValue        != null) &&
    //     (classValue     != "" && classValue     != null))
    {


        document.getElementById("ticketContainer").innerHTML = `
            <div class="bg-white rounded border row overflow-hidden text-uppercase">
            <!-- header ticket -->
            <div class="col-12 d-flex justify-content-between bg-warning p-3">
                <h2 class="h4">
                    <i class="fa-solid fa-train"></i>
                    TRAIN TICKET
                </h2>
                <span class="h4">
                    ${ticketId}
                </span>
            </div>

            <!-- body ticket -->
            <div class="row py-3 text-start">
                <!-- column -->
                <div class="col-4">
                    <div class="mb-3">
                        <h3 class="h6">
                            name of passenger
                        </h3>
                        <span>
                            ${firstNameValue} ${lastNameValue}
                        </span>
                    </div>
                    <div class="row mb-3">
                        <div class="col-6">
                            <h3 class="h6">
                                departure
                            </h3>
                            <span>
                                ${departure}
                            </span>
                        </div>
                        <div class="col-6">
                            <h3 class="h6">
                                arrive
                            </h3>
                            <span>
                                ${arrive}
                            </span>
                        </div>
                    </div>
                    <div>
                        <h3 class="h6">
                            date
                        </h3>
                        <span>
                            ${todayDate}
                        </span>
                    </div>
                </div>

                <!-- column -->
                <div class="col-4">
                    <div class="mb-3">
                        <h3 class="h6">
                            price
                        </h3>
                        <span>
                            ${price}
                        </span>
                    </div>
                    <div>
                        <h3 class="h6">
                            discount type
                        </h3>
                        <span>
                            ${discountType}
                        </span>
                    </div>
                </div>

                <!-- column -->
                <div class="col-4">
                    <div class="row mb-3">
                        <div class="col-6">
                            <h3 class="h6">
                                train
                            </h3>
                            <span>
                                ${train}
                            </span>
                        </div>
                        <div class="col-6">
                            <h3 class="h6">
                                seat
                            </h3>
                            <span>
                                ${seat}
                            </span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <h3 class="h6">
                            platform
                        </h3>
                        <span>
                            ${platform}
                        </span>
                    </div>
                    <div>
                        <h3 class="h6">
                            carriage n.
                        </h3>
                        <span>
                            ${carriage}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
})

