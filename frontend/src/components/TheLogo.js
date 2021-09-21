import pt from 'prop-types';
import LogoSVG from '../images/svg/logo_default.svg'

function TheLogo ({bindClass}) {
  try {   
    return (<div className="">
      <img src={LogoSVG} className={bindClass} alt="logo" />
    </div>)
  } catch (error) {
    console.error(error);
    return null
  }
}

export default TheLogo;