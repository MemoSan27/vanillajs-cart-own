import { addToCart, database } from '../js/logic.js';
import { handleTotalsDetails, printDetail } from '../js/detail.js';
import { handels, handleCart } from './handels.js';
import { printCart, printTotals } from './ui.js';

const main2 = async() => {
    const db = await database();
    handels();
    printDetail(db.detail);
    addToCart(db);
    printCart(db.cart);
    printTotals(db);
    handleCart(db);
    handleTotalsDetails(db);
}
main2();
