// var connection = new WebSocket('ws://' + "192.168.4.1" + ':81/', ['arduino']);
//         connection.onopen = function () {
//             connection.send('Connect ' + new Date());
//         };
//         connection.onerror = function (error) {
//             console.log('WebSocket Error ', error);
//             alert('WebSocket Error ', error);
//         };
//         connection.onmessage = function (e) {
//             console.log('Server: ', e.data);
//         };

//         function send(x,y,speed,angle){
//             var data = {"x":x,"y":y,"speed":speed,"angle":angle};
//             data = JSON.stringify(data);
//             console.log(data);
//             connection.send(data);
//         }


var canvas, ctx;
        var containerWidth = 300; // Ширина контейнера
        var containerHeight = 250; // Висота контейнера

        window.addEventListener('load', () => {
            canvas = document.getElementById('canvas');
            ctx = canvas.getContext('2d');          
            resize(); 

            canvas.addEventListener('mousedown', startDrawing);
            canvas.addEventListener('mouseup', stopDrawing);
            canvas.addEventListener('mousemove', Draw);

            canvas.addEventListener('touchstart', startDrawing);
            canvas.addEventListener('touchend', stopDrawing);
            canvas.addEventListener('touchcancel', stopDrawing);
            canvas.addEventListener('touchmove', Draw);

            window.addEventListener('resize', resize);

            document.getElementById("x_coordinate").innerText = 0;
            document.getElementById("y_coordinate").innerText = 0;
            document.getElementById("speed").innerText = 0;
            document.getElementById("angle").innerText = 0;
        });

        var width, height, radius, x_orig, y_orig;
        function resize() {
            // Задаємо фіксовані розміри canvas
            canvas.width = containerWidth;
            canvas.height = containerHeight;

            radius = 40;
            width = canvas.width;
            height = canvas.height;
            background();
            // Розміщуємо джойстик у центрі контейнера
            joystick(containerWidth / 2, containerHeight / 2);
        }

        function background() {
            x_orig = width / 2;
            y_orig = height / 2;

            ctx.beginPath();
            ctx.arc(x_orig, y_orig, radius + 40, 0, Math.PI * 2, true);
            ctx.fillStyle = '#ECE5E5';
            ctx.fill();
        }

        function joystick(width, height) {
            ctx.beginPath();
            ctx.arc(width, height, radius, 0, Math.PI * 2, true);
            ctx.fillStyle = '#45a049';
            ctx.fill();
            ctx.strokeStyle = '#4CAF50';
            ctx.lineWidth = 8;
            ctx.stroke();
        }

        let coord = { x: 0, y: 0 };
        let paint = false;

        function getPosition(event) {
            var rect = canvas.getBoundingClientRect();
            coord.x = event.clientX - rect.left;
            coord.y = event.clientY - rect.top;
        }

        function is_it_in_the_circle() {
            var current_radius = Math.sqrt(Math.pow(coord.x - x_orig, 2) + Math.pow(coord.y - y_orig, 2));
            if (radius >= current_radius) return true;
            else return false;
        }

        function startDrawing(event) {
            getPosition(event);
            if (is_it_in_the_circle()) {
                paint = true;
                Draw();
            }
        }

        function stopDrawing() {
            paint = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            background();
            // Розміщуємо джойстик у центрі контейнера після закінчення малювання
            joystick(containerWidth / 2, containerHeight / 2);
            document.getElementById("x_coordinate").innerText = 0;
            document.getElementById("y_coordinate").innerText = 0;
            document.getElementById("speed").innerText = 0;
            document.getElementById("angle").innerText = 0;
        }

        function Draw(event) {
            if (paint) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                background();
                var angle_in_degrees, x, y, speed;
                var angle = Math.atan2((coord.y - y_orig), (coord.x - x_orig));

                if (Math.sign(angle) == -1) {
                    angle_in_degrees = Math.round(-angle * 180 / Math.PI);
                }
                else {
                    angle_in_degrees = Math.round(360 - angle * 180 / Math.PI);
                }

                if (is_it_in_the_circle()) {
                    joystick(coord.x, coord.y);
                    x = coord.x;
                    y = coord.y;
                }
                else {
                    x = radius * Math.cos(angle) + x_orig;
                    y = radius * Math.sin(angle) + y_orig;
                    joystick(x, y);
                }

                getPosition(event);

                var speed = Math.round(100 * Math.sqrt(Math.pow(x - x_orig, 2) + Math.pow(y - y_orig, 2)) / radius);

                var x_relative = Math.round(x - x_orig);
                var y_relative = Math.round(y - y_orig);

                document.getElementById("x_coordinate").innerText = x_relative;
                document.getElementById("y_coordinate").innerText = y_relative;
                document.getElementById("speed").innerText = speed;
                document.getElementById("angle").innerText = angle_in_degrees;

                // send(x_relative, y_relative, speed, angle_in_degrees);
            }
        }