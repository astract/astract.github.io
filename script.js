// Функция создаёт два случайных цвета и устанавливает их как градиент
function createGradientByRGB() {
    // Получаем корень страницы (где хранятся CSS-переменные)
    let root = document.documentElement;

    // Массив для хранения двух цветов (в формате #rrggbb)
    let colors = [];

    // Генерируем два цвета
    for (let i = 0; i < 2; i++) {
        // Генерируем случайные значения от 0 до 255 для красного, зелёного и синего
        let r = Math.floor(Math.random() * 256);
        let g = Math.floor(Math.random() * 256);
        let b = Math.floor(Math.random() * 256);

        // Преобразуем в шестнадцатеричную систему (например, 'ff')
        let rHex = r.toString(16).padStart(2, '0'); // если однозначное — добавим 0 спереди
        let gHex = g.toString(16).padStart(2, '0');
        let bHex = b.toString(16).padStart(2, '0');

        // Собираем цвет и добавляем решётку (#)
        let color = '#' + rHex + gHex + bHex;

        // Добавляем цвет в массив
        colors.push(color);
    }

    // Устанавливаем цвета в CSS-переменные
    root.style.setProperty('--color_top', colors[0]);
    root.style.setProperty('--color_bottom', colors[1]);

    // Обновляем текст на экране (без # и в верхнем регистре)
    color_value_top.textContent = colors[0].substring(1).toUpperCase();
    color_value_bottom.textContent = colors[1].substring(1).toUpperCase();
}

// Функция копирует текст при клике
function copyHexValue(id) {
    // Находим элемент по id
    let element = document.getElementById(id);

    // Получаем текст из него (например, "FF5733")
    let textToCopy = element.textContent;

    // Копируем в буфер обмена
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            // Если успешно — пишем "Copied" на 0.3 секунды
            element.textContent = "Copied";
            setTimeout(() => {
                element.textContent = textToCopy;
            }, 300);
        })
        .catch(err => {
            // Если ошибка — показываем сообщение на 1 секунду
            element.textContent = "Ошибка";
            setTimeout(() => {
                element.textContent = textToCopy;
            }, 1000);
        });
}
