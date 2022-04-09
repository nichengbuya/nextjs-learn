import { useRef, useState } from "react";
import axios from "axios";
import path from 'path';
const request = axios.create({
    baseURL:'api',
    timeout:60000 
})

async function upload(url,files , type?){
    const formData = new FormData();
    console.log(url)
    for(let file of files){
        formData.append('file' , file)
    }
    formData.append('type',type);
    const res = await request.post(url,  formData, {
        onUploadProgress:(progressEvent)=>{
            const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              console.log(percentCompleted);
        }
    })
    console.log(res);
}
function UploadPage() {
    const uploadRef = useRef(null);
    const modelRef = useRef(null);
    const [fileList, setFileList] = useState([]);
    const uploadFile = async () => {
        
        // await upload('/upload',[modelRef.current.files[0]]);
        
        // const type = path.extname(modelRef.current.files[0].name).substring(1);
        await upload('/uploadtexture',fileList , 'obj');
    }
    const onChange = (e) => {
        if(!uploadRef.current) return;
        if (!uploadRef.current.files.length) {
            return;
        }
        setFileList([...fileList, ...uploadRef.current.files])
    }
    return (
        <div>
            <input ref={modelRef} type="file" />
            <input ref={uploadRef} multiple type="file" onChange={onChange} />
            {fileList.map(i => {
                return <div key={i.name}>{i.name}</div>
            })}
            <button onClick={uploadFile}>upload</button>
        </div>
    )
}
export default UploadPage;