export const checkInputValid = (completeQuery: string) => {
	const consonantRegex = /^[ㄱ-ㅎ]+$/;
	const vowelRegex = /^[ㅏ-ㅣ]+$/;
	const numberRegex = /^[0-9]+$/;

	const isInputConsonant = !consonantRegex.test(completeQuery);
	const isInputVowel = !vowelRegex.test(completeQuery);
	const isInputNumber = !numberRegex.test(completeQuery);
	const isValid = isInputConsonant && isInputVowel && isInputNumber;

	return isValid;
};
