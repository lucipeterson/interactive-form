//DOM ELEMENTS DEFINED

//input fields
const name = $('#name');
const jobRoleField = $("#other-title");
const emailField = $("#mail");
const activitiesCheckboxes = $(".activities :checkbox");
const paymentField = $("#payment");
const creditCardNumberField = $("#cc-num");
const zipField = $("#zip");
const cvvField = $("#cvv");

//options
const punsColors = $("#color option:contains('JS Puns')");
const heartColors = $("#color option:contains('I')");
const tuesNineToTwelve = $(".activities label:contains('Tuesday 9am-12pm')");
const tuesOneToFour = $(".activities label:contains('Tuesday 1pm-4pm')");

//displayed elements
const registrationTotal = $(".activities").append('<div id = "total">');
const creditCardPayment = $(".credit-card");
const payPalPayment = $("p:contains('PayPal')");
const bitcoinPayment = $("p:contains('Bitcoin')");
const submitButton = $("button");

//regex
const emailRegex = /\^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/;
const activitiesRegex = null;
const creditCardRegex = null;
const zipCodeRegex = null;
const cvvRegex = null;

//validation messages
const nameValidationMessage = null;
const emailValidationMessage = null;
const activitiesValidationMessage = null;
const creditCardValidationMessage = null;
const zipCodeValidationMessage = null;
const cvvValidationMessage = null;

//PAGE DEFAULT SETTINGS
name.focus();
jobRoleField.hide();
creditCardPayment.hide();
payPalPayment.hide();
bitcoinPayment.hide();

//FUNCTIONS

//Function that lets the user enter a custom job role when the option "Other" 
//is selected from the drop-down menu.
function showJobRoleField(){
    if ($("#title").val() === "other") {jobRoleField.show()}
    else jobRoleField.hide();
}

//Function that filters the T-shirt colors to match the design the user selected
//from the drop-down menu.
function displayColorOptions(){
    heartColors.hide(); punsColors.hide();
    if ($("#design").val() === "js puns") {punsColors.show()};
    if ($("#design").val() === "heart js") {heartColors.show()};
};

//Function that restricts user from selecting conflicting activities and adds up
//the total cost of the activities that are chosen.
function chooseActivities(){
    let totalCost = 0;
    tuesNineToTwelve.find(':first-child').attr('class','tues-nine-twelve');
    tuesOneToFour.find(':first-child').attr('class','tues-one-four');
    activitiesCheckboxes.prop('checked', status).change(function(){
        if (($(this).prop('checked') === true)) {
            totalCost += 100; 
            $('#total').html(`<h2>Your Total Cost: $${totalCost}.00</h2>`);
        };
        if (($(this).prop('checked') === true) 
        && ($(this).prop('name') === 'all')) {
            totalCost += 100; 
            $('#total').html(`<h2>Your Total Cost: $${totalCost}.00</h2>`);
        };
        if (($(this).prop('checked') === false)) {
            totalCost -= 100; 
            $('#total').html(`<h2>Your Total Cost: $${totalCost}.00</h2>`);
        };
        if (($(this).prop('checked') === false) 
        && ($(this).prop('name') === 'all')) {
            totalCost -= 100; 
            $('#total').html(`<h2>Your Total Cost: $${totalCost}.00</h2>`);
        };
        if (($(this).prop('checked') === true) 
        && ($(this).prop('class') === 'tues-nine-twelve')){
            $('.tues-nine-twelve').prop('disabled', true);
            $(this).prop('disabled', false);
        };
        if (($(this).prop('checked') === false) 
        && ($(this).prop('class') === 'tues-nine-twelve')){
            $('.tues-nine-twelve').prop('disabled', false);
            $(this).prop('disabled', false);
        };
        if (($(this).prop('checked') === true) 
        && ($(this).prop('class') === 'tues-one-four')){
            $('.tues-one-four').prop('disabled', true);
            $(this).prop('disabled', false);
        };
        if (($(this).prop('checked') === false) 
        && ($(this).prop('class') === 'tues-one-four')){
            $('.tues-one-four').prop('disabled', false);
            $(this).prop('disabled', false);
        };
    })
};

//Function that displays only details relating to the selected payment option.
function displayPaymentDetails(){
    if ($("#payment").val() === "credit card") {creditCardPayment.show()}
    else creditCardPayment.hide();
    if ($("#payment").val() === "paypal") {payPalPayment.show()}
    else payPalPayment.hide();
    if ($("#payment").val() === "bitcoin") {bitcoinPayment.show()}
    else bitcoinPayment.hide();
};


const test = true;
//Function that prevents the user from submitting the form if it is incomplete
//and notifies the user what information is missing.
function formValidation(){
    //If statement for every item I want to check:
    submitButton.on("click", function(event){
        if(name.val() === ''){
            event.preventDefault();
            console.log('*You must enter a name.');
        };
        if(emailField.val().match(emailRegex)){
            event.preventDefault();
            console.log('*You must enter a valid email address.');
        };
        if('register value is not equal to regex'){
            event.preventDefault();
            console.log('*You must select at least one activity.');
        };
        if('credit card number value is not equal to regex'){
            event.preventDefault();
            console.log('*You must enter a valid credit card number.');
        };
        if('zip code value is not equal to regex'){
            event.preventDefault();
            console.log('*You must enter a valid 5-digit zip code.');
        };
        if('cvv value is not equal to regex'){
            event.preventDefault();
            console.log('*You must enter a valid 3-digit CVV.');
        };
    });
};

//FUNCTIONS INVOKED WHEN USER INPUT CHANGES
$("#title").on("change", showJobRoleField);
$("#design").on("change", displayColorOptions);
chooseActivities();
$("#payment").on("change", displayPaymentDetails);
formValidation();

