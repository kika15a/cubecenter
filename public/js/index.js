
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
    
    // Animación de los cubos al hacer hover
    const cubeCards = document.querySelectorAll('.cube-card');
    cubeCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const cube = this.querySelector('.cube');
            cube.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const cube = this.querySelector('.cube');
            cube.style.transition = 'transform 1s ease';
        });
    });
});
