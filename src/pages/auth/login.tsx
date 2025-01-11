import { useForm } from "react-hook-form";
import FormField from "../../components/common/FormFields";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import { PostReq } from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { SetToken } from "../../services/cookie.token";

const loingScehma = Yup.object().shape({
    username: Yup.string().required('Enter Username'),
    password: Yup.string().required('Enter Password')
})
export type FormProps = typeof loingScehma.__outputType

export default function Login() {
    const navigate = useNavigate();
    const mainForm = useForm<FormProps>({
        mode: 'all',
        resolver: yupResolver(loingScehma),
    })
    const { register, handleSubmit } = mainForm;
    const submit = async (data: FormProps) => {

        const body = {
            username: data.username,
            password: data.password,
        };

        try {
            const response = await PostReq({ body, url: "/admin/signin" });
            const token = await response.data.response;
            if (token) {
                SetToken(token);
                navigate('/dashboard')
            }

        } catch (error: any) {
            console.error("Error:", error);
            toast(`${error.response.data.message}`)
        }
    };

    return <>
        <div className=" d-flex justify-content-center align-items-center vh-100">
            <div className="card text-center shadow-sm login-container w-100 p-4">
                <div className="fw-bold fs-4 pb-4">Admin Panel</div>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="d-flex flex-column gap-4">
                        <div className="d-flex flex-column gap-3">
                            <FormField.Field>
                                <input type={'email'} id={'username'} {...register('username')} className={`input-control`} placeholder={"Enter Username"} required />
                            </FormField.Field>
                            <FormField.Field>
                                <input type={'password'} id={'password'} {...register('password')} className={`input-control`} placeholder={"Enter Password"} required />
                            </FormField.Field>
                        </div>
                        <button type="submit" className="btn btn-primary mx-auto">Login</button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>
    </>
} 