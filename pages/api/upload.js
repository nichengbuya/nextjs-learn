import fs from 'fs';
import path from 'path';
export default function handler(req, res) {
    const fileList = req.files;
    console.log(fileList);
    // for(let file of fileList){
    //     fs.readFile(file.path,(err,data )=>{
    //         const pathName = path.join(process.cwd() , 'public', 'artifact' , file.originalname);
    //         fs.writeFile(pathName, (err, data)=>{
    //             if(err){
    //                 res.status(500).json({ message:err })
    //             }else{
    //                 res.status(200).json({
    //                     message:'success',
    //                     fileName:file.originalName
    //                 })
    //             }

    //         })
    //     })

    // }
}