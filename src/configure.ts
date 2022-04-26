import { defined } from './lib/defined';
import { getTrueVals, setTrueVals } from './lib/trueVals';
import { getFalseVals, setFalseVals } from './lib/falseVals';
import { setPrefix } from './lib/prefix';
import { Config } from './types';

/**
 * TODO
 */
export const configure = ({ boolOptions, prefix }: Config): void => {
	if (defined(prefix)) {
		setPrefix(prefix);
	}

	if (defined(boolOptions)) {
		if (defined(boolOptions.trueVals)) {
			setTrueVals([...getTrueVals(), ...boolOptions.trueVals]);
		}

		if (defined(boolOptions.falseVals)) {
			setFalseVals([...getFalseVals(), ...boolOptions.falseVals]);
		}

		if (defined(boolOptions.override)) {
			if (defined(boolOptions.override.trueVals)) {
				setTrueVals(boolOptions.override.trueVals);
			}

			if (defined(boolOptions.override.falseVals)) {
				setFalseVals(boolOptions.override.falseVals);
			}
		}
	}
};
