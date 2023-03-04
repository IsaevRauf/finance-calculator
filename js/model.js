import View from "./view.js";
const view = new View();

export default class Model {
  constructor() {
    this.data = {
      allItems: {
        inc: [],
        exp: [],
      },
      totals: {
        inc: 0,
        exp: 0,
      },
      budget: 0,
      percentage: -1,
    };
  }

  addItem(input) {
    let id = 0;
    let totalInc = this.data.totals.inc;
    let data = this.data;
    const newItemInc = {
      id: id,
      type: input.type,
      desc: input.desc,
      val: parseFloat(input.val),
    };
    const newItemExp = {
      id: id,
      type: input.type,
      desc: input.desc,
      val: parseFloat(input.val),
      percentage: -1,
    };
    if (this.data.allItems.inc.length > 0) {
      newItemInc.id =
        this.data.allItems.inc[this.data.allItems.inc.length - 1]["id"] + 1;
    }

    if (this.data.allItems.exp.length > 0) {
      newItemExp.id =
        this.data.allItems.exp[this.data.allItems.exp.length - 1]["id"] + 1;
    }

    if (input.type == "inc") {
      this.data.allItems.inc.push(newItemInc);
    } else if (input.type == "exp") {
      this.data.allItems.exp.push(newItemExp);
    }
    //обновляем бюджет
    this.updateBudget();
    this.calcPercentage();
    //пересчитываем проценты
  }
  //проценты
  calcPercentage() {
    this.data.allItems.exp.forEach((item) => {
      if (this.data.totals.inc > 0) {
        item.percentage = Math.round((item.val / this.data.totals.inc) * 100);
      } else {
        item.percentage = -1;
      }
    });
  }

  getAllIdAndPercentages() {
    const allPerc = this.data.allItems.exp.map((item) => {
      return [item.id, item.percentage];
    });

    return allPerc;
  }

  calcBudget(total) {
    if (total > 0) {
      this.percentage = (this.val / total) * 100;
    }
    return this.percentage;
  }

  //удаляем данные
  deleteItem(type, id) {
    //возвращает список айдишек с типом inc или exp в зависимости от переданного аргумента
    const ids = this.data.allItems[type].map((item) => {
      return item.id;
    });
    //индекс элемента по которому кликнули
    let index = ids.indexOf(id);
    //если индекс найден, то делаем удаление
    if (index != -1) {
      this.data.allItems[type].splice(index, 1);
    }
    //обновляем бюджет
    this.updateBudget();
    //пересчитываем проценты
    this.calcPercentage();
  }
  //сумма доходов и расходов
  calculateTotalSum(type) {
    let sum = 0;

    this.data.allItems[type].forEach((item) => {
      sum = sum + item.val;
    });

    return sum;
  }

  // считаем бюджет
  calculateBudget() {
    //доходы
    this.data.totals.inc = this.calculateTotalSum("inc");
    //расходы
    this.data.totals.exp = this.calculateTotalSum("exp");
    //общий бюджет
    this.data.budget = this.data.totals.inc - this.data.totals.exp;
    // процент расходов
    if (this.data.totals.inc > 0) {
      this.data.percentage = Math.round(
        (this.data.totals.inc / this.data.totals.exp) * 100
      );
    } else {
      this.data.totals.percentage = -1;
    }
  }

  // возвращаем бюджет в виде объекта
  getBudget() {
    const budgetObj = {
      budget: this.data.budget,
      totalInc: this.data.totals.inc,
      totalExp: this.data.totals.exp,
      percentage: this.data.percentage,
    };
    return budgetObj;
  }

  //обновляем бюджет
  updateBudget() {
    this.calculateBudget();
    const budgetObj = this.getBudget();
    //отобразить бюджет в шаблоне
    view.updateBudget(budgetObj);
  }

  //обновляем проценты
  updatePercentages() {}
}
