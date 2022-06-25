import { FaRegSun, FaRegMoon } from 'react-icons/fa';

const ModeButton = ({theme, setTheme}) => {
  const toggleTheme = (value) => {
    setTheme(value);
    localStorage.setItem('theme', value);
  };

  return (<>
    {theme && theme === 'light' ? <FaRegMoon className="nav__theme-btn" onClick={() => toggleTheme('dark')} /> : <FaRegSun className="nav__theme-btn" onClick={() => toggleTheme('light')} />}
  </>)
};
export default ModeButton;