const currentTime = Date.now();
const EXPIRE_TIME = 30 * 60 * 1000;

const getStorageItem = (searchValue: string) => {
	return localStorage.getItem(searchValue);
};

const parsingStorageItem = (searchValue: string) => {
	return searchValue && JSON.parse(getStorageItem(searchValue) as string);
};

export const CachingData = ({ searchValue, recommendList }: ICachingData) => {
	const expireAddedList = {
		data: recommendList,
		expire: currentTime + EXPIRE_TIME,
	};
	const jsonData = JSON.stringify(expireAddedList);
	localStorage.setItem(searchValue, jsonData);
};

const checkIsCacheExpired = (searchValue: string) => {
	const parsedData = parsingStorageItem(searchValue);

	if (parsedData.expire <= currentTime) {
		localStorage.removeItem(searchValue);
		return true;
	}

	return false;
};

export const getCachedData = (searchValue: string) => {
	const cachedData = getStorageItem(searchValue);
	if (!cachedData) return false;

	return checkIsCacheExpired(searchValue) ? false : parsingStorageItem(searchValue);
};
