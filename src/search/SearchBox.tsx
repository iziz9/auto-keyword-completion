import { styled } from 'styled-components';
import { SearchIcon } from '../constants/icon';
import RecommendList from './RecommendList';

const SearchBox = () => {
	return (
		<SearchBoxContainer>
			<Input>
				<input type="text" placeholder="질환명을 입력해주세요." />
				<div className="icon">
					<SearchIcon />
				</div>
			</Input>
			<RecommendList />
		</SearchBoxContainer>
	);
};

const SearchBoxContainer = styled.div`
	position: relative;
	width: 70%;
	margin: auto;
`;

const Input = styled.section`
	position: relative;
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 50px;
	background-color: white;
	border: 0px #c2c8ce;
	border-radius: 42px;
	padding: 12px 20px;
	box-shadow: 0px 2px 4px rgba(30, 32, 37, 0.1);
	box-sizing: border-box;
	align-items: center;

	input {
		width: 450px;
		height: 45px;
		color: #4f4f4f;
		font-size: 20px;
		border: none;
		box-sizing: border-box;

		&:focus {
			outline: none;
		}
	}
	.icon {
		margin: auto 0;
		cursor: pointer;
	}
`;

export default SearchBox;
