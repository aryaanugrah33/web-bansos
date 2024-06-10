import { Link } from 'react-router-dom';

const NaviBar = () => {
    return (
        <header className="kepala" style={styles.kepala}>
            <div className="left-section" style={styles.leftSection}>
                <h1 className="admin-dashboard" style={styles.adDashboard}>INI BANSOSLIST</h1>
            </div>
            <div className="right-section" style={styles.rightSection}>
                <Link to="/" style={styles.headlink}>Home</Link>
                <Link to="/penduduk" style={styles.headlink}>penduduk</Link>
                <Link to="/jenis_bansos" style={styles.headlink}>bantuan sosial</Link>
            </div>
        </header>
    );
}

const styles = {
    kepala: {
        backgroundColor: "#00aeff",
        padding: "20px",
        margin: 0,
        display: "flex",
        flexDirection: "row",
        width: "auto",
        borderRadius: "0px 0px 70px 0px",
    },
    adDashboard: {
        color: "white",
    },
    leftSection: {
        width: "50%",
        display: "flex",
        flexDirection: "row",
        color: "white",
    },
    rightSection: {
        width: "50%",
        padding: "10px 20px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        color: "white",
    },
    headlink: {
        color: "white",
        padding: "10px",
        textDecoration: "none",
        fontSize: "20px",
    }
}

export default NaviBar;
