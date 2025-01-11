import { useEffect, useState } from "react";
import ListPageHeader from "../../layouts/ListPageHeader";
import { GetReq } from "../../services/api.service";
import { GetToken } from "../../services/cookie.token";
import { DashboardType } from "../../utils/type";
import { BookCheck, BookMarked, Proportions, Users } from "lucide-react";
import Metrics from "./components/metrics";
import UserGraph from "./components/graphs/UserGraph";
import DoughnutReported from "./components/graphs/DoughnutReported";
import { Spinner } from "react-bootstrap";

export default function Dashboard() {
    const [data, setData] = useState<DashboardType>();
    const [loading, setLoading] = useState<boolean>(true);

    const token = GetToken()
    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await GetReq({
                url: '/dashboard/admin',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setData(response?.data.response);
            console.log("Chart Data Graph", response?.data.response)

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    };
    useEffect(() => {
        fetchData();
    }, [token])
    if (loading) return <div className="h-100 d-flex justify-content-center align-items-center"> <Spinner /> </div>
    return <>
        <ListPageHeader title="Dashboard Detail">
            <div className="d-flex justify-content-center">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-3 col-6 mb-3">
                            <Metrics activeTitle="Active Users" blockedTitle="Blocked Users" dataAnalys={data?.user || { total: 0, active: 0, disabled: 0 }} icon={<Users size={42} className="mt-3 me-1" />} />
                        </div>
                        <div className="col-md-3 col-6 mb-3">
                            <Metrics bgColor="bg-light-green-v1" activeTitle="Total Posts" blockedTitle="Blocked Posts" dataAnalys={data?.post || { total: 0, active: 0, disabled: 0 }} icon={<BookMarked size={42} className="mt-3 me-1" />} />
                        </div>
                        <div className="col-md-3 col-6 mb-3">
                            <Metrics bgColor="bg-light-blue" activeTitle="Total Forums" blockedTitle="Blocked Forums" dataAnalys={data?.forum || { total: 0, active: 0, disabled: 0 }} icon={<BookCheck size={42} className="mt-3 me-1" />} />
                        </div>
                        <div className="col-md-3 col-6 mb-3">
                            <Metrics bgColor="bg-light-pink" activeTitle="Total Resources" blockedTitle="Blocked Resources" dataAnalys={data?.resource || { total: 0, active: 0, disabled: 0 }} icon={<Proportions size={42} className="mt-3 me-1" />} />
                        </div>
                        <div className="col-6">
                            <UserGraph chartData={data?.graph || ''} />
                        </div>
                        <div className="col-6">
                            <DoughnutReported labels={Object.keys(data?.reports ?? {})} data={Object.values(data?.reports ?? {})} />
                        </div>
                    </div>
                </div>
            </div>
        </ListPageHeader>
    </>
}