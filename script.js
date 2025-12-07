// ============================================
// ПЕРЕМЕННЫЕ ДЛЯ ХРАНЕНИЯ ПРЕДЫДУЩЕГО ГРАДИЕНТА
// ============================================
// Эти переменные хранят цвета предыдущего градиента
// null означает, что значения еще не установлены (нет предыдущего градиента)
let previousColorTop = null;      // Верхний цвет предыдущего градиента
let previousColorBottom = null;    // Нижний цвет предыдущего градиента

// ============================================
// ФУНКЦИЯ ГЕНЕРАЦИИ СЛУЧАЙНОГО HEX-КОДА ЦВЕТА
// ============================================
// Эта функция создает случайный цвет в формате hex (например: "ff00aa")
function generateHexCode() {
  // Math.random() генерирует случайное число от 0 до 1
  // Умножаем на 16777215 (это максимальное число для 6-значного hex: FFFFFF в десятичной системе)
  // Math.floor() округляет число вниз до целого
  // toString(16) переводит число в 16-ричную систему (hex формат)
  const randomHex = Math.floor(Math.random() * 16777215).toString(16);
  
  // padStart(6, "0") добавляет нули в начало, если число меньше 6 символов
  // Например: "abc" станет "000abc"
  return randomHex.padStart(6, "0");
}

// ============================================
// ФУНКЦИЯ ГЕНЕРАЦИИ МАССИВА С ДВУМЯ HEX-КОДАМИ
// ============================================
// Эта функция создает массив (список) из двух случайных цветов
// Массив - это способ хранить несколько значений в одной переменной
function generateHexCodeArray() {
  // Вызываем generateHexCode() дважды и помещаем результаты в массив
  // [значение1, значение2] - это синтаксис создания массива
  return [generateHexCode(), generateHexCode()];
}

// ============================================
// ФУНКЦИЯ ПРИМЕНЕНИЯ ЦВЕТОВ К CSS
// ============================================
// Эта функция генерирует новый градиент и применяет его к странице
function applyColorsToCSS() {
  // ШАГ 1: Сохраняем текущие цвета как предыдущие перед генерацией новых
  // document.getElementById() находит элемент на странице по его ID
  const color_value_top = document.getElementById("color_value_top");
  const color_value_bottom = document.getElementById("color_value_bottom");
  
  // Проверяем, что элементы существуют на странице
  // && означает "И" - оба условия должны быть true
  if (color_value_top && color_value_bottom) {
    // textContent получает текст внутри элемента (без тегов HTML)
    // Сохраняем текущие цвета в переменные для предыдущего градиента
    previousColorTop = color_value_top.textContent;
    previousColorBottom = color_value_bottom.textContent;
    // Обновляем визуальное отображение предыдущего градиента
    updatePreviousGradient();
  }
  
  // ШАГ 2: Генерируем новые случайные цвета
  // generateHexCodeArray() возвращает массив [цвет1, цвет2]
  // [0] - это первый элемент массива (верхний цвет)
  // [1] - это второй элемент массива (нижний цвет)
  let color_top = generateHexCodeArray()[0];
  let color_bottom = generateHexCodeArray()[1];
  
  // ШАГ 3: Применяем новые цвета к CSS переменным
  // :root - это корневой элемент HTML (тег <html>)
  // CSS переменные (--color_top, --color_bottom) используются в файле main.css
  let root = document.querySelector(":root");
  root.style.setProperty("--color_top", "#" + color_top);      // Добавляем "#" перед hex-кодом
  root.style.setProperty("--color_bottom", "#" + color_bottom);
  
  // Выводим цвета в консоль браузера (для отладки)
  console.log("Color1: " + color_top, "Color2: " + "#" + color_bottom);
  
  // ШАГ 4: Обновляем текст на странице с новыми цветами
  // innerHTML позволяет изменить содержимое HTML элемента
  color_value_top.innerHTML = color_top;
  color_value_bottom.innerHTML = color_bottom;
}

