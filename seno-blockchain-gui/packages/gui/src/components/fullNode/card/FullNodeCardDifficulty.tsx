import React from 'react';
import { Trans } from '@lingui/macro';
import { FormatLargeNumber, CardSimple } from '@seno/core';
import { useGetBlockchainStateQuery } from '@seno/api-react';

export default function FullNodeCardDifficulty() {
  const { data, isLoading, error } = useGetBlockchainStateQuery();
  const value = data?.difficulty;

  return (
    <CardSimple
      loading={isLoading}
      valueColor="textPrimary"
      title={<Trans>Difficulty</Trans>}
      value={<FormatLargeNumber value={value} />}
      error={error}
    />
  );
}
