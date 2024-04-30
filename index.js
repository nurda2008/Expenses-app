'use strict';

let total = 10000;
const CURRENCY ='руб.'
const STATUS_IN_LIMIT = 'все хорошо'
const STATUS_OUT_OF_LIMIT = 'все плохо'
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'expenses_status-red'
const STATUS_IN_LIMIT_CLASSNAME = 'expenses_status-green'

const expensesInputNode = document.querySelector('.js-expenses-input')
const expensesBtnNode = document.querySelector('.js-expenses-btn')
const expensesStoryNode = document.querySelector('.js-expenses_story')
const expensesLimitNode = document.querySelector('.js-expenses_limit-value')
const expensesSumnode = document.querySelector('.js-expenses_sum-value')
const expensesStatusNode = document.querySelector('.js-expenses_status-green')
const expensesCleanBtnNode = document.querySelector('.js-reset-expenses')
const categorySelectNode = document.getElementById('categorySelect')

const POPUP_OPEN_LIMIT = 'popup__open'
const POPUP_FIXED_CLASSNAME = 'popup-fixed'

const popupFixedNode = document.querySelector('body')
const limitPopupBtnNode = document.querySelector('.js-popup-limit')
const popupNode = document.querySelector('.js-popup')
const popupCloseBtnNode = document.querySelector('.js-popup_close-btn')
const popupContentNode = document.querySelector('.js-popup_content')
const popupBtnNode = document.querySelector('.js-popup-btn')
const popupInputNode = document.querySelector('.js-popup-input')




let expenses = []


init()

expensesBtnNode.addEventListener('click', function() {

    const expense = getExpenseFromUser()


    if(!expense){
        return;
    }

    const currentAmout = getSelectedCategory()

    const newExpenseObj = {
        amount:expense,
        category:currentAmout
    }
    
    expenses.push(newExpenseObj)
    
    renderExpenses(expenses)
    
    console.log(newExpenseObj);

});


expensesCleanBtnNode.addEventListener('click', clearButton)

popupBtnNode.addEventListener('click', function(){
    getLimitFromUser()

    maintinLimit()

    renderExpenses(expenses)

    togglePopup()
});


function init() {
    expensesLimitNode.innerText = `${total} ${CURRENCY}`
    expensesStatusNode.innerText = STATUS_IN_LIMIT
    expensesSumnode.innerText = `${0} ${CURRENCY}`
}

function renderExpenses(expenses) {
    const sum = calculateExpenses(expenses)
    
    renderStatus(sum)
    renderSum(sum)
    renderHistory(expenses)
    
}

function getSelectedCategory() {
    return categorySelectNode.value;
}



function getExpenseFromUser() {
    if(!expensesInputNode.value){
        return;
    }
    
    const expense =  parseInt(expensesInputNode.value);
    
    clearInput()
    
    return expense
}

function clearInput() {
    expensesInputNode.value = ''
}


function renderHistory(expenses){
    let postListHtml = ''
    
    expenses.forEach(elem =>{
        postListHtml += `<li class='list'>${elem.amount} ${CURRENCY} - ${elem.category}</li>`
    });
    
    expensesStoryNode.innerHTML = `<ol class='item'>${postListHtml}</ol>`
}

function calculateExpenses(expenses) {
    let sum = 0;
    
    expenses.forEach(element => {
        sum += element.amount
    })
    
    return sum
}

function renderSum(sum){
    expensesSumnode.innerText = `${sum} ${CURRENCY}`
}

function renderStatus(sum){
    if(sum<=total) {
        expensesStatusNode.innerText = STATUS_IN_LIMIT
        expensesStatusNode.classList.add(STATUS_IN_LIMIT_CLASSNAME)
    }else{
        expensesStatusNode.innerText = `${STATUS_OUT_OF_LIMIT}(-${sum-total} ${CURRENCY})`
        expensesStatusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME)
    }
}

function getLimitFromUser() {
    const limit = popupInputNode.value;
    total = limit;
}

function maintinLimit() {
    expensesLimitNode.innerText = `${total} Руб.`;
}

function clearButton() {
    expenses = [];
    renderExpenses(expenses)
    expensesStatusNode.classList.add(STATUS_IN_LIMIT_CLASSNAME)
    expensesStatusNode.innerText = STATUS_IN_LIMIT;
    expensesStatusNode.classList.remove(STATUS_OUT_OF_LIMIT_CLASSNAME);
    clearInput()
}

limitPopupBtnNode.addEventListener('click', togglePopup)
popupCloseBtnNode.addEventListener('click', togglePopup)

popupNode.addEventListener('click', (event) => {
    const isClickOutsideContent = !event.composedPath().includes(popupContentNode)
    if (isClickOutsideContent){
        togglePopup()
    }
}) 

function togglePopup() {
    popupNode.classList.toggle(POPUP_OPEN_LIMIT);
    popupFixedNode.classList.toggle(POPUP_FIXED_CLASSNAME)
    popupInputNode.value = ''
}