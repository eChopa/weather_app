
export const checkFetchRequestHTTP = response => {
    if(!response.ok) {
        throw Error(`${response.status} : ${response.responseText}`)
    }
    else {return response}
}