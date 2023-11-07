import DatosPersonales from '../models/DatosPersonales.js';


class DatosPersonalesController {
  async create(req, res) {
    try {
      const { rut, nombre, valorUF, plazoCuota, total } = req.body;
      const datosPersonales = await DatosPersonales.create({
        rut,
        nombre,
        valorUF,
        plazoCuota,
        total,
      });
      res.status(201).json({ message: 'Datos personales guardados exitosamente', datosPersonales });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al guardar los datos personales' });
    }
  }
}

export default DatosPersonalesController;
