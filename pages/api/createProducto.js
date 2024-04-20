import {PrismaClient} from '@prisma/client';

export default async function handler(req,res){
    const prisma = new PrismaClient();

    if (req.method === 'POST') {
        try {

            const {nombre,precio,imagen,categoriaId,imagenId} = req.body;
            // Validar que todos los campos necesarios están presentes
            if (!nombre || !imagen || !precio || !categoriaId) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios' });
            }
            // Guardar el producto en la base de datos utilizando Prisma
            const nuevoProducto = await prisma.producto.create({
                data: {
                  nombre,
                  imagen,
                  imagenId,
                  precio: Number(precio), // Convertir el precio a un número decimal
                  categoriaId: parseInt(categoriaId),
                }
              });
            // Respondemos con el producto creado
            res.status(201).json({ message: 'Producto creado con éxito.', producto: nuevoProducto });
        } catch (error) {
            console.error('Error al procesar la solicitud:', error);
            res.status(500).json({ error: 'Hubo un error al procesar la solicitud.' });
        }
    }else {
        // Respondemos a cualquier método que no sea POST con un error de método no permitido
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ error: `Método ${req.method} no permitido.` });
      }
}