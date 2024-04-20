import cloudinary from "cloudinary";
import { PrismaClient } from "@prisma/client";

cloudinary.config({
  cloud_name: "dpsmuwsae",
  api_key: "911168556997222",
  api_secret: "p1RO5ghUpobxbSDjPqW6opCQx1c",
});

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    try {
      const { id } = req.body;

      // Verificar si productId está presente en el cuerpo de la solicitud
      if (!id) {
        return res
          .status(400)
          .json({ error: "Se requiere el ID del producto." });
      }

      // Buscar el producto en la base de datos utilizando Prisma
      const producto = await prisma.producto.findUnique({
        where: {
          id: parseInt(id),
        },
      });

      // Verificar si el producto existe
      if (!producto) {
        return res.status(404).json({ error: "El producto no existe." });
      }
      console.log(producto);
      if(!producto.imagenId || producto.imagenId !== ""){
          // Eliminar la imagen de Cloudinary
          await cloudinary.uploader.destroy(producto.imagenId);
      }
      // Eliminar el producto de la base de datos utilizando Prisma
      await prisma.producto.delete({
        where: {
          id: parseInt(id),
        },
      });

      // Respondemos con éxito
      res.status(200).json({ message: "Producto eliminado con éxito." });
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
      res
        .status(500)
        .json({ error: "Hubo un error al procesar la solicitud." });
    }
  }else{
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Método ${req.method} no permitido.` });
  }
}
