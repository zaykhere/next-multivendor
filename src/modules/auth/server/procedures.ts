import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { headers as getHeaders, cookies as getCookies } from "next/headers";
import { z } from "zod/v4";
import { AUTH_COOKIE } from "../constants";
import { loginSchema, registerSchema } from "../schemas";

export const authRouter = createTRPCRouter({
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders();

    const session = await ctx.payload.auth({ headers });

    console.log({session})

    return session;
  }),
  logout: baseProcedure.query(async () => {
    const cookies = await getCookies();
    cookies.delete(AUTH_COOKIE);
  }),
  register: baseProcedure
    .input(
      registerSchema
    )
    .mutation(async ({ input, ctx }) => {
      const existingData = await ctx.payload.find({
        collection: 'users',
        limit: 1,
        where: {
          or: [
            {
              username: {
                equals: input.username,
              },
            },
            {
              email: {
                equals: input.email,
              },
            },
          ],
        }
      });

      const existingUser = existingData.docs?.[0];

      if(existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username or email already taken",
        });
      }

      await ctx.payload.create({
        collection: "users",
        data: {
          email: input.email,
          username: input.username,
          password: input.password, // Payload will hash this automatically
        },
      });

      const data = await ctx.payload.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }

      const cookies = await getCookies();
      cookies.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        // sameSite: 'none',
        // domain: ""
      });

      return data;
    }),
  login: baseProcedure
    .input(
      loginSchema
    )
    .mutation(async ({ input, ctx }) => {
      const data = await ctx.payload.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }

      const cookies = await getCookies();
      cookies.set({
        name: AUTH_COOKIE,
        value: data.token,
        httpOnly: true,
        path: "/",
        // sameSite: 'none',
        // domain: ""
      });

      return data;
    }),
});
