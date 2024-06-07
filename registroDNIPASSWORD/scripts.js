document.getElementById('registrationForm').addEventListener('submit', function(event) {
    
    var dni = document.getElementById('dni');
    console.log(dni.value);
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmPassword').value;
    var errorMessage = document.getElementById('errorMessage');
    
    if (password !== confirmPassword) {
        event.preventDefault();
        errorMessage.textContent = 'Las contraseñas no coinciden.';
    } else if (!dni.value.match(/^\d{8}[a-zA-Z]{1}$/)) {
        event.preventDefault();
        errorMessage.textContent = 'DNI incorrecto.';
    } else {
        alert('Formulario enviado correctamente!');
        errorMessage.textContent = '';
        setTimeout(() => {
        }, 100);
        
    }
});
