import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


toast.configure();

export const showSuccess = (message) => {
    toast.success(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        transition: Bounce,
        draggable: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
    });
};

export const showError = (message) => {
    toast.error(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        transition: Bounce,
        draggable: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
    });
};

export const showWarning = (message) => {
    toast.warn(message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
        transition: Bounce,
        draggable: true,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
    });
};
