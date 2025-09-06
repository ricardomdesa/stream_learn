export async function api(request: Request){
    const req = await fetch(request);
    return req
}