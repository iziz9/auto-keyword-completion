import { styled } from 'styled-components';
import RecommendItem from './RecommendItem';
import { useSearchContext } from '../context/searchContext';
import { useFocusItemContext } from '../context/focusItemContext';
import { useSearchRequest } from '../hooks/useSearchRequest';

const RecommendList = () => {
	const { searchValue } = useSearchContext();
	const { focusIndex } = useFocusItemContext();
	const { recommendList } = useSearchRequest();

	return (
		<>
			{searchValue.length >= 1 && (
				<RecommendContainer>
					<span className="list-info">추천 검색어</span>
					<div className="list">
						{recommendList && recommendList.length < 1 && <span>검색어 없음</span>}
						{recommendList?.map((item, index) => (
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
	}
`;

export default RecommendList;
