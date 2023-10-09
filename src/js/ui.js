
export const printProducts = ( products ) => {
    const print = document.querySelector('.products');
    let html = '';

    for(const item of products){
        const { id, name, price, quantity, image } = item;
        html += `
        <div id="${ id }" class="product">
        <div class="product__link">
            <figure class="product__img">
                <img src="${ image }" alt="Shirt Image">
                <p class="product__stock"> Stock: <span class="product__span"> ${quantity} Unidades </span> </p>
                <a href="details.html" target="_blank" class="btn__view"> Ver Detalle </a>
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
        console.log(id);
        const article = products.find( product => product.id === id);
        console.log(article);
        localStorage.setItem('detail', JSON.stringify(article));
        return article;
    });
}