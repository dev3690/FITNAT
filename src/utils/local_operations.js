export const getLocalItem = (key) => JSON.parse(localStorage.getItem(key))

export const setLocalItem = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}

export const getPackageName = (key) => {
    switch (key) {
        case 1:
            return "FITNAT Coaching Premium"
        case 2:
            return "FITNAT Coaching Delux"
        case 3:
            return "FITNAT Personal Training"
        default:
            return "NO Package"
    }
}

