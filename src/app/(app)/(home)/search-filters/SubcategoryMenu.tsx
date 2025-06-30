import { Category } from "@/payload-types";
import React from "react";
import { Categories } from "./Categories";
import Link from "next/link"

interface Props {
  position: {
    left: number;
    top: number;
  };
  category: Category;
  isOpen: boolean;
}

export const SubcategoryMenu = ({ position, category, isOpen }: Props) => {
  if (
    !isOpen ||
    !category.subcategories ||
    (Array.isArray(category.subcategories) &&
      category.subcategories.length === 0)
  ) {
    return null;
  }

  const backgroundColor = category.color || "#F5F5F5";

  return (
    <div
      className="fixed z-100"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {/* Invisible bridge to maintain hover */}
      <div className="h-3 w-60" />

      <div style={{backgroundColor}} className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]">
        <div>
          {Array.isArray(category.subcategories) && category.subcategories.map((subcategory) => {
            return (
              <Link key={subcategory.slug} href={"/"}
                className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium"
              >
                {subcategory.name}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
};
