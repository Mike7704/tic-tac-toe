import "./globals.css";

export const metadata = {
  title: "Tic Tac Toe",
  description: "Tic Tac Toe multiplayer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
