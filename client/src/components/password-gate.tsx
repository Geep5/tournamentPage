import { useState } from "react";

const PASS = "medic";
const STORAGE_KEY = "mockup-auth";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem(STORAGE_KEY) === "1");
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  if (authed) return <>{children}</>;

  const submit = () => {
    if (value === PASS) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setAuthed(true);
    } else {
      setError(true);
      setTimeout(() => setError(false), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e13] flex items-center justify-center">
      <div className="w-full max-w-sm px-6">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold text-white">Design Preview</h1>
          <p className="text-sm text-white/40 mt-1">Enter the password to continue</p>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <input
            type="password"
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Password"
            className={`w-full rounded-lg border bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/25 outline-none transition-colors ${
              error ? "border-red-500/60 shake" : "border-white/10 focus:border-white/25"
            }`}
          />
          <button
            type="submit"
            className="w-full mt-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors"
          >
            View Mockup
          </button>
        </form>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </div>
  );
}
