import multer from "multer";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
// Configuración de multer
// Configuración de Multer
const upload = multer({ dest: "./public/uploads/" });

cloudinary.config({
  cloud_name: "dpsmuwsae",
  api_key: "911168556997222",
  api_secret: "p1RO5ghUpobxbSDjPqW6opCQx1c",
});

export const config = {
  api: {
    bodyParser: false, // Desactivamos el bodyParser de Next.js para usar multer
  },
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Llamamos al middleware de multer para procesar la carga de archivos
      upload.single("file")(req, res, async (err) => {
        if (err) {
          console.error("Error al cargar el archivo:", err);
          return res
            .status(500)
            .json({ error: "Hubo un error al procesar la carga del archivo." });
        }

        // Verificamos si se proporciona algún archivo
        if (!req.file) {
          return res
            .status(400)
            .json({ error: "No se ha proporcionado ningún archivo." });
        }

        // Subimos la imagen a Cloudinary
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload(req.file.path, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          });
        });

        // Borramos el archivo temporal
        fs.unlinkSync(req.file.path);

        // Respondemos con éxito
        res
          .status(200)
          .json({
            message: "Imagen subida a Cloudinary con éxito.",
            imageUrl: result.url,
            imageUrlPublicId: result.public_id
          });
      });
    } catch (error) {}
  }
}
