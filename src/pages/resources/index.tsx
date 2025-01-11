import { Spinner, Tab, Tabs } from "react-bootstrap";
import ListPageHeader from "../../layouts/ListPageHeader";
import DeleteConfirmationModal from "../../components/modals/DeleteConfirmationModal";
import { ResourceType } from "../../utils/type";
import { BadgeMinus } from "lucide-react";
import { onDisable } from "../../services/disbale.service";
import { useEffect, useState } from "react";
import { GetReq } from "../../services/api.service";
import { GetToken } from "../../services/cookie.token";
import { Link } from "react-router-dom";
import GenericTable from "../../components/common/Table";

export default function Resources() {
    const [approvedResources, setApprovedResources] = useState<ResourceType[]>([]);
    const [pendingResources, setPendingResources] = useState<ResourceType[]>([]);

    const [loading, setLoading] = useState<boolean>(true);

    const token = GetToken()
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await GetReq({
                url: '/admin/resource',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setApprovedResources(
                response?.data.response.filter((resource: ResourceType) => {
                    return resource.approved
                })
            );
            setPendingResources(
                response?.data.response.filter((resource: ResourceType) => {
                    return !resource.approved
                })
            );
            console.log("Resources Data", response?.data.response)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchData();
    }, [token])

    const approvedColumns = [
        {
            key: 'title', label: 'Resources Title', render: (row: ResourceType) => <Link to={`/resources/${row._id}`} className="txt-gray-68 text-decoration-none fw-bold cursor-pointer">
                {row.title}
            </Link>
        },
        { key: 'name', label: 'Creator Name', render: (row: ResourceType) => <div>{row.userId.name}</div> },
        { key: 'username', label: 'Creator Username' },
        { key: 'email', label: 'Email' },
        { key: 'likes', label: 'Like', render: (row: ResourceType) => <div>{row.likes.length}</div> },
        {
            key: 'block',
            label: 'Action',
            filterable: true,
            render: (row: ResourceType) => (
                <>
                    <DeleteConfirmationModal
                        title={row.block.toString() === 'Blocked' ? 'Unblock Resource' : 'Block Resource'}
                        btnTxt={row.block.toString() === 'Blocked' ? 'Unblock Resource' : 'Block Resource'}
                        message={`Are you sure you want to ${row.block.toString() === 'Blocked' ? 'Unblocked' : 'Block'} ${row.title}?`}
                        onDisable={() => onDisable({ id: row._id, type: 'resource', fetchData, })}
                    >
                        <button
                            className={`btn ${row.block.toString() === 'Blocked' ? 'btn-gray' : ' btn-red-light'} rounded-circle btn-cp-rounded d-flex justify-content-center align-items-center`}
                        >
                            <BadgeMinus size={18} />
                        </button>
                    </DeleteConfirmationModal>
                </>
            ),
        },
    ];
    const pendingColumns = [
        {
            key: 'title', label: 'Resources Title', render: (row: ResourceType) => <Link to={`/resources/${row._id}`} className="txt-gray-68 text-decoration-none fw-bold cursor-pointer">
                {row.title}
            </Link>
        },
        { key: 'name', label: 'Creator Name', render: (row: ResourceType) => <div>{row.userId.name}</div> },
        { key: 'username', label: 'Creator Username' },
        { key: 'email', label: 'Email' },
        { key: 'likes', label: 'Like', render: (row: ResourceType) => <div>{row.likes.length}</div> },
    ];
    if (loading) return <div className="h-100 d-flex justify-content-center align-items-center"> <Spinner /> </div>

    return <>
        <ListPageHeader title="Resources Management">
            <Tabs
                id="fill-tab-example"
                className="mb-3 cp-nav-tabs"
                fill
                variant="tabs"
                defaultActiveKey="approved-resources"
            >
                <Tab eventKey="approved-resources" title="Approved Resources">
                    <GenericTable columns={approvedColumns} data={approvedResources.map((item: ResourceType) => {
                        return {
                            ...item,
                            block: item.block ? 'Blocked' : 'Unblocked',
                            username: item.userId.username,
                            email: item.userId.email
                        }
                    })} />
                </Tab>
                <Tab eventKey="pending-resources" title="Pending Resources">
                    <GenericTable columns={pendingColumns} data={pendingResources.map((item: ResourceType) => {
                        return {
                            ...item,
                            deleted: item.deleted ? 'Blocked' : 'Unblocked',
                            username: item.userId.username,
                            email: item.userId.email
                        }
                    })} />
                </Tab>
            </Tabs>
        </ListPageHeader>
    </>
}