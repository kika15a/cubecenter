const express = require('express');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de sesiones
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/roompecabezas', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'roompecabezas.html'));
});

app.get('/tiempos', (req, res) => {
    if (!req.session.user) {
        return res.status(401).send('Acceso no autorizado');
    }
    res.sendFile(path.join(__dirname, 'views', 'tiempos.html'));
});

app.get('/paginas', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'paginas.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'register.html'));
});

// Registro de usuario
app.post('/register', (req, res) => {
    const userData = {
        nombre: req.body.nombre,
        apodo: req.body.apodo,
        email: req.body.email,
        fecha_nacimiento: req.body.fecha_nacimiento,
        password: req.body.password
    };

    // Validar contraseña
    if (!/^[a-zA-Z0-9]+$/.test(userData.password)) {
        return res.status(400).send('La contraseña solo debe contener letras y números');
    }

    fs.readFile(path.join(__dirname, 'data', 'users.json'), (err, data) => {
        if (err && err.code !== 'ENOENT') {
            return res.status(500).send('Error del servidor');
        }

        const users = data && data.length ? JSON.parse(data) : [];
        
        // Verificar si el usuario ya existe
        if (users.some(user => user.email === userData.email)) {
            return res.status(400).send('El usuario ya existe');
        }

        users.push(userData);
        
        fs.writeFile(
            path.join(__dirname, 'data', 'users.json'),
            JSON.stringify(users, null, 2),
            (err) => {
                if (err) {
                    return res.status(500).send('Error al guardar usuario');
                }
                req.session.user = userData;
                res.redirect('/');
            }
        );
    });
});

// Login de usuario
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    fs.readFile(path.join(__dirname, 'data', 'users.json'), (err, data) => {
        if (err) {
            return res.status(500).send('Error del servidor');
        }
        
        const users = JSON.parse(data);
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            return res.status(401).send('Credenciales inválidas');
        }
        
        req.session.user = user;
        res.redirect('/');
    });
});

// Logout
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});