export const getLocalItem = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

export const setLocalItem = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}