import { styled } from 'styled-components';
import { SearchIcon } from '../constants/icon';

// props로 내용 가져오기

const RecommendItem = ({ sickCd, sickNm }: IResponseItem) => {
	return (
		<ItemContainer>
			<div className="icon">
				<SearchIcon />
			</div>
			<div className="content">
				<span>{sickNm} </span>
				<span className="cd">({sickCd})</span>
			</div>
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

	.cd {
		font-size: 13px;
		color: #949292;
	}
`;

export default RecommendItem;
