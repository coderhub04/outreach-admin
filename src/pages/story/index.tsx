import { BadgeMinus, EyeIcon } from "lucide-react";
import GenericTable from "../../components/common/Table";
import DeleteConfirmationModal from "../../components/modals/DeleteConfirmationModal";
import ListPageHeader from "../../layouts/ListPageHeader";
import { onDisable } from "../../services/disbale.service";
import { StoryType } from "../../utils/type";
import { useEffect, useState } from "react";
import { GetToken } from "../../services/cookie.token";
import { GetReq } from "../../services/api.service";
import { Link } from "react-router-dom";
import StoryModal from "../../components/modals/StoryModal";
import { Spinner } from "react-bootstrap";


export default function Story() {
    const [data, setData] = useState<StoryType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const token = GetToken()
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await GetReq({
                url: '/admin/story',
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
            key: 'name', label: 'Name', render: (row: StoryType) => <Link to={`/users/${row._id}`} className="txt-gray-68 text-decoration-none fw-bold cursor-pointer">
                {row.userId.name}
            </Link>
        },
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },

        {
            key: 'media', label: 'View Story', render: (row: StoryType) =>
                <div className="text-center">
                    <StoryModal media={row.media}>
                        <button
                            className={`btn rounded-circle btn-cp-rounded d-flex justify-content-center align-items-center btn-gray`}
                        >
                            <EyeIcon size={18} />
                        </button>
                    </StoryModal>
                </div>
        },
        {
            key: 'deleted',
            label: 'Action',
            filterable: true,
            render: (row: StoryType) => (
                <>
                    <DeleteConfirmationModal
                        title={row.deleted.toString() === 'Blocked' ? 'Unblock Story' : 'Block story'}
                        btnTxt={row.deleted.toString() === 'Blocked' ? 'Unblock Story' : 'Block story'}
                        message={`Are you sure you want to ${row.deleted.toString() === 'Blocked' ? 'Unblocked story' : 'Block story'} ${row.userId.name}?`}
                        onDisable={() => onDisable({ id: row._id, type: 'story', fetchData })}
                    >
                        <button
                            className={`btn ${row.deleted.toString() === 'Blocked' ? 'btn-gray' : ' btn-red-light'} rounded-circle btn-cp-rounded d-flex justify-content-center align-items-center`}
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
        <ListPageHeader title="Story Management">
            <GenericTable columns={columns} data={data.map((item: StoryType) => {
                return {
                    ...item,
                    deleted: item.deleted ? 'Blocked' : 'Unblocked',
                    username: item.userId.username,
                    email: item.userId.email
                }
            })} />
        </ListPageHeader >

    </>
}
