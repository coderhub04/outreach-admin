import { ReactNode } from "react";

interface ListPageHeaderProps {
    title: string;
    children: ReactNode;
    bgcolor?:string
}
export default function ListPageHeader({ title, children,bgcolor='bg-white' }:ListPageHeaderProps) {
    return (
        <div >
            <div className="text-dark fs-4 ps-4 py-4 bg-white fw-bold">{title}</div>
                <div className={`scroll rounded-4 m-4 p-4 vh-80 overflow-y-scroll ${bgcolor}`}>
                    {children}
                </div>
        </div>
    );
}