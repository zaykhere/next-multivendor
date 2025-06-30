import React from 'react'
import { SearchInput } from './SearchInput';
import { Categories } from './Categories';

interface Props {
  data: any;
}

export const SearchFilters = ({data}: Props) => {
  return (
    <div className='px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full'>
      <SearchInput />
      <Categories data={data}/>
    </div>
  )
}