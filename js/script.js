const filterByType = (
    type,
    ...values //type значение инпута, ...values значение селекта
  ) => values.filter((value) => typeof value === type), //при помощи typeof определяем тип введенного значения
  hideAllResponseBlocks = () => {
    const responseBlocksArray = Array.from(
      document.querySelectorAll("div.dialog__response-block")
    ); //получение со страницы блоков результата фильтрации и создаем массив
    responseBlocksArray.forEach((block) => (block.style.display = "none")); //при пререборе массива всем элементам
    //добавляем стиль displai none. Скрываем их на данном этапе
  },
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    hideAllResponseBlocks(); //вызываем функцию
    document.querySelector(blockSelector).style.display = "block"; //делаем блок видимым присвоением стиля displey block
    if (spanSelector) {
      document.querySelector(spanSelector).textContent = msgText; //Условие: если аргумент функции showResponseBlock равен true, то вставляем текст
      // с данными переменной alertMsg
    }
  },
  showError = (
    msgText //аргумент `Ошибка: ${e}`
  ) => showResponseBlock(".dialog__response-block_error", msgText, "#error"), //блок ошибки
  showResults = (
    msgText //аргумент alertMsg
  ) => showResponseBlock(".dialog__response-block_ok", msgText, "#ok"), //блок результата
  showNoResults = () => showResponseBlock(".dialog__response-block_no-results"),
  tryFilterByType = (type, values) => {
    //вызов функции type - данные из инпута values - данные из селекта
    try {
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", "); //выводим элементы массива в строку
      //и разделяем запятой
      const alertMsg = valuesArray.length
        ? `Данные с типом ${type}: ${valuesArray}`
        : `Отсутствуют данные типа ${type}`; // проверяется тип данных полученных из инпута с типом в селекте
      showResults(alertMsg); //вызывается функция и передается аргументом результат из сравнения типов
    } catch (e) {
      showError(`Ошибка: ${e}`); // если в блоке try произошла ошибка далее выполняется
      // catch  в котром вызывается функция showError
    }
  };

const filterButton = document.querySelector("#filter-btn"); //получение со траницы кнопки фильтр

filterButton.addEventListener("click", (e) => {
  //обработчик события клик
  const typeInput = document.querySelector("#type"); //Получение со страницы select
  const dataInput = document.querySelector("#data"); //Получение со страницы input

  if (dataInput.value === "") {
    //Проверка на пустое поле
    dataInput.setCustomValidity("Поле не должно быть пустым!"); //вывод сообщения о необходимость заполнить поле
    showNoResults(); //вызов функции
  } else {
    // dataInput.setCustomValidity('');//это можно убрать
    e.preventDefault(); //Отменяем перезагрузку страницы
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim()); //получение данных исключая пробелы из селекта и инпута
    //вызов функции tryFilterByType и передача этих данных в функцию аргументами
  }
});
