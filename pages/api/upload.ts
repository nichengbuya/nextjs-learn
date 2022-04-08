import formidable from 'formidable'
import {join, resolve} from 'path';
import { NextApiResponse } from 'next';
export const config = {
    api: {
        bodyParser: false
    }
}

export default async function Upload(req, res:NextApiResponse) {
    const optinos = {
        uploadDir: join(resolve(), '/uploads'),
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024, // 10mb
        maxFieldsSize: 10 * 1024* 1024, // 10mb
        filename: function(name, ext, part, form) {
            return name + ext
        }
    }
    const form = new formidable.IncomingForm(optinos)
    form.parse(req, async function(err, fields, files) {
        if(err) {
            console.log(err)
        }else {
          res.status(200).json({
            message:'success'
          })
        }
    })
}
