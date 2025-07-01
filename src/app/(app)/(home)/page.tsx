import { getQueryClient, trpc } from '@/trpc/server'
import React from 'react'

const Home = async() => {
  const queryClient = getQueryClient();
  const categories = await queryClient.fetchQuery(trpc.categories.getMany.queryOptions())

  return (
    <div>
      Home
    </div>
  )
}

export default Home