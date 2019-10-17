import multer from 'multer';
import crypto from 'crypto';

import { extname, resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        /* Concatenar 16 bytes de letras e números aleatórios com a extensão do nome original do arquivo, isso vai fazer com que evitemos que duas imagens tenha o mesmo nome e que o usuário coloque caracteres estranhos no nome da imagem. */

        return cb(null, res.toString('hex') + extname(file.originalname));
      })
    }
  })
}