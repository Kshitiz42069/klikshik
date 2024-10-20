import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';

interface NavbarProps{
    setView:(view:boolean)=>void;
    view:boolean
}

const Navbar:React.FC<NavbarProps>=({setView, view})=> {
  return (
    <div className="flex flex-col justify-between gap-3 pt-[3rem] pb-[6rem] px-3 h-screen border-2 w-[6rem] bg-[#F3F2F1]">
        <div className='flex flex-col gap-[3rem]'>
            <div onClick={()=>setView(false)} className={`navbar_button ${view? 'text-gray-400' : ''}`}>
                <div className={`w-full text-center rounded-xl ${view? '' : 'text-white bg-gray-900 delay_animation py-[2px]'}`}>
                    <CloudUploadOutlinedIcon sx={{ fontSize: 24 }}/>
                </div>
                <button className='text-xs'>Uploader</button>
            </div>
            <div onClick={()=>setView(true)} className={`navbar_button ${view? '' : 'text-gray-400'}`}>
                <div className={`w-full text-center rounded-xl ${view? 'text-white bg-gray-900 delay_animation py-[2px]' : ''}`}>
                    <BrokenImageOutlinedIcon sx={{ fontSize: 24 }}/>
                </div>
                <button className='text-xs'>Carousel</button>
            </div>
        </div>
        {/* dark theme config */}
        <div className='text-center'>
            <button><ContrastOutlinedIcon/></button>
        </div>
    </div>
  );
};

export default Navbar