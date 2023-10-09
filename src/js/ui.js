export const printProducts = ( products ) => {
    const print = document.querySelector('.products');
    let html = '';

    for(const item of products){
        const { id, name, price, quantity, image } = item;
        html += `
        <div id="${ id }" class="product">
        <a class="product__link" href="details.html" target="_blank">
            <figure class="product__img">
                <img src="${ image }" alt="Shirt Image">
                <p class="product__stock"> Stock: <span class="product__span"> ${quantity} Unidades </span> </p>
            </figure>
            <p class="product__description"> ${ name } </p>
            <div class="product__colors">
                <div class="product__negro">N</div>
                <div class="product__rojo">R</div>
            </div>
            <p class="product__price"> USD $${ price }.00 </p>
        </a>
        </div>
        `;
        
    }
    print.innerHTML = html;
}

export const printDetails = (products) => {

}