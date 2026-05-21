"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

type CalBookingButtonProps = {
  className?: string;
  children: React.ReactNode;
};

export default function CalBookingButton({ className, children }: CalBookingButtonProps) {
  useEffect(() => {
    (async function initCal() {
      const cal = await getCalApi({ namespace: "15min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <button
      type="button"
      data-cal-namespace="15min"
      data-cal-link="fuskan-global-exports-eypxv8/15min"
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
      className={className}
    >
      {children}
    </button>
  );
}
