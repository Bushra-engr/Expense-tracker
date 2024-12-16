let add = document.querySelector(".add");
let list = document.getElementById("list");
let expenses = []; // To store all expense amounts
let total_budget = 0; // Variable to store total budget value

add.addEventListener("click", main);

function main() {
    console.log("btn clicked");

    // Input values
    let exp_name = document.querySelector("#expname").value;
    let exp_amt = parseInt(document.querySelector("#expnum").value);

    if (!exp_name || isNaN(exp_amt)) {
        alert("Please enter valid inputs!");
        return;
    }

    // Adding the expense to the list
    let list_item = document.createElement("li");

    // Creating spans for values
    let span_name = document.createElement("span");
    span_name.textContent = exp_name;
    span_name.classList.add("span-name");

    let span_amt = document.createElement("span");
    span_amt.textContent = exp_amt;
    span_amt.classList.add("span-amt");

    // Grouping spans
    let group_span = document.createElement("div");
    group_span.append(span_name, span_amt);
    group_span.classList.add("group-spans");

    // Creating edit and delete buttons
    let editbtn = document.createElement("button");
    editbtn.textContent = "Edit";
    editbtn.classList.add("edit");

    let dltbtn = document.createElement("button");
    dltbtn.textContent = "Delete";
    dltbtn.classList.add("delete");

    // Grouping buttons
    let group = document.createElement("div");
    group.append(editbtn, dltbtn);
    group.classList.add("group-btns");

    // Appending everything to the list item
    list_item.append(group_span, group);

    // Adding the list item to the main list
    list.appendChild(list_item);

    // Store the expense amount
    expenses.push(exp_amt);
    total_expense(); // Update total expenses
    balance(); // Update balance after adding expense

    // Clear input fields
    document.querySelector("#expname").value = "";
    document.querySelector("#expnum").value = "";

    // Edit button functionality
    editbtn.addEventListener("click", function edit() {
        let new_name = prompt("Enter a new Name/Category:");
        let new_amt = parseInt(prompt("Enter a new Amount:"));

        if (new_name) span_name.textContent = new_name;
        if (!isNaN(new_amt)) {
            expenses[expenses.indexOf(exp_amt)] = new_amt; // Update in expenses array
            exp_amt = new_amt; // Update locally
            span_amt.textContent = new_amt;
            total_expense(); // Recalculate total
            balance(); // Update balance after edit
        }
    });

    // Delete button functionality
    dltbtn.addEventListener("click", function dlt() {
        list.removeChild(list_item);
        expenses.splice(expenses.indexOf(exp_amt), 1); // Remove from expenses array
        total_expense(); // Recalculate total
        balance(); // Update balance after deletion
    });
}

// Function to calculate total expenses
function total_expense() {
    let sum_exp = expenses.reduce((sum, val) => sum + val, 0); // Sum up all expenses
    let total = document.getElementById("expense-amt");
    total.innerText = sum_exp; // Update total in the UI
    balance(); // Call balance update after total expense update
}

// Set budget event
let set = document.querySelector(".set");
set.addEventListener("click", function () {
    let budget_value = document.getElementById("budget").value;
    let total_budget_display = document.getElementById("budget-amt");

    if (isNaN(budget_value) || budget_value === "") {
        alert("Set budget value first!");
    } else {
        total_budget = parseInt(budget_value); // Update global budget variable
        total_budget_display.innerHTML = total_budget; // Show budget value
        document.getElementById("budget").value = ""; // Clear input field
        balance(); // Update balance after setting budget
    }
});

// Balance function
function balance() {
    let total_exp = parseInt(document.getElementById("expense-amt").innerText); // Get total expenses
    let balance_amt = total_budget - total_exp; // Calculate balance
    let balance_display = document.getElementById("balance"); // Get balance display element
    balance_display.textContent = balance_amt; // Update balance in the UI
}
