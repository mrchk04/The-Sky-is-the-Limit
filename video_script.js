// Отримання доступу до веб-камери
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
    var videoElement = document.getElementById('webcam-video');
    // Встановлення відеопотоку з веб-камери як джерело для тегу <video>
    videoElement.srcObject = stream;
    })
    .catch(function(err) {
    console.error('Не вдалося отримати доступ до веб-камери:', err);
    });