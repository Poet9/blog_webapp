
const requestTemplate = async (url = '', type= 'GET', credentials, headers= {"content-type": "application/json"}, body = {})=>{
    if(type === 'GET' || type=== 'HEAD')
        return await fetch(`https://jsonplaceholder.typicode.com/${url}`,{
            method: type,
            headers,
            mode: "cors",
            cache: "default",
            credentials,
            redirect: 'manual'
        });
    return await fetch(`https://jsonplaceholder.typicode.com/${url}`,{
        method: type,
        headers,
        mode: "cors",
        cache: "default",
        body,
        credentials,
        redirect: 'manual'
    });
}
export default requestTemplate;