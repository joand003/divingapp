const validateEmail = (email) => {
    let emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (email.match(emailFormat)) {
        return true;
    } else {
        return false;
    }
}

export default validateEmail;