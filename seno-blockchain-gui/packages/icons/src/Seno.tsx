import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';
import SenoIcon from './images/seno.svg';

export default function Keys(props: SvgIconProps) {
  return <SvgIcon component={SenoIcon} viewBox="0 0 324 100" {...props} />;
}
