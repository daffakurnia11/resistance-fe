import * as React from "react";
import { Metadata } from "next";
import Home from "./Home";

export const metadata: Metadata = {
  title: "Host or Join Room - The Resistance",
};

export default function HomePage() {
  return <Home />;
}
