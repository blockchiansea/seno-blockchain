import BigNumber from 'bignumber.js';
import Unit from '../constants/Unit';
import senoFormatter from './senoFormatter';

export default function catToMojo(cat: string | number | BigNumber): BigNumber {
  return senoFormatter(cat, Unit.CAT)
    .to(Unit.MOJO)
    .toBigNumber();
}
