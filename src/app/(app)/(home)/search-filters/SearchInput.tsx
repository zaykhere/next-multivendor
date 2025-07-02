'use client';

import { Input } from '@/components/ui/input';
import { ListFilterIcon, SearchIcon } from 'lucide-react';
import React, { useState } from 'react';
import { CategoriesSidebar } from './CategoriesSidebar';
import { Button } from '@/components/ui/button';

interface Props {
  disabled?: boolean;
}

export const SearchInput = ({disabled}: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='flex items-center gap-2 w-full'>
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      <div className="relative w-full">
        <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500' />
        <Input className='pl-8' placeholder='Search products...' disabled={disabled} />
      </div>
       {/* TODO: ADD CATEGORIES VIEW ALL BUTTON */}
       <Button
        variant={"elevated"}
        className='size-12 shrink-0 flex lg:hidden'
        onClick={() => setIsSidebarOpen(true)}
       >
        <ListFilterIcon />
       </Button>

      {/* TODO: ADD LIBRARY BUTTON  */}
    </div>
  )
}
