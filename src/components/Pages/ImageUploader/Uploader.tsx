import { LinearProgress } from '@mui/material';
import React, { useEffect } from 'react'
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';

const Uploader = () => {
    const [files,setFiles] = React.useState<File[]>([]);
    const [progress,setProgress] = React.useState<number[]>([]);
    const [pause,setPause] = React.useState(false);
    const [uploadedFiles, setUploadedFiles] = React.useState<File[]>([]);

    const handlePause = ()=>{
        setPause(!pause);
    }

    const handleFile = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const selectedFiles = Array.from(e.target.files|| []);

        const validFiles = selectedFiles.filter(file=>(
            (file.type === 'images/jpeg'|| file.type === 'images/jpg') && file.size < 5.0*1024*1024
        ));

        if(validFiles.length !== selectedFiles.length){
            alert('Files are of invalid type');
        }

        setFiles(validFiles);
        setProgress(new Array(validFiles.length).fill(0));
    }

    const uploadFiles = ()=>{
        files.forEach((file,index)=>{
            const request = new XMLHttpRequest();

            request.upload.onprogress = (event)=>{
                if(event.lengthComputable){
                    const percent = (event.loaded/event.total)*100;
                    setProgress(prev => {
                        const newProgress = [...prev];
                        newProgress[index] = percent;
                        return newProgress;
                        }
                    );
                }
            };

            request.onload = ()=>{
                if(request.status === 200){
                    setUploadedFiles(prev => [...prev,file]);
                }
                else{
                    console.log("error uploading" ,file.name);
                }
            };

            request.open('POST','/upload');
            const formData = new FormData();
            formData.append('file',file);

            if(!pause){
                request.send(formData);
            }
        });
    };

    useEffect(() => {
        if (files.length > 0 && !pause) {
            uploadFiles();
        }
    }, [files, pause]);
  return (
    <div className='bg-white h-full rounded-xl p-8'>
        <p className='text-3xl font-semibold'>Upload</p>
        <div className='p-10 flex flex-col gap-[2rem]'>
            <div className='relative w-1/4'>
                <input className='file_input' type="file" multiple onChange={handleFile}/>
                <p className='text-lg text-[#3E361F] font-semibold text-center bg-[#EDB409] px-4 py-2 rounded-full'>
                    UPLOAD PHOTOS
                </p>
            </div>

            <p className='font-semibold'>{progress}% Uploaded</p>

            {files.map((file,index)=>(

            <div className='flex items-center gap-6'>
                <div className='w-1/4'>
                    <LinearProgress 
                        variant='determinate' 
                        value={progress[index]}
                        sx={
                            {
                                height:7,
                                backgroundColor:'#E1E1E1',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#EDB409'
                                }
                            }   
                        }
                    />
                </div>
            </div>
            ))}
                {/* pause button */}
            <button onClick={handlePause} className='pause_button'>
                {pause ? (
                    <PauseOutlinedIcon fontSize='large'/>
                ) : (
                    <PlayCircleFilledWhiteOutlinedIcon fontSize='large'/>
                )}
            </button>

            <div className='mt-6'>
                <p className='text-lg font-semibold'>Uploaded Files:</p>
                <ul>
                    {uploadedFiles.map((file, index) => (
                        <li key={index} className='text-green-600 font-medium'>
                            {file.name} (Uploaded Successfully)
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Uploader