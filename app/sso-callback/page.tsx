import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallback() {
  // This component handles the internal 'handshake' after social login
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 font-mono">
      <div className="p-8 border-4 border-black bg-white shadow-[8px_8px_0_0_#000]">
        <p className="font-bold uppercase animate-pulse">
          Finalizing Connection...
        </p>
        <AuthenticateWithRedirectCallback />
      </div>
    </div>
  );
}