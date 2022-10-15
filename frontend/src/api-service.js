export class ApiService {
    constructor() {
        this.baseUrl = 'http://127.0.0.1:8000/NycBasics/api'
        this.requestConfig = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    };

    async getParking(mapCenter) {
        const res = await fetch(`${this.baseUrl}/parking/${mapCenter.lat}/${mapCenter.lng * -1}/`, this.requestConfig);
        const data = await res.json();
        return data;
    }

    async getWater(mapCenter) {
        const res = await fetch(`${this.baseUrl}/water/${mapCenter.lat}/${mapCenter.lng * -1}/`, this.requestConfig);
        const data = await res.json();
        return data;
    }

    async getWifi(mapCenter) {
        const res = await fetch(`${this.baseUrl}/wifi/${mapCenter.lat}/${mapCenter.lng * -1}/`, this.requestConfig);
        const data = await res.json();
        return data;
    }

    async getToilet(mapCenter) {
        const res = await fetch(`${this.baseUrl}/toilet/${mapCenter.lat}/${mapCenter.lng * -1}/`, this.requestConfig);
        const data = await res.json();
        return data;
    }

    async getBench(mapCenter) {
        const res = await fetch(`${this.baseUrl}/bench/${mapCenter.lat}/${mapCenter.lng * -1}/`, this.requestConfig);
        const data = await res.json();
        return data;
    }
}