export const validateRating = (value) => {
    let errors = {};
    const ratingValue = value.replace(',', '.');
    if (value.length > 0) {
        if (!Number(ratingValue)) {
            errors = 'Rating must be a number'
        } else {
            if (ratingValue < 1 || ratingValue > 5) {
                errors = 'Rating must be 1 to 5';
            }
        }
    } else {
        errors = ''
    }


    return errors;
}

export const validateDate = (released) => {
    let errors = {}
    const regexDate = /^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/
    const CURRENT_YEAR = new Date().getFullYear()

    /* Comprobar formato dd/mm/yyyy, que el mes no sea mayor de 12 y los días mayores de 31 */
    if (released.length > 0) {
        if (!released.match(regexDate)) {
            errors = 'Format date must be dd/mm/yyyy'
        }

        /* Comprobar los días del mes */
        const day = parseInt(released.split('/')[0])
        const month = parseInt(released.split('/')[1])
        const year = parseInt(released.split('/')[2])
        const monthDays = new Date(year, month, 0).getDate()
        if (day > monthDays) {
            errors = 'Incorrect day'
        }

        /* Comprobar que el año no sea superior al actual*/
        if (year > CURRENT_YEAR) {
            errors = 'year incorrect'
        }
    }
    return errors;

}

export const validateName = (value) => {
    let errors = {};
    const regexText = /^[a-z0-9\s]+$/i;
    if (value.length === 0) {
        errors = 'The name must be required';
    } else {
        if (!regexText.test(value)) {
            errors = 'the name must contain only numbers and letters'
        }

    }

    return errors;
}

export const validateDescription = (value) => {
    let errors = {};
    const regexText = /^[a-z0-9\s]+$/i;
    if (value.length === 0) {
        errors = 'The description must be required';
    } else {
        if (!regexText.test(value)) {
            errors = 'The description must contain only numbers and letters'
        }

    }

    return errors;
}


