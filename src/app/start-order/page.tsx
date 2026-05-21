import type { Metadata } from "next";
import { Suspense } from "react";
import { pageSeo } from "@/lib/seo";
import StartOrderContent from "./StartOrderContent";

export const metadata: Metadata = pageSeo({
  title: "Start custom order",
  description:
    "Submit a production inquiry for custom leather goods manufacturing and private label development.",
  path: "/start-order",
});

function StartOrderFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-sm text-zinc-500">
      Loading form…
    </div>
  );
}

export default function StartOrderPage() {
  return (
    <Suspense fallback={<StartOrderFallback />}>
      <StartOrderContent />
    </Suspense>
  );
}
