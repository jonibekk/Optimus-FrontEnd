
export const validEmail = (email) => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

export const validPassword = (password) => {
    //const regex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,16}$/; 
    //return regex.test(password);
    return password.length > 0;
}

export const getGmtTimezone = () => (new Date().getTimezoneOffset()) / (-60);

export const shiftDate = (date, numDays) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
}

export const getRange = (count) => {
    return Array.from({ length: count }, (_, i) => i);
}

export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
