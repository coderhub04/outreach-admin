import Cookies from 'js-cookie';

export const SetToken = (token: string) => {
    Cookies.set('token', token, {
        expires: 7,
        secure: true,
        sameSite: 'Strict'
    });
};

export const DeleteToken = () => {
    Cookies.remove('token', {
        secure: true,
        sameSite: 'Strict',
    });
    window.location.href = '/login'
    console.log("Token has been removed from cookies.");
};

export const GetToken = () => {
    const token = Cookies.get('token');
    return token;
};