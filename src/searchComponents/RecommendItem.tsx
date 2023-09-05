import { styled } from 'styled-components';
import { SearchIcon } from '../constants/icon';

// props로 내용 가져오기

const RecommendItem = ({ text }: { text: string }) => {
	return (
		<ItemContainer>
			<div className="icon">
				<SearchIcon />
			</div>
			<div className="content">{text}</div>
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
	cursor: pointer;
`;

export default RecommendItem;
