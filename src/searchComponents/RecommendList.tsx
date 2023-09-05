import { styled } from 'styled-components';
import RecommendItem from './RecommendItem';
import { useEffect, useState } from 'react';
import { httpClient } from '../api/request';
import { useSearchContext } from '../context/searchContext';

const RecommendList = () => {
	const { searchValue } = useSearchContext();

	const [recommendList, setRecommendList] = useState<IResponseItem[]>();

	useEffect(() => {
		const requestSearchResult = async () => {
			if (searchValue.length < 1) return false;

			const res = await httpClient.get(searchValue);
			console.log(res);
			setRecommendList(res.data);
			console.info('calling api');
		};
		requestSearchResult();
	}, [searchValue]);

	useEffect(() => {
		console.log(recommendList);
	}, [recommendList]);

	return (
		<RecommendContainer>
			<span className="list-info">추천 검색어</span>
			<div className="list">
				{!recommendList && <span>검색어 없음</span>}
				{recommendList?.map((item) => (
					<RecommendItem key={item.sickCd} text={item.sickNm} />
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
