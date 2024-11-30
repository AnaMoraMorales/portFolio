function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

function updateExperienceDates() {
    const startDate = new Date(2024, 5);
    const now = new Date();
    const diffTime = Math.abs(now - startDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);
    const remainingDays = diffDays % 30;
    const formattedTime = `${diffMonths} mes${diffMonths > 1 ? 'es' : ''}, ${remainingDays} día${remainingDays > 1 ? 's' : ''}`;
    document.getElementById('custom-software-date').innerText = `actualidad (${formattedTime})`;
}
setInterval(updateExperienceDates, 60 * 1000);
updateExperienceDates();

// EmailJS integration
(function() {
    emailjs.init("G-zCL-WjetcxTIzY3");
})();

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const params = {
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        mensaje: document.getElementById("mensaje").value
    };

    emailjs.send("service_ffcm5b6","template_3mdp9ci", params)
        .then(function(response) {
            alert("Mensaje enviado exitosamente!");
        }, function(error) {
            alert("Error al enviar el mensaje: " + error.text);
        });
});
