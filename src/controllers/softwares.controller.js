import {pool} from '../db.js'
//req = requiere > solicitud (cliente)
//res = results > respuesta (servidor)

// Obtener todos los medicamentos
export const getMedicamentos = async (req, res) => {
  try {
    const [results] = await pool.query("SELECT * FROM medicamentos")
    res.send(results)
  } catch {
    console.error("No se puede concretar GET")
    res.status(500).send("Error al obtener medicamentos")
  }
}

// Obtener medicamento por ID
export const getMedicamentoById = async (req, res) => {
  try{
    const querySQL = "SELECT * FROM medicamentos WHERE id = ?"
    const [results] = await pool.query(querySQL, [req.params.id])
    if(results.length == 0){
      return res.status(404).json({
        message: 'No eciste el ID'
      })
    }
    res.send(results[0])
  }catch{
    console.error("No se puede concretar GET")
  }
}

// Obtener por receta (S/N)
export const getMedicamentosPorReceta = async (req, res) => {
  try {
    const receta = req.params.receta
    const querySQL = "SELECT * FROM medicamentos WHERE receta = ?"
    const [results] = await pool.query(querySQL, [receta])
    res.send(results)
  } catch {
    console.error("No se puede concretar GET por receta")
  }
}

// Obtener por tipo
export const getMedicamentosPorTipo = async (req, res) => {
  try {
    const tipo = req.params.tipo
    const querySQL = "SELECT * FROM medicamentos WHERE tipo = ?"
    const [results] = await pool.query(querySQL, [tipo])
    res.send(results)
  } catch {
    console.error("No se puede concretar GET por tipo")
  }
}

// Crear nuevo medicamento
export const createMedicamento = async (req, res) => {
  try {
    let { tipo, nombre, nomcomercial, presentacion, receta, precio } = req.body;

    if (precio <= 0) {
      return res.send({
        status: false,
        message: "Precio no válido",
        id: null
      });
    }

    //esto convierte cadena vacía a NULL
    if (nomcomercial === '') {
      nomcomercial = null;
    }

    const querySQL = `
      INSERT INTO medicamentos (tipo, nombre, nomcomercial, presentacion, receta, precio)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [results] = await pool.query(querySQL, [tipo, nombre, nomcomercial, presentacion, receta, precio]);

    if (results.affectedRows == 0) {
      res.send({ status: false, message: "No se pudo registrar", id: null });
    } else {
      res.send({ status: true, message: "Registrado correctamente", id: results.insertId });
    }

  } catch {
    console.error("No se pudo concretar POST");
  }
};

// Actualizar medicamento
export const updateMedicamento = async (req, res) => {
  try {
    const id = req.params.id
    const { precio } = req.body

    if (precio <= 0) {
      return res.send({
        status: false,
        message: "Precio debe ser mayor a cero"
      })
    }

    const querySQL = `UPDATE medicamentos SET ? WHERE id = ?`
    const [results] = await pool.query(querySQL, [req.body, id])

    if (results.affectedRows == 0) {
      return res.status(404).json({ message: 'El ID no existe' })
    }

    res.send({ status: true, message: "Actualizado correctamente" })

  } catch {
    console.error("No se puede concretar PUT")
  }
}

// Eliminar medicamento
export const deleteMedicamento = async (req, res) => {
  try {
    const id = req.params.id;

    const [check] = await pool.query("SELECT receta FROM medicamentos WHERE id = ?", [id]);

    if (check.length === 0) {
      return res.status(404).json({
        message: 'El ID enviado no existe',
      });
    }

    //verificar si el medicamento tiene receta ('S') y no puede ser eliminado
    if (check[0].receta === 'S') {
      return res.status(400).json({
        message: "No se puede eliminar un medicamento con receta",
      });
    }

    //si el medicamento no tiene receta, continuar con la eliminación
    const [results] = await pool.query("DELETE FROM medicamentos WHERE id = ?", [id]);

    //verificar si se eliminó algo
    if (results.affectedRows === 0) {
      return res.status(404).json({
        message: 'El ID enviado no existe o no se pudo eliminar',
      });
    }

    res.json({ message: 'Eliminado correctamente' });

  } catch (error) {
    console.error("No se puede concretar DELETE", error);
    res.status(500).json({
      message: 'Error al intentar eliminar el medicamento',
    });
  }
}