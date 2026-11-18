
const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const button = document.querySelector(".convertButton");
const fromCurrency = document.querySelector("select[name='from']");
const toCurrency = document.querySelector("select[name='to']");
const message = document.querySelector("#exchangeRate");

for (let select of dropdown) {
    for (let currencyCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;

        if(select.name === "from" && currencyCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currencyCode === "BDT") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }

    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amountValue = amount.value;

    if (amountValue === "" || amountValue < 1) {
        amountValue = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurrency.value.toLowerCase()}.json`;

    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];

    let finalAmount = amountValue * rate;

    message.innerText = `${amountValue} ${fromCurrency.value} = ${finalAmount.toFixed(2)} ${toCurrency.value}`;
}

const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSource = `https://flagsapi.com/${countryCode}/flat/64.png`;

    let img = element.parentElement.querySelector("img");
    img.src = newSource;
};


button.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
