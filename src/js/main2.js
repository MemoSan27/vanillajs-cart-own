import { addToCart, database } from '../js/logic.js';
import { printDetail } from '../js/detail.js';
import { handels } from './handels.js';

const main2 = async() => {
    const db = await database();
    handels();
    printDetail(db.detail);
    addToCart(db);
}
main2();
