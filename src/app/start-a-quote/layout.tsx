import QuoteLayout from "@/components/quote-layout/quote-layout";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <QuoteLayout>{children}</QuoteLayout>;
}
