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
    let todayDate;
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

