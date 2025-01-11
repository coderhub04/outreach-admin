import { ReactNode } from "react"
import { DataAnalysType } from "../../../utils/type"


interface MetricsTypes{
    dataAnalys: DataAnalysType,
    activeTitle:string,
    blockedTitle:string,
    icon:ReactNode,
    bgColor?:string
}
export default function Metrics({dataAnalys,activeTitle,blockedTitle,icon,bgColor='bg-light-green'}:MetricsTypes) {

    return <>
        {/* <div className="col-md-3 col-6 mb-3"> */}
            <div className={`rounded-4 text-center p-3 w-100 ${bgColor}`}>
                <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <div className="fs-6-sm txt-gray-68 text-start fw-normal">{activeTitle}</div>
                        <div className="fs-2 text-start text-black mb-2">{dataAnalys.active}</div>
                    </div>
                    {/* <Users size={42} className="mt-3 me-1" /> */}
                    {icon}
                </div>
                <div className="fs-6-sm txt-gray-68 text-start fw-normal">{blockedTitle}</div>
                <div className="fs-6 text-start text-black">{dataAnalys.disabled}</div>
            </div>
        {/* </div> */}
    </>
}