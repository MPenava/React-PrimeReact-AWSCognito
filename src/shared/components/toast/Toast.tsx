import { useEffect, useRef } from "react";
import { Toast as Toaster } from "primereact/toast";

interface Props {
  severity: "success" | "info" | "warn" | "error" | undefined;
  summary: string;
  detail: string;
}

export const Toast = ({ severity, summary, detail }: Props) => {
  const toast = useRef<Toaster>(null);

  useEffect(() => {
    toast.current?.show({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  });

  return (
    <Toaster
      ref={toast}
      pt={{
        closeButton: { className: "text-white border-1" },
      }}
    />
  );
};
