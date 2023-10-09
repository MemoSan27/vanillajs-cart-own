import { database, getApi } from '../js/logic.js';
import { printProducts } from '../js/ui.js';

const main = async() => {
    const db = await database();
    printProducts(db.products);
}
main();