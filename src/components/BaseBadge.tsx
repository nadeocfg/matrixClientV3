import { Badge } from 'native-base';
import { InterfaceBadgeProps } from 'native-base/lib/typescript/components/composites/Badge/types';
import React from 'react';

interface BadgeProps extends InterfaceBadgeProps {
  value: number | undefined;
}

const BaseBadge = ({ value, ...props }: BadgeProps) => {
  if (!value || value === 0) {
    return <></>;
  }

  return (
    <Badge
      {...props}
      colorScheme="primary"
      rounded="full"
      zIndex={1}
      variant="solid">
      {value > 99 ? '99+' : value}
    </Badge>
  );
};

export default BaseBadge;
