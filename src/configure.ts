import { defined } from './utils/defined';
import { getTrueVals, setTrueVals } from './utils/trueVals';
import { getFalseVals, setFalseVals } from './utils/falseVals';
import { Config } from './types';

/**
 * TODO
 */
export const configure = (config: Config): void => {
	if (defined(config.trueVals)) {
		setTrueVals([...getTrueVals(), ...config.trueVals]);
	}

	if (defined(config.falseVals)) {
		setFalseVals([...getFalseVals(), ...config.falseVals]);
	}

	if (defined(config.override)) {
		if (defined(config.override.trueVals)) {
			setTrueVals(config.override.trueVals);
		}

		if (defined(config.override.falseVals)) {
			setFalseVals(config.override.falseVals);
		}
	}
};
