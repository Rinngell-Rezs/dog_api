import { Link } from "react-router-dom";
import { Icon } from "../components/utils/styled_components";

function NotFound() {
    return (
        <>
            <Link to="/home" style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center', gap: '0vh', marginBottom: '2vh' }}>
                <Icon className="material-symbols-outlined" style={{ fontSize: '3vh', cursor: 'pointer' }}>arrow_back</Icon>
                <Icon className="material-symbols-outlined" style={{ fontSize: '3vh', cursor: 'pointer' }}>home</Icon>
                <h2>Volver al inicio</h2>
            </Link>
            <div style={{ textAlign: 'center', marginTop: '5vh' }}>
                <h1>404 - Página No Encontrada</h1>
                <img src="https://i.imgur.com/sBgJmm8.png" alt="Not Found" style={{ height: '40vh', borderRadius: '8px' }} />
                <h3>Lo sentimos, la página que buscas no existe.</h3>
            </div>
        </>
    );
}
export default NotFound;
