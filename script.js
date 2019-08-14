let next = document.getElementsByClassName("next");
let next1 = document.getElementsByClassName("next1");
let previous = document.getElementsByClassName("previous");

var reg_start_p = document.getElementsByClassName("start")[0];
var first_name = document.getElementById("first_name");
var last_name = document.getElementById("last_name");
var full_name = document.getElementsByClassName("full_name")[0];
var address = document.getElementsByClassName("address")[0];
var street_address_1 = document.getElementById("street_address_1");
var street_address_2 = document.getElementById("street_address_2");
var city = document.getElementById("city");
var state = document.getElementById("state");
var zip = document.getElementById("zip");
var country = document.getElementById("country");
var area_code = document.getElementById("area_code");
var phone_number = document.getElementById("phone_number");
var others_inp = document.getElementById("others");
var phone = document.getElementsByClassName("phone")[0];
var query = document.getElementById("query");
var query_class = document.getElementsByClassName("query")[0];
var customer_details = document.getElementsByClassName("customer_details")[0];
var welcome = document.getElementsByClassName("welcome")[0];
var email = document.getElementsByClassName("email")[0];
var email_inp = document.getElementById("email");
var feedback = document.getElementsByClassName("feedback")[0];
var others = document.getElementsByClassName("others")[0];
var recommendation = document.getElementsByClassName("recommendation")[0];
var reference = document.getElementsByClassName("reference")[0];
var suggestions = document.getElementsByClassName("suggestions")[0];
var others_selected = false;
var left_arrow = document.getElementsByClassName("left_arrow");
var right_arrow = document.getElementsByClassName("right_arrow");
var error = document.getElementsByClassName("error")[0];
var end = document.getElementsByClassName("end")[0];
var myCarousel = document.getElementsByClassName("myCarousel")[0];
var temp_radio_inline = document.createElement("label");
temp_radio_inline.setAttribute("class", "radio-inline addOthersRadio");
var attrObj = {"data-toggle" : "tooltip"
    , "title" : "Others", "class" : "radio_others", "type" : "radio", "name": "optradio"};
var checkFilled = {"Full Name" : false, "Address" : false, "Phone Number" : false, "Query" : false, "Others" : false};

function end_func() {
    refresh_error();
    clear_all();
    reference.style.display = "none";
    end.style.display = "block";
    setTimeout(function(){
        end.innerHTML = "<h2>Redirecting...</h2>";
    }, 3000);
    setTimeout(function(){
        history.go(0);
    }, 5000);   
}

let nextMapObject = {
    "address" : address_validate,
    "customer_details" : full_name,
    "email" : email_validate,
    "feedback" : suggestions,
    "full_name" : full_name_validate ,
    "others" : others_validate, 
    "phone" : phone_validate,
    "query" : query_validation, //skipping the othres page
    "recommendation" : reference,
    "reference" : end,
    "suggestions" : recommendation,
}

let nextMapWOValidationObject = {
    "address" : phone,
    "customer_details" : full_name,
    "email" : query_class,
    "feedback" : suggestions,
    "full_name" : address ,
    "others" : feedback, 
    "phone" : email,
    "query" : feedback, //skipping the othres page
    "recommendation" : reference,
    "reference" : end,
    "suggestions" : recommendation,
}

let prevMapObject = {
    "address" : full_name,
    "email" : phone,
    "feedback" : select_others_or_query,
    "others" : query_class, 
    "phone" : address,
    "query" : email, 
    "recommendation" : suggestions,
    "reference" : recommendation,
    "suggestions" : feedback,
}

function gotoNextPage () {
    clear_all();
    let nextPage = nextMapObject[this.parentElement.classList[0]];
    //let radioOpn = radioMapObject[nextPage.classList[0]];
    if(nextPage == end){
        end_func();
    }else{
        if(typeof nextPage == "function"){
            nextPage(this);
        }else{
            nextPage.style.display = "block";
        }
        
        //radioOpn.style.checked = "true";
    }
    //console.log(nextPage);
    //console.log(radioOpn);
}

function gotoPrevPage () {
    clear_all();
    let prevPage = prevMapObject[this.parentElement.classList[0]];
    //console.log(prevPage);
    if(typeof prevPage == "function"){
        prevPage(this);
    }else{
        prevPage.style.display = "block";
    }
}

clear_all();
welcome.style.display = "block";

if(next){
    for(let i = 0; i < next.length; i++){
        next[i].addEventListener('click', gotoNextPage);
        next[i].addEventListener('mouseover', arrow_animate);
    }
}

if(next1) {
    for(let i = 0; i < next1.length; i++){
        next1[i].addEventListener('click', gotoNextPage);
        next1[i].addEventListener('mouseover', arrow_animate);
    }
}

if(reg_start_p){
    reg_start_p.addEventListener('mouseover', arrow_animate);
    reg_start_p.addEventListener('click', customer_details_page);
}

if(previous) {
    for(let i = 0; i < previous.length; i++){
        previous[i].addEventListener('click', gotoPrevPage);
        previous[i].addEventListener('mouseover', arrow_animate_previous);
    }
}

function refresh_error() {
    error.textContent = "This field is required.";
    error.style.display = "none";
}

function clear_all() {
    welcome.style.display = "none";
    myCarousel.style.display = "none";
    error.style.display = "none";
    address.style.display = "none";
    customer_details.style.display = "none";
    email.style.display = "none";
    feedback.style.display = "none";
    full_name.style.display = "none";
    others.style.display = "none";
    phone.style.display = "none";
    query_class.style.display = "none";
    recommendation.style.display = "none";
    reference.style.display = "none";
    suggestions.style.display = "none";
    end.style.display = "none";
} 