// ============================================
// ФУНКЦИЯ ОБНОВЛЕНИЯ ОТОБРАЖЕНИЯ ПРЕДЫДУЩЕГО ГРАДИЕНТА
// ============================================
// Эта функция показывает предыдущий градиент в отдельном элементе
function updatePreviousGradient() {
  // Проверяем, что у нас есть сохраненные цвета
  if (previousColorTop && previousColorBottom) {
    // Находим элемент на странице, где будет показан предыдущий градиент
    const prevGradientElement = document.getElementById("previous_gradient");
    
    // Проверяем, что элемент существует
    if (prevGradientElement) {
      // Устанавливаем фон элемента как градиент из двух цветов
      // `linear-gradient()` - это CSS функция для создания градиента
      // Обратные кавычки `` позволяют вставлять переменные в строку через ${}
      prevGradientElement.style.background = 
        `linear-gradient(#${previousColorTop}, #${previousColorBottom})`;
      
      // Добавляем CSS класс "has_previous", чтобы элемент стал видимым
      // В CSS есть правило: элемент скрыт, пока не добавлен этот класс
      prevGradientElement.classList.add("has_previous");
    }
  }
}

// ============================================
// ФУНКЦИЯ ВОССТАНОВЛЕНИЯ ПРЕДЫДУЩЕГО ГРАДИЕНТА
// ============================================
// Эта функция вызывается при клике на элемент с предыдущим градиентом
// Она возвращает сохраненные цвета обратно на страницу и скрывает элемент
function restorePreviousGradient() {
  // Проверяем, что у нас есть сохраненные цвета
  if (previousColorTop && previousColorBottom) {
    // Находим корневой элемент для установки CSS переменных
    let root = document.querySelector(":root");
    
    // Восстанавливаем предыдущие цвета в CSS переменные
    root.style.setProperty("--color_top", "#" + previousColorTop);
    root.style.setProperty("--color_bottom", "#" + previousColorBottom);
    
    // Находим элементы на странице, где отображаются цвета
    const color_value_top = document.getElementById("color_value_top");
    const color_value_bottom = document.getElementById("color_value_bottom");
    
    // Проверяем, что элементы существуют, и обновляем их текст
    if (color_value_top && color_value_bottom) {
      color_value_top.innerHTML = previousColorTop;
      color_value_bottom.innerHTML = previousColorBottom;
    }
    
    // Скрываем элемент предыдущего градиента после восстановления
    // Находим элемент с предыдущим градиентом
    const prevGradientElement = document.getElementById("previous_gradient");
    if (prevGradientElement) {
      // Убираем класс "has_previous", что скроет элемент
      // (в CSS элемент скрыт по умолчанию и показывается только с этим классом)
      prevGradientElement.classList.remove("has_previous");
    }
  }
}

// ============================================
// ФУНКЦИЯ КОПИРОВАНИЯ HEX-ЗНАЧЕНИЯ В БУФЕР ОБМЕНА
// ============================================
// Эта функция копирует цвет в формате hex в буфер обмена при клике
// id - это ID элемента, текст которого нужно скопировать
function copyHexValue(id) {
  // navigator.clipboard - это API браузера для работы с буфером обмена
  // writeText() - метод для записи текста в буфер обмена
  // .then() - выполняется, если операция успешна
  // .catch() - выполняется, если произошла ошибка
  navigator.clipboard
    .writeText(document.getElementById(id).textContent)
    .then(() => {
      // Сохраняем исходное значение, чтобы вернуть его позже
      let setValue = document.getElementById(id).textContent;
      
      // Временно меняем текст на "Copied" (Скопировано)
      document.getElementById(id).innerHTML = "Copied";
      
      // setTimeout() выполняет функцию через указанное время (в миллисекундах)
      // 300 мс = 0.3 секунды
      setTimeout(function () {
        // Возвращаем исходный текст обратно
        document.getElementById(id).innerHTML = setValue;
      }, 300);
    })
    .catch((err) => {
      // Если произошла ошибка (например, нет разрешения на доступ к буферу)
      let setValue = document.getElementById(id).textContent;
      
      // Показываем сообщение об ошибке
      document.getElementById(id).innerHTML = "Ooops.. Please retry";
      
      // Через 1 секунду возвращаем исходный текст
      setTimeout(function () {
        document.getElementById(id).innerHTML = setValue;
      }, 1000);
    });
}
