// organize-imports-ignore
import type { GlobalProvider } from "@ladle/react";
import React from "react";

import "tailwindcss/src/css/preflight.css";
import "tailwindcss/tailwind.css";

export const Provider: GlobalProvider = ({ children, globalState }) => (
  <>{children}</>
);
