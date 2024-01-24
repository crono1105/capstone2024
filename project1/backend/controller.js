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
    const { nombre_producto, precio, img_producto, rut_empresa, id_categoria, stock, descripcion } = producto;
    const sql = 'INSERT INTO producto (nombre_producto, precio, img_producto, rut_empresa, id_categoria,stock,descripcion) VALUES (?, ?, ?, ?, ?,?,?)';
    db.query(sql, [nombre_producto, precio, img_producto, rut_empresa, id_categoria, stock, descripcion], callback);
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
    let sqlQuery = 'SELECT * FROM producto JOIN empresa ON empresa.rut_empresa = producto.rut_empresa JOIN categoria_producto ON categoria_producto.id_categoria = producto.id_categoria JOIN comuna ON empresa.id_comuna = comuna.id_comuna'; // Consulta SQL para seleccionar todos los productos

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
      JOIN categoria_producto ON producto.id_categoria = categoria_producto.id_categoria
      JOIN comuna ON comuna.id_comuna = empresa.id_comuna
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

const modificarEmpresa = (empresa, callback) => {
    const { rut_empresa, direccion, latitud, longitud, telefono_empresa, id_comuna } = empresa;
    const sql = `
        UPDATE empresa
        SET direccion = ?,
            latitud = ?,
            longitud = ?,
            telefono_empresa = ?,
            id_comuna = ?
        WHERE rut_empresa = ?;
    `;

    db.query(sql, [direccion, latitud, longitud, telefono_empresa, id_comuna, rut_empresa], (err, result) => {
        if (err) {
            return callback(err, null);
        }

        callback(null, result);
    });
};

const obtenerDetalleEmpresa = (rutEmpresa, callback) => {
    const sql = 'SELECT * FROM empresa WHERE rut_empresa = ?';
    db.query(sql, [rutEmpresa], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length > 0) {
            const empresa = results[0];
            return callback(null, empresa);
        } else {
            return callback(null, null);
        }
    });
};

const modificarProducto = (idProducto, productoModificado, callback) => {
    // Construye la consulta SQL para actualizar el producto
    const sqlQuery = 'UPDATE producto SET nombre_producto = ?, descripcion = ?, precio = ?, stock = ? WHERE id_producto = ?';

    // Ejecuta la consulta SQL con los datos proporcionados
    db.query(sqlQuery, [productoModificado.nombre_producto, productoModificado.descripcion, productoModificado.precio, productoModificado.stock, idProducto], (err, result) => {
        if (err) {
            console.error('Error al modificar el producto:', err.message);
            return callback(err, null);
        }

        // Verifica si se afectaron filas en la base de datos
        if (result.affectedRows === 0) {
            return callback(null, { mensaje: 'Producto no encontrado' });
        }

        // Producto modificado con éxito
        return callback(null, { mensaje: 'Producto modificado con éxito' });
    });
};


const obtenerActualizacionesPorProducto = (idProducto, callback) => {
    const sql = 'SELECT fecha_actualizacion, valor FROM actualizacion_producto WHERE id_producto = ?';

    db.query(sql, [idProducto], (err, results) => {
        if (err) {
            return callback(err, null);
        }

        return callback(null, results);
    });
};

function insertarValoracionProducto(req, res) {
    // Obtén el ID del producto y los datos de la valoración desde la solicitud
    const idProducto = req.params.id_producto;
    const { valoracion, comentario } = req.body;

    // Crea la consulta SQL para insertar la valoración
    const sql = 'INSERT INTO valoracion_producto (valoracion, comentario, id_producto) VALUES (?, ?, ?)';
    const values = [valoracion, comentario, idProducto];

    // Ejecuta la consulta SQL
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar la valoración:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
        } else {
            console.log('Valoración insertada con éxito');
            res.status(200).json({ mensaje: 'Valoración insertada con éxito' });
        }
    });
}

const obtenerResenasPorProducto = (idProducto, callback) => {
    const sql = 'SELECT * FROM valoracion_producto WHERE id_producto = ?';

    db.query(sql, [idProducto], (err, results) => {
        if (err) {
            return callback(err, null);
        }

        callback(null, results);
    });
};

const calcularPromedioValoracion = (idProducto, callback) => {
    const sql = 'SELECT calcularPromedioValoracion(?) AS promedio_valoracion';

    db.query(sql, [idProducto], (err, result) => {
        if (err) {
            return callback(err, null);
        }

        const promedioValoracion = result[0].promedio_valoracion;
        callback(null, promedioValoracion);
    });
};


function loginAdmin(correo_electronico, password, callback) {
    const query = 'SELECT * FROM admin WHERE correo_electronico = ? AND password = ?';
    db.query(query, [correo_electronico, password], (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results[0]); 
        }
    });
}
const insertarReporte = (idValoracion, estado, callback) => {
    const query = 'INSERT INTO reporte (id_valoracion, estado) VALUES (?, ?)';
    db.query(query, [idValoracion, estado], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
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
    modificarEmpresa,
    obtenerDetalleEmpresa,
    modificarProducto,
    obtenerActualizacionesPorProducto,
    insertarValoracionProducto,
    obtenerResenasPorProducto,
    calcularPromedioValoracion,
    loginAdmin,
    insertarReporte,
};