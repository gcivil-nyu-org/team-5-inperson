export class ApiService {
    constructor() {
        this.baseUrl = 'http://127.0.0.1:8000/NycBasics/api'
        this.requestConfig = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    };

    async getParking() {
        const res = await fetch(`${this.baseUrl}/parking/`, this.requestConfig);
        const data = await res.json();
        console.log(process.env);
        return data;
    }

    async getWater() {
        const res = await fetch(`${this.baseUrl}/water/`, this.requestConfig);
        const data = await res.json();
        console.log(process.env);
        return data;
    }

    async getWifi() {
        const res = await fetch(`${this.baseUrl}/wifi/`, this.requestConfig);
        const data = await res.json();
        console.log(process.env);
        return data;
    }

    async getToilet() {
        const res = await fetch(`${this.baseUrl}/toilet/`, this.requestConfig);
        const data = await res.json();
        console.log(process.env);
        return data;
    }

    async getBench() {
        const res = await fetch(`${this.baseUrl}/bench/`, this.requestConfig);
        const data = await res.json();
        console.log(process.env);
        return data;
    }
}