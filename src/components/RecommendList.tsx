import { styled } from 'styled-components';
import RecommendItem from './RecommendItem';
import { useSearchContext } from '../context/searchContext';
import { useFocusItemContext } from '../context/focusItemContext';
import { useEffect } from 'react';
import { CachingData, getCachedData } from '../utils/cacheUtils';
import { httpClient } from '../api/request';
import { useRecommendContext } from '../context/recommendContext';

const MAX_RESULTS = 8;

const RecommendList = () => {
	const { searchValue } = useSearchContext();
	const { focusIndex } = useFocusItemContext();
	const { recommendList, setRecommendList } = useRecommendContext();

	useEffect(() => {
		if (!searchValue) return setRecommendList([]);

		const { data: cachedData } = getCachedData(searchValue);

		const requestSearchResult = async () => {
			if (searchValue.length < 1) return false;
			try {
				const res = await httpClient.get(searchValue);
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

	return (
		<>
			{searchValue.length >= 1 && (
				<RecommendContainer>
					<span className="list-info">추천 검색어</span>
					<div className="list">
						{recommendList && recommendList.length < 1 && <span>검색어 없음</span>}
						{recommendList.slice(0, MAX_RESULTS).map((item: IResponseItem, index: number) => (
							<RecommendItem key={item.sickCd} sickNm={item.sickNm} focus={focusIndex === index} />
						))}
					</div>
				</RecommendContainer>
			)}
		</>
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
		overflow-y: scroll;

		&::-webkit-scrollbar {
			width: 14px;
			padding: 20px;
		}

		&::-webkit-scrollbar-thumb {
			height: 10%;
			background-color: rgb(107, 107, 107);
			border-radius: 5px;
		}
		&::-webkit-scrollbar-track {
			margin: 3px;
		}
	}
`;

export default RecommendList;
