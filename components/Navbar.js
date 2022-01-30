import Link from "next/link";

function Navbar({ user }) {
  return (
    <nav className="flex justify-between items-center py-4">
      <h1 className="text-2xl font-bold text-gray-800">Action Tracker</h1>
      <div className="flex">
        {user ? (
          <Link href="/api/auth/logout">
            <a className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4">
              Logout
            </a>
          </Link>
        ) : (
          <Link href="/api/auth/login">
            <a className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4">
              Login
            </a>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
