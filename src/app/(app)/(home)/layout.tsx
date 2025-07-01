import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { SearchFilters } from "./search-filters";
import { getPayload } from "payload";
import configPromise from "@/payload.config";
import { Category } from "@/payload-types";
import { CustomCategory } from "./types";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
    sort: 'name'
  });

  function formatCategory(doc: any) {
    return {
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((subDoc: Category) =>
        formatCategory(subDoc)
      ),
    };
  }
  
  const formattedData = data.docs.map(formatCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
