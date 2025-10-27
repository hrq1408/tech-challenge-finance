import Link from "next/link";

export function Header() {
  return (
    <header className="flex px-20 py-4 bg-primary text-white">
        <div className="flex items-center justify-between w-full mx-auto max-w-7x1">
            <div>
               Tech Challenge Finance
            </div>
            <nav>
                <ul className="flex gap-2 items-center justify-center">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/transactions">Transações</Link >
                    </li>
                </ul>
            </nav>
        </div>
    </header>
  );
}