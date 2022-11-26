import React, { useMemo } from 'react';
import { Trans } from '@lingui/macro';
import { useCurrencyCode, mojoToSenoLocaleString, CardSimple, useLocale } from '@seno/core';
import { useGetFarmedAmountQuery } from '@seno/api-react';

export default function FarmCardTotalSenoFarmed() {
  const currencyCode = useCurrencyCode();
  const [locale] = useLocale();
  const { data, isLoading, error } = useGetFarmedAmountQuery();

  const farmedAmount = data?.farmedAmount;

  const totalSenoFarmed = useMemo(() => {
    if (farmedAmount !== undefined) {
      return (
        <>
          {mojoToSenoLocaleString(farmedAmount, locale)}
          &nbsp;
          {currencyCode}
        </>
      );
    }
  }, [farmedAmount, locale, currencyCode]);

  return (
    <CardSimple
      title={<Trans>Total Seno Farmed</Trans>}
      value={totalSenoFarmed}
      loading={isLoading}
      error={error}
    />
  );
}
