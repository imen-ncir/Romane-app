import React from 'react';
import {getIcon} from '../../../../assets/icons';
import {SimpleCard, SimpleCardProps} from './SimpleCard';

interface IconCardProps extends SimpleCardProps {
  icon: string;
}

export const IconCard = ({icon, ...props}: IconCardProps) => {
  return <SimpleCard {...props}>{getIcon(icon, 28)}</SimpleCard>;
};
