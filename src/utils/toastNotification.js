import { toast } from 'react-toastify';
const toastOptions = {
    position: 'top-center',
    style: {
        fontSize: '20px', // Adjust font size
        padding: '16px',  // Adjust padding for bigger spacing
        minWidth: '300px', // Optional: control toast width
        borderRadius: '8px' // Optional: rounded corners
    }
};
const notifySuccess = (message) => {
    toast.success(message, toastOptions);
};

const notifyError = (message) => {
    toast.error(message, toastOptions);
};

const notifyInfo = (message) => {
    toast.info(message, {
        position: 'top-center'
    });
};

const notifyWarning = (message) => {
    toast.warning(message, {
        position: 'top-center'
    });
};

export { notifySuccess, notifyError, notifyInfo, notifyWarning };
