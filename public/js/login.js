// Menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const navList = document.getElementById('nav-list');
    
    menuIcon.addEventListener('click', function() {
        navList.classList.toggle('active');
    });
    
    // Crear cubos flotantes de fondo
    const floatingContainer = document.getElementById('floating-cubes');
    const colors = ['#ff4136', '#0074d9', '#2ecc40', '#ffdc00', '#ff851b', '#ffffff'];
    
    for (let i = 0; i < 30; i++) {
        const cube = document.createElement('div');
        cube.classList.add('floating-cube');
        
        // Tamaño aleatorio
        const size = Math.random() * 30 + 10;
        cube.style.width = `${size}px`;
        cube.style.height = `${size}px`;
        
        // Color aleatorio
        const color = colors[Math.floor(Math.random() * colors.length)];
        cube.style.backgroundColor = color;
        
        // Posición inicial aleatoria
        cube.style.left = `${Math.random() * 100}%`;
        cube.style.top = `${Math.random() * 100}%`;
        
        // Animación con retraso aleatorio
        cube.style.animationDelay = `${Math.random() * 15}s`;
        
        floatingContainer.appendChild(cube);
    }
    
    // Manejo del formulario
    const loginForm = document.getElementById('formulario-login');
    const errorMessage = document.getElementById('mensaje-error');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Validación simple
        if (!email || !password) {
            errorMessage.textContent = 'Por favor, completa todos los campos';
            errorMessage.style.display = 'block';
            return;
        }
        
        if (!validateEmail(email)) {
            errorMessage.textContent = 'Por favor, ingresa un correo electrónico válido';
            errorMessage.style.display = 'block';
            return;
        }
        
        // Simulación de inicio de sesión exitoso
        errorMessage.style.display = 'none';
        alert('¡Inicio de sesión exitoso! Redirigiendo...');
        // Aquí normalmente redirigiríamos al usuario
    });
    
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});