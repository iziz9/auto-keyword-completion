import { styled } from 'styled-components';
import { SearchIcon } from '../constants/icon';
import { useSearchContext } from '../context/searchContext';
import { useDebounce } from '../hooks/useDebounce';
import { useEffect, useState } from 'react';
import { useFocusItemContext } from '../context/focusItemContext';
import { useRecommendContext } from '../context/recommendContext';

const SearchBox = () => {
	const { setSearchValueHandler } = useSearchContext();
	const { focusIndex, setFocusIndex } = useFocusItemContext();
	const [tempQuery, setTempQuery] = useState<string>('');
	const completeQuery = useDebounce(tempQuery);
	const { recommendList } = useRecommendContext();

	useEffect(() => {
		setSearchValueHandler(completeQuery);
	}, [completeQuery]);

	const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!recommendList) return;

		switch (e.key) {
			case 'ArrowDown':
				if (focusIndex === recommendList.length - 1) return setFocusIndex(0);
				setFocusIndex((prev: number) => prev + 1);
				break;
			case 'ArrowUp':
				if (focusIndex === 0) return setFocusIndex(0);
				setFocusIndex((prev: number) => prev - 1);
				break;
			case 'Escape':
				setFocusIndex(-1);
				setSearchValueHandler('');
				break;
			case 'Enter':
				setFocusIndex(0);
				setTempQuery(recommendList[focusIndex].sickNm);
		}
	};

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTempQuery(e.target.value);
		setFocusIndex(-1);
	};

	return (
		<SearchBoxContainer>
			<Input>
				<input
					type="text"
					placeholder="질환명을 입력해주세요."
					value={tempQuery}
					onChange={(e) => {
						inputChangeHandler(e);
					}}
					onKeyDown={(e) => keyDownHandler(e)}
				/>
				<button className="icon">
					<SearchIcon />
				</button>
			</Input>
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
		font-size: 18px;
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
