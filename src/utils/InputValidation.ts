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
