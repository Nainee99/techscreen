import StreamVideoProvider from "@/lib/providers/StreamClientProvider";

function Layout({ children }: { children: React.ReactNode }) {
  return <StreamVideoProvider>{children}</StreamVideoProvider>;
}
export default Layout;
