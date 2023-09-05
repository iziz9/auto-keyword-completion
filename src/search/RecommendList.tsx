import { styled } from 'styled-components';
import RecommendItem from './RecommendItem';

const RecommendList = () => {
	return (
		<RecommendContainer>
			{/* <div>검색어가 없으면 "검색어 없음" 표출</div> */}
			<span className="list-info">추천 검색어</span>
			<div className="list">
				<RecommendItem />
				<RecommendItem />
				<RecommendItem />
				<RecommendItem />
				<RecommendItem />
			</div>
		</RecommendContainer>
	);
};

const RecommendContainer = styled.section`
	position: relative;
	width: 100%;
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
