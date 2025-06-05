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
    
    // Crear cubo explosivo
    const explodedCube = document.getElementById('exploded-cube');
    const cubeSize = 3; // Cubo 3x3x3
    
    // Colores para cada cara
    const faceColors = {
        front: 'red',
        back: 'orange',
        top: 'white',
        bottom: 'yellow',
        left: 'green',
        right: 'blue'
    };
    
    // Crear las piezas del cubo
    for (let z = 0; z < cubeSize; z++) {
        for (let y = 0; y < cubeSize; y++) {
            for (let x = 0; x < cubeSize; x++) {
                // Solo crear piezas visibles (no el núcleo)
                if (x === 1 && y === 1 && z === 1) continue;
                
                const piece = document.createElement('div');
                piece.className = 'cube-piece';
                
                // Posición inicial (centro del cubo)
                piece.style.transform = `translate3d(${(x - 1) * 60}px, ${(y - 1) * 60}px, ${(z - 1) * 60}px)`;
                
                const pieceInner = document.createElement('div');
                pieceInner.className = 'piece-inner';
                piece.appendChild(pieceInner);
                
                // Crear las caras visibles de la pieza
                if (x === 0) createFace(pieceInner, 'left', faceColors.left);
                if (x === cubeSize - 1) createFace(pieceInner, 'right', faceColors.right);
                if (y === 0) createFace(pieceInner, 'top', faceColors.top);
                if (y === cubeSize - 1) createFace(pieceInner, 'bottom', faceColors.bottom);
                if (z === 0) createFace(pieceInner, 'front', faceColors.front);
                if (z === cubeSize - 1) createFace(pieceInner, 'back', faceColors.back);
                
                explodedCube.appendChild(piece);
            }
        }
    }
    
    // Función para crear una cara de una pieza
    function createFace(container, faceClass, color) {
        const face = document.createElement('div');
        face.className = `piece-face ${faceClass}`;
        
        // Crear los stickers
        for (let i = 0; i < 9; i++) {
            const sticker = document.createElement('div');
            sticker.className = `piece-sticker ${color}`;
            face.appendChild(sticker);
        }
        
        // Posicionar la cara
        switch(faceClass) {
            case 'front': face.style.transform = 'translateZ(30px)'; break;
            case 'back': face.style.transform = 'rotateY(180deg) translateZ(30px)'; break;
            case 'top': face.style.transform = 'rotateX(90deg) translateZ(30px)'; break;
            case 'bottom': face.style.transform = 'rotateX(-90deg) translateZ(30px)'; break;
            case 'left': face.style.transform = 'rotateY(-90deg) translateZ(30px)'; break;
            case 'right': face.style.transform = 'rotateY(90deg) translateZ(30px)'; break;
        }
        
        container.appendChild(face);
    }
    
    // Animación de explosión con retraso
    setTimeout(() => {
        const pieces = document.querySelectorAll('.cube-piece');
        pieces.forEach(piece => {
            // Posición aleatoria para la explosión
            const tx = (Math.random() - 0.5) * 800;
            const ty = (Math.random() - 0.5) * 800;
            const tz = (Math.random() - 0.5) * 800;
            
            // Rotación aleatoria
            const rx = Math.random() * 360;
            const ry = Math.random() * 360;
            const rz = Math.random() * 360;
            
            // Escala aleatoria
            const scale = 0.8 + Math.random() * 0.4;
            
            // Aplicar transformación con animación
            piece.style.transition = 'all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            piece.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${scale})`;
            
            // Crear partículas de explosión
            createExplosionParticles(piece.getBoundingClientRect());
            
            // Crear estela de movimiento
            createPieceTrail(piece);
        });
        
        // Crear efecto de explosión visual
        createBigExplosion();
    }, 1500);
    
    // Crear partículas de explosión para una pieza
    function createExplosionParticles(rect) {
        const particleCount = 10;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'explosion-particle';
            
            // Posición inicial (centro de la pieza)
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            particle.style.left = `${centerX}px`;
            particle.style.top = `${centerY}px`;
            
            // Color aleatorio
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = color;
            particle.style.boxShadow = `0 0 10px ${color}`;
            
            // Tamaño aleatorio
            const size = 4 + Math.random() * 8;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            // Dirección aleatoria
            const angle = Math.random() * Math.PI * 2;
            const velocity = 1 + Math.random() * 3;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            // Animación
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${vx * 100}px, ${vy * 100}px) scale(0.2)`, opacity: 0 }
            ], {
                duration: 800 + Math.random() * 1000,
                easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
            });
            
            document.body.appendChild(particle);
            
            // Eliminar partícula después de la animación
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
    }
    
    // Crear una gran explosión en el centro
    function createBigExplosion() {
        const explosion = document.createElement('div');
        explosion.style.position = 'fixed';
        explosion.style.width = '200px';
        explosion.style.height = '200px';
        explosion.style.borderRadius = '50%';
        explosion.style.background = 'radial-gradient(circle, rgba(255,215,0,0.8) 0%, rgba(255,65,54,0) 70%)';
        explosion.style.left = '50%';
        explosion.style.top = '50%';
        explosion.style.transform = 'translate(-50%, -50%) scale(0)';
        explosion.style.zIndex = '5';
        explosion.style.pointerEvents = 'none';
        explosion.style.filter = 'blur(10px)';
        
        document.body.appendChild(explosion);
        
        // Animación de explosión
        explosion.animate([
            { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
            { transform: 'translate(-50%, -50%) scale(3)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });
        
        // Eliminar después de la animación
        setTimeout(() => {
            explosion.remove();
        }, 1000);
    }
    
    // Crear estela para las piezas voladoras
    function createPieceTrail(piece) {
        let lastX, lastY;
        const trailInterval = setInterval(() => {
            const rect = piece.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            if (lastX !== undefined) {
                const distance = Math.sqrt(Math.pow(centerX - lastX, 2) + Math.pow(centerY - lastY, 2));
                if (distance > 5) {
                    const trail = document.createElement('div');
                    trail.className = 'piece-trail';
                    
                    // Posición entre la posición actual y la anterior
                    trail.style.left = `${(centerX + lastX) / 2}px`;
                    trail.style.top = `${(centerY + lastY) / 2}px`;
                    
                    // Tamaño basado en la velocidad
                    const size = Math.min(10, distance / 5);
                    trail.style.width = `${size}px`;
                    trail.style.height = `${size}px`;
                    
                    // Color aleatorio
                    const color = colors[Math.floor(Math.random() * colors.length)];
                    trail.style.background = color;
                    
                    document.body.appendChild(trail);
                    
                    // Animación de desvanecimiento
                    trail.animate([
                        { opacity: 0.7 },
                        { opacity: 0 }
                    ], {
                        duration: 600,
                        easing: 'ease-out'
                    });
                    
                    // Eliminar después de la animación
                    setTimeout(() => {
                        trail.remove();
                    }, 600);
                }
            }
            
            lastX = centerX;
            lastY = centerY;
        }, 50);
        
        // Detener la creación de estela después de un tiempo
        setTimeout(() => {
            clearInterval(trailInterval);
        }, 1500);
    }
});