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
    document.getElementById('loading-overlay').style.display = 'flex';
    const emailInput = document.getElementById('email').value;
    const emailError = document.getElementById('email-error');

    if (!validarEmail(emailInput)) {
        emailError.style.display = 'block';
        document.getElementById('loading-overlay').style.display = 'none';
        return;
    }else{
        emailError.style.display = 'none';
    }

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
            document.getElementById('loading-overlay').style.display = 'none';
        }, function(error) {
            showPopup("Algo no ha ido como debía, vuelve a intentarlo más tarde");
            document.getElementById('loading-overlay').style.display = 'none';
        });
});

function validarEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

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
