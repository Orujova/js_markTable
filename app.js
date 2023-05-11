const addButton = document.querySelector(".add");
const tbody = document.querySelector("tbody");
const mainsection = document.querySelector("#main_section");
const addform = document.querySelector(".addform");
const plus = document.querySelector(".plus");

let chart = null;
let result = [];
let cem = 0;
let names = [];
const orderRows = () => {
  const rows = [...document.querySelectorAll("tbody tr")];
  rows.map((row, key) => {
    row.querySelector("td").textContent = key + 1;
  });
};

const removeData = (e) => {
  e.target.closest("tr").remove();

  orderRows();
};
const saveData = (e) => {
  allow = true;
  const inputs = [...document.querySelectorAll("input")];
  inputs.map((input) => {
    input.parentElement.textContent = input.value;
  });
  e.target.textContent = "Düzəliş et";
  e.target.classList.remove("save");
  e.target.classList.add("edit");
  e.target.removeEventListener("click", saveData);
  e.target.addEventListener("click", editData);
};
const editData = () => {
  const scoreTd = document.querySelector(".scoreTd");
  scoreTd.textContent = "Qiymet yoxdur.";
  const ortalamaTd = document.querySelector(".ortalamaTd");
  ortalamaTd.textContent = 0;
  plusmark();
};
addButton.addEventListener("click", () => {
  mainsection.classList.add("background");
  const formdiv = document.createElement("div");
  formdiv.classList.add("formdiv");

  const includename = document.createElement("input");
  includename.setAttribute("type", "text");
  includename.setAttribute("placeholder", "Ad");
  includename.classList.add("includename");

  const includesurname = document.createElement("input");
  includesurname.setAttribute("type", "text");
  includesurname.setAttribute("placeholder", "Soyad");
  includesurname.classList.add("includename");

  const addBtn = document.createElement("button");
  addBtn.textContent = "Əlavə et";
  addBtn.classList.add("addBtn");

  formdiv.append(includename, includesurname, addBtn);
  addform.append(formdiv);

  addBtn.addEventListener("click", () => {
    mainsection.classList.remove("background");
    formdiv.remove();
    const row = document.createElement("tr");
    const noTd = document.createElement("td");
    noTd.classList.add("noTd");
    noTd.textContent = 1;

    const operationsTd = document.createElement("td");

    const nameTd = document.createElement("td");
    nameTd.classList.add("nameTd");

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Sil";
    cancelBtn.classList.add("cancel");
    cancelBtn.addEventListener("click", removeData);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit");
    editBtn.addEventListener("click", editData);

    operationsTd.append(cancelBtn, editBtn);
    const surnameTd = document.createElement("td");
    surnameTd.classList.add("surnameTd");
    const scoreTd = document.createElement("td");
    scoreTd.classList.add("scoreTd");
    scoreTd.textContent = "Qiymet yoxdur.";
    const ortalamaTd = document.createElement("td");
    ortalamaTd.classList.add("ortalamaTd");
    ortalamaTd.textContent = 0;

    row.append(noTd, nameTd, surnameTd, scoreTd, ortalamaTd, operationsTd);
    tbody.append(row);

    nameTd.textContent = includename.value;

    surnameTd.textContent = includesurname.value;

    orderRows();
  });
});

const plusmark = () => {
  mainsection.classList.add("background");
  const formdiv = document.createElement("div");
  formdiv.classList.add("formdiv");

  const nameTd = [...document.querySelectorAll(".nameTd")];
  const surnameTd = [...document.querySelectorAll(".surnameTd")];
  const select = document.createElement("select");

  let l = Math.min(nameTd.length, surnameTd.length);
  for (let i = 0; i < l; i++) {
    a = `${nameTd[i].textContent} ${surnameTd[i].textContent}`;
    result.push(a);
  }

  result.map((name) => {
    const option = document.createElement("option");
    option.classList.add("option");
    option.textContent = name;
    select.append(option);
  });

  const scoreInput = document.createElement("input");
  scoreInput.setAttribute("type", "number");
  scoreInput.setAttribute("placeholder", "Qiymet");

  const addBtn = document.createElement("button");
  addBtn.textContent = "Əlavə et";
  addBtn.classList.add("addBtn");

  const noTd = [...document.querySelectorAll(".noTd")];
  const scoreTd = [...document.querySelectorAll(".scoreTd")];

  let ortalamaarr = [];
  addBtn.addEventListener("click", () => {
    mainsection.classList.remove("background");
    formdiv.remove();
    const selectedOptions = select.selectedOptions;
    let selectedOrderArr = "";
    const ortalamaTd = [...document.querySelectorAll(".ortalamaTd")];

    for (let i = 0; i < selectedOptions.length; i++) {
      const optionIndex = select.selectedIndex + 1;
      selectedOrderArr = selectedOrderArr + optionIndex;
    }

    for (let j = 0; j < noTd.length; j++) {
      if (selectedOrderArr === noTd[j].textContent) {
        if (scoreTd[j].textContent === "Qiymet yoxdur.") {
          scoreTd[j].textContent = "";
        }
        if (scoreTd[j].textContent === "") {
          scoreTd[j].textContent += `${scoreInput.value}`;
          ortalamaTd[j].textContent = scoreTd[j].textContent;
        } else {
          a = scoreTd[j].textContent;
          scoreTd[j].textContent += `,${scoreInput.value}`;
          cem = scoreTd[j].textContent.split(",");
          cem.push(a);
          cem.shift();
          console.log(cem);
          const arrOfNum = cem.map((str) => {
            return parseInt(str, 10);
          });
          ortalamaTd[j].textContent =
            arrOfNum.reduce((a, b) => a + b) / arrOfNum.length;
        }
      }
    }

    for (let k = 0; k < ortalamaTd.length; k++) {
      b = `${ortalamaTd[k].textContent} `;
      ortalamaarr.push(b);
    }
    var xValues = result;
    var yValues = ortalamaarr;
    var barColors = ["red", "green", "blue", "orange", "brown"];
    if (!chart) {
      chart = new Chart("myChart", {
        type: "bar",
        data: {
          labels: xValues,
          datasets: [
            {
              label: "Ortalama",
              backgroundColor: barColors,
              data: yValues,
              borderWidth: 1,
            },
          ],
        },
      });
    } else {
      chart.data.datasets[0].data = yValues;
      chart.data.labels = xValues;
      chart.update();
    }

    result = [];
  });

  formdiv.append(select, scoreInput, addBtn);
  addform.append(formdiv);
};

plus.addEventListener("click", plusmark);
