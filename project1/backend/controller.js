const db = require('./db');
const jwt = require('jsonwebtoken');

const registroUsuario = (usuario, callback) => {
    const { correo_electronico, nombre_completo, password, telefono } = usuario;
    const sql = 'INSERT INTO usuario (correo_electronico, nombre_completo, password, telefono) VALUES (?, ?, ?, ?)'
    db.query(sql, [correo_electronico, nombre_completo, password, telefono], callback);

};

const loginUsuario = (correo_electronico, password, callback) => {
    const sql = 'SELECT * FROM usuario WHERE correo_electronico = ? AND password = ?';
    db.query(sql, [correo_electronico, password], (err, results) => {
        if (err) {
            console.error('Error al buscar usuario:', err.message);
            return callback(err, null);
        }

        if (results.length > 0) {
            const usuario = results[0];
            console.log('Usuario encontrado:', usuario);
            return callback(null, usuario);
        } else {
            console.log('Usuario no encontrado');
            return callback(null, null);
        }
    });
};

module.exports = {
    registroUsuario,
    loginUsuario
};