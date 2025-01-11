import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="d-flex vh-100">
            <Sidebar />
            <div className="main-content bg-gray-5">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
