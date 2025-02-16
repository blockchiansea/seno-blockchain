import React from 'react';
import BigNumber from 'bignumber.js';
import { Trans, t } from '@lingui/macro';
import { OfferSummaryRecord } from '@seno/api';
import { useTakeOfferMutation } from '@seno/api-react';
import {
  AlertDialog,
  senoToMojo,
  useOpenDialog,
  useShowError,
} from '@seno/core';
import useAssetIdName from './useAssetIdName';
import OfferAcceptConfirmationDialog from '../components/offers/OfferAcceptConfirmationDialog';
import OfferAsset from '../components/offers/OfferAsset';
import { offerAssetTypeForAssetId } from '../components/offers/utils';

export type AcceptOfferHook = (
  offerData: string,
  offerSummary: OfferSummaryRecord,
  fee: string | undefined,
  onUpdate: (accepting: boolean) => void,
  onSuccess: () => void,
) => Promise<void>;

export default function useAcceptOfferHook(): [AcceptOfferHook] {
  const openDialog = useOpenDialog();
  const showError = useShowError();
  const { lookupByAssetId } = useAssetIdName();
  const [takeOffer] = useTakeOfferMutation();

  async function acceptOffer(
    offerData: string,
    offerSummary: OfferSummaryRecord,
    fee: string | undefined,
    onUpdate: (accepting: boolean) => void,
    onSuccess: () => void,
  ): Promise<void> {
    const feeInMojos: BigNumber = fee ? senoToMojo(fee) : new BigNumber(0);
    const offeredUnknownCATs: string[] = Object.entries(offerSummary.offered)
      .filter(
        ([assetId]) =>
          offerAssetTypeForAssetId(assetId, offerSummary) !== OfferAsset.NFT &&
          lookupByAssetId(assetId) === undefined,
      )
      .map(([assetId]) => assetId);

    const confirmedAccept = await openDialog(
      <OfferAcceptConfirmationDialog offeredUnknownCATs={offeredUnknownCATs} />,
    );

    if (!confirmedAccept) {
      return;
    }
    try {
      onUpdate(true);

      const response = await takeOffer({ offer: offerData, fee: feeInMojos });

      if (response.data?.success === true) {
        await openDialog(
          <AlertDialog title={<Trans>Success</Trans>}>
            {response.message ?? (
              <Trans>
                Offer has been accepted and is awaiting confirmation.
              </Trans>
            )}
          </AlertDialog>,
        );
      } else {
        throw new Error(response.error?.message ?? 'Something went wrong');
      }

      onSuccess();
    } catch (e) {
      let error = e as Error;

      if (error.message.startsWith('insufficient funds')) {
        error = new Error(t`
          Insufficient funds available to accept offer. Ensure that your
          spendable balance is sufficient to cover the offer amount.
        `);
      }
      showError(error);
    } finally {
      onUpdate(false);
    }
  }

  return [acceptOffer];
}
