import { useEffect, useState } from 'react';
import { useSearchContext } from '../context/searchContext';
import { CachingData, getCachedData } from '../utils/cacheUtils';
import { httpClient } from '../api/request';

export const useSearchRequest = () => {
	const { searchValue } = useSearchContext();
	const [recommendList, setRecommendList] = useState<IResponseItem[]>([]);

	useEffect(() => {
		!searchValue && setRecommendList([]);

		const { data: cachedData } = getCachedData(searchValue);

		const requestSearchResult = async () => {
			if (searchValue.length < 1) return false;
			try {
				const res = await httpClient.get(searchValue);
				console.log(res);
				setRecommendList(res.data);
				CachingData({ searchValue, recommendList: res.data });
			} catch (err) {
				alert(err);
			} finally {
				console.info('calling api');
			}
		};

		cachedData ? setRecommendList(cachedData) : requestSearchResult();
	}, [searchValue]);

	return { recommendList, setRecommendList };
};
