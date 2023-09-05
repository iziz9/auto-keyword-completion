import { styled } from 'styled-components';
import SearchBox from './searchComponents/SearchBox';
import { SearchValueProvider } from './context/searchContext';
import RecommendList from './searchComponents/RecommendList';

function App() {
	return (
		<Main>
			<title className="title">
				<span>국내 모든 임상시험 검색하고</span>
				<span>온라인으로 참여하기</span>
			</title>
			<SearchValueProvider>
				<SearchBox />
				<RecommendList />
			</SearchValueProvider>
		</Main>
	);
}

const Main = styled.main`
	position: relative;
	width: 834px;
	margin: 0 auto;
	background-color: #cae9ff;
	border-radius: 42px;
	padding: 30px 0;

	.title {
		margin: auto;
		width: 500px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin: 0px auto;
		padding: 50px 0 50px;
		text-align: center;
		font-weight: 800;
		font-size: 23px;
	}
`;

export default App;
