import { Button, Spinner } from "react-bootstrap";
import ListPageHeader from "../../layouts/ListPageHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetToken } from "../../services/cookie.token";
import { ResourceType } from "../../utils/type";
import { GetReq, PatchReq } from "../../services/api.service";
import FormField from "../../components/common/FormFields";
import { toast, ToastContainer } from "react-toastify";

export default function ResourceDetail() {
    let { id } = useParams();
    console.log(id)
    const token = GetToken()

    const [data, setData] = useState<ResourceType>();
    const [loading, setLoading] = useState<boolean>(true);
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await GetReq({
                url: `/admin/resource/${id}`,
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
    console.log("Data", data)
    const approveResource = async (id: string) => {
        console.log("Updated data", data)
        try {
            const response = await PatchReq({
                url: `/admin/resource/approve/${id}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log("Updated Data", response)
            toast.success("Resource Approved")
            fetchData();
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }

    };
    if (loading) return <div className="h-100 d-flex justify-content-center align-items-center"> <Spinner /> </div>

    return <>
        <ToastContainer />
        <ListPageHeader title="View Resources Details">
            <div className="position-relative">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="d-flex align-items-center justify-content-between gap-4">
                            <img src={data?.userId.imageUrl} alt="" className="rounded-2" width={250} height={200} />
                            <div className="d-flex flex-column gap-2">
                                <div className="txt-gray-82 fw-bold">Resource ID:  <span className="txt-gray-68 fw-normal">{data?._id}</span></div>
                                <div className="txt-gray-82 fw-bold">Userid:  <span className="txt-gray-68 fw-normal">{data?.userId._id}</span></div>
                                <div className="txt-gray-82 fw-bold">Username:  <span className="txt-gray-68 fw-normal">{data?.userId.username}</span></div>
                                <div className="txt-gray-82 fw-bold">Name:  <span className="txt-gray-68 fw-normal">{data?.userId.name}</span></div>
                                <div className="txt-gray-82 fw-bold">Email:  <span className="txt-gray-68 fw-normal">{data?.userId.email}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6"></div>
                    <div className="col-sm-12">
                        <div className="mt-3">
                            <FormField.Field label="Category Name">
                                <div className="txt-gray-68fw-bold">{data?.category.title}</div>
                            </FormField.Field>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="mt-3">
                            <FormField.Field label="Resource Content">
                                <div className="txt-gray-68fw-bold">{data?.content}</div>
                            </FormField.Field>
                        </div>
                    </div>
                </div>
                <div className={`sticky-bottom p-3 bg-gray-5  justify-content-end align-items-center gap-2 mx-2 rounded-2 mt-4 bg-opacity-25 ${(data?.approved) ? 'd-none' : 'd-flex'}`}>
                    <Button className="btn btn-gray px-2 py-1">
                        Cancel
                    </Button>
                    <Button type="submit" className="btn btn-primary px-2 py-1"
                        onClick={() => {
                            if (data?._id) {
                                approveResource(data._id);
                            } else {
                                console.error('No valid resource ID provided.');
                            }
                        }}
                    >
                        Approve Resoruces
                    </Button>
                </div>
            </div>
        </ListPageHeader >
    </>
}