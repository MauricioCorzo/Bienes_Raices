
const generarId = () => {
    return Date.now().toString(32) + Math.random().toString(32).substring() + Date.now().toString(32)
}

export { 
    generarId
}