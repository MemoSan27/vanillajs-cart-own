import { database, getApi } from '../js/logic.js';
import { getSelector } from '../js/ui.js';

const main2 = async() => {
    const db = await database();
    getSelector(db.products);
}
main2();
