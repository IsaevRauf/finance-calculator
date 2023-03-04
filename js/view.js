export default class View {
  constructor() {}
  //берем элементы из разметки, с которыми будем работать
  elements = {
    form: document.querySelector("#budget-form"),
    inputType: document.querySelector("#input__type"),
    inputDesc: document.querySelector("#input__description"),
    inputValue: document.querySelector("#input__value"),
    incomeContainer: document.querySelector("#income__list"),
    expenseContainer: document.querySelector("#expenses__list"),
    budgerLabel: document.querySelector("#budget-value"),
    incomeLabel: document.querySelector("#income-label"),
    expensesLabel: document.querySelector("#expense-label"),
    expensesPercentageLabel: document.querySelector("#expense-percent-label"),
    budgetTable: document.querySelector("#budget-table"),
    monthLabel: document.getElementById("month"),
    yearLabel: document.getElementById("year"),
  };

  //получаем введенные данные пользователем
  getInput() {
    const input = {
      type: this.elements.inputType.value,
      desc: this.elements.inputDesc.value,
      val: this.elements.inputValue.value,
    };
    return input;
  }
  //рендерим, вставляем в разметку готовые данные
  renderListItem(obj, type) {
    let containerElement, html;

    if (type == "inc") {
      //перебераем массив доходов
      obj.allItems.inc.forEach((item) => {
        containerElement = this.elements.incomeContainer;
        html = `<li id="inc-${
          item.id
        }" class="budget-list__item item item--income">
        <div class="item__title">${item.desc}</div>
        <div class="item__right">
            <div class="item__amount">${this.formatNumber(item.val, type)}</div>
            <button class="item__remove">
                <img
                    src="./img/circle-green.svg"
                    alt="delete"
                />
            </button>
        </div>
    </li>`;
      });
    } else {
      //перебираем массив расходов
      obj.allItems.exp.forEach((item) => {
        containerElement = this.elements.expenseContainer;
        html = `<li id="exp-${
          item.id
        }" class="budget-list__item item item--expense">
        <div class="item__title">${item.desc}</div>
        <div class="item__right">
            <div class="item__amount">
            ${this.formatNumber(item.val, type)}
                <div class="item__badge">
                    <div class="item_percent badge badge--dark badgeList">
                        ${item.percentage}
                    </div>
                </div>
            </div>
            <button class="item__remove">
                <img src="./img/circle-red.svg" alt="delete" />
            </button>
        </div>
    </li>`;
      });
    }

    containerElement.insertAdjacentHTML("beforeend", html);
  }

  //удаляем элемент со страницы
  deleteItem(itemId) {
    document.getElementById(itemId).remove();
  }

  //отчищаем инпуты, после ввода какаих-либо значений пользователем
  clearFields() {
    let inputDesc = this.elements.inputDesc;
    let inputValue = this.elements.inputValue;
    inputDesc.value = "";
    inputDesc.focus();
    inputValue.value = "";
  }
  //обновляем бюджет на странице
  updateBudget(obj) {
    let type;
    if (obj.budget > 0) {
      type = "inc";
    } else {
      type = "exp";
    }

    this.elements.budgerLabel.textContent = this.formatNumber(obj.budget, type);
    this.elements.incomeLabel.textContent = this.formatNumber(
      obj.totalInc,
      type
    );
    this.elements.expensesLabel.textContent = this.formatNumber(
      obj.totalExp,
      type
    );
    //проверка на проценты больше 0
    if (obj.percentage > 0 && obj.percentage != Infinity) {
      this.elements.expensesPercentageLabel.textContent = obj.percentage + "%";
    } else {
      this.elements.expensesPercentageLabel.textContent = "--";
    }
  }

  updatePerc(items) {
    items.forEach((item) => {
      let el = document
        .getElementById(`exp-${item[0]}`)
        .querySelector(".item_percent");
      // el.textContent = item[1] + '%';
      if (item[1] >= 0) {
        el.parentElement.style.display = "block";
        el.textContent = item[1] + "%";
      } else {
        el.parentElement.style.display = "none";
      }
    });
  }

  formatNumber(num, type) {
    //возвращаем целое число без знаков минус
    num = Math.abs(num);
    //приводим к двум цифрам после точки
    num = num.toFixed(2);

    let numSplit = num.split(".");
    let int = numSplit[0]; // целая часть
    let dec = numSplit[1]; // десятичная часть

    //расставляем запятые после каждого третьего числа 123,456,789
    //если длина числа больше чем 3 цифры, значит надо ставить запятые
    let newInt = "";
    if (int.length > 3) {
      for (let i = 0; i < int.length / 3; i++) {
        newInt =
          "," +
          int.substring(int.length - 3 * (i + 1), int.length - 3 * i) +
          newInt;
      }
      if (newInt[0] == ",") {
        newInt = newInt.substring(1);
      }
    } else if (int === "0") {
      newInt = "0";
    } else {
      newInt = int;
    }

    let resultNumber = newInt + "." + dec;

    if (type === "exp") {
      resultNumber = "- " + resultNumber;
    } else if (type === "inc") {
      resultNumber = "+ " + resultNumber;
    }
    return resultNumber;
  }

  displayMonth() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();

    const monthArr = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Декабрь",
    ];
    //по индексу
    month = monthArr[month];

    this.elements.monthLabel.innerText = month;
    this.elements.yearLabel.innerText = year;
  }
}
