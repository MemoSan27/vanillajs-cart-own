export const getApi = async() => {
    const URL = 'https://ecommercebackend.fundamentos-29.repl.co/';
    try{
        const data = await fetch(URL);
        const res = await data.json();
        localStorage.setItem('products', JSON.stringify(res));
        localStorage.setItem('cart', JSON.stringify({}));
        return res;
    }catch(error){
        console.log(error);
    }
}
export const database = async() => {
    const db = {
        products:   JSON.parse(localStorage.getItem('products')) || 
                    await getApi(),
        cart:       JSON.parse(localStorage.getItem('cart')) || {},
    };
    return db;
}