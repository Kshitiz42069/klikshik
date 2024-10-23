import { LinearProgress } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { useThemeContext } from '../../Theme/ThemeProviderContext';

const Uploader = () => {
    const [files, setFiles] = React.useState<File[]>([]);
    const [totalProgress, setTotalProgress] = React.useState(0);
    const [pause, setPause] = React.useState(false);
    const [uploadedFiles, setUploadedFiles] = React.useState<string[]>([]);
    const { mode } = useThemeContext();

    const handlePause = () => {
        setPause(!pause);
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        
        const validFiles = selectedFiles.filter(file => (
            (file.type === 'image/jpeg' || file.type === 'image/jpg') && file.size < 5.0 * 1024 * 1024
        ));

        if (validFiles.length !== selectedFiles.length) {
            alert('Files are of invalid type or size');
        }

        setFiles(validFiles);
        setTotalProgress(0);
    };

    const uploadFiles = useCallback(() => {
        const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dqkromytn/image/upload";
        const uploadPreset = "carousel";

        let totalUploadBytes = 0;
        let totalFileSize = files.reduce((acc,file)=> acc + file.size, 0);

        files.forEach((file) => {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", uploadPreset);

            const request = axios.post(cloudinaryUrl, formData, {
                onUploadProgress: (event) => {
                    if (event.lengthComputable && event.total) {
                        const fileUploadedBytes = event.loaded; 
                        totalUploadBytes += fileUploadedBytes; 

                        const percentComplete = Math.round((totalUploadBytes * 100) / totalFileSize); // Combined progress
                        setTotalProgress(Math.min(percentComplete, 100));
                    }
                },
            });

            request
                .then((response) => {
                    setUploadedFiles((prev) => [...prev, response.data.secure_url]);
                })
                .catch(() => {
                    alert(`Error uploading ${file.name}`);
                });
        });
    }, [files]);

    useEffect(() => {
        if (files.length > 0 && !pause) {
            uploadFiles();
        }
    }, [files, pause, uploadFiles]);

    const backgroundColor = mode === 'dark' ? '#252423' : '#F3F2F1';
    return (
        <div className='h-full rounded-xl p-8'
        style={{ backgroundColor }}
        >
            <p className='text-3xl font-semibold'>Upload</p>
            <div className='p-10 flex flex-col gap-[2rem] justify-center'>
                <div className='relative w-1/4'>
                    <input className='file_input' type="file" multiple onChange={handleFile} />
                    <p className='text-lg text-[#3E361F] font-semibold text-center bg-[#EDB409] px-4 py-2 rounded-full'>
                        UPLOAD PHOTOS
                    </p>
                </div>

                <div className='w-1/4'>
                    <LinearProgress
                        variant='determinate'
                        value={totalProgress}
                        sx={{
                            height: 7,
                            backgroundColor: '#E1E1E1',
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: '#EDB409',
                            },
                        }}
                    />
                </div>
                <div className='w-1/4 flex items-center gap-[2rem]'>
                    <p className='font-semibold'>{totalProgress}% Uploaded</p>
                    {totalProgress !== 100 && (
                        <button onClick={handlePause} className='pause_button'>
                            {pause ? (
                                <PauseOutlinedIcon fontSize='large' />
                            ) : (
                                <PlayCircleFilledWhiteOutlinedIcon fontSize='large' />
                            )}
                        </button>
                    )}
                </div>


                <div className='mt-6'>
                     <p className='text-lg font-semibold'>Uploaded Files:</p>
                     <div className='grid grid-cols-10 gap-[1rem] mt-8'>
                         {uploadedFiles.map((url, index) => (
                             <div key={index} className=''>
                                 <img src={url} alt={`Uploaded file ${index + 1}`} className='w-[5rem] h-[3rem] rounded-xl' />
                             </div>
                         ))}
                     </div>
                 </div>
            </div>
        </div>
    );
};

export default Uploader;