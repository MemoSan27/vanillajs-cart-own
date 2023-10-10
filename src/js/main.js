import { addToCart, database, getApi } from '../js/logic.js';
import { getSelector, printProducts } from '../js/ui.js';
import { handels } from './handels.js';

const main = async() => {
    const db = await database();
    handels();
    printProducts(db.products);
    getSelector(db.products);
    
}
main();