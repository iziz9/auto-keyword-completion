import { styled } from 'styled-components';
import { SearchIcon } from '../constants/icon';

// props로 내용 가져오기

const RecommendItem = () => {
	return (
		<ItemContainer>
			<div className="icon">
				<SearchIcon />
			</div>
			<div className="content">내용</div>
		</ItemContainer>
	);
};

const ItemContainer = styled.div`
	position: relative;
	width: 100%;
	height: 30px;
	display: flex;
	gap: 20px;
	align-items: center;
`;

export default RecommendItem;
