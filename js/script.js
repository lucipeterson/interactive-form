//DOM ELEMENTS DEFINED
const name = $('#name');
const jobRoleField = $("#other-title");
const punsColors = $("#color option:contains('JS Puns')");
const heartColors = $("#color option:contains('I')");
const tuesNineToTwelve = $(".activities label:contains('Tuesday 9am-12pm')");
const tuesOneToFour = $(".activities label:contains('Tuesday 1pm-4pm')");
const activitiesCheckboxes = $(".activities :checkbox");
const registrationTotal = $(".activities").append('<div id = "total">');

//PAGE DEFAULT SETTINGS
name.focus();
jobRoleField.hide();

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

//Function that restricts user from selecting conflicting activities.
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

};

//Function that prevents the user from submitting the form if it is incomplete
//and notifies the user what information is missing.
function formValidation(){

};

//FUNCTIONS INVOKED WHEN USER INPUT CHANGES
$("#title").on("change", showJobRoleField);
$("#design").on("change", displayColorOptions);
chooseActivities();
$("#payment").on("change", displayPaymentDetails);

