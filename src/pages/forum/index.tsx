import ListPageHeader from "../../layouts/ListPageHeader";
import { BadgeMinus } from "lucide-react";
import { useEffect, useState } from "react";
import { GetReq } from "../../services/api.service";
import { GetToken } from "../../services/cookie.token";
import { ForumType } from "../../utils/type";
import DeleteConfirmationModal from "../../components/modals/DeleteConfirmationModal";
import { onDisable } from "../../services/disbale.service";
import { Link } from "react-router-dom";
import GenericTable from "../../components/common/Table";
import { Spinner } from "react-bootstrap";

export default function Forum() {
    const [data, setData] = useState<ForumType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const token = GetToken()
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await GetReq({
                url: '/admin/forum',
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
    console.log(data)
    const columns = [
        {
            key: 'name', label: 'Name', render: (row: any) => <Link to={`/forums/${row._id}`} className="txt-gray-68 text-decoration-none fw-bold cursor-pointer">
                {row.name}
            </Link>
        },
        { key: 'username', label: 'Creator' },
        {
            key: 'image',
            label: 'Image',
            render: (row: ForumType, openLightbox: () => void) => (
                <div className="rounded" style={{ width: '40px', height: '40px' }}>
                    <img
                        src={row.image}
                        alt={row.name}
                        className="w-100 h-100"
                        style={{ cursor: 'pointer' }}
                        onClick={openLightbox}
                    />
                </div>
            ),
        },
        { key: 'category', label: 'Category' },
        {
            key: 'public',
            label: 'Visibility',
            render: (row: any) => (row.public === 'true' ? 'Public' : 'Private'),
        },
        {
            key: 'disabled',
            label: 'Action',
            filterable: true,
            render: (row: any) => (
                <DeleteConfirmationModal
                    title={row.disabled === 'Disabled' ? 'Enable' : 'Disabled'}
                    btnTxt={row.disabled === 'Disabled' ? 'Enable' : 'Disabled'}
                    message={`Are you sure you want to ${row.disabled === 'Disabled' ? 'Enable' : 'Disabled'} this forum?`}
                    onDisable={() => onDisable({ id: row._id, type: 'forum', fetchData })}
                >
                    <button
                        className={`btn ${row.disabled === 'Disabled' ? 'btn-gray' : 'btn-red-light'
                            } rounded-circle btn-cp-rounded d-flex justify-content-center align-items-center`}
                    >
                        <BadgeMinus size={18} />
                    </button>
                </DeleteConfirmationModal>
            ),
        },
    ];
    if (loading) return <div className="h-100 d-flex justify-content-center align-items-center"> <Spinner /> </div>

    return <>
        <ListPageHeader title="Forum Management">
            <GenericTable columns={columns} data={data.map((item: ForumType) => {
                return {
                    ...item,
                    username: item.userId.username,
                    public: item.public.toString(),
                    disabled: item.disabled ? 'Disabled' : 'Enabled'
                }
            })} />
        </ListPageHeader >
    </>
}