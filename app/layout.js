import "./globals.css";

export const metadata = {
  title: "Prasun's Portfolio",
  description: "A retro Windows XP themed personal portfolio website for Prasun.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
