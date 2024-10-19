import { LinearProgress } from '@mui/material';
import React, { useEffect } from 'react'
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';

const Uploader = () => {
    const [progress,setProgress] = React.useState(0);
    const [pause,setPause] = React.useState(false);

    const handlePause = ()=>{
        setPause(!pause);
    }
    useEffect(()=>{
        const timer = setInterval(()=>{
            setProgress((prevProgress) => (prevProgress>=100 ? 0: prevProgress+10));
        },800);

        return ()=>{
            clearInterval(timer);
        }
    },[]);
  return (
    <div className='bg-white h-full rounded-xl p-8'>
        <p className='text-3xl font-semibold'>Upload</p>
        <div className='p-10 flex flex-col gap-[2rem]'>
            <div className='relative w-1/4'>
                <input className='file_input' type="file" />
                <p className='text-lg text-[#3E361F] font-semibold text-center bg-[#EDB409] px-4 py-2 rounded-full'>
                    UPLOAD PHOTOS
                </p>
            </div>
            <p className='font-semibold'>{progress}% Uploaded</p>
            <div className='flex items-center gap-6'>
                <div className='w-1/4'>
                    <LinearProgress 
                        variant='determinate' 
                        value={progress}
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
                {/* pause button */}
                    <button onClick={handlePause} className='pause_button'>
                        {pause ? (
                            <PauseOutlinedIcon fontSize='large'/>
                        ) : (
                            <PlayCircleFilledWhiteOutlinedIcon fontSize='large'/>
                        )}
                    </button>
            </div>
        </div>
    </div>
  )
}

export default Uploader