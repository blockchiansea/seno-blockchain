import BigNumber from 'bignumber.js';
import Unit from '../constants/Unit';
import senoFormatter from './senoFormatter';

export default function senoToMojo(seno: string | number | BigNumber): BigNumber {
  return senoFormatter(seno, Unit.SENO)
    .to(Unit.MOJO)
    .toBigNumber();
}
