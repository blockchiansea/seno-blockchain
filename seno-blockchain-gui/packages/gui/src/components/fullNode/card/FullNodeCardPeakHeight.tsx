import React from 'react';
import { Trans } from '@lingui/macro';
import { FormatLargeNumber, CardSimple } from '@seno/core';
import { useGetBlockchainStateQuery } from '@seno/api-react';

export default function FullNodeCardPeakHeight() {
  const { data, isLoading, error } = useGetBlockchainStateQuery();
  const value = data?.peak?.height ?? 0;

  return (
    <CardSimple
      loading={isLoading}
      valueColor="textPrimary"
      title={<Trans>Peak Height</Trans>}
      value={<FormatLargeNumber value={value} />}
      error={error}
    />
  );
}
