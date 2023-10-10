
export const printProducts = ( products ) => {
    const print = document.querySelector('.products');
    let html = '';

    for(const item of products){
        const { id, name, price, quantity, image } = item;
        html += `
        <div id="${ id }" class="product">
        <div class="product__link">
            <figure class="product__img if${quantity}">
                <img src="${ image }" alt="Shirt Image">
                <p class="product__stock"> Stock: <span class="product__span"> ${quantity} Unidades </span> </p>
                <a id="btnV" href="details.html" class="btn__view"> Ver Detalle </a>
            </figure>
            <p class="product__description"> ${ name } </p>
            <div class="product__colors">
                <div class="product__negro">N</div>
                <div class="product__rojo">R</div>
            </div>
            <p class="product__price"> USD $${ price }.00 </p>
        </div>
        </div>
        `;
        
    }
    print.innerHTML = html;
}

export const getSelector = (products) => {
    const read = document.querySelector('.products');

    read.addEventListener('click', (e) => {
        
        const btnView = e.target.classList.contains('btn__view');
        if(!btnView){
            return;
        }
        const id = +e.target.closest('.product').id;
        const article = products.find( product => product.id === id);
        localStorage.setItem('detail', JSON.stringify(article));
        return article;
    });
}

export const printCart = (cartProducts) => {
    const print = document.querySelector('.cart-modal__products');
    let html = '';

    for( const key in cartProducts ){
        const { id, amount, image, category, price, quantity } = cartProducts[key];
        html += `
        <div id="${ id }" class="cart-modal__product">
            <figure class="cart-product__img">
                <img src="${ image }" alt="Img Shirt">
            </figure>
            
            <div class="cart-modal__details">
                <p> Categoria: <span class='nobold'> ${ category } </span> </p>
                <p> Precio Unitario:</p>
                <p class="nobold"> ${ price }.00 USD</p>
                <span> Existencia: &nbsp <span class="nobold"> <br> ${ quantity } Unidades </span></span>
                
                <div class="cart-modal__buttons">
                    &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                    <ion-icon class="less" name="remove-circle-outline"></ion-icon>
                    <span class="cart-modal__quantity"> &nbsp&nbsp ${ amount } &nbsp&nbsp </span>
                    <ion-icon class="plus" name="add-circle-outline"> </ion-icon>
                    &nbsp&nbsp&nbsp&nbsp    
                    <ion-icon class="trash" name="trash-outline"></ion-icon>
                </div>    
            </div>
        </div>
        `;
    }
    print.innerHTML = html;
}

export const printTotals = (db) => {
    const cartTotal = document.querySelector('.cart-modal__desc');
    let cantidad = 0;
    let totales = 0;

    for( const key in db.cart){
        const { amount, price } = db.cart[key];
        cantidad += amount;
        totales += amount * price;
    }

    let html = `
        <p> Cantidad Total: &nbsp<span class="fw"> ${ cantidad } </span></p>
        <p> Total a pagar: </p>
        <p class="fw"> $ ${ totales }.00 &nbsp USD </p>
    `;

    cartTotal.innerHTML = html;
}

