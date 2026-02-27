const billInput = document.getElementById("bill-input");
const customTip = document.getElementById("custom-tip");
const peopleInput = document.getElementById("people");
const tipButtons = document.querySelectorAll("[data-tip]");
const tipAmount = document.getElementById("tip-amount");
const totalAmount = document.getElementById("total-amount");
const errorMsg = document.getElementById("error-msg");
const errorMsgg = document.getElementById("error-msgg");
const reset = document.getElementById("resetBtn");

let selectedTip = 0;

tipButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tipButtons.forEach((button) => {
      button.classList.remove("active-state");
    });
    customTip.value = "";
    selectedTip = parseFloat(button.dataset.tip);
    button.classList.add("active-state");
    calculate();
  });
});

function validateBill() {
  if (billInput.value === "0") {
    errorMsg.classList.remove("hidden");
    billInput.classList.add("error-state");
  } else {
    errorMsg.classList.add("hidden");
    billInput.classList.remove("error-state");
  }
}

function validatePeople() {
  if (peopleInput.value === "0") {
    errorMsgg.classList.remove("hidden");
    peopleInput.classList.add("error-state");
  } else {
    errorMsgg.classList.add("hidden");
    peopleInput.classList.remove("error-state");
  }
}

function calculate() {
  let bill = 0;
  let people = 0;

  bill = parseFloat(billInput.value);
  people = parseFloat(peopleInput.value);

  let tipPercent = selectedTip;

  if (customTip.value) {
    tipPercent = parseFloat(customTip.value) / 100;
  }

  let totalTip = bill * tipPercent;
  let total = bill + totalTip;

  let tipAmountPerPerson = totalTip / people;
  let totalPerPerson = total / people;

  tipAmount.innerHTML = `${people === 0 || isNaN(people) || bill == 0 || isNaN(bill) ? "$0.00" : "$" + tipAmountPerPerson.toFixed(2)}`;
  totalAmount.innerHTML = `${people === 0 || isNaN(people) || bill == 0 || isNaN(bill) ? "$0.00" : "$" + totalPerPerson.toFixed(2)}`;
}

peopleInput.addEventListener("input", () => {
  validatePeople();
  calculate();
});

billInput.addEventListener("input", () => {
  validateBill();
  calculate();
});

customTip.addEventListener("input", () => {
  tipButtons.forEach((button) => {
    button.classList.remove("active-state");
  });
  selectedTip = 0;
  calculate();
});

reset.addEventListener("click", () => {
  tipAmount.innerHTML = "$0.00";
  totalAmount.innerHTML = "$0.00";
  peopleInput.value = "";
  billInput.value = "";
  errorMsgg.classList.add("hidden");
  errorMsg.classList.add("hidden");
  peopleInput.classList.remove("error-state");
  billInput.classList.remove("error-state");
  customTip.value = "";
  tipButtons.forEach((button) => {
    button.classList.remove("active-state");
  });
});
