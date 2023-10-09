import { database, getApi } from '../js/logic.js';

const main = async() => {
    const db = await database();
    console.log(db);
}
main();