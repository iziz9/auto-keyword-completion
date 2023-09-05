import axios from 'axios';

const BASE_URL = 'http://localhost:4000/sick';

const axiosFetch = axios.create({
	baseURL: BASE_URL,
	timeout: 5000,
});

class HttpClient {
	fetch(query: string) {
		return axiosFetch.get(BASE_URL, {
			params: {
				q: query,
			},
		});
	}
}

export const httpClient = new HttpClient();
