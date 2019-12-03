import { observable, action } from 'mobx';

import { ZKIns } from '../types/store';
import { zkdb } from './db';
import nanoid from 'nanoid';

class Zk {
    @observable
    list: ZKIns[] = [];

    @action
    setState(state: Partial<Zk>) {
        (Object.keys(state) as Array<keyof Zk>).forEach(key => {
            if (typeof this[key] !== 'undefined') {
                (this as any)[key] = state[key];
            }
        });
    }

    @action
    init() {
        this.list = zkdb.get('list').value() as ZKIns[];
    }

    @action
    create(name: string, url: string) {
        this.list.push({
            name,
            url,
            id: nanoid(5),
        });
        zkdb.set('list', this.list).write();
    }
}

export default new Zk();
