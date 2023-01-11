import { Badge } from 'native-base';
import { InterfaceBadgeProps } from 'native-base/lib/typescript/components/composites/Badge/types';
import React from 'react';

interface BadgeProps extends InterfaceBadgeProps {
  value: number | undefined;
}

const BaseBadge = ({ value, ...props }: BadgeProps) => {
  const getValue = (count: number) => {
    if (isNaN(count)) {
      return;
    }

    if (count > 0 && count < 1000) {
      return count;
    }

    if (count > 1000 && count < 1000000) {
      if (count % 1000 === 0) {
        return count / 1000 + 'k';
      }

      return (count / 1000).toFixed(1) + 'k';
    }

    return '999k+';
  };

  if (!value || value === 0) {
    return <></>;
  }

  return (
    <Badge {...props} rounded="full" zIndex={1} variant="solid">
      {getValue(value)}
    </Badge>
  );
};

export default BaseBadge;