function customer_details_page(){
    refresh_error();
    clear_all();
    customer_details.style.display = "block";
}

function mouse_inside_text(event) {
    event.target.ogplaceholder = event.target.placeholder;
    event.target.placeholder = "";
}

function mouse_outside_text(event) {
    event.target.placeholder = event.target.ogplaceholder;
}

function full_name_validate(ref) {
    ref.parentElement.style.display = "block";
    if(first_name.value == "" || last_name.value == ""){
        checkFilled["Full Name"] = false;
        error.style = "display:block; bottom: 39%";
        class_vibrate(ref);
    }else{
        clear_all();
        checkFilled["Full Name"] = true;
        console.log(nextMapWOValidationObject[ref.parentElement.classList[0]]);
        nextMapWOValidationObject[ref.parentElement.classList[0]].style.display = "block";        
    }
}

function address_validate(ref) {
    ref.parentElement.style.display = "block";
    if(street_address_1.value=="" || 
    street_address_2.value=="" || city.value=="" || 
    state.value=="" || zip.value=="" || 
    country.value==""){
        checkFilled["Address"] = false;
        error.style = "display:block; bottom:25%";
        class_vibrate(ref);
    }else{
        clear_all();
        checkFilled["Address"] = true;
        console.log(nextMapWOValidationObject[ref.parentElement.classList[0]]);
        nextMapWOValidationObject[ref.parentElement.classList[0]].style.display = "block";
    }
}

function phone_validate(ref) {
    ref.parentElement.style.display = "block";
    if(area_code.value == "" || phone_number.value == "" || area_code.value < 0 || area_code.value > 999 || phone_number.value < 10000000 || phone_number.value > 9999999999){
        error.style = "display:block; bottom: 39%";
        checkFilled["Phone Number"] = false;
        class_vibrate(ref);
    }else{
        clear_all();
        checkFilled["Phone Number"] = true;
        console.log(nextMapWOValidationObject[ref.parentElement.classList[0]]);
        nextMapWOValidationObject[ref.parentElement.classList[0]].style.display = "block";
    }
}

function email_validate(ref) {
    ref.parentElement.style.display = "block";
    if(email_inp.value=="" || /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email_inp.value)){
        error.textContent = "This field is required.";      
        clear_all();
        checkFilled["Email"] = true;
        console.log(nextMapWOValidationObject[ref.parentElement.classList[0]]);
        nextMapWOValidationObject[ref.parentElement.classList[0]].style.display = "block";
    }else{
        error.textContent = "Incorrect Format";
        error.style = "display:block; bottom: 39%";
        class_vibrate(ref);
    }
}

function query_validation(ref) {
    ref.parentElement.style.display = "block";
    if(query.value == ""){
        error.style = "display:block; bottom: 39%";
        checkFilled["Query"] = false;
        class_vibrate(ref);
    }else{
        clear_all();
        checkFilled["Query"] = true;
        if(query.value == "Others"){
            others_selected = true;
            others.style.display = "block";
        }else{
            others_selected = false;
            feedback.style.display = "block";
        }
    }
}

function others_validate(ref){
    ref.parentElement.style.display = "block";
    if(others_inp.value == ""){
        checkFilled["Others"] = false;
        error.style = "display:block; bottom: 39%";
        class_vibrate(ref);
    }else{
        clear_all();
        checkFilled["Others"] = true;
        console.log(nextMapWOValidationObject[ref.parentElement.classList[0]]);
        nextMapWOValidationObject[ref.parentElement.classList[0]].style.display = "block";
    }
}

function class_vibrate(ref) {
    console.log(ref.parentElement);
    ref.parentElement.classList.add('vibrate');
    setTimeout(function() {
        ref.parentElement.classList.remove('vibrate');
    }, 210);
} 


function select_others_or_query(ref) {
    clear_all();
    if(others_selected){
        others.style.display = "block";
    }else{
        query_class.style.display = "block";
    }
}

function arrow_animate() {
    
    for(let i = 0; i < right_arrow.length; i++){
        right_arrow[i].classList.add('arrow_shake');
    }
    
    setTimeout(removeVibrateClass_arrow, 610);
}

function arrow_animate_previous() {
    
    for(let i = 0; i < left_arrow.length; i++){
        left_arrow[i].classList.add('arrow_shake_prev');
    }
    
    setTimeout(removeVibrateClass_arrow_prev, 610);
}

function removeVibrateClass_arrow() {
    for(let i = 0; i < right_arrow.length; i++){
        right_arrow[i].classList.remove('arrow_shake');
    }
}

function removeVibrateClass_arrow_prev() {
    for(let i = 0; i < left_arrow.length; i++){
        left_arrow[i].classList.remove('arrow_shake_prev');
    }
}



// function setAttrHelp (){
//     for(var i in attrObj){
//         radio_others.setAttribute(i, attrObj[i]);
//     }
//     temp_radio_inline.append(radio_others);
//     radio_others_activated = true;
//     for(let i = 0; i < radio_inline.length; i++){
//         radio_inline[i].classList.add("addOthersRadio");
//     }
//     radio_feedback.parentElement.parentElement.insertBefore(temp_radio_inline, radio_feedback.parentElement);
// } 
