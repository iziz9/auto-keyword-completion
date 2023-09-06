import { styled } from 'styled-components';
import RecommendItem from './RecommendItem';
import { useEffect, useState } from 'react';
import { httpClient } from '../api/request';
import { useSearchContext } from '../context/searchContext';
import { CachingData, getCachedData } from '../utils/cacheUtils';

const RecommendList = () => {
	const { searchValue } = useSearchContext();

	const [recommendList, setRecommendList] = useState<IResponseItem[]>();

	useEffect(() => {
		!searchValue && setRecommendList([]);

		const cachedData = getCachedData(searchValue);

		console.log(cachedData);

		// const requestSearchResult = async () => {
		// 	if (searchValue.length < 1) return false;

		// 	try {
		// 		const res = await httpClient.get(searchValue);
		// 		setRecommendList(res.data);
		// 		console.log(res.data);

		// 		CachingData({ searchValue, recommendList: res.data });
		// 	} catch (err) {
		// 		alert(err);
		// 	} finally {
		// 		console.info('calling api');
		// 	}
		// };

		// requestSearchResult();
	}, [searchValue]);

	return (
		<RecommendContainer>
			<span className="list-info">추천 검색어</span>
			<div className="list">
				{recommendList && recommendList.length < 1 && <span>검색어 없음</span>}
				{recommendList?.map((item) => (
					<RecommendItem key={item.sickCd} sickNm={item.sickNm} sickCd={item.sickCd} />
				))}
			</div>
		</RecommendContainer>
	);
};

const RecommendContainer = styled.section`
	position: relative;
	width: 70%;
	min-height: 300px;
	background-color: white;
	margin: 8px auto;
	border: 0px #c2c8ce;
	border-radius: 30px;
	padding: 30px 30px;
	box-sizing: border-box;
	box-shadow: 0px 2px 4px rgba(30, 32, 37, 0.1);
	display: flex;
	flex-direction: column;
	gap: 20px;

	.list-info {
		color: #a0a0a0;
	}

	.list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
`;

export default RecommendList;
