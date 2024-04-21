import { PrismaClient } from '@prisma/client';


export default async function handler(req, res) {
  const prisma = new PrismaClient();
  const { categoriaId } = req.query; // Obtener el ID de la categoría de la URL

  try {
    // Utilizar Prisma para obtener los productos de la categoría especificada
    const productos = await prisma.producto.findMany({
      where: {
        categoriaId: parseInt(categoriaId),
      },
    });

    // Devolver los productos encontrados
    res.status(200).json(productos);
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ error: 'Error buscando productos' });
  }
}