var generateTestData = (function () {
  var ExampleItem = function (type, desc, sum) {
    this.type = type;
    this.desc = desc;
    this.sum = sum;
  };

  var testData = [
    new ExampleItem("inc", "Зарплата", 1500),
    new ExampleItem("inc", "Фриланс", 1500),
    new ExampleItem("inc", "Продажи в интернете", 3000),
    new ExampleItem("inc", "Акции", 500),
    new ExampleItem("exp", "Аренда", 1000),
    new ExampleItem("exp", "Бензин", 100),
    new ExampleItem("exp", "Продукты", 600),
    new ExampleItem("exp", "Развлечения", 600),
    new ExampleItem("exp", "Рестораны", 600),
    new ExampleItem("exp", "Покупка нового оборудования", 1000),
    new ExampleItem("exp", "Ремонт помещения", 1000),
  ];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function insertInUI() {
    var random = getRandomInt(testData.length);
    var randomItem = testData[random];

    document.querySelector("#input__type").value = randomItem.type;
    document.querySelector("#input__description").value = randomItem.desc;
    document.querySelector("#input__value").value = randomItem.sum;
  }

  return {
    init: insertInUI,
  };
})();

generateTestData.init();
