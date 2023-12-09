import { Link  } from "react-router-dom";

const NavigationButton = ({to, text}) => {
    return (
        <Link to={to}>
            <button>{text}</button>
        </Link>
    );
};

export default NavigationButton;