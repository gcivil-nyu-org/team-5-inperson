import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { benchMock, waterMock, wifiMock, parkingMock, toiletMock } from './mock';

const emptyData = [];

export const server = setupServer(
    rest.get('http://127.0.0.1:8000/NycBasics/api/water/:lat/:lng/', (req, res, ctx) => {
        return res(ctx.json(waterMock));
    }),
    rest.get('http://127.0.0.1:8000/NycBasics/api/bench/:lat/:lng/', (req, res, ctx) => {
        return res(ctx.json(benchMock));
    }),
    rest.get('http://127.0.0.1:8000/NycBasics/api/toilet/:lat/:lng/', (req, res, ctx) => {
        return res(ctx.json(toiletMock));
    }),
    rest.get('http://127.0.0.1:8000/NycBasics/api/wifi/:lat/:lng/', (req, res, ctx) => {
        return res(ctx.json(wifiMock));
    }),
    rest.get('http://127.0.0.1:8000/NycBasics/api/parking/:lat/:lng/', (req, res, ctx) => {
        return res(ctx.json(parkingMock));
    }),
);