import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    try {
      const { nombre, icono, imagenId } = req.body;

      if (!nombre || !icono) {
        return res
          .status(400)
          .json({ error: "Todos los campos son obligatorios" });
      }

      const nuevaCategoria = await prisma.categoria.create({
        data: {
          nombre,
          icono,
          imagenId,
        },
      });
      // Respondemos con el producto creado
      return res
        .status(201)
        .json({
          message: "Categoria creada con éxito.",
          categoria: nuevaCategoria,
        });
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      res
        .status(500)
        .json({ error: "Hubo un error al procesar la solicitud." });
    }
  } else {
    const categorias = await prisma.categoria.findMany({
      include: {
        productos: true,
      },
    });
    return res.status(200).json(categorias);
  }
}
