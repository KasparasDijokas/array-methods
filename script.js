const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

// generate random user
async function generateRandomUser() {
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addUser(newUser);
}

function addUser(obj) {
  data.push(obj);

  updateDOM();
}

// update DOM
function updateDOM(providedData = data) {
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// format math random to money format
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// double
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// sort users by money
function sortMoney() {
    data.sort((a, b) => {
        return b.money - a.money;
    });
    updateDOM();
}

// millionaires
function showMillionaires() {
    data = data.filter(item => {
        return item.money > 1000000;
    });
    updateDOM();
}

// calculate wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => {
        return acc + user.money;
    }, 0);
    
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);
}

generateRandomUser();
generateRandomUser();
generateRandomUser();

addUserBtn.addEventListener("click", generateRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);