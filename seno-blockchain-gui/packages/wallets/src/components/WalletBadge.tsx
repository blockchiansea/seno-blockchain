import React from 'react';
import { Trans } from '@lingui/macro';
import { Tooltip } from '@seno/core';
import { useGetCatListQuery } from '@seno/api-react';
import { VerifiedUser as VerifiedUserIcon, VerifiedUserProps } from '@mui/icons-material';
import styled from 'styled-components';
import type { Wallet } from '@seno/api';
import { WalletType } from '@seno/api';

const StyledSmallBadge = styled(VerifiedUserIcon)`
  font-size: 1rem;
`;

type Props = VerifiedUserProps & {
  wallet: Wallet;
};

export default function WalletBadge(props: Props) {
  const { wallet, tooltip, ...rest } = props;
  const { data: catList = [], isLoading } = useGetCatListQuery();

  if (!isLoading && wallet.type === WalletType.CAT) {
    const token = catList.find((token) => token.assetId === wallet.meta?.assetId);
    if (token) {
      return (
        <Tooltip title={<Trans>This access token is verified</Trans>}>
          <StyledSmallBadge {...rest} />
        </Tooltip>
      );
    }
  }

  return null;
}

