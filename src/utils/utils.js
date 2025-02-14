export const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export const getDateFormatted = (input) => {
    let date = new Date();
    if(input !== ''){
        date = new Date(input);
    }
    const month = date.toLocaleString('default', { month: 'short' }).toLowerCase();
    return month +""+ date.getFullYear()
} 

export const userRedirectIfNeeded = () => {
    if(getCookie('token') === undefined){
        window.location.href = '/';
    }
}
