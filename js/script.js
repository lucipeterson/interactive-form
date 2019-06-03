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

//form options
const punsColors = $("#color option:contains('JS Puns')");
const heartColors = $("#color option:contains('I')");
const chooseShirt = $("#color").append("<option value = 'choose-t-shirt'>Please select a T-shirt theme</option>");
const chooseColor = $("#color").append("<option value = 'choose-color'>Choose a Color</option>");
const tuesNineToTwelve = $(".activities label:contains('Tuesday 9am-12pm')");
const tuesOneToFour = $(".activities label:contains('Tuesday 1pm-4pm')");

//displayed elements
const registrationTotal = $(".activities").append('<div id = "total">');
const creditCardPayment = $(".credit-card");
const payPalPayment = $("p:contains('PayPal')");
const bitcoinPayment = $("p:contains('Bitcoin')");
const submitButton = $("button");

//regex
const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]/g;
const creditCardRegex = /[0-9]{13,16}/g;          
const zipCodeRegex = /[0-9]{5}/g;
const cvvRegex = /[0-9]{3}/g;

//validation messages
const nameValidationMessage = $('header').append('<div id = "name-invalid" class = "invalid">');
const emailValidationMessage = $('header').append('<div id = "email-invalid" class = "invalid">');
const activitiesValidationMessage = $('header').append('<div id = "activities-invalid" class = "invalid">');
const paymentMethodValidationMessage = $('header').append('<div id = "payment-invalid" class = "invalid">');
const creditCardValidationMessage = $('header').append('<div id = "cc-num-invalid" class = "invalid">');
const zipCodeValidationMessage = $('header').append('<div id = "zip-invalid" class = "invalid">');
const cvvValidationMessage = $('header').append('<div id = "cvv-invalid" class = "invalid">');

//PAGE DEFAULT SETTINGS
let totalCost = 0;
$("#color").val("choose-t-shirt");
$("#color option").hide();
name.focus();
jobRoleField.hide();
payPalPayment.hide();
bitcoinPayment.hide();
paymentField.val('credit card');

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
    if ($("#design").val() === "js puns") {
        punsColors.show(); 
        $("#color").val("choose-color");
    };
    if ($("#design").val() === "heart js") {
        heartColors.show()
        $("#color").val("choose-color");
    };
};

//Function that restricts user from selecting conflicting activities and adds up
//the total cost of the activities that are chosen.
function chooseActivities(){
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

//Function that prevents the user from submitting the form if it is incomplete
//and notifies the user what information is missing.
function formValidation(){
    //If-else statement for every item I want to check:
    submitButton.on("click", function(event){
        if(name.val() === ''){
            event.preventDefault();
            $('#name-invalid').html('<p>*You must enter a name.</p>');
            $(window).scrollTop(0);
            name.addClass("invalid-field");
        } else {
            $('#name-invalid').html(''); 
            name.removeClass("invalid-field");
        };
        if(emailField.val().match(emailRegex) === null){
            event.preventDefault();
            $('#email-invalid').html('<p>*You must enter a valid email address.</p>');
            $(window).scrollTop(0);
            emailField.addClass("invalid-field");
        } else {
            $('#email-invalid').html(''); 
            emailField.removeClass("invalid-field");
        };
        if (totalCost === 0) {
            event.preventDefault();
            $('#activities-invalid').html('<p>*You must choose at least one activity.</p>');
            $(window).scrollTop(0);
        } else {
            $('#activities-invalid').html(''); 
        };
        if(paymentField.val() === 'select_method') {
            event.preventDefault();
            $('#payment-invalid').html('<p>*You must select a payment method.</p>');
            $(window).scrollTop(0);
            paymentField.addClass("invalid-field");
        } else {
            $('#payment-invalid').html(''); 
            paymentField.removeClass("invalid-field");
        };
        if(paymentField.val() === 'credit card') {
            if(creditCardNumberField.val().match(creditCardRegex) === null){
                event.preventDefault();
                $('#cc-num-invalid').html('<p>*You must enter a valid credit card number.</p>');
                $(window).scrollTop(0);
                creditCardNumberField.addClass("invalid-field");
            } else {
                $('#cc-num-invalid').html(''); 
                creditCardNumberField.removeClass("invalid-field");
            };
            if(zipField.val().match(zipCodeRegex) === null){
                event.preventDefault();
                $('#zip-invalid').html('<p>*You must enter a valid 5-digit zip code.</p>');
                $(window).scrollTop(0);
                zipField.addClass("invalid-field");
            } else {
                $('#zip-invalid').html(''); 
                zipField.removeClass("invalid-field");
            };
            if(cvvField.val().match(cvvRegex) === null){
                event.preventDefault();
                $('#cvv-invalid').html('<p>*You must enter a valid 3-digit CVV.</p>');
                $(window).scrollTop(0);
                cvvField.addClass("invalid-field");
            } else {
                $('#cvv-invalid').html(''); 
                cvvField.removeClass("invalid-field");
            };
        };
    });
};

//FUNCTIONS INVOKED WHEN USER INPUT CHANGES
$("#title").on("change", showJobRoleField);
$("#design").on("change", displayColorOptions);
chooseActivities();
$("#payment").on("change", displayPaymentDetails);
formValidation();
name.on("change", function(){name.removeClass("invalid-field")});
emailField.on("change", function(){emailField.removeClass("invalid-field")});
paymentField.on("change", function(){paymentField.removeClass("invalid-field")});
creditCardNumberField.on("change", function(){creditCardNumberField.removeClass("invalid-field")});
zipField.on("change", function(){zipField.removeClass("invalid-field")});
cvvField.on("change", function(){cvvField.removeClass("invalid-field")});
