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

const insertarEmpresa = (empresa, callback) => {
    const { rut_empresa, nombre_empresa, direccion, mapa, telefono_empresa, usuario_correo, id_comuna } = empresa;
    const sql = 'INSERT INTO empresa (rut_empresa, nombre_empresa, direccion, mapa, telefono_empresa, usuario_correo, id_comuna) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    db.query(sql, [rut_empresa, nombre_empresa, direccion, mapa, telefono_empresa, usuario_correo, id_comuna], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const obtenerComunas = (callback) => {
    const sql = 'SELECT * FROM comuna';
    db.query(sql, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

module.exports = {
    registroUsuario,
    loginUsuario,
    insertarEmpresa,
    obtenerComunas
};