import { useParams } from "react-router-dom"
import { GetToken } from "../../services/cookie.token"
import { useEffect, useState } from "react"
import { GetReq } from "../../services/api.service"
import { UserType } from "../../utils/type"
import ListPageHeader from "../../layouts/ListPageHeader"
import { Badge, Spinner } from "react-bootstrap"
import FormField from "../../components/common/FormFields"

export default function UserDetail() {
    const { id } = useParams()
    console.log(id)
    const token = GetToken()
    const [data, setData] = useState<UserType>();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await GetReq({
                    url: `/admin/user/${id}`,
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
        fetchData();
    }, [token])
    console.log(data)
    if (loading) return <div className="h-100 d-flex justify-content-center align-items-center"> <Spinner /> </div>
    return <>
        <ListPageHeader title="View User">
            <div className="position-relative">

                <div className="row">
                    <div className="col-sm-12">
                        <div className="d-flex align-items-center gap-4">
                            <img src={data?.imageUrl} alt="" className="rounded-2" width={250} height={200} />
                            <div className="d-flex flex-column gap-2">
                                <div className="txt-gray-82 fw-bold">Userid:  <span className="txt-gray-68 fw-normal">{data?._id}</span></div>
                                <div className="txt-gray-82 fw-bold">Username:  <span className="txt-gray-68 fw-normal">{data?.username}</span></div>
                                <div className="txt-gray-82 fw-bold">Name:  <span className="txt-gray-68 fw-normal">{data?.name}</span></div>
                                <div className="txt-gray-82 fw-bold">Email:  <span className="txt-gray-68 fw-normal">{data?.email}</span></div>
                                <div className="txt-gray-82 fw-bold">Status:   <Badge className={`cp-badge-tab ${(data?.block) ? 'red' : 'green'} red rounded-pill`}>{(data?.block) ? 'Blocked' : 'Unblocked'}</Badge></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="mt-3">
                            <FormField.Field label="Rewards Points">
                                <div className="txt-gray-68fw-bold">{data?.rewardPoints}</div>
                            </FormField.Field>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="mt-3">
                            <FormField.Field label="Bio">
                                <div className="txt-gray-68fw-bold">{data?.bio}</div>
                            </FormField.Field>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="mt-3">
                            <FormField.Field label="Interest">
                                <div className="d-flex gap-2">
                                    {data?.interest.map((interest, i) => (
                                        <Badge className="cp-badge-tab blue rounded-pill" key={i}>{interest}</Badge>
                                    ))}
                                </div>
                            </FormField.Field>
                        </div>
                    </div>
                </div>

            </div>
        </ListPageHeader>
    </>
}