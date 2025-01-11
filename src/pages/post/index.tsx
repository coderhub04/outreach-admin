import { Link } from "react-router-dom";
import GenericTable from "../../components/common/Table";
import DeleteConfirmationModal from "../../components/modals/DeleteConfirmationModal";
import ListPageHeader from "../../layouts/ListPageHeader";
import { onDisable } from "../../services/disbale.service";
import { PostType } from "../../utils/type";
import { GetToken } from "../../services/cookie.token";
import { GetReq } from "../../services/api.service";
import { useEffect, useState } from "react";
import { BadgeMinus } from "lucide-react";
import { Spinner } from "react-bootstrap";

export default function Posts() {
    const [data, setData] = useState<PostType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const token = GetToken()
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await GetReq({
                url: '/admin/post',
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
    console.log("Post data", data)
    const columns = [
        {
            key: 'name', label: 'Name', render: (row: PostType) => <Link to={`/posts/${row._id}`} className="txt-gray-68 text-decoration-none fw-bold cursor-pointer">
                {row.userId.name}
            </Link>
        },
        { key: 'username', label: 'Username', },
        { key: 'likes', label: 'Likes', render: (row: PostType) => row.likes.length },
        {
            key: 'public',
            label: 'Visibility',
            render: (row: any) => (row.public === 'true' ? 'Public' : 'Private'),
        },
        {
            key: 'block',
            label: 'Action',
            filterable: true,
            render: (row: PostType) => (
                <DeleteConfirmationModal
                    title={row.block.toString() === 'Disabled' ? 'Enable' : 'Disabled'}
                    btnTxt={row.block.toString() === 'Disabled' ? 'Enable' : 'Disabled'}
                    message={`Are you sure you want to ${row.block.toString() === 'Disabled' ? 'Enable' : 'Disabled'} this post?`}
                    onDisable={() => onDisable({ id: row._id, type: 'post', fetchData })}
                >
                    <button
                        className={`btn ${row.block.toString() === 'Disabled' ? 'btn-gray' : 'btn-red-light'
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
        <ListPageHeader title="Post Detail">
            <GenericTable columns={columns} data={data.map((item: PostType) => {
                console.log("Items", item)
                return {
                    ...item,
                    username: item.userId.username,
                    public: item.public.toString(),
                    block: item.block ? 'Disabled' : 'Enabled'
                }
            })} />
        </ListPageHeader >
    </>
}