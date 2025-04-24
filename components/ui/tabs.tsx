import * as React from "react";

export const Tabs = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

export const TabsList = ({ className = "", children }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`flex gap-2 mb-2 ${className}`}>{children}</div>
);

export const TabsTrigger = ({ value, children }: { value: string, children: React.ReactNode }) => (
  <button className="px-3 py-1 border rounded">{children}</button>
);

export const TabsContent = ({ value, children }: { value: string, children: React.ReactNode }) => (
  <div className="mt-4">{children}</div>
);
