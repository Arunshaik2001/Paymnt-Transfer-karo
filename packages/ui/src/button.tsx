"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button
      className={className}
      onClick={() => {
        const popup = window.open(
          "http://localhost:5173/debit?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbW91bnQiOjEwMDAsInBheW1udFVzZXJJZCI6MSwiaWF0IjoxNzE1NDMzMzA0fQ.VLZY34w7AEvKw4qmtg3lLATZZKQKS2IA4e39cSPrUNQ&bankName=HDFC&paymentApp=PAYMNT",
          "googlePopup",
          "width=700,height=700,top=100,left=100,resizable=yes,scrollbars=yes"
        );
        if (popup) {
          popup.focus();
        } else {
          alert("Popup blocked. Please allow popups for this website.");
        }
      }}
    >
      {children}
    </button>
  );
};
