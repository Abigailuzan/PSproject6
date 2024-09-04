import React,{ useState }  from 'react'
//import { FaEye, FaEyeSlash } from "react-icons/fa";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
function Password({setPassword,password}) {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState);
      }
    
  return (
    <div className="password-container">
        <input 
            type={showPassword ? "text" : "password"}
            name="password" 
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-box password-input"
          />
          <button type="button" onClick={toggleShowPassword} className="toggle-button">
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        </div>
  )
}

export default Password