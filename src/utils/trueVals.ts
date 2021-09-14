let trueVals_ = ['true', '1'];

export const getTrueVals = (): string[] => [...trueVals_];
export const setTrueVals = (trueVals: string[]): void => {
	trueVals_ = [...trueVals];
};
