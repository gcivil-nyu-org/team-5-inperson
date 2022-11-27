export class ApiService {
    constructor() {
        if (window.location.hostname === 'localhost') {
            this.baseUrl = 'http://127.0.0.1:8000/NycBasics/api'
        }
        else {
            this.baseUrl = window.location.origin + '/NycBasics/api'
        }
        this.requestConfig = {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    };

    async logout(userData) {
        const res = await fetch(`${this.baseUrl}/logout/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: userData['token'],
            })
        });
        const data = await res.json();

        if (res.status >= 200 && res.status < 300) {
            return data;
        }
        else {
            return Promise.reject(data);
        }
    }

    async login(userData) {
        const res = await fetch(`${this.baseUrl}/login/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: userData['email'],
                password: userData['password'],
            })
        });
        const data = await res.json();

        if (res.status >= 200 && res.status < 300) {
            return data;
        }
        else {
            return Promise.reject(data);
        }
    }

    async addUser(userData) {
        const res = await fetch(`${this.baseUrl}/addUser/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userData['username'],
                email: userData['email'],
                password: userData['password'],
                system_otp: userData['system_otp'],
            })
        });
        const data = await res.json();

        if (res.status >= 200 && res.status < 300) {
            return data;
        }
        else {
            return Promise.reject(data);
        }
    }

    async addUserSendEmail(userData) {
        const res = await fetch(`${this.baseUrl}/addUser_SendEmail/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: userData['username'],
                email: userData['email'],
                password: userData['password'],
                system_otp: userData['system_otp'],
            })
        });
        const data = await res.json();

        if (res.status >= 200 && res.status < 300) {
            return data;
        }
        else {
            return Promise.reject(data);
        }
    }

    async verifyEmail(userData) {
        const res = await fetch(`${this.baseUrl}/verification/${userData.email}/${userData.code}/`, this.requestConfig);
        const data = await res.json();

        if (res.status >= 200 && res.status < 300) {
            return data;
        }
        else {
            return Promise.reject(data);
        }
    }

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

    async getReview(amenity_type, amenity_id) {
        const res = await fetch(`${this.baseUrl}/rating_review/${amenity_type}/${amenity_id}/`, this.requestConfig);
        const data = await res.json();
        return data;
    }

    async addReview(newReview) {
        const res = await fetch(`${this.baseUrl}/create_rating/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newReview)
        })

        const data = await res.json();
        return data

    }

    async updateReview(updatedReview) {
        const res = await fetch(`${this.baseUrl}/review/${updatedReview.id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedReview)
        })

        const data = await res.json();
        return data

    }



    async resetPassword(userData) {
        const res = await fetch(`${this.baseUrl}/reset_password/${userData.email}/${userData.code}/`, this.requestConfig);
        const data = await res.json();

        if (res.status >= 200 && res.status < 300) {
            return data;
        }
        else {
            return Promise.reject(data);
        }
    }

    async resetPasswordSendEmail(userData) {
        const res = await fetch(`${this.baseUrl}/reset_password_SendEmail/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userData['email'],
                password_otp: userData['code'],
            })
        });
        const data = await res.json();

        if (res.status >= 200 && res.status < 300) {
            return data;
        }
        else {
            return Promise.reject(data);
        }
    }

    async deleteReview(deletedReview) {
        const res = await fetch (`${this.baseUrl}/review/${deletedReview.id}/` , {
            method: 'DELETE',
            body: JSON.stringify(this.state)   //no JSON data returned. Don't need headers.
        })
        const data = await res;
        return data
    }
}
