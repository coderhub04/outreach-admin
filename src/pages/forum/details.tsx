import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ForumType } from "../../utils/type";
import { GetReq, PatchReq } from "../../services/api.service";
import { GetToken } from "../../services/cookie.token";
import FormField from "../../components/common/FormFields";
import { useForm } from "react-hook-form";
import ListPageHeader from "../../layouts/ListPageHeader";
import { Button, Spinner } from "react-bootstrap";

export default function ForumDetails() {
    let { id } = useParams();
    console.log(id)
    const token = GetToken()

    const [data, setData] = useState<ForumType>();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await GetReq({
                    url: `/admin/forum/${id}`,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setData(response?.data.response);
                // const forumData: ForumType = response?.data.response;
                // setValue("category", forumData.category);
                reset({
                    ...response?.data.response
                })
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false)
            }
        };
        fetchData();
    }, [token])

    const mainForm = useForm<ForumType>({
        mode: 'all',
    })
    const { register, handleSubmit, watch, reset, formState } = mainForm;


    console.log(data)
    console.log(watch())

    const onSubmit = async (data: ForumType) => {
        console.log("Updated data", data)
        try {
            const response = await PatchReq({
                url: `/admin/forum/${id}`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: {
                    ...data
                }
            })
            console.log("Updated Data", response)
            reset({
                ...response?.data.response,
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }

    };
    const hasChanges = JSON.stringify(watch()) !== JSON.stringify(formState.defaultValues);
    if (loading) return <div className="h-100 d-flex justify-content-center align-items-center"> <Spinner /> </div>

    return <>
        <ListPageHeader title="Edit Forum">
            <div className="position-relative">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="d-flex align-items-center justify-content-between gap-4">
                                <img src={data?.userId.imageUrl} alt="" className="rounded-2" width={250} height={200} />
                                <div className="d-flex flex-column gap-2">
                                    <div className="txt-gray-82 fw-bold">Userid:  <span className="txt-gray-68 fw-normal">{data?.userId._id}</span></div>
                                    <div className="txt-gray-82 fw-bold">Username:  <span className="txt-gray-68 fw-normal">{data?.userId.username}</span></div>
                                    <div className="txt-gray-82 fw-bold">Name:  <span className="txt-gray-68 fw-normal">{data?.userId.name}</span></div>
                                    <div className="txt-gray-82 fw-bold">Email:  <span className="txt-gray-68 fw-normal">{data?.userId.email}</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6"></div>
                        <div className="col-sm-6 mt-2">
                            <FormField.Field label="Forum Name">
                                <input type={'text'} id={'name'}  {...register('name')} className={`input-control`} placeholder={"Enter Category Name"} required />
                            </FormField.Field>
                        </div>
                        <div className="col-sm-6 mt-2">
                            <FormField.Field label="Category Name">
                                <input type={'text'} id={'category'}  {...register('category')} className={`input-control`} placeholder={"Enter Category Name"} required />
                            </FormField.Field>
                        </div>
                        <div className="col-sm-12 mt-2">
                            <FormField.Field label="Description">
                                <textarea id="description" {...register('description')} className={'input-control'} style={{ height: '200px' }}>
                                </textarea>
                            </FormField.Field>
                        </div>
                    </div>
                    <div className="sticky-bottom p-3 bg-gray-5 d-flex justify-content-end align-items-center gap-2 mx-2 rounded-2 mt-4 bg-opacity-25">
                        <Button className="btn btn-gray px-2 py-1">
                            Cancel
                        </Button>
                        <Button type="submit" className="btn btn-primary px-2 py-1"
                            disabled={!hasChanges || loading}
                        >
                            Update
                        </Button>
                    </div>
                </form>
            </div>
        </ListPageHeader>
    </>
}

