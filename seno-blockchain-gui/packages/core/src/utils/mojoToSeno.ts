import BigNumber from 'bignumber.js';
import Unit from '../constants/Unit';
import senoFormatter from './senoFormatter';

export default function mojoToSeno(mojo: string | number | BigNumber): BigNumber {
  return senoFormatter(mojo, Unit.MOJO)
    .to(Unit.SENO)
    .toBigNumber();
}
