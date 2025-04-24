// components/ui/tabs.tsx
import * as React from "react";

type TabsProps = {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
};

export const Tabs = ({ children }: TabsProps) => {
  return <div>{children}</div>;
};

export const TabsList = ({ className = "", children }: { className?: string; children: React.ReactNode }) => {
  return <div className={`flex gap-2 mb-2 ${className}`}>{children}</div>;
};

export const TabsTrigger = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => {
  return (
    <button
      className="px-3 py-1 border rounded"
      type="button"
    >
      {children}
    </button>
  );
};

export const TabsContent = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => {
  return <div className="mt-4">{children}</div>;
};
