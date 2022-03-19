const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(3000, console.log('UP'));

const { nuevoCurso, getCursos, editCurso, deleteCurso } = require("./consultas");

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// 1. Crear una ruta POST /curso que reciba un payload desde el cliente con los datos de
// un nuevo curso y los ingrese a la tabla cursos.
app.post('/curso', async (req, res) => {
    const { nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    const respuesta = await nuevoCurso(nombre, nivelTecnico, fechaInicio, duracion);
    res.send(respuesta)
});

// 2. Crear una ruta GET /cursos que consulte y devuelva los registros almacenados en la
// tabla cursos.
app.get('/cursos', async (req, res) => {
    const respuesta = await getCursos();
    res.send(respuesta)
});

app.put('/curso', async (req, res) => {
    const { id, nombre, nivelTecnico, fechaInicio, duracion } = req.body;
    const respuesta = await editCurso(id, nombre, nivelTecnico, fechaInicio, duracion);
    res.send(respuesta)
})

// 4. Crear una ruta DELETE /cursos que reciba el id de un curso como parámetro de la
// ruta y elimine el registro relacionado en la tabla cursos.
app.delete('/curso/:id', async (req, res) => {
    const { id } = req.params;
    const respuesta = await deleteCurso(id);
    respuesta > 0
    ? res.send(`El canal de id ${id} fue eliminado con exito`)
    : res.send("No existe un canal con ese id")
});