"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useState } from "react";

type ItemType = {
  href: string;
  icon: IconDefinition;
  name: string;
  isSelected?: boolean;
  onClick: () => void;
};

export default function SideBarItem({
  href,
  icon,
  name,
  isSelected = false,
  onClick,
}: ItemType) {
  return (
    <>
      <Link href={href} onClick={onClick}>
        <div className="flex px-10 pt-5 pb-5 flex-row items-center">
          <div className="w-5 mr-5">
            <FontAwesomeIcon
              icon={icon}
              size="2x"
              className={isSelected ? "text-primaryText" : ""}
            />
          </div>
          <div
            className={`text-xl font-bold ${isSelected ? "text-primaryText" : "text-black"}`}
          >
            {name}
          </div>
        </div>
      </Link>
    </>
  );
}
