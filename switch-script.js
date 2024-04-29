document.addEventListener('DOMContentLoaded', function() {
    var toggleSwitch = document.getElementById('toggleSwitch');
    toggleSwitch.addEventListener('change', function() {
        var status = toggleSwitch.checked ? 'ON' : 'OFF';
        document.getElementById("inftoggleSwitch").innerText = status;
    });
});