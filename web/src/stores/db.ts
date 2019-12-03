import lowdb from 'lowdb/lib/main';
import LocalStorage from 'lowdb/adapters/LocalStorage';
export const zkdb = lowdb(new LocalStorage('zk'));
zkdb.defaults({ list: [] }).write();
