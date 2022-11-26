import { useMemo } from 'react';
import type { Wallet } from '@seno/api';
import { WalletType } from '@seno/api';
import BigNumber from 'bignumber.js';
import { mojoToCATLocaleString, mojoToSenoLocaleString, useLocale } from '@seno/core';

export default function useWalletHumanValue(wallet: Wallet, value?: string | number | BigNumber, unit?: string): string {
  const [locale] = useLocale();

  return useMemo(() => {
    if (wallet && value !== undefined) {
      const localisedValue = wallet.type === WalletType.CAT
        ? mojoToCATLocaleString(value, locale)
        : mojoToSenoLocaleString(value, locale);

      return `${localisedValue} ${unit}`;
    }

    return '';
  }, [wallet, value, unit, locale]);
}
