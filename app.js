class UI {
    constructor() {
        this.budgetFeedback = document.querySelector(".budget-feedback");
        this.budgetForm = document.getElementById("budget-form");
        this.budgetInput = document.getElementById("budget-input");
        this.budgetSubmit = document.getElementById("budget-submit");
        this.budgetAmount = document.getElementById("budget-amount");
        this.expenseAmount = document.getElementById("expense-amount");
        this.balanceAmount = document.getElementById("balance-amount");
        this.expenseFeedback = document.querySelector(".expense-feedback");
        this.expenseForm = document.getElementById("expense-form");
        this.expenseInput = document.getElementById("expense-input");
        this.amountInput = document.getElementById("amount-input");
        this.expenseSubmit = document.getElementById("expense-submit");
        this.balance = document.getElementById("bal");
        this.expenseList = document.getElementById("expense-list");
        this.itemList = [];
        this.itemId = 0;
    }

    submitBudgetForm() {
        if(this.budgetFeedback.classList.contains("showItem")) {
            this.budgetFeedback.classList.remove("showItem");
        }
        const value = this.budgetInput.value;
        if(value === '' || value<0) {
            console.log(this.budgetFeedback);
            this.budgetFeedback.classList.add("showItem");
            this.budgetFeedback.innerHTML = `<p>Value cannot be empty or negative</p>`;    
        } else {
            this.budgetAmount.textContent = value;
            this.budgetInput.value = '';
            this.showBalance();
        }
    }

    showBalance() {
        const expense = this.totalExpense();
        const total = parseInt(this.budgetAmount.textContent) - expense;
        this.balanceAmount.textContent = total;
        if(total < 0) {
            this.balance.classList.remove("showBlack", "showGreen");
            this.balance.classList.add("showRed");
        } else if(total === 0) {
            this.balance.classList.remove("showRed", "showGreen");
            this.balance.classList.add("showBlack");
        } else {
            this.balance.classList.remove("showRed", "showBlack");
            this.balance.classList.add("showGreen");
        }
    }

    submitExpenseForm() {
        if(this.expenseFeedback.classList.contains("showItem")) {
            this.expenseFeedback.classList.remove("showItem");
        }
        const expenseValue = this.expenseInput.value;
        const amountValue = this.amountInput.value;
        if(expenseValue === '' || amountValue === '' || amountValue<0) {
            this.expenseFeedback.classList.add("showItem");
            this.expenseFeedback.innerHTML = `<p>Value cannot be empty or negative</p>`;    
        } else {
            let amount = parseInt(amountValue);
            this.expenseInput.value = '';
            this.amountInput.value = '';
            let expense = {
                id: this.itemId,
                title: expenseValue,
                amount: amount,
            }
            this.itemId++;
            this.itemList.push(expense);
            this.addExpense(expense);
            this.showBalance();
        }
    }

    addExpense(expense) {
        const div = document.createElement('div');
        div.classList.add('expense');
        div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">

        <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
        <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

        <div class="expense-icons list-item">

         <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
          <i class="fas fa-edit"></i>
         </a>
         <a href="#" class="delete-icon" data-id="${expense.id}">
          <i class="fas fa-trash"></i>
         </a>
        </div>
       </div>`;
       this.expenseList.appendChild(div);
    } 

    totalExpense() {
        let total = 0;
        for(let item of this.itemList) {
            total += item.amount;
        }
        this.expenseAmount.textContent = total;
        return total;
    }

    editExpense(element) {
        let id = parseInt(element.dataset.id);
        const parent = element.parentElement.parentElement.parentElement;
        this.expenseList.removeChild(parent);
        
        let expense = this.itemList.filter(function(item) {
            return item.id === id;
        });
        this.expenseInput.value = expense[0].title;
        this.amountInput.value = expense[0].amount;

        let tempList = this.itemList.filter(function(item) {
            return item.id !== id;
        });

        this.itemList = tempList;
        this.showBalance();
    }

    deletExpense(element) {
        let id = parseInt(element.dataset.id);
        const parent = element.parentElement.parentElement.parentElement;
        this.expenseList.removeChild(parent);
        let expense = this.itemList.filter(function(item) {
            return item.id === id;
        });
        let tempList = this.itemList.filter(function(item) {
            return item.id !== id;
        });

        this.itemList = tempList;
        this.showBalance();
    }
}

function eventListeners() {
    const budgetForm = document.getElementById("budget-form");
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");

    const ui = new UI();

    budgetForm.addEventListener('submit', function(event) {
        event.preventDefault();
        ui.submitBudgetForm();
    })

    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        ui.submitExpenseForm();
    })

    expenseList.addEventListener('click', function(event) {
        event.preventDefault();
        if(event.target.parentElement.classList.contains("edit-icon")) {
            ui.editExpense(event.target.parentElement);
        }
        if(event.target.parentElement.classList.contains("delete-icon")) {
            ui.deletExpense(event.target.parentElement);
        }
    })
}

document.addEventListener('DOMContentLoaded', function() {
    eventListeners();
});