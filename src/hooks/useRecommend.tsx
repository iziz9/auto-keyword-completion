import { useState } from 'react';

export const useRecommend = () => {
	const [recommendList, setRecommendList] = useState<IResponseItem[]>([]);

	return { recommendList, setRecommendList };
};
