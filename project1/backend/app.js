const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { registroUsuario,loginUsuario } = require('./controller');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// post registro de usuario
app.post('/registro', (req, res) => {
    const nuevoUsuario = req.body;
    console.log("hola");
    registroUsuario(nuevoUsuario, (err, result) => {
        if (err) {
            console.error('Error al insertar el usuario:', err.message);
            return res.status(500).send('Error interno del servidor');
        }

        console.log('Usuario registrado con éxito');
        res.status(200).send('Usuario registrado con éxito');
    });
});

app.post('/login', (req, res) => {
    const { correo_electronico, password } = req.body;
    console.log(correo_electronico , password)
    // Lógica para verificar las credenciales y generar un token
    loginUsuario(correo_electronico, password, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ mensaje: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ correo_electronico: user.correo_electronico }, 'secreto', { expiresIn: '1h' });
        res.json({ token });
    });
});

function verificarToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    jwt.verify(token, 'secreto', (err, decoded) => {
        if (err) {
            return res.status(401).json({ mensaje: 'Token inválido' });
        }

        req.usuario = decoded;
        next();
    });
}

app.get('/ruta-protegida', verificarToken, (req, res) => {
    res.json({ mensaje: 'Ruta protegida' });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
