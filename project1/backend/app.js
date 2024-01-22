const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { obtenerDetalleEmpresa, modificarEmpresa,modificarUsuario,obtenerDetalleProducto, obtenerUsuarioPorCorreo, obtenerProductosPorEmpresa, registroUsuario, loginUsuario, insertarEmpresa, obtenerComunas, agregarProducto, obtenerEmpresasPorUsuario, obtenerCategorias, obtenerTodosLosProductos } = require('./controller');
const app = express();
const PORT = 3000;
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // También para el formato 'x-www-form-urlencoded'
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors());


// post registro de usuario
app.post('/registro', (req, res) => {
    const nuevoUsuario = req.body;
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
    console.log(correo_electronico, password)
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
app.post('/empresa', (req, res) => {
    const nuevaEmpresa = req.body;

    insertarEmpresa(nuevaEmpresa, (err, result) => {
        if (err) {
            console.error('Error al insertar la empresa:', err.message);
            return res.status(500).send('Error interno del servidor');
        }

        console.log('Empresa registrada con éxito');
        res.status(200).send('Empresa registrada con éxito');
    });
});

app.get('/comunas', (req, res) => {
    obtenerComunas((err, comunas) => {
        if (err) {
            console.error('Error al obtener comunas:', err.message);
            return res.status(500).send('Error interno del servidor');
        }

        res.json(comunas);
    });
});

app.post('/producto', (req, res) => {
    agregarProducto(req.body, (err, result) => {
        if (err) {
            console.error('Error al agregar producto:', err.message);
            return res.status(500).send('Error interno del servidor');
        }

        res.status(200).send('Producto agregado con éxito');
    });
});

app.get('/empresas/:usuarioCorreo', (req, res) => {
    obtenerEmpresasPorUsuario(req.params.usuarioCorreo, (err, empresas) => {
        if (err) {
            console.error('Error al obtener empresas:', err.message);
            return res.status(500).send('Error interno del servidor');
        }

        res.json(empresas);
    });
});

app.get('/categoria_producto', (req, res) => {
    obtenerCategorias((err, categoria) => {
        if (err) {
            console.error('Error al obtener comunas:', err.message);
            return res.status(500).send('Error interno del servidor');
        }

        res.json(categoria);
    });
});

app.get('/productos/:rut_empresa', (req, res) => {
    obtenerProductosPorEmpresa(req, res);
});

app.get('/productos', obtenerTodosLosProductos);

app.get('/usuario/:correo_electronico', (req, res) => {
    const correo_electronico = req.params.correo_electronico;

    obtenerUsuarioPorCorreo(correo_electronico, (err, usuario) => {
        if (err) {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (usuario) {
            return res.json(usuario);
        } else {
            return res.status(404).json({ mensaje: 'Usuario no encontrado por correo electrónico' });
        }
    });
});


app.get('/detalle-productos/:usuarioCorreo', (req, res) => {
    const usuarioCorreo = req.params.usuarioCorreo;

    // Llama a la función obtenerDetalleProductosPorEmpresa y maneja la respuesta
    obtenerDetalleProductosPorEmpresa(usuarioCorreo, (err, detallesProductos) => {
        if (err) {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (detallesProductos.length > 0) {
            return res.json(detallesProductos);
        } else {
            return res.status(404).json({ mensaje: 'No se encontraron detalles de productos para la empresa' });
        }
    });
});

app.get('/producto/:idProducto', (req, res) => {
    // Obtiene el ID del producto desde la URL utilizando req.params
    const idProducto = req.params.idProducto;

    // Llama a la función del controlador para obtener el detalle del producto
    obtenerDetalleProducto(idProducto, (err, detalleProducto) => {
        if (err) {
            // Manejo de errores
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (detalleProducto) {
            // Si se encuentra el detalle del producto, envía la respuesta en formato JSON
            return res.json(detalleProducto);
        } else {
            // Si no se encuentra el producto, envía una respuesta de "no encontrado"
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
    });
});

app.post('/modificar-usuario', modificarUsuario);

app.put('/modificar-empresa', (req, res) => {
    const empresa = req.body;

    // Llama a la función del controlador para modificar la empresa
    modificarEmpresa(empresa, (err, result) => {
        if (err) {
            console.error('Error al modificar la empresa:', err.message);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Empresa no encontrada' });
        }

        // Empresa modificada con éxito
        return res.json({ mensaje: 'Empresa modificada con éxito' });
    });
});


app.get('/detalle-empresa/:rut_empresa', (req, res) => {
    const rutEmpresa = req.params.rut_empresa;

    // Llama a la función del controlador
    obtenerDetalleEmpresa(rutEmpresa, (err, empresa) => {
        if (err) {
            console.error("Error al obtener detalle de la empresa:", err);
            return res.status(500).json({ error: "Error interno del servidor" });
        }

        if (empresa) {
            // Si se encuentra la empresa, envía la respuesta en formato JSON
            res.json(empresa);
        } else {
            // Si no se encuentra la empresa, envía una respuesta de "no encontrada"
            res.status(404).json({ mensaje: "No se encontró la empresa especificada" });
        }
    });
});


app.get('/ruta-protegida', verificarToken, (req, res) => {
    res.json({ mensaje: 'Ruta protegida' });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});




