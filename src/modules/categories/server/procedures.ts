import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export interface FormattedCategory {
  id: string;
  name: string;
  slug: string;
  color?: string | null;
  parent?: string | Category | null;
  createdAt: string;
  updatedAt: string;
  subcategories?: FormattedCategory[];
}

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ctx}) => {
    const data = await ctx.payload.find({
      collection: "categories",
      pagination: false,
      where: {
        parent: {
          exists: false,
        },
      },
      sort: "name",
    });

    // function formatCategory(doc: Category) {
    //   return {
    //     ...doc,
    //     subcategories: (doc.subcategories?.docs ?? []).map((subDoc) =>
    //       formatCategory(subDoc as Category)
    //     ),
    //   };
    // }

    function formatCategory(doc: Category): FormattedCategory {
      return {
        id: doc.id,
        name: doc.name,
        slug: doc.slug,
        color: doc.color ?? null,
        parent: doc.parent ?? null,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt,
        subcategories: doc.subcategories?.docs
          ?.filter((sub): sub is Category => typeof sub === "object" && sub !== null)
          .map(formatCategory),
      };
    }

    const formattedData = data.docs.map(formatCategory);

    return formattedData;
  }),
});
