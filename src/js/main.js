import { database, filterProducts } from '../js/logic.js';
import { getSelector, printCart, printProducts, printTotals } from '../js/ui.js';
import { handels } from './handels.js';

const main = async() => {
    const db = await database();
    handels();
    printProducts(db.products);
    getSelector(db.products);
    printCart(db.cart);
    printTotals(db);
    filterProducts(db.products);
}
main();