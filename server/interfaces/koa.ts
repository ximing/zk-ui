import { Context as KoaContext } from 'koa';

export interface Service {}

export interface WS {
    sendMessageToAllSdk: (message: any) => void;
    sendMessageByHostName: (hostnames: Array<string>, message: any) => void;
}

export interface Context extends KoaContext {
    mongoDB: Db;
    svc: Service;
    ws: WS;
}
