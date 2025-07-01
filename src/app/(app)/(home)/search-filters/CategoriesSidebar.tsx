'use client';

import React, { useState } from "react";
import { CustomCategory } from "../types";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Categories } from "./Categories";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormattedCategory } from "@/modules/categories/server/procedures";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CategoriesSidebar = ({ open, onOpenChange }: Props) => {
  const trpc = useTRPC();
  const {data} = useQuery(trpc.categories.getMany.queryOptions())

  const [parentCategories, setParentCategories] = useState<
  FormattedCategory[] | null
  >(null);
  const [selectedCategory, setSelectedCategory] =
    useState<FormattedCategory | null>(null);
  const router = useRouter();

  // If we have parent Categories, show those otherwise show root categories

  const currentCategories = parentCategories ?? data ?? [];

  const handleOpenChange = (open: boolean) => {
    setSelectedCategory(null);
    setParentCategories(null);
    onOpenChange(open);
  }

  const handleCategoryClick = (category: FormattedCategory) => {
    if(category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as FormattedCategory[]);
      setSelectedCategory(category);
    } else {
      // No subcategory case 
      if(parentCategories && selectedCategory) {
        // this is subcategory so navigate
        router.push(`/${selectedCategory.slug}/${category.slug}`)
      } else {
        // main category
        if(category.slug === 'all') {
          router.push("/");
        } else {
          router.push(`/${category.slug}`)
        }
      }

      handleOpenChange(false);
    }
  }

  const handleBackClick = () => {
    if(parentCategories) {
      setParentCategories(null);
      setSelectedCategory(null);
    }
  }

  const backgroundColor = selectedCategory?.color || "white";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ background: backgroundColor }}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={handleBackClick}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}

          {currentCategories.map((category) => (
            <button
              key={category.slug}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
