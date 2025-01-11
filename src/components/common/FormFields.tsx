import { ReactNode } from "react";

interface inputProps {
    label?: string| ReactNode,
    id?: string,
    className?: string,
    errorMsg?: string,
    children?: ReactNode
}
const Field = ({ label, id, errorMsg, children }: inputProps) => {
    return <div className="d-flex flex-column">
        {label && <label htmlFor={id} className="text-start mb-1 txt-gray-82 fs-6 fw-bold">{label}</label>}
        {children}
        {/* <input type={type} id={id} {...register} className={`input-control ${className}`} placeholder={placeholder} required={required} /> */}
        {errorMsg && <div className="text-danger text-start fs-6-sm fw-light ms-2">{errorMsg}</div>}
    </div>
}

const FormField = {
    Field,
};

export default FormField;
