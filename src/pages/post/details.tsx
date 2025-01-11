import { Link, useParams } from "react-router-dom";
import ListPageHeader from "../../layouts/ListPageHeader";
import { GetToken } from "../../services/cookie.token";
import { useEffect, useState } from "react";
import { GetReq } from "../../services/api.service";
import { MediaType, PostType } from "../../utils/type";
import FormField from "../../components/common/FormFields";
import { Badge, Spinner } from "react-bootstrap"

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import '../../../node_modules/swiper/swiper.css';
import '../../../node_modules/swiper/modules/navigation.css'
import VideoPlayer from "../../components/common/VideoPlayer";


export default function PostDetail() {
    let { id } = useParams();
    console.log(id)
    const token = GetToken()

    const [data, setData] = useState<PostType>();
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await GetReq({
                    url: `/admin/post/${id}`,
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
    console.log("Data", data)
    if (loading) return <div className="h-100 d-flex justify-content-center align-items-center"> <Spinner /> </div>

    return <>
        <ListPageHeader title="View Post Details">
            <div className="position-relative">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="d-flex align-items-center  gap-4">
                            <img src={data?.userId.imageUrl} alt="" className="rounded-2" width={250} height={200} />
                            <div className="d-flex flex-column gap-2">
                                <div className="txt-gray-82 fw-bold">Post ID:  <span className="txt-gray-68 fw-normal">{data?._id}</span></div>
                                <div className="txt-gray-82 fw-bold">Userid:  <span className="txt-gray-68 fw-normal">{data?.userId._id}</span></div>
                                <div className="txt-gray-82 fw-bold">Username:  <span className="txt-gray-68 fw-normal">{data?.userId.username}</span></div>
                                <div className="txt-gray-82 fw-bold">Name:  <span className="txt-gray-68 fw-normal">{data?.userId.name}</span></div>
                                <div className="txt-gray-82 fw-bold">Email:  <span className="txt-gray-68 fw-normal">{data?.userId.email}</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="mt-3">
                            <FormField.Field label="Visibility">
                                <Badge className="cp-badge-tab blue rounded-pill w-fit-content">{(data?.public) ? 'Public' : 'Private'}</Badge>
                            </FormField.Field>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="mt-3">
                            <FormField.Field label="Total Like">
                                <Badge className="cp-badge-tab blue rounded-pill w-fit-content">{data?.likes.length}</Badge>
                            </FormField.Field>
                        </div>
                    </div>
                    <div className="col-sm-12">
                        <div className="mt-3">
                            <FormField.Field label="Post Content">
                                <div className="txt-gray-68fw-bold">{data?.content}</div>
                            </FormField.Field>
                        </div>
                    </div>
                    {
                        data?.reports && data.reports.length > 0 ? (
                            <div className="text-danger fw-bold my-2 fs-2">Reported Post Details</div>
                        ) : null
                    }
                    {data?.reports?.map((report) => (
                        <div className="col-sm-12" key={report?.user?._id}>
                            <FormField.Field
                                label={
                                    <div className="txt-gray-82 fw-bold">
                                        <Link to={`/users/${report?.user?._id}`} className="text-decoration-none txt-gray-82">
                                            {report?.user?.name}
                                        </Link>
                                    </div>
                                }
                            >
                                <div className="txt-gray-68 fw-bold">
                                    {report.description}
                                </div>
                            </FormField.Field>
                        </div>
                    ))}
                    <div className="col-sm-12">
                        <div className="mt-3">
                            <div className="txt-gray-82 fw-bold fs-2">
                                Media
                            </div>

                            <Swiper
                                modules={[Navigation, Pagination]}
                                spaceBetween={50}
                                slidesPerView={3}
                                navigation
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                onSwiper={(swiper) => console.log('Swiper instance:', swiper)}
                                onSlideChange={() => console.log('Slide changed')}
                                className="cp-slider"
                            >
                                {
                                    data?.media?.map((post: MediaType, i: number) => (
                                        <SwiperSlide key={i}>
                                            {post.type === 'video' ? (
                                                <VideoPlayer
                                                    videoUrl={`${post.url}`}
                                                />
                                            ) : (
                                                <img src={post.url} alt="Post" className="w-100" />
                                            )}
                                        </SwiperSlide>
                                    ))
                                }

                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>
        </ListPageHeader>
    </>
}