import type { Metadata } from "next";
import Providers from "../components/Providers";
import Navbar from "../components/Navbar";
export const metadata: Metadata = {
  title: "Campus Notifications",
  description: "Stay updated with campus events, results and placements",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0 }}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}