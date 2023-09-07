# 3주차 개인과제
## 배포 링크

[배포 링크]()

## 설치 및 실행방법

```js
$ git clone https://github.com/iziz9/auto-keyword-completion

$ npm install

$ npm run dev
```

---

## 설명

### API 호출별 로컬 캐싱 구현

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
- 로컬스토리지를 이용해 캐싱 합니다.
- 로컬스토리지는 자동 expire 설정이 불가하기 때문에 검색어 캐싱 시 expire time을 `Date.now()` 메서드를 이용해 직접 넣어주고, 이후 같은 검색어를 재 입력 시 현재시간과 비교해 만료되었을 경우 캐싱데이터를 삭제합니다.
- 추천검색어가 없을 때에도 캐싱해 이후 같은 검색어 입력 시 불필요하게 api요청이 가지 않도록 구현했습니다.


### API 호출 횟수를 줄이는 전략

```js
// 캐싱데이터를 불러오는 커스텀 훅
export const useSearchRequest = () => {
	const { searchValue } = useSearchContext();
	const [recommendList, setRecommendList] = useState<IResponseItem[]>([]);

	useEffect(() => {
		!searchValue && setRecommendList([]);

		const { data: cachedData } = getCachedData(searchValue);

		const requestSearchResult = async () => {
			if (searchValue.length < 1) return false;
			try {
				const res = await httpClient.get(searchValue);
				console.log(res);
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

	return { recommendList, setRecommendList };
};
```
- useSearchRequest 커스텀 훅에서 캐싱된 데이터를 확인하고, 없거나 삭제되었을 경우 api를 호출하기 떄문에 불필요한 api호출을 줄일 수 있습니다.
(api가 두번 호출되는 문제가 있어 수정 예정입니다.)

### 키보드로 추천검색어 이동
```js
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

