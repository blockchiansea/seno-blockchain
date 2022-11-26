import BigNumber from 'bignumber.js';
import Unit from '../constants/Unit';
import senoFormatter from './senoFormatter';

export default function mojoToCATLocaleString(mojo: string | number | BigNumber, locale?: string) {
  return senoFormatter(mojo, Unit.MOJO)
    .to(Unit.CAT)
    .toLocaleString(locale);
}
