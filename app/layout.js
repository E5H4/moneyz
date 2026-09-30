import "./globals.css";

export const metadata = {
  title: "Money Manager",
  description: "Personal local money manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}