import { database, getApi } from '../js/logic.js';
import { getSelector, printProducts } from '../js/ui.js';

const main = async() => {
    const db = await database();
    printProducts(db.products);
    getSelector(db.products);
}
main();