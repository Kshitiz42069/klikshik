import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import BrokenImageOutlinedIcon from '@mui/icons-material/BrokenImageOutlined';
import ContrastOutlinedIcon from '@mui/icons-material/ContrastOutlined';
import { useThemeContext } from '../../Theme/ThemeProviderContext';

interface NavbarProps {
  setView: (view: boolean) => void;
  view: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ setView, view }) => {
  const { mode, toggleColorMode } = useThemeContext();

  const backgroundColor = mode === 'dark' ? '#252423' : '#F3F2F1';
  const buttonColor = mode === 'dark' ? '#111827' : '#FFFFFF';
  const selectedIconColor = mode === 'dark' ? '#ffffff' : '#000000'; 
  const unselectedIconColor = mode === 'dark' ? '#888888' : '#888888'; 

  return (
    <div
      className="flex flex-col justify-between gap-3 pt-[3rem] pb-[6rem] px-3 h-screen w-[6rem]"
      style={{ backgroundColor }}
    >
      <div className="flex flex-col gap-[3rem]">
        {/* Uploader Button */}
        <div
          onClick={() => setView(false)}
          className={`navbar_button ${view ? 'text-gray-400' : ''}`}
        >
          <div
            className={`w-full text-center rounded-xl ${view ? '' : 'delay_animation py-[2px]'}`}
            style={{ backgroundColor: view ? '' : buttonColor }}
          >
            <CloudUploadOutlinedIcon
              sx={{
                fontSize: 24,
                color: view ? unselectedIconColor : selectedIconColor, 
              }}
            />
          </div>
          <button className="text-xs">Uploader</button>
        </div>

        {/* Carousel Button */}
        <div
          onClick={() => setView(true)}
          className={`navbar_button ${view ? '' : 'text-gray-400'}`}
        >
          <div
            className={`w-full text-center rounded-xl ${view ? 'delay_animation py-[2px]' : ''}`}
            style={{ backgroundColor: view ? buttonColor : '' }}
          >
            <BrokenImageOutlinedIcon
              sx={{
                fontSize: 24,
                color: view ? selectedIconColor : unselectedIconColor, 
              }}
            />
          </div>
          <button className="text-xs">Carousel</button>
        </div>
      </div>

      {/* Dark Theme Toggle */}
      <div className="text-center">
        <button onClick={toggleColorMode}>
          <ContrastOutlinedIcon
            sx={{
              fontSize: 28,
              color: mode === 'dark' ? '#FFD700' : '#333', 
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
