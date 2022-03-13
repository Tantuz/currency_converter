const USD_COURSE = 3.5;
const EUR_COURSE = 4;
const RUB_COURSE = 0.03;
const CNY_COURSE = 5;
const CURRENCIES = ['USD', 'EUR', 'RUB', 'BYN', 'CNY'];
const SELL_SELECT = document.getElementById('sell-select');
const CONVERT_BTN = document.getElementById('converter-btn');
const INPUT = document.getElementById('input-sell');

let chosenCurrency = SELL_SELECT.value;
let buyCurrencies = []; 
buyCurrencies = CURRENCIES.filter(el => el !== chosenCurrency);

SELL_SELECT.addEventListener('change', convertButtonDidPress);
CONVERT_BTN.addEventListener('click', convertButtonDidPress);
INPUT.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && INPUT.value !== '') {
    convertButtonDidPress();
    event.preventDefault();
  }
});

function convertButtonDidPress() {
  chooseCurrency();
  amountConverted(chosenCurrency);
}

function chooseCurrency () {
  chosenCurrency = SELL_SELECT.value;
  buyCurrencies = CURRENCIES.filter(el => el !== chosenCurrency);
}

function amountConverted (type) {
  let amountArr = [];
  let amount = INPUT.value;
  const regexp = /^[1-9]/;
  if (!amount.match(regexp)) {
    INPUT.style.border = '1px solid red';
    INPUT.style.color = 'red';
    return;
  } else {
    INPUT.style.border = '1px solid green';
    INPUT.style.color = 'black';
  }
  switch (type) {
    
    case 'USD':
      let usdAmout = amount * USD_COURSE;
      amountArr.push(usdAmout / EUR_COURSE, usdAmout / RUB_COURSE, usdAmout, usdAmout / CNY_COURSE);
      convertCurrency(amountArr);
      break;
    
    case 'EUR':
      let eurAmount = amount * EUR_COURSE;
      amountArr.push(eurAmount / USD_COURSE, eurAmount / RUB_COURSE, eurAmount, eurAmount / CNY_COURSE);
      convertCurrency(amountArr);
      break;

    case 'RUB':
      let rubAmount = amount * RUB_COURSE;
      amountArr.push(rubAmount / USD_COURSE, rubAmount / EUR_COURSE, rubAmount, rubAmount / CNY_COURSE);
      convertCurrency(amountArr);
      break;

    case 'BYN':
      let bynAmount = amount;
      amountArr.push(bynAmount / USD_COURSE, bynAmount / EUR_COURSE, bynAmount / RUB_COURSE, bynAmount / CNY_COURSE);
      convertCurrency(amountArr);
      break;

    case 'CNY':
      let cnyAmount = amount * CNY_COURSE;
      amountArr.push(cnyAmount / USD_COURSE, cnyAmount / EUR_COURSE, cnyAmount / RUB_COURSE, cnyAmount);
      convertCurrency(amountArr);
      break;
  }
}

function convertCurrency (arr) {
  let labelToFill = document.getElementById('buy');
  if (labelToFill.innerHTML !== '') {
    labelToFill.innerHTML = '';
  }
    buyCurrencies.forEach(item => {
    let element = document.createElement('div');
    element.className = 'currency-item';
    element.innerText = `${item}   ${(arr.shift()).toFixed(2)}`;
    labelToFill.appendChild(element);
  });
}


