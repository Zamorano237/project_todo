const apiRequest = async (URL= '',  Option = null, errMsg = null) =>{
    try {
        const response = await fetch(URL, Option)
        if(!response.ok) throw Error("please reload the page")
    } catch (error) {
        errMsg = error.message
    } finally{
       return errMsg
    }
}

export default apiRequest