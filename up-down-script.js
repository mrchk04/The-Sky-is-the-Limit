var upButton = document.getElementById("upButton");
        var downButton = document.getElementById("downButton");

        // Додавання обробника подій для кнопок
        upButton.addEventListener("click", function() {
            move("up"); // Виклик функції move з аргументом "up"
        });

        downButton.addEventListener("click", function() {
            move("down"); // Виклик функції move з аргументом "down"
        });

        // Функція для переміщення вгору або вниз
        function move(direction) {
            if (direction === "up") {
                // Код для переміщення вгору
                console.log("Moving up");
            } else if (direction === "down") {
                // Код для переміщення вниз
                console.log("Moving down");
            }
        }