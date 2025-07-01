import { inferRouterOutputs } from '@trpc/server'
import { AppRouter } from './routers/_app'

type RouterOutput = inferRouterOutputs<AppRouter>

export type TRPCCategoryArray = RouterOutput['categories']['getMany']
export type TRPCCategory = TRPCCategoryArray[number]