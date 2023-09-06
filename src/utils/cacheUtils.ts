const currentTime = Date.now();

const getStorageItem = (searchValue: string) => {
	return localStorage.getItem(searchValue);
};

const parsingStorageItem = (searchValue: string) => {
	return searchValue && JSON.parse(getStorageItem(searchValue) as string);
};

//recommendList가 없을 때도 캐싱해야 불필요한 요청 가지 않음
export const CachingData = ({ searchValue, recommendList }: ICachingData) => {
	const thirtyMinutes = 30 * 60 * 1000;
	const expireAddedList = {
		data: recommendList,
		expire: currentTime + thirtyMinutes,
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