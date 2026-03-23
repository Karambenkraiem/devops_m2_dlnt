import AppProvider from "../components/AppProvider";

export const metadata = {
  title: "DataServTech",
  description: "Application DataServTech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}