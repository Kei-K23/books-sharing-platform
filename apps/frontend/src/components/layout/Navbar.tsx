import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Menu, Bell, BookOpen, LogIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/auth";

const Navbar = () => {
  const { loading, logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-serif">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Chapter & Verse</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/books"
              className="text-foreground hover:text-primary transition-colors"
            >
              Browse Books
            </Link>
            <Link
              to="/how-it-works"
              className="text-foreground hover:text-primary transition-colors"
            >
              How It Works
            </Link>
            <Link
              to="/about"
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>

            {!loading && !!user ? (
              <>
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <Badge className="absolute top-0 right-0 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                        3
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-[300px] overflow-y-auto">
                      <DropdownMenuItem className="flex flex-col items-start py-3">
                        <p className="font-medium">Borrow Request</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          James has requested to borrow your copy of 'To Kill a
                          Mockingbird'
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          5 hours ago
                        </p>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex flex-col items-start py-3">
                        <p className="font-medium">Book Due Soon</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          'Harry Potter' is due to be returned tomorrow
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Yesterday
                        </p>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="flex flex-col items-start py-3">
                        <p className="font-medium">Friend Request</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          David sent you a friend request
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          2 days ago
                        </p>
                      </DropdownMenuItem>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="justify-center">
                      <Link
                        to="/notifications"
                        className="text-primary text-sm font-medium"
                      >
                        View all notifications
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full hover:text-muted-foreground"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user.profilePicture}
                          alt={user.username}
                        />
                        <AvatarFallback>
                          {user.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.username}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/my-books">My Books</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/borrowed">Borrowed Books</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                      className="text-destructive"
                    >
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Log in
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/register">Sign up</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Chapter & Verse</SheetTitle>
                    <SheetDescription>
                      Share and borrow books with your community
                    </SheetDescription>
                  </SheetHeader>
                  <div className="py-4 flex flex-col space-y-4">
                    <Link
                      to="/"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      Home
                    </Link>
                    <Link
                      to="/books"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      Browse Books
                    </Link>
                    <Link
                      to="/how-it-works"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      How It Works
                    </Link>
                    <Link
                      to="/about"
                      className="text-foreground hover:text-primary transition-colors"
                    >
                      About
                    </Link>
                    {!loading && !!user && (
                      <>
                        <hr />
                        <Link
                          to="/dashboard"
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/my-books"
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          My Books
                        </Link>
                        <Link
                          to="/borrowed"
                          className="text-foreground hover:text-primary transition-colors"
                        >
                          Borrowed Books
                        </Link>
                        <Button
                          variant="outline"
                          onClick={() => {
                            logout();
                            navigate("/");
                          }}
                          className="justify-start px-2 text-destructive"
                        >
                          Log out
                        </Button>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
