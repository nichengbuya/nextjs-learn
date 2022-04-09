import { IncomingForm } from 'formidable'
import { access,  mkdir ,copyFile} from 'fs/promises';
import { constants  } from 'fs';
import path from 'path';
import { NextApiResponse } from 'next';

async function testPath(type: string) {
    const folderName = path.join(path.resolve(), `/public/upload/${type}`);
    try{
        await access(folderName);
    }catch(e){
        await mkdir(folderName);
    }
}
async function uploadModel(file,type,res){

    await testPath(type);
    const oldpath = file.filepath;
    const newpath = path.join(path.resolve(), `/public/upload/${type}/${file.originalFilename}`);
    try{
        await copyFile(oldpath , newpath);
        res.json({
            message:'success'
        });
    }catch(e){

    }
}
export const config = {
    api: {
        bodyParser: false,
    }
};

export default async (req, res: NextApiResponse) => {
 
    const form = new IncomingForm({ multiples: true ,  
        filter: function ({name, originalFilename, mimetype}) {
        // keep only images
        return mimetype && mimetype.includes("image");
      }})
    form.parse(req, async (err, fields, files) => {
        if (err) return err;
        const type = fields.type;
        if(files.file instanceof Array){
            for (let file of files.file) {
                uploadModel(file,type, res);
            }
        } else{
            uploadModel(files.file,type, res);
        }

    })
}