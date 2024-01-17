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

const agregarProducto = (producto, callback) => {
    const { nombre_producto, precio, img_producto, rut_empresa, id_categoria } = producto;
    const sql = 'INSERT INTO producto (nombre_producto, precio, img_producto, rut_empresa, id_categoria) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nombre_producto, precio, img_producto, rut_empresa, id_categoria], callback);
};

const obtenerEmpresasPorUsuario = (correoUsuario, callback) => {
    const sql = 'SELECT * FROM empresa WHERE usuario_correo = ?';
    db.query(sql, [correoUsuario], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const obtenerCategorias = (callback) => {
    const sql = 'SELECT * FROM categoria_producto';
    db.query(sql, (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

const obtenerProductosPorEmpresa = (req, res) => {
    let rutEmpresa = req.params.rut_empresa;
    let sqlQuery = 'SELECT * FROM producto WHERE rut_empresa = ?';

    db.query(sqlQuery, [rutEmpresa], (err, result) => {
        if (err) {
            console.error("Error al realizar la consulta: ", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        } else if (result.length === 0) {
            return res.status(404).json({ mensaje: "No se encontraron productos para la empresa especificada" });
        } else {
            // Convierte el objeto Buffer a una cadena de caracteres
            result.forEach(producto => {
                if (producto.img_producto) {
                    producto.img_producto = producto.img_producto.toString('utf-8'); // Cambia utf-8 por la codificación adecuada si es diferente
                }
            });
            res.json(result);
        }
    });
};





module.exports = {
    registroUsuario,
    loginUsuario,
    insertarEmpresa,
    obtenerComunas,
    agregarProducto,
    obtenerEmpresasPorUsuario,
    obtenerCategorias,
    obtenerProductosPorEmpresa,
    
};