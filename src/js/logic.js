export const getApi = async() => {
    const URL = 'https://ecommercebackend.fundamentos-29.repl.co/';
    try{
        const data = await fetch(URL);
        const res = await data.json();
        localStorage.setItem('products', JSON.stringify(res));
        localStorage.setItem('cart', JSON.stringify({}));
        localStorage.setItem('detail', JSON.stringify({}));
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
        detail:     JSON.parse(localStorage.getItem('detail')) || {},
    };
    return db;
}

export const addToCart = (db) => {
    const add = document.querySelector('.detail-product__card');
    const quantity = document.querySelector('.detail-product__cantidad');
    let difference = 0;
    
    
    add.addEventListener('click', (e) => {
        const btnAdd = e.target.classList.contains('detail-product__btn-add');
        if(btnAdd){
            const id = +e.target.closest('.detail-product__details').id;
            const article = db.products.find( product => product.id === id);
            
            if(article.quantity === 0){
                return alert('Producto agotado');
            }

            if(article.id in db.cart){
                if(difference < +quantity.value){
                    return alert(`Solo contamos con ${ db.cart[id].quantity } piezas restantes`);
                }
                db.cart[article.id].amount += +quantity.value;
            }else{
                article.amount = +quantity.value;
                db.cart[article.id] = article;
            }
            difference = article.quantity - db.cart[article.id].amount;
            localStorage.setItem('cart', JSON.stringify(db.cart));
        }
    })
}