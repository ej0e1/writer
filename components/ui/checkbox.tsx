import * as React from "react";

export const Checkbox = ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: () => void }) => (
  <input type="checkbox" checked={checked} onChange={onCheckedChange} className="w-4 h-4" />
);
