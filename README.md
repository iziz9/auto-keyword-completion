# 3주차 개인과제
프리온보딩 3주차에 진행한 개인과제입니다.

기간 : 2023.09.05. ~ 2023.09.08

## 배포 링크

[✨ 배포 링크](https://auto-keyword-completion.netlify.app/)

📍 서버를 사용하지 않는 동안 중지되어 있기 때문에 첫 api요청은 응답이 느릴 수 있습니다.  

## 설치 및 실행방법

```js
$ git clone https://github.com/iziz9/auto-keyword-completion

$ cd auto-keyword-completion

$ npm install

$ npm run dev
```

## 기술스택

![React](https://img.shields.io/badge/ReactJS-61DAFB?style=for-the-badge&logo=React&logoColor=white)
![Typescript](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white)
![styledComponents](https://img.shields.io/badge/styledComponents-DB7093?style=for-the-badge&logo=styledComponents&logoColor=white)


## 프로젝트 구조

```js
📂 src/
├── api/
│   └── request.ts
├── components/
│   ├── RecommendItem.tsx
│   ├── RecommendList.tsx
│   └── SearchBox.tsx
├── constants/
│   └── icon.tsx
├── context/
│   ├── focusItemContext.tsx
│   ├── recommendContext.tsx
│   └── seawrchContext.tsx
├── hooks/
│   └── useDebounce.tsx
├── utils/
│   └── cacheUtils.ts
├── app.tsx
├── globalStyles.ts
├── main.tsx
└── vite-env.d.ts 
```

---

## 프로젝트 설명
> 관심사 분리를 위한 모듈화를 중점으로 고민하고 수행한 프로젝트입니다. 
- 입력한 검색어가 포함된 추천 검색어를 최대 8개까지 표시해줍니다.
- 자음이나 모음만 입력했을 경우 
- 검색창에서 키보드를 이용해 추천검색어 목록으로 포커스를 이동할 수 있습니다.
- 포커싱 상태에서 `Enter` 키를 누르면 검색창에 해당 추천검색어가 채워집니다.
- 포커싱 상태에서 `ESC` 키를 누르면 추천검색어 섹션이 닫힙니다.

### 📌 상태관리

```js
// App.tsx

import { SearchValueProvider } from './context/searchContext';
import { ChangeFocusItemProvider } from './context/focusItemContext';
import { RecommendProvider } from './context/recommendContext';

function App() {
	return (
		<Main>
			<title className="title">
				<span>국내 모든 임상시험 검색하고</span>
				<span>온라인으로 참여하기</span>
			</title>
			<RecommendProvider>
				<SearchValueProvider>
					<ChangeFocusItemProvider>
						<SearchBox />
						<RecommendList />
					</ChangeFocusItemProvider>
				</SearchValueProvider>
			</RecommendProvider>
		</Main>
	);
}
```
- 관심사 분리 및 불필요한 렌더링을 줄이기 위해 <검색어 입력 / 추천검색어 리스트> `App.tsx`에서 두가지 기능으로 컴포넌트를 분리했습니다.
- 각 컴포넌트가 수행하는 역할이 달라 상위 컴포넌트에서 상태를 관리하고 props를 내리게 되면 코드 가독성이 떨어질 것으로 생각해 ContextAPI를 활용했습니다.
- input에 입력한 검색어를 관리할 `SearchContext`, 
키보드로 추천검색어 포커싱을 위해 index상태를 관리할 `focusItemContext`, 
검색 결과를 관리할 `recommendContext` 세가지 context를 두 컴포넌트에서 사용할 수 있도록 했습니다.


### 📌 API 호출별 로컬 캐싱 구현

```js
// cacheUtils.ts

export const CachingData = ({ searchValue, recommendList }: ICachingData) => {
	const thirtyMinutes = 30 * 60 * 1000;
	const expireAddedList = {
		data: recommendList,
		expire: currentTime + thirtyMinutes,
	};
	const jsonData = JSON.stringify(expireAddedList);
	localStorage.setItem(searchValue, jsonData);
};

const checkIsCacheExpired = (searchValue: string) => {
	const parsedData = parsingStorageItem(searchValue);

	if (parsedData.expire <= currentTime) {
		localStorage.removeItem(searchValue);
		return true;
	}

	return false;
};

export const getCachedData = (searchValue: string) => {
	const cachedData = getStorageItem(searchValue);
	if (!cachedData) return false;

	return checkIsCacheExpired(searchValue) ? false : parsingStorageItem(searchValue);
};
```
- 로컬스토리지를 이용해 캐싱합니다.
  (상태로 저장하는 방법도 고려했으나, 값을 사용할 때 리렌더링되고 다른 탭에서 페이지를 열 경우 초기화된다는 단점이 있어 배제했습니다.)
- 검색어 캐싱 시 expire time을 `Date.now()` 메서드를 이용해 직접 넣어주고, 이후 같은 검색어를 재 입력 시 현재시간과 비교해 만료되었을 경우 캐싱데이터를 삭제합니다.
- 추천검색어가 없을 때에도 캐싱해 이후 같은 검색어 입력 시 불필요하게 api요청이 가지 않도록 구현했습니다.


### 📌 API 호출 횟수를 줄이는 전략

1. debounce 사용
```js
export const useDebounce = (tempQuery: string) => {
	const [completeQuery, setCompleteQuery] = useState('');

	useEffect(() => {
		const debounce = setTimeout(() => {
			return setCompleteQuery(tempQuery);
		}, 300);
		return () => clearTimeout(debounce);
	}, [tempQuery]);

	return completeQuery;
};
```
- input의 change이벤트를 그룹화 해 특정 시간이 지난 후 한번의 이벤트만 발생하도록 debounce 커스텀 훅을 만들었습니다.
- 사용자가 텍스트를 입력하는 동안은 `setTimeout`함수가 매번 초기화므로 아무 일도 일어나지 않다가, 키에서 손을 떼고 300ms가 지나면 setCompleteQuery가 실행됩니다.
- 여기서 리턴된 completeQuery가 api에 넣을 쿼리값이 되기 때문에 입력이 끝나기 전에는 api요청이 가지 않습니다.


2. input입력 값 유효성 검증

```js
export const checkInputValid = (completeQuery: string) => {
	const trimedQuery = completeQuery.trim();
	const consonantRegex = /^[ㄱ-ㅎ]+$/;
	const vowelRegex = /^[ㅏ-ㅣ]+$/;
	const numberRegex = /^[0-9]+$/;

	const isInputConsonant = !consonantRegex.test(trimedQuery);
	const isInputVowel = !vowelRegex.test(trimedQuery);
	const isInputNumber = !numberRegex.test(trimedQuery);
	const isValid = isInputConsonant && isInputVowel && isInputNumber;

	return isValid;
};
```
- 자음 또는 모음, 숫자만 입력할 경우 api 요청 전 return되어 아무 동작도 발생하지 않습니다.
- 영문자를 입력할 경우 db의 `sickCd` 와 일치하는 값도 같이 들어오기 때문에 관련없는 검색어가 같이 추천되지만 질병명에 영문자가 포함된 경우가 있어 검증 기준에 넣지 않았습니다.


3. 캐싱 데이터 활용

```js
// 전역으로 응답 데이터를 활용하기 위한 context
export const useRecommendContext: any = () => useContext(recommendContext);

export const RecommendProvider = ({ children }: { children: ReactNode }) => {
	const [recommendList, setRecommendList] = useState<IResponseItem[]>([]);

	return (
		<recommendContext.Provider value={{ recommendList, setRecommendList }}>
			{children}
		</recommendContext.Provider>
	);
};

```

```js
// 추천검색어를 표시할 컴포넌트
const RecommendList = () => {
	const { searchValue } = useSearchContext();
	const { focusIndex } = useFocusItemContext();
	const { recommendList, setRecommendList } = useRecommendContext();

	useEffect(() => {
		if (!searchValue) return setRecommendList([]);

		const { data: cachedData } = getCachedData(searchValue);

		const requestSearchResult = async () => {
			if (searchValue.length < 1) return false;
			try {
				const res = await httpClient.get(searchValue);
				setRecommendList(res.data);
				CachingData({ searchValue, recommendList: res.data });
			} catch (err) {
				alert(err);
			} finally {
				console.info('calling api');
			}
		};

		cachedData ? setRecommendList(cachedData) : requestSearchResult();
	}, [searchValue]);
	.
	.
	return(...)
}
```
```js
// input 컴포넌트
const SearchBox = () => {
	const { setSearchValueHandler } = useSearchContext();
	const { focusIndex, setFocusIndex } = useFocusItemContext();
	const [tempQuery, setTempQuery] = useState<string>('');
	const completeQuery = useDebounce(tempQuery);
	const { recommendList } = useRecommendContext();

	const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!recommendList.length) return;

		switch (e.key) {
			case 'ArrowDown':
				if (focusIndex === recommendList.length - 1) return setFocusIndex(0);
				setFocusIndex((prev: number) => prev + 1);
				break;
        .
        .
        .
			case 'Enter':
				setFocusIndex(0);
				setTempQuery(recommendList[focusIndex].sickNm);
    }
  }
  return (...)
  }
```
- 입력된 값으로 캐싱된 데이터를 확인하고, 없거나 삭제되었을 경우 api를 호출하기 떄문에 불필요한 api호출을 줄일 수 있습니다.
- 키보드로 추천검색어 이동하는 기능을 위해 (input 요소가 있는) `SearchBox` 컴포넌트에서도 api응답값을 사용하게 됩니다.
- 응답값 사용 시 api를 다시 호출하지 않기 위해 ContextAPI를 활용해 전역에서 데이터를 관리했습니다.


### 📌 키보드로 추천검색어 이동
```js
// SearchBox.tsx
	const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (!recommendList.length) return;

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
```

```js
// RecommendList.tsx

  <RecommendContainer>
    <span className="list-info">추천 검색어</span>
    <div className="list">
      {recommendList && recommendList.length < 1 && <span>검색어 없음</span>}
      {recommendList?.map((item, index) => (
        <RecommendItem key={item.sickCd} sickNm={item.sickNm} focus={focusIndex === index} />
      ))}
    </div>
  </RecommendContainer>
```
- `focusIndex` state와 추천검색어 리스트의 index를 비교해 일치할 경우 배경색을 지정하는 방식으로 구현했습니다.
- 포커싱 된 검색어에서 enter 키를 누르면 input에 해당 검색어가 세팅됩니다.
- index 0에서는 더이상 위쪽 방향키를 누르지 못하고, 가장 마지막 index에서 아래 방향키를 누를 경우 다시 0으로 돌아가도록 구현했습니다.

---

## 기타

```js
// vite.env.d.ts

/// <reference types="vite/client" />

interface IResponseItem {
	sickCd: string;
	sickNm: string;
}

interface ISearchContext {
	searchValue?: string;
	setSearchValueHandler?: (searchValue: string) => void;
}

interface ICachingData {
	searchValue: string;
	recommendList: {
		data: IResponseItem[];
	};
}
```

- `vite-env.d.ts` 파일에서 타입을 선언해 전역에서 사용할 수 있도록 하고, import 코드로 컴포넌트 구현부를 확인하기 어려워지는 것을 방지합니다.