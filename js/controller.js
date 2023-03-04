import View from "./view.js";
const view = new View();
import Model from "./model.js";
const model = new Model();
view.displayMonth()
view.elements.form.addEventListener("submit", function (e) {
  e.preventDefault();
  let input = view.getInput();
  //проверка на пустую строку и ноль
  if (input.desc != "" && !isNaN(input.val) && input.val > 0) {
    //в addItem внутри функции также обновляем бюджет и пересчитываем проценты
    model.addItem(input);
    view.renderListItem(model.data, input.type);
    view.clearFields();
    //Выводим на экран новые значения процентов
    view.updatePerc(model.getAllIdAndPercentages());
    generateTestData.init();
  } else {
    alert("Введите корректные данные!");
  }
});
view.elements.budgetTable.addEventListener("click", function (e) {
  if (e.target.closest(".item__remove")) {
    //находим id записи, которую надо удалить
    let itemId, splitId, type, id;
    itemId = e.target.closest("li.budget-list__item").id;
    splitId = itemId.split("-");
    type = splitId[0];
    id = parseInt(splitId[1]);
    //удаляем элемент везде и пересчитываем проценты внутри функции deleteItem
    model.deleteItem(type, id);
    view.deleteItem(itemId);
    //выводим на экран новые значения процентов
    view.updatePerc(model.getAllIdAndPercentages());
  }
});
