import React from 'react';
import { useLocalStore, useObserver } from 'mobx-react';
import qs from 'query-string';
import { routerStore } from './router';
import zk from './zk';

export const rootStore = {
    router: routerStore,
    zk,
};
const storeContext = React.createContext<typeof rootStore | null>(null);
(window as any).resourceStore = rootStore;
// @ts-ignore
export const StoreProvider = ({ children }) => {
    const store = useLocalStore(() => rootStore);
    return <storeContext.Provider value={store}>{children}</storeContext.Provider>;
};

export const useStore = () => {
    const store = React.useContext(storeContext);
    if (!store) {
        // this is especially useful in TypeScript so you don't need to be checking for null all the time
        throw new Error('useStore must be used within a StoreProvider.');
    }
    return store;
};

export const useRouterStore = () => {
    const store = useStore();
    return store.router;
};

export const useQuery = () => {
    const route = useRouterStore();
    return useObserver(() =>
        qs.parse(route.location.search, { parseNumbers: true, parseBooleans: true }),
    );
};

export const useParams = () => {};
