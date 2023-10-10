import { printCart, printTotals, printProducts } from "./ui.js";

export const handels = () => {
    const cart = document.querySelector('.nav__cart-btn');
    const modal = document.querySelector('.cart-modal');
                
    cart.addEventListener('click', () => {
        modal.classList.toggle('active');
    });
}

export const handleCart = (db) => {
    const cart = document.querySelector('.cart-modal__products');

    cart.addEventListener('click', (e) => {
        const plus = e.target.classList.contains('plus');
        const less = e.target.classList.contains('less');
        const trash = e.target.classList.contains('trash');
        
        if(less){
            const id = +e.target.closest('.cart-modal__product').id;
            if(db.cart[id].amount === 1){
                return Swal.fire( {
                    title: '¡No puedes comprar menos de 1 producto!', 
                    icon: 'warning',
                });
            }
            db.cart[id].amount--;
        }
        if(plus){
            const id = +e.target.closest('.cart-modal__product').id;
            if(db.cart[id].amount === db.cart[id].quantity){
                return Swal.fire( {
                    title:  'Limite alcanzado',
                    text: `Solo contamos con existencia de ${ db.cart[id].quantity } piezas`,
                    icon: 'warning',
                });
            }
            db.cart[id].amount++;
        }
        if(trash){
            const id = +e.target.closest('.cart-modal__product').id;
            const response = confirm('¿Estas seguro que deseas quitar de tu carrito este producto?');
            if(!response){
                return;
            }
            delete db.cart[id];
        }
        localStorage.setItem('cart', JSON.stringify(db.cart));
        printCart(db.cart);
        printTotals(db);
    });
}

export const handleTotals = (db) => {
    const btnBuy = document.querySelector('.btnBuy');
    
    btnBuy.addEventListener('click', (e) => { 
        const numProducts = Object.values(db.cart).length;
        if(!numProducts){
            return Swal.fire( {
                title: '¡Debes agregar productos a tu carrito!', 
                text: '¡Tu carrito esta vacio!',
                icon: 'warning',
            });
        }
        const response = confirm('¿Estas seguro de realizar tu compra?');
        if(!response){
            return;
        }        
        for( const key in db.cart ){
            const idCarrito = db.cart[key].id;
            const idProductos = db.products[key-1].id;

            if(idCarrito === idProductos){
                db.products[key-1].quantity -= db.cart[key].amount;
            }
        }
        db.cart = {};
        localStorage.setItem('products', JSON.stringify(db.products));
        localStorage.setItem('cart', JSON.stringify(db.cart));
        printProducts(db.products);
        printCart(db.cart);
        printTotals(db);
        Swal.fire(
            'Operacion exitosa',
            '¡Gracias por tu compra!',
            'success'
        );
    });
}