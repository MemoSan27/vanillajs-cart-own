import { printCart, printTotals } from "./ui.js";

export const printDetail = (detail) => {
    const detailProduct = document.querySelector('.detail-product');
    
    let html = '';

    const { category, description, id, image, name, price, quantity } = detail;
    
    html += `
    <div class="detail-product__card">
            <div class="detail-product__flex">
                <div class="detail-product__bg"></div>
                <img class="detail-product__img" src="${ image }" alt="Shirt Image">
            </div>

            <div id="${ id }" class="detail-product__details">
                <h2 class="detail-product__description"> ${ name } </h2>
                <hr>
                <p class="detail-product__text"> Descripción: </p>
                <p class="detail-product__lorem"> ${ description } </p>
                <div class="detail-product__box"> 
                    <img class="detail-product__img-2" src="${ image }" alt="Shirt Image">
                
                    <div class="detail-product__info">
                        <p class="detail-product__label"> Categoría: <span class="detail-product__span"> ${ category } </span></p>
                        <p class="detail-product__label"> Precio: <span class="detail-product__span"> $${ price }.00 USD </span></p>
                        <p class="detail-product__label"> Stock actual: <span class="detail-product__span"> ${ quantity } Unidades</span></p>
                            
                        <span> Cantidad a comprar: </span> <br>
                        <input placeholder="0" class="detail-product__cantidad" type="number" min="1" max="${ quantity }" />
                        
                            
                    </div>
                </div>
                
                <p> Tallas: </p>
                <div class="tallas">
                    <p class="talla"> S </p>
                    <p class="talla"> M </p>
                    <p class="talla"> L </p>
                    <p class="talla"> XL </p>
                    <p class="talla"> 2XL </p>
                    <p class="talla"> 3XL </p>
                </div>
                <button class="detail-product__btn-add"> Agregar al carrito </button>
                
            </div>
        </div>
    `;
    
    detailProduct.innerHTML = html;

}

export const handleTotalsDetails = (db) => {
    const btnBuy = document.querySelector('.btnBuy');
    const quantRefresh = document.querySelector
    
    btnBuy.addEventListener('click', (e) => { 
        const numProducts = Object.values(db.cart).length;
        if(!numProducts){
            return Swal.fire( {
                title: '¡Tu carrito esta vacio!', 
                text: '¡Debes agregar productos a tu carrito!',
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
        
        printCart(db.cart);
        printTotals(db);
        Swal.fire(
            'Operacion exitosa',
            '¡Gracias por tu compra!',
            'success'
        );
    });
}