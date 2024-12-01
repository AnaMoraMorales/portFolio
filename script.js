function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
    if (sectionId === 'contacto') return;
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
    emailjs.init("YFvfVttKzaKlqQI1L");
})();

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    event.stopPropagation();

    const params = {
        nombre: document.getElementById("nombre").value,
        email: document.getElementById("email").value,
        mensaje: document.getElementById("mensaje").value,
        reply_to: document.getElementById("email").value
    };

    emailjs.send("service_ffcm5b6", "template_3mdp9ci", params)
        .then(function(response) {
            showPopup("Mensaje enviado exitosamente!");
            document.getElementById('nombre').value = '';
            document.getElementById('email').value = '';
            document.getElementById('mensaje').value = '';
        }, function(error) {
            showPopup("Algo no ha ido como debía, vuelve a intentarlo más tarde");
        });
});

function showPopup(message) {
    const popup = document.createElement('div');
    popup.classList.add('popup-message');
    popup.innerText = message;
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add('fade-out');
        popup.addEventListener('transitionend', () => {
            popup.remove();
        });
    }, 3000);
} 
