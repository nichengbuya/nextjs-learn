import { useRef, useState } from "react";
import axios from "axios";
const request = axios.create({
    baseURL:'/api/upload',
    timeout:60000
    
})
function upload(url,files){
    const formData = new FormData();
    for(let file of files){
        formData.append('file' , file)
    }
    request.post(url, formData, {
        onUploadProgress:(progressEvent)=>{
            const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              console.log(percentCompleted);
        }
    }).then(res=>{
        console.log(res);
    })
}
function UploadPage() {
    const uploadRef = useRef();
    const [fileList, setFileList] = useState([]);
    const uploadFile = () => {
        upload('',fileList);
    }
    const onChange = (e) => {
        if (!uploadRef.current?.files.length) {
            return;
        }
        setFileList([...fileList, ...uploadRef.current.files])
    }
    return (
        <div>
            <input ref={uploadRef} multiple type="file" onChange={onChange} />
            {fileList.map(i => {
                return <div key={i.name}>{i.name}</div>
            })}
            <button onClick={uploadFile}>upload</button>
        </div>
    )
}
export default UploadPage;