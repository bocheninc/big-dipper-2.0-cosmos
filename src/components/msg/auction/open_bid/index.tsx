import React from 'react';
import numeral from 'numeral';
import Trans from 'next-translate/Trans';
import { Typography } from '@material-ui/core';
import { formatDenom } from '@utils/format_denom';
import { Name } from '@components';
import { MsgOpenBid } from '@models';
import { useProfileRecoil } from '@recoil/profiles';

const OpenBid = (props: {
  message: MsgOpenBid;
}) => {
  const { message } = props;

  const amount = formatDenom(message.bidAmount.amount, message.bidAmount.denom);
  const parsedAmount = `${numeral(amount.value).format(amount.format)} ${amount.denom.toUpperCase()}`;

  const bidder = useProfileRecoil(message.bidder);
  const bidderMoniker = bidder ? bidder?.name : message.bidder;

  return (
    <Typography>
      <Trans
        i18nKey="message_contents:txMsgOpenBid"
        components={[
          (
            <Name
              address={message.bidder}
              name={bidderMoniker}
            />
          ),
          <b />,
        ]}
        values={{
          id: numeral(message.auctionId).format('0,0'),
          amount: parsedAmount,
        }}
      />
    </Typography>
  );
};

export default OpenBid;
