import Cookies from 'js-cookie';

export const storeCookie = (key, value) => {
    try {
        Cookies.set(key, value);
    } catch (error) {
        console.log(error);
    }
}

export const retrieveCookie = (key) => {
    try {
        const value = Cookies.get(key);
        if (value) return value;
        else return null;
    } catch (error) {
        console.log(error);
    }
}

export const removeCookie = (key) => {
    try {
        Cookies.remove(key);
    } catch (error) {
        console.log(error);
    }
}