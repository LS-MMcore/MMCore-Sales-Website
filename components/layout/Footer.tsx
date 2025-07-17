import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
            <p className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} MMCore B.V. All rights reserved.
            </p>
            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <Link href="https://mmcore.tech/AlgemeneVoorwaarden" className="text-xs hover:underline underline-offset-4">
                    Terms of Service
                </Link>
                <Link
                    href="https://mmcore.tech/AlgemeneVoorwaarden?pb=c4ca4238a0b923820dcc509a6f75849b"
                    className="text-xs hover:underline underline-offset-4"
                >
                    Privacy
                </Link>
            </nav>
        </footer>
    );
}
