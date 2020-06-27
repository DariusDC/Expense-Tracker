const listItems = document.getElementById("list");
const addForm = document.getElementById("form");
const textForm = document.getElementById("transaction-text");
const amountForm = document.getElementById("transaction-amount");
const incomeSection = document.getElementById("money-plus");
const expenseSection = document.getElementById("money-minus");
const balance = document.getElementById("balance");

let totalIncome = 0;
let totalExpense = 0; 

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function addTransactionToDom(transaction) {
    const sign = transaction.amount > 0 ? `+` : `-`;

    const item = document.createElement("li");
    transaction.amount > 0 ? item.classList.add("plus") : item.classList.add("minus");

    item.innerHTML = `
        ${transaction.text}
        <span>${sign}$${Math.abs(transaction.amount)}</span><button class="delete" onclick="deleteTransaction(${transaction.id})"">x</button> 
    `;
    listItems.appendChild(item);
    transaction.amount > 0 ? totalIncome += transaction.amount : totalExpense += transaction.amount;
    incomeSection.innerHTML = `+$${totalIncome.toFixed(2)}`;
    expenseSection.innerHTML = `-$${Math.abs(totalExpense.toFixed(2))}`;
    balance.innerHTML = `${sign}$${Math.abs(totalExpense+totalIncome).toFixed(2)}`;
    updateLocalStorage();
}

function init() {
    listItems.innerHTML = ``;
    totalIncome = 0;
    totalExpense = 0;
    transactions.forEach(item => addTransactionToDom(item));
}

init();

function randomId() {
    return Math.floor(Math.random() * 1000000000);
}

function addNewtransaction(e) {
    e.preventDefault();
    const text = textForm.value;
    const amount = parseInt(amountForm.value);
    const newItem = {
        id: randomId(),
        text: text,
        amount: amount
    };
    transactions.push(newItem);
    if (text && amount)
        addTransactionToDom(newItem);
    else 
        return console.log("add valid items");
    textForm.value = ``;
    amountForm.value = ``;
}   

function deleteTransaction(id) {
    transactions = transactions.filter(item => item.id !== id);
    listItems.innerHTML = ``;
    transactions.forEach(item => addTransactionToDom(item));
    init();
    updateLocalStorage();
}

//update local storage
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

//Event listeners
addForm.addEventListener("submit", addNewtransaction);