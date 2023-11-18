import DatosCliente from "../models/DatosCliente.js";

export default class DatosClienteController {
  async create(req, res) {
    try {
      const { rut, nombre, valorUF, plazoCuota, total } = req.body;
      const datosCliente = await DatosCliente.create({
        rut,
        nombre,
        valorUF,
        plazoCuota,
        total,
      });
      res.status(201).json({
        message: "Datos del cliente guardados exitosamente",
        datosCliente,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al guardar los datos personales" });
    }
  }
}

// export default DatosClienteController;
