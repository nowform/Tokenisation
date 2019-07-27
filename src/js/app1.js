/** Global Variables */
let nonPinCountLimit = 5;

function getElement(selector) {
    return document.querySelector(selector);
}
function goToScreen(screen) {
    let prevScreen, nextScreen;
    if (screen === 'card-limits') {
        prevScreen = getElement('#cards-list');
        nextScreen = getElement('#card-limits');
    }
    else if (screen === 'cards-list') {
        prevScreen = getElement('#card-limits');
        nextScreen = getElement('#cards-list');
    }
    else if (screen === 'manage-limits') {
        prevScreen = getElement('#cards-screen');
        nextScreen = getElement('#manage-limits-screen');
    }
    else if (screen === "cards-screen") {
        prevScreen = getElement('#manage-limits-screen');
        nextScreen = getElement('#cards-screen');
    }
    else if (screen === 'applied-changes-screen') {
        prevScreen = getElement('#manage-limits-screen');
        nextScreen = getElement('#applied-changes-screen');
    }
    prevScreen.classList.add('hidden');
    nextScreen.classList.remove('hidden');
}
function switchTab(event, tabID) {
    const tabs = document.querySelectorAll('.tab-content .content'), tabLinks = document.querySelectorAll('.tabs-header .tabs .tab');
    tabs.forEach(element => {
        element.classList.remove('active')
    });
    tabLinks.forEach(element => {
        element.classList.remove('active')
    });
    const tabToActive = '#' + tabID;
    getElement(tabToActive).classList.add('active');
    event.currentTarget.className += ' active';
}

function openExitWithoutSaveModal() {
    window.location.hash = 'exitWithoutSave';
}

function selectCard(event) {
    //var all =  document.querySelectorAll('.card-radio-image');
    document.querySelectorAll('.card-radio-image').forEach(element => {
        element.src = './assets/images/card-select.png';
    });
    let element = event.currentTarget.querySelector('.card-radio-image');
    element.src = './assets/images/card-selected.png';
    goToScreen('card-limits');
}

/**
 * Establish master slave relationship between card spends switches
 */

function onChangeCardMaster(umbrellaClass) {
    const slaveSelector = `.${umbrellaClass} .slave`, masterToggleSelector = `.${umbrellaClass} .master-toggle`;
    const masterToggle = getElement(masterToggleSelector);
    let slaveSections = document.querySelectorAll(slaveSelector);
    if (masterToggle.type == 'checkbox' && masterToggle.checked === false){
        for (var i = 0; i < slaveSections.length; i++) {
            const slaveToggle = slaveSections[i].querySelector('.slave-toggle');
            slaveSections[i].classList.add('disabled', 'gray');
            if (slaveToggle.type == 'checkbox')
                slaveToggle.checked = false;
        }
        getElement(`.${umbrellaClass} .master .sbi-subheading`).classList.add('gray');
    }else{
        for (var i = 0; i < slaveSections.length; i++) {
            slaveSections[i].classList.remove('disabled');
        }
        getElement(`.${umbrellaClass} .master .sbi-subheading`).classList.remove('gray');
    }
}	

function onChangeSlave(event, selector){
    const checkBoxParent = getElement(`.${selector}`), checkBox = event.currentTarget;
    if (checkBox.checked){
        checkBoxParent.classList.remove('gray');
    }else{
        checkBoxParent.classList.add('gray');
    }
}

function onChangeDigitalMaster(umbrellaClass){
    const section = getElement(`.${umbrellaClass}`), toggle = getElement(`.${umbrellaClass} .master-toggle`);
    let sectionToDisable1 = section.querySelector('.limit-amount'), sectionToDisable2 = section.querySelector('.limit-count');
    if(!toggle.checked){
        section.classList.add('gray');
        sectionToDisable1.classList.add('disabled', 'gray');
        sectionToDisable2.classList.add('disabled', 'gray');
    }else{
        section.classList.remove('gray');
        sectionToDisable1.classList.remove('disabled', 'gray');
        sectionToDisable2.classList.remove('disabled', 'gray');
    }
}

function changeNonPinCountLimit(event){
    const toggleStatus = event.currentTarget.checked;
    if(toggleStatus){
        nonPinCountLimit = 10;
        changeViewOnLimitChange('non-pin', 10, toggleStatus);
    } else{
        nonPinCountLimit = 5;
        changeViewOnLimitChange('non-pin', 5, toggleStatus);
    }
        
}

function changeViewOnLimitChange(umbrellaClass, limit, toggleStatus){
    const limitLabel = getElement(`.${umbrellaClass} .limit-count .new .input-label .count`);
    const disclaimer = getElement(`#digital-spends .disclaimer span`);
    limitLabel.innerHTML = limit;
    if(toggleStatus)
        disclaimer.innerHTML = 'Disabling international spends will affect your max limits for non-PIN based Contactless POS transactions';
    else
        disclaimer.innerHTML = 'Enabling international spends will affect your max limits for non-PIN based Contactless POS transactions';
}

function isNumber(event){
    const charCode = event.which || event.keyCode;
    return (charCode >= 48 && charCode <= 57)
}

function validateInputMax(event, max){
    const inputValue = event.currentTarget.value;
    return inputValue <= max;
}


/**
 * Range Slider Code
 */

/** Initialize the sliders */
var slider1 = document.getElementById('range-slider-1');
noUiSlider.create(slider1, {
    start: [50000, 250000],
    connect: [true, true, false],
    step: 1,
    orientation: 'horizontal', // 'horizontal' or 'vertical'
    range: {
        'min': 0,
        'max': 500000
    },
    pips: {
        mode: 'count',
        values: 5,
        density: 20
    }
});

var slider2 = document.getElementById('range-slider-2');
noUiSlider.create(slider2, {
    start: [50000, 250000],
    connect: [true, true, false],
    step: 1,
    orientation: 'horizontal', // 'horizontal' or 'vertical'
    range: {
        'min': 0,
        'max': 500000
    },
    pips: {
        mode: 'count',
        values: 5,
        density: 20
    }
});

/** Linking sliders with input fields */
const inputField1 = document.getElementById('new-limit-1');

slider1.noUiSlider.on('update', function (values, handle) {
    const value = values[handle];
    if (handle) {
        inputField1.value = Math.round(value);
    }
    enableApplyButton();
});

inputField1.addEventListener('change', function () {
    slider1.noUiSlider.set([null, this.value]);
});

const inputField2 = document.getElementById('new-limit-2');

slider2.noUiSlider.on('update', function (values, handle) {
    const value = values[handle];
    if (handle) {
        inputField2.value = Math.round(value);
    }
    enableApplyButton();
});

inputField2.addEventListener('change', function () {
    slider2.noUiSlider.set([null, this.value]);
});

// Disable the pseudo handle
var origins = document.getElementsByClassName('noUi-origin');
origins[0].setAttribute('disabled', true);

// 
function enableApplyButton(){
    const buttons = document.querySelectorAll('.apply-digital');
    buttons.forEach(button => {
        button.removeAttribute("disabled");
    });
}

function disableApplyButton(){
    const buttons = document.querySelectorAll('.apply-digital');
    buttons.forEach(button => {
        button.setAttribute("disabled", true);
    });
}

// Run on Initialization
function init(){
    onChangeCardMaster('all-online');
    onChangeCardMaster('all-international');
    onChangeDigitalMaster('non-pin');
    onChangeDigitalMaster('pin');
    disableApplyButton();
}

init();