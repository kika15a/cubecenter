
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
    
    // Cronómetro
    const timerDisplay = document.getElementById('timer');
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const resetBtn = document.getElementById('reset-btn');
    const timerStatus = document.getElementById('timer-status');
    
    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;
    
    function startTimer() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(updateTimer, 10);
            isRunning = true;
            timerStatus.textContent = "CRONOMETRANDO";
            timerStatus.classList.remove('paused');
            timerStatus.classList.add('active');
            startBtn.innerHTML = '<i class="fas fa-pause"></i> Pausar';
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            timerStatus.textContent = "PAUSADO";
            timerStatus.classList.remove('active');
            timerStatus.classList.add('paused');
            startBtn.innerHTML = '<i class="fas fa-play"></i> Continuar';
        }
    }
    
    function stopTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        elapsedTime = 0;
        updateDisplay();
        timerStatus.textContent = "DETENIDO";
        timerStatus.classList.remove('active', 'paused');
        startBtn.innerHTML = '<i class="fas fa-play"></i> Iniciar';
    }
    
    function resetTimer() {
        clearInterval(timerInterval);
        isRunning = false;
        elapsedTime = 0;
        updateDisplay();
        timerStatus.textContent = "REINICIADO";
        timerStatus.classList.remove('active', 'paused');
        startBtn.innerHTML = '<i class="fas fa-play"></i> Iniciar';
        
        // Animación de reinicio
        timerStatus.style.animation = 'none';
        setTimeout(() => {
            timerStatus.style.animation = 'pulse 0.5s';
            setTimeout(() => {
                timerStatus.style.animation = 'none';
                timerStatus.textContent = "LISTO";
            }, 500);
        }, 10);
    }
    
    function updateTimer() {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }
    
    function updateDisplay() {
        const milliseconds = Math.floor(elapsedTime % 1000);
        const seconds = Math.floor((elapsedTime / 1000) % 60);
        const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
        
        timerDisplay.textContent = 
            `${padTime(minutes)}:${padTime(seconds)}:${padTime(Math.floor(milliseconds / 10))}`;
    }
    
    function padTime(value) {
        return value.toString().padStart(2, '0');
    }
    
    // Event listeners para botones
    startBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimer);
    
    // Event listeners para teclado y mouse
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault(); // Prevenir scroll de página
            startTimer();
        }
    });
    
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault(); // Prevenir menú contextual
        startTimer();
    });
    
    // Animación para el estado del cronómetro
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
});