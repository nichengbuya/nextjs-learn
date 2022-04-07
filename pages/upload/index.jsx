import dynamic from "next/dynamic";
const uploadComponent = dynamic(()=>import('./upload-page'),{
    ssr:false
})
export default uploadComponent