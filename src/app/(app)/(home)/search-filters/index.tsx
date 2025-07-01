'use client';

import React from "react";
import { SearchInput } from "./SearchInput";
import { Categories } from "./Categories";
import { CustomCategory } from "../types";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const SearchFilters = () => {
  const trpc = useTRPC();
  const {data} = useSuspenseQuery(trpc.categories.getMany.queryOptions())

  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{
      backgroundColor: '#F5F5F5'
    }}>
      <SearchInput />
      <div className="hidden md:block">
        <Categories data={data} />
      </div>
    </div>
  );
};

export const SearchFiltersLoading = () => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full" style={{
      backgroundColor: '#F5F5F5'
    }}>
      <SearchInput disabled/>
      <div className="hidden md:block">
        <div className="h-11"></div>
      </div>
    </div>
  )
}
