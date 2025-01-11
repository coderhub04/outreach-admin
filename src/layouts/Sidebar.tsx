import { BookCheck, BookMarked, BookOpen, LayoutDashboard, Proportions, TriangleAlert, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { DeleteToken } from "../services/cookie.token";

const Sidebar = () => {
    return (
        <div className="d-flex flex-column bg-white vh-100 p-3" style={{ width: '250px' }}>
            <h2 className="text-primary fs-4 fw-bold mb-4">Socia Media</h2>
            <ul className="nav flex-column cp-nav gap-2">
                <li className="nav-item mb-2">
                    <Link to="/dashboard" className="nav-link txt-gray-68 fs-6 fw-bold d-flex align-items-center gap-2 text-nowrap">
                        <LayoutDashboard size={18} /> Dashboard
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link to="/users" className="nav-link txt-gray-68 fs-6 fw-bold d-flex align-items-center gap-2 text-nowrap">
                        <Users size={18} />  Users 
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link to="/posts" className="nav-link txt-gray-68 fs-6 fw-bold d-flex align-items-center gap-2 text-nowrap">
                        <BookMarked size={18} /> Posts
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link to="/forums" className="nav-link txt-gray-68 fs-6 fw-bold d-flex align-items-center gap-2 text-nowrap">
                    <BookCheck size={18}/>  Forums
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link to="/stories" className="nav-link txt-gray-68 fs-6 fw-bold d-flex align-items-center gap-2 text-nowrap">
                        <BookOpen size={18} />  Story
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link to="/resources" className="nav-link txt-gray-68 fs-6 fw-bold d-flex align-items-center gap-2 text-nowrap">
                    <Proportions size={18} />  Resource 
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link to="/reported-post" className="nav-link txt-gray-68 fs-6 fw-bold d-flex align-items-center gap-2 text-nowrap">
                        <TriangleAlert size={18} />   Reported Post 
                    </Link>
                </li>
            </ul>
            <button className="btn btn-primary mt-auto" onClick={()=> DeleteToken()}>Logout</button>
        </div>
    );
};

export default Sidebar;
