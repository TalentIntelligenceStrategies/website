// className merge helper — clsx + tailwind-merge.
// Pattern from shadcn/ui, so a pasted 21st.dev component's `cn(...)` calls resolve
// through the `@` alias without edits. Kept byte-identical to
// operations-site/src/lib/utils.ts so the two surfaces do not drift.

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
