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
async function uploadModel(file,res){
    const ext = path.extname(file.originalFilename).substring(1);
    await testPath(ext);
    const oldpath = file.filepath;
    const newpath = path.join(path.resolve(),`/public/upload/${ext}/${file.originalFilename}`);
    try{
        await copyFile(oldpath , newpath);
        res.json({
            message:'success'
        });
        return;
    }catch(e){

        console.log(e)
    }
}
export const config = {
    api: {
        bodyParser: false,
    }
};

export default async (req, res: NextApiResponse) => {
    const form = new IncomingForm({  filter: function ({name, originalFilename, mimetype}) {
        return !mimetype.includes("image");
      } })
    form.parse(req, async (err, fields, files) => {
        if (err) return err;
        if(!files.file) res.json({
            mesage:'empty'
        });
        uploadModel(files.file, res);
    })
}