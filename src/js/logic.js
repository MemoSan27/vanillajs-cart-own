import { printCart, printProducts, printTotals } from "./ui.js";

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
        
    add.addEventListener('click', (e) => {
        const btnAdd = e.target.classList.contains('detail-product__btn-add');
        if(btnAdd){
            const id = +e.target.closest('.detail-product__details').id;
            const article = db.products.find( product => product.id === id);
            
            if(article.quantity === 0){
                return Swal.fire( {
                    title: '¡Producto agotado!', 
                    text: 'Lo sentimos, este producto se encuentra sin stock por el momento',
                    icon: 'error',
                });
                
            }

            if( quantity.value === '' ){
                return Swal.fire( {
                    title: '¡Agrega una cantidad!', 
                    text: 'Por favor ingresa por lo menos 1 pieza a tu carrito',
                    icon: 'error',
                });
            }

            if(quantity.value > article.quantity){
                return Swal.fire( {
                    title: 'Stock insuficiente', 
                    text: 'La cantidad de articulos que esta solicitando sobrepasan nuestro stock',
                    icon: 'warning',
                });
            }
            
            if(article.id in db.cart){
                if((article.quantity - db.cart[article.id].amount) < +quantity.value){
                    return Swal.fire( {
                        title: 'Stock insuficiente', 
                        text: `No puedes agregar mas de ${ db.cart[id].quantity } piezas a tu carrito`,
                        icon: 'error',
                    });
                    
                }
                db.cart[article.id].amount += +quantity.value;
            }else{
                article.amount = +quantity.value;
                db.cart[article.id] = article;
            }
            localStorage.setItem('cart', JSON.stringify(db.cart));
            printCart(db.cart);
            printTotals(db);
            Swal.fire( {
                title: `Se han añadido ${ quantity.value } ${ article.category}s a tu carrito` , 
                icon: 'success',
            });
        }
    })
}

export const filterProducts = (products) => {
    const list = document.getElementById('choose1');
    
    list.addEventListener('change', (e) => {
        const value = +e.target.value;
        
        if(value === 1){
            printProducts(products);
        }
        if(value === 2){
            const shirts = products.filter( product => product.category === 'shirt');
            printProducts(shirts);
        }
        if(value === 3){
            const hoddies = products.filter( product => product.category === 'hoddie');
            printProducts(hoddies);
        }
        if(value === 4){
            const sweaters = products.filter( product => product.category === 'sweater');
            printProducts(sweaters);
        }
    });
}
