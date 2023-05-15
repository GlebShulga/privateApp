import React, { ReactNode, useState } from 'react';
import styles from "@component/styles/tooltip.module.scss";

interface TooltipProps {
    children: ReactNode;
    text: string;
  }

export const Tooltip = ({ children, text }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className={styles.tooltip_container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && <div className={styles.tooltip}>{text}</div>}
    </div>
  );
};
