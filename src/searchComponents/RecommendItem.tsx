import { styled } from 'styled-components';
import { SearchIcon } from '../constants/icon';

// props로 내용 가져오기

const RecommendItem = ({ sickNm, focus }: IRecommendItem) => {
	return (
		<ItemContainer>
			<div className={focus ? 'focused inner' : 'inner'}>
				<div className="icon">
					<SearchIcon />
				</div>
				<div className="content">{sickNm}</div>
			</div>
		</ItemContainer>
	);
};

const ItemContainer = styled.div`
	position: relative;
	width: 100%;
	height: 30px;

	.inner {
		position: relative;
		display: flex;
		gap: 20px;
		align-items: center;
		cursor: pointer;

		&.focused {
			background-color: aliceblue;
		}
	}
`;

export default RecommendItem;
