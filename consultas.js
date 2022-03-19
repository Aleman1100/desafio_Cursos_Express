const { Pool } = require('pg');
const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    password: 'postgres',
    database: 'cursos',
    port: 5432,
});

// 1. Crear una ruta POST /curso que reciba un payload desde el cliente con los datos de
// un nuevo curso y los ingrese a la tabla cursos.
async function nuevoCurso(nombre, nivelTecnico, fechaInicio, duracion) {
    try {
        const result = await pool.query(
            `INSERT INTO cursos (nombre, nivel, fecha, duracion) values ('${nombre}','${nivelTecnico}','${fechaInicio}','${duracion}') RETURNING *`            
        );
        return result.rows;
    } catch(e){
        return e;
    }
}

// 2. Crear una ruta GET /cursos que consulte y devuelva los registros almacenados en la
// tabla cursos.
async function getCursos() {
    try {
        const result = await pool.query(`SELECT * FROM cursos`);
        return result.rows;
    } catch (e) {
        return e;
    }
}

async function editCurso(id, nombre, nivelTecnico, fechaInicio, duracion){
    try {
        const res = await pool.query(
            `UPDATE cursos SET nombre = '${nombre}', 
            nivel = '${nivelTecnico}',
            fecha = '${fechaInicio}',
            duracion = '${duracion}'  WHERE id = '${id}' RETURNING *`    
        );
        return res.rows;
    } catch (e) {
        console.log(e)
    }
}

// 4. Crear una ruta DELETE /cursos que reciba el id de un curso como parámetro de la
// ruta y elimine el registro relacionado en la tabla cursos.
async function deleteCurso(id){
    try {
        const result = await pool.query(`DELETE FROM cursos WHERE id = '${id}'`);
        return result.rowCount;
    } catch (e){
        return e;
    }
}


module.exports = {
    nuevoCurso,
    getCursos,
    editCurso,
    deleteCurso
};