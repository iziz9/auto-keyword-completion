import { useEffect, useState } from 'react';

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
