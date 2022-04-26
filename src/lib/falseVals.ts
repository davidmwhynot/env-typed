let falseVals_ = ['false', '0'];

export const getFalseVals = (): string[] => [...falseVals_];
export const setFalseVals = (falseVals: string[]): void => {
	falseVals_ = [...falseVals];
};
