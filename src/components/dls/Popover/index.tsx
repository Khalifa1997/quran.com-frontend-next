import React, { ReactNode } from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import classNames from 'classnames';
import styles from './Popover.module.scss';

export enum ContentSide {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

export enum ContentAlign {
  START = 'start',
  CENTER = 'center',
  END = 'end',
}

interface Props {
  trigger: ReactNode;
  children: ReactNode | ReactNode[];
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
  isModal?: boolean;
  contentSide?: ContentSide;
  contentAlign?: ContentAlign;
  tip?: boolean;
  avoidCollisions?: boolean;
  useTooltipStyles?: boolean;
}

const Popover: React.FC<Props> = ({
  children,
  trigger,
  onOpenChange,
  open,
  isModal = false,
  contentSide = ContentSide.BOTTOM,
  contentAlign = ContentAlign.CENTER,
  avoidCollisions = true,
  tip = false,
  useTooltipStyles = false,
}) => (
  <div className={styles.container}>
    <RadixPopover.Root
      modal={isModal}
      {...(typeof open !== 'undefined' && { open })}
      {...(onOpenChange && { onOpenChange })}
    >
      <RadixPopover.Trigger aria-label="Open popover" className={styles.trigger}>
        {trigger}
      </RadixPopover.Trigger>
      <RadixPopover.Content
        sideOffset={2}
        side={contentSide}
        align={contentAlign}
        avoidCollisions={avoidCollisions}
        className={classNames(styles.content, { [styles.tooltipContent]: useTooltipStyles })}
      >
        {children}
        {tip && <RadixPopover.Arrow />}
      </RadixPopover.Content>
    </RadixPopover.Root>
  </div>
);

export default Popover;
