const db = require('./db');
const jwt = require('jsonwebtoken');

const registroUsuario = (usuario, callback) => {
    const { correo_electronico, nombre_completo, password, telefono } = usuario;
    const sql = 'INSERT INTO usuario (correo_electronico, nombre_completo, password, telefono, ultimo_acceso) VALUES (?, ?, ?, ?, NOW())';
    db.query(sql, [correo_electronico, nombre_completo, password, telefono], callback);
};

const loginUsuario = (correo_electronico, password, callback) => {
    const sqlSelect = 'SELECT * FROM usuario WHERE correo_electronico = ? AND password = ?';
    const sqlUpdateUltimoAcceso = 'UPDATE usuario SET ultimo_acceso = NOW() WHERE correo_electronico = ?';

    db.beginTransaction(function (err) {
        if (err) {
            console.error('Error al iniciar transacción:', err.message);
            return callback(err, null);
        }

        db.query(sqlSelect, [correo_electronico, password], (err, results) => {
            if (err) {
                console.error('Error al buscar usuario:', err.message);
                return db.rollback(function () {
                    callback(err, null);
                });
            }

            if (results.length > 0) {
                const usuario = results[0];
                console.log('Usuario encontrado:', usuario);

                // Realiza la actualización del último acceso
                db.query(sqlUpdateUltimoAcceso, [correo_electronico], (err) => {
                    if (err) {
                        console.error('Error al actualizar último acceso:', err.message);
                        return db.rollback(function () {
                            callback(err, null);
                        });
                    }

                    // Commit la transacción
                    db.commit(function (err) {
                        if (err) {
                            console.error('Error al confirmar la transacción:', err.message);
                            return db.rollback(function () {
                                callback(err, null);
                            });
                        }

                        return callback(null, usuario);
                    });
                });
            } else {
                console.log('Usuario no encontrado');
                return callback(null, null);
            }
        });
    });
};


const insertarEmpresa = (empresa, callback) => {
    const { rut_empresa, nombre_empresa, direccion, telefono_empresa, usuario_correo, id_comuna, latitud, longitud } = empresa;
    const sql = 'INSERT INTO empresa (rut_empresa, nombre_empresa, direccion, telefono_empresa, usuario_correo, id_comuna,latitud,longitud) VALUES (?, ?, ?, ?, ?, ?, ?,?)';

    db.query(sql, [rut_empresa, nombre_empresa, direccion, telefono_empresa, usuario_correo, id_comuna, latitud, longitud], (err, results) => {
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
    const { nombre_producto, precio, img_producto, rut_empresa, id_categoria, stock } = producto;
    const sql = 'INSERT INTO producto (nombre_producto, precio, img_producto, rut_empresa, id_categoria,stock) VALUES (?, ?, ?, ?, ?,?)';
    db.query(sql, [nombre_producto, precio, img_producto, rut_empresa, id_categoria, stock], callback);
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

const obtenerTodosLosProductos = (req, res) => {
    let sqlQuery = 'SELECT * FROM producto'; // Consulta SQL para seleccionar todos los productos

    db.query(sqlQuery, (err, result) => {
        if (err) {
            console.error("Error al realizar la consulta: ", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        } else {
            // Mapea y convierte img_producto a Base64 para cada producto
            result.forEach(producto => {
                if (producto.img_producto) {
                    producto.img_producto = producto.img_producto.toString('utf-8');
                }
            });
            res.json(result);
        }
    });
};

const obtenerUsuarioPorCorreo = (correo_electronico, callback) => {
    const sql = 'SELECT * FROM usuario WHERE correo_electronico = ?';

    db.query(sql, [correo_electronico], (err, results) => {
        if (err) {
            console.error('Error al buscar usuario por correo electrónico:', err.message);
            return callback(err, null);
        }

        if (results.length > 0) {
            const usuario = results[0];
            console.log('Usuario encontrado por correo electrónico:', usuario);
            return callback(null, usuario);
        } else {
            console.log('Usuario no encontrado por correo electrónico');
            return callback(null, null);
        }
    });
};


const obtenerDetalleProducto = (idProducto, callback) => {
    const sql = `
      SELECT *
      FROM producto
      JOIN empresa ON empresa.rut_empresa = producto.rut_empresa
      WHERE producto.id_producto = ?`;

    db.query(sql, [idProducto], (err, results) => {
        if (err) {
            console.error('Error al obtener detalle del producto:', err.message);
            return callback(err, null);
        }

        if (results.length > 0) {
            const detalleProducto = results[0];

            // Ajusta la propiedad img_producto si existe
            if (detalleProducto.img_producto) {
                detalleProducto.img_producto = detalleProducto.img_producto.toString('utf-8');
            }

            console.log('Detalle del producto:', detalleProducto);
            return callback(null, detalleProducto);
        } else {
            console.log('Producto no encontrado');
            return callback(null, null);
        }
    });
};

const modificarUsuario = (req, res) => {
    const { correoElectronico, nombre, contraseña, telefono } = req.body;

    // Construir la consulta SQL para actualizar el usuario
    const sql = `
      UPDATE usuario
      SET nombre_completo = IFNULL(?, nombre_completo),
          password = IFNULL(?, password),
          telefono = IFNULL(?, telefono)
      WHERE correo_electronico = ?;
    `;

    // Ejecutar la consulta SQL
    db.query(sql, [nombre, contraseña, telefono, correoElectronico], (err, result) => {
        if (err) {
            console.error('Error al modificar usuario:', err.message);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (result.affectedRows === 0) {
            // Si no se encuentra el usuario, enviar una respuesta de "no encontrado"
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        // Usuario modificado con éxito
        return res.json({ mensaje: 'Usuario modificado con éxito' });
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
    obtenerTodosLosProductos,
    obtenerUsuarioPorCorreo,
    obtenerDetalleProducto,
    modificarUsuario,

};