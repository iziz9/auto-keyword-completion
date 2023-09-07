import axios from 'axios';

const BASE_URL = 'https://chill-jasper-healer.glitch.me/sick';

const axiosFetch = axios.create({
	baseURL: BASE_URL,
	timeout: 5000,
	withCredentials: true,
});

class HttpClient {
	get(query: string) {
		return axiosFetch.get(BASE_URL, {
			params: {
				q: query,
			},
		});
	}
}

export const httpClient = new HttpClient();
