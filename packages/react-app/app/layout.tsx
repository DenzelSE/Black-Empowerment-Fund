import '@/styles/globals.css';

import { AppProvider } from '@/providers/AppProvider';
import { Toaster } from 'sonner';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            className: 'bg-bef-purple text-white',
            style: {
              backgroundColor: '#4B0082',
              color: '#FFFFFF',
            },
          }}
          expand
          
        />
      </body>
    </html>
  );
}
