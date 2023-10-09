import { database } from '../js/logic.js';
import { printDetail } from '../js/detail.js';

const main2 = async() => {
    const db = await database();
    printDetail(db.detail);
}
main2();
