import UserMenu from './UserMenu';

interface HeaderProps {
  onShowAuth: () => void;
}

export default function Header({ onShowAuth }: HeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1" />
        <div className="flex-1 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
            🚀 Blog Launch Pad
          </h1>
        </div>
        <div className="flex-1 flex justify-end">
          <UserMenu onShowAuth={onShowAuth} />
        </div>
      </div>
      <p className="text-slate-400 text-center">
        Your 6-Month Blog Growth System • Tech × Personal Development × Entrepreneurship
      </p>
    </div>
  );
}
