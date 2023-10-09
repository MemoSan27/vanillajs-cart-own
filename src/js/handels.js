export function handels () {
    const cart = document.querySelector('.nav__cart-btn');
    const modal = document.querySelector('.cart-modal');
                
    cart.addEventListener('click', () => {
        modal.classList.toggle('active');
    });
}