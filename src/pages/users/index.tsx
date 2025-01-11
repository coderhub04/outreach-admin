import ListPageHeader from "../../layouts/ListPageHeader";
import { BadgeMinus } from "lucide-react";
import { GetToken } from "../../services/cookie.token";
import { useEffect, useState } from "react";
import { UserType } from "../../utils/type";
import { GetReq } from "../../services/api.service";
import { Link } from "react-router-dom";
import DeleteConfirmationModal from "../../components/modals/DeleteConfirmationModal";
import { onDisable } from "../../services/disbale.service";
import GenericTable from "../../components/common/Table";
import { Spinner } from "react-bootstrap";

export default function Users() {
    const [data, setData] = useState<UserType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const token = GetToken()
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await GetReq({
                url: '/admin/user',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setData(response?.data.response);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchData();
    }, [token])
    console.log("User data", data)
    const columns = [
        {
            key: 'name', label: 'Name', render: (row: UserType) => <Link to={`/users/${row._id}`} className="txt-gray-68 text-decoration-none fw-bold cursor-pointer">
                {row.name}
            </Link>
        },
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        {
            key: 'image',
            label: 'Image',
            render: (row: UserType, openLightbox: () => void) => (
                <div className="rounded" style={{ width: '40px', height: '40px' }}>
                    <img
                        src={row.imageUrl}
                        alt={row.name}
                        className="w-100 h-100"
                        style={{ cursor: 'pointer' }}
                        onClick={openLightbox}
                    />
                </div>
            ),
        },
        { key: 'rewardPoints', label: 'Reward Points' },
        {
            key: 'block',
            label: 'Action',
            filterable: true,
            render: (row: UserType) => (
                <>
                    <DeleteConfirmationModal
                        title={row.block.toString() === 'Blocked user' ? 'Unblock user' : 'Block User'}
                        btnTxt={row.block.toString() === 'Blocked user' ? 'Unblock user' : 'Block'}
                        message={`Are you sure you want to ${row.block.toString() === 'Blocked user' ? 'Unblock user' : 'Block'} ${row.name}?`}
                        onDisable={() => onDisable({ id: row._id, type: 'user', fetchData })}
                    >
                        <button
                            className={`btn ${row.block.toString() === 'Blocked user' ? 'btn-gray' : ' btn-red-light'} rounded-circle btn-cp-rounded d-flex justify-content-center align-items-center`}
                        >
                            <BadgeMinus size={18} />
                        </button>
                    </DeleteConfirmationModal>
                </>
            ),
        },
    ];

    if (loading) return <div className="h-100 d-flex justify-content-center align-items-center"> <Spinner /> </div>

    return <>
        <ListPageHeader title="User Management">
            <GenericTable columns={columns} data={data.map((item: UserType) => {
                return {
                    ...item,
                    block: item.block ? 'Blocked user' : 'Unblock user'
                }
            })} />
        </ListPageHeader >
    </>
}