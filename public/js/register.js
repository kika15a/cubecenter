
document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
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
    
    // Toggle password visibility
    const togglePassword = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    
    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        // Cambiar icono
        const eyeIcon = togglePassword.querySelector('i');
        if (type === 'password') {
            eyeIcon.classList.remove('fa-eye-slash');
            eyeIcon.classList.add('fa-eye');
        } else {
            eyeIcon.classList.remove('fa-eye');
            eyeIcon.classList.add('fa-eye-slash');
        }
    });
    
    // Form validation
    const registerForm = document.getElementById('register-form');
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
            return;
        }
        
        // Simulación de registro exitoso
        alert('¡Registro exitoso! Bienvenido a Cube Center.');
        
        // Reset form
        registerForm.reset();
    });
});
