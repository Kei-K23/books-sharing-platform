import { useState } from "react";
import { Link } from "react-router";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Clock,
  BookMarked,
  Users,
  UserPlus,
  Bell,
  BookPlus,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  books,
  borrowRequests,
  bookCopies,
  users,
  notifications,
} from "@/utils/dummyData";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const currentUser = users[0]; // Using the first user as the current user for demo

  // Get books owned by the current user
  const myBooks = books
    .filter((book) => book.ownerId === currentUser.id)
    .map((book) => {
      const bookCopiesCount = bookCopies.filter(
        (copy) => copy.bookId === book.id
      ).length;
      return { ...book, copiesCount: bookCopiesCount };
    });

  // Get borrow requests for the current user's books
  const myBorrowRequests = borrowRequests
    .filter((request) => {
      const bookCopy = bookCopies.find(
        (copy) => copy.id === request.bookCopyId
      );
      if (!bookCopy) return false;

      const book = books.find((b) => b.id === bookCopy.bookId);
      return book?.ownerId === currentUser.id;
    })
    .map((request) => {
      const bookCopy = bookCopies.find(
        (copy) => copy.id === request.bookCopyId
      );
      const book = bookCopy
        ? books.find((b) => b.id === bookCopy.bookId)
        : null;
      const borrower = users.find((user) => user.id === request.borrowerId);

      return {
        ...request,
        book,
        borrower,
      };
    });

  // Get books borrowed by the current user
  const borrowedByMe = borrowRequests
    .filter((request) => request.borrowerId === currentUser.id)
    .map((request) => {
      const bookCopy = bookCopies.find(
        (copy) => copy.id === request.bookCopyId
      );
      const book = bookCopy
        ? books.find((b) => b.id === bookCopy.bookId)
        : null;
      const owner = book
        ? users.find((user) => user.id === book.ownerId)
        : null;

      return {
        ...request,
        book,
        owner,
      };
    });

  // Get user notifications
  const userNotifications = notifications.filter(
    (notification) => notification.userId === currentUser.id
  );

  return (
    <MainLayout>
      <div className="container-custom py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-serif">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {currentUser.username}
            </p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/add-book">
                <BookPlus className="mr-2 h-4 w-4" />
                Add a Book
              </Link>
            </Button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs
          defaultValue="overview"
          onValueChange={setActiveTab}
          className="space-y-8"
        >
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="my-books">My Books</TabsTrigger>
            <TabsTrigger value="borrow-requests">
              Borrow Requests
              {myBorrowRequests.filter((req) => req.status === "PENDING")
                .length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {
                    myBorrowRequests.filter((req) => req.status === "PENDING")
                      .length
                  }
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="borrowed">Borrowed</TabsTrigger>
            <TabsTrigger value="notifications">
              Notifications
              {userNotifications.filter((n) => !n.isRead).length > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {userNotifications.filter((n) => !n.isRead).length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Books Shared
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{myBooks.length}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Active Borrows
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {
                      borrowedByMe.filter(
                        (b) => b.status === "ACCEPTED" && !b.returnDate
                      ).length
                    }
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Pending Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {
                      myBorrowRequests.filter((req) => req.status === "PENDING")
                        .length
                    }
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Unread Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {userNotifications.filter((n) => !n.isRead).length}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="md:col-span-2 space-y-6">
                <h2 className="text-xl font-bold">Recent Activity</h2>

                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {userNotifications
                        .slice(0, 5)
                        .map((notification, index) => (
                          <div
                            key={index}
                            className="p-4 flex items-start gap-3"
                          >
                            <div
                              className={`rounded-full p-2 ${getNotificationTypeColor(notification.type)}`}
                            >
                              {getNotificationTypeIcon(notification.type)}
                            </div>
                            <div>
                              <p>{notification.message}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {formatDate(notification.createdAt)}
                              </p>
                            </div>
                          </div>
                        ))}

                      {userNotifications.length === 0 && (
                        <div className="p-6 text-center">
                          <p className="text-muted-foreground">
                            No recent activity
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  {userNotifications.length > 0 && (
                    <CardFooter className="border-t p-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full"
                        asChild
                      >
                        <Link
                          to="#"
                          onClick={() => setActiveTab("notifications")}
                        >
                          View All Notifications
                        </Link>
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Quick Actions</h2>

                <Card>
                  <CardContent className="p-6 space-y-4">
                    <Button className="w-full justify-start" asChild>
                      <Link to="/add-book">
                        <BookPlus className="mr-2 h-4 w-4" />
                        Add a New Book
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link to="/books">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Browse Books
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link to="/profile">
                        <Users className="mr-2 h-4 w-4" />
                        Update Profile
                      </Link>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link to="/friends">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Find Friends
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Upcoming Returns */}
                <h2 className="text-xl font-bold">Upcoming Returns</h2>

                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {borrowedByMe
                        .filter(
                          (b) =>
                            b.status === "ACCEPTED" &&
                            b.dueDate &&
                            !b.returnDate
                        )
                        .sort(
                          (a, b) =>
                            new Date(a.dueDate!).getTime() -
                            new Date(b.dueDate!).getTime()
                        )
                        .slice(0, 3)
                        .map((borrow, index) => (
                          <div
                            key={index}
                            className="p-4 flex justify-between items-center"
                          >
                            <div className="flex items-center gap-3">
                              <BookMarked className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium">
                                  {borrow.book?.title}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  Due {formatDate(borrow.dueDate!)}
                                </p>
                              </div>
                            </div>
                            <Button size="sm" variant="ghost" asChild>
                              <Link to={`/books/${borrow.book?.id}`}>View</Link>
                            </Button>
                          </div>
                        ))}

                      {borrowedByMe.filter(
                        (b) =>
                          b.status === "ACCEPTED" && b.dueDate && !b.returnDate
                      ).length === 0 && (
                        <div className="p-6 text-center">
                          <p className="text-muted-foreground">
                            No upcoming returns
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* My Books Tab */}
          <TabsContent value="my-books">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Books I'm Sharing</h2>
                <Button asChild>
                  <Link to="/add-book">
                    <BookPlus className="mr-2 h-4 w-4" />
                    Add a Book
                  </Link>
                </Button>
              </div>

              {myBooks.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">No Books Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't added any books to share with the community.
                    </p>
                    <Button asChild>
                      <Link to="/add-book">Add Your First Book</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myBooks.map((book) => (
                    <Card key={book.id} className="overflow-hidden">
                      <div className="flex h-full">
                        <div className="w-1/3 h-auto bg-secondary">
                          {book.coverImage ? (
                            <img
                              src={book.coverImage}
                              alt={book.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center p-4">
                              <span className="font-serif text-center">
                                {book.title}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="w-2/3 p-4 flex flex-col">
                          <h3 className="font-medium line-clamp-1">
                            {book.title}
                          </h3>
                          {book.author && (
                            <p className="text-sm text-muted-foreground mb-2">
                              by {book.author}
                            </p>
                          )}

                          <div className="flex gap-2 flex-wrap mt-1 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {book.copiesCount}{" "}
                              {book.copiesCount === 1 ? "copy" : "copies"}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {book.language}
                            </Badge>
                          </div>

                          <div className="mt-auto pt-2 flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              asChild
                            >
                              <Link to={`/books/${book.id}`}>View</Link>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1"
                              asChild
                            >
                              <Link to={`/edit-book/${book.id}`}>Edit</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Borrow Requests Tab */}
          <TabsContent value="borrow-requests">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Borrow Requests</h2>
                <Button variant="outline" size="sm">
                  <Clock className="mr-2 h-4 w-4" />
                  View History
                </Button>
              </div>

              <Tabs defaultValue="pending">
                <TabsList>
                  <TabsTrigger value="pending">
                    Pending
                    {myBorrowRequests.filter((req) => req.status === "PENDING")
                      .length > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {
                          myBorrowRequests.filter(
                            (req) => req.status === "PENDING"
                          ).length
                        }
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  <TabsTrigger value="returned">Returned</TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="pt-4">
                  {myBorrowRequests.filter((req) => req.status === "PENDING")
                    .length === 0 ? (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-muted-foreground">
                          No pending borrow requests
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {myBorrowRequests
                        .filter((req) => req.status === "PENDING")
                        .map((request, index) => (
                          <Card key={index}>
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row gap-4 justify-between">
                                <div className="flex items-center gap-4">
                                  <Avatar>
                                    <AvatarImage
                                      src={request.borrower?.profilePicture}
                                    />
                                    <AvatarFallback>
                                      {request.borrower?.username
                                        .charAt(0)
                                        .toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">
                                      {request.borrower?.username}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      Requested{" "}
                                      {formatDate(request.requestDate)}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex-1 md:text-center">
                                  <p className="font-medium">
                                    {request.book?.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {request.book?.author &&
                                      `by ${request.book.author}`}
                                  </p>
                                </div>

                                <div className="flex gap-2 mt-4 md:mt-0">
                                  <Button size="sm" variant="outline" asChild>
                                    <Link
                                      to={`/profile/${request.borrower?.id}`}
                                    >
                                      View Profile
                                    </Link>
                                  </Button>
                                  <Button
                                    size="sm"
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    Approve
                                  </Button>
                                  <Button size="sm" variant="destructive">
                                    Reject
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="approved" className="pt-4">
                  {myBorrowRequests.filter((req) => req.status === "ACCEPTED")
                    .length === 0 ? (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-muted-foreground">
                          No approved borrow requests
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {myBorrowRequests
                        .filter((req) => req.status === "ACCEPTED")
                        .map((request, index) => (
                          <Card key={index}>
                            <CardContent className="p-6">
                              <div className="flex flex-col md:flex-row gap-4 justify-between">
                                <div className="flex items-center gap-4">
                                  <Avatar>
                                    <AvatarImage
                                      src={request.borrower?.profilePicture}
                                    />
                                    <AvatarFallback>
                                      {request.borrower?.username
                                        .charAt(0)
                                        .toUpperCase()}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <p className="font-medium">
                                      {request.borrower?.username}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      Approved{" "}
                                      {formatDate(request.approvedDate!)}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex-1 md:text-center">
                                  <p className="font-medium">
                                    {request.book?.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    Due {formatDate(request.dueDate!)}
                                  </p>
                                </div>

                                <div className="flex gap-2 mt-4 md:mt-0">
                                  <Button size="sm">Mark as Returned</Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="rejected" className="pt-4">
                  {myBorrowRequests.filter((req) => req.status === "REJECTED")
                    .length === 0 ? (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-muted-foreground">
                          No rejected borrow requests
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {/* Display rejected requests */}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="returned" className="pt-4">
                  {myBorrowRequests.filter((req) => req.status === "RETURNED")
                    .length === 0 ? (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-muted-foreground">
                          No returned books
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-4">
                      {/* Display returned books */}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          {/* Borrowed Tab */}
          <TabsContent value="borrowed">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Books I've Borrowed</h2>
                <Button variant="outline" size="sm">
                  <Clock className="mr-2 h-4 w-4" />
                  View History
                </Button>
              </div>

              <Tabs defaultValue="current">
                <TabsList>
                  <TabsTrigger value="current">Currently Borrowed</TabsTrigger>
                  <TabsTrigger value="pending">Pending Requests</TabsTrigger>
                  <TabsTrigger value="past">Previous Borrows</TabsTrigger>
                </TabsList>

                <TabsContent value="current" className="pt-4">
                  {borrowedByMe.filter(
                    (b) => b.status === "ACCEPTED" && !b.returnDate
                  ).length === 0 ? (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-muted-foreground">
                          You don't have any books borrowed currently
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {borrowedByMe
                        .filter((b) => b.status === "ACCEPTED" && !b.returnDate)
                        .map((borrow, index) => (
                          <Card key={index}>
                            <CardContent className="p-6">
                              <div className="flex gap-4">
                                <div className="w-20 h-28 bg-secondary rounded overflow-hidden flex-shrink-0">
                                  {borrow.book?.coverImage ? (
                                    <img
                                      src={borrow.book.coverImage}
                                      alt={borrow.book.title}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center p-2">
                                      <span className="font-serif text-xs text-center">
                                        {borrow.book?.title}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                <div className="flex-1">
                                  <h3 className="font-medium mb-1">
                                    {borrow.book?.title}
                                  </h3>
                                  {borrow.book?.author && (
                                    <p className="text-sm text-muted-foreground">
                                      by {borrow.book.author}
                                    </p>
                                  )}

                                  <div className="flex items-center mt-2">
                                    <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                                    <span className="text-sm">
                                      Due {formatDate(borrow.dueDate!)}
                                    </span>
                                  </div>

                                  <div className="flex items-center mt-1">
                                    <Avatar className="h-5 w-5 mr-1">
                                      <AvatarImage
                                        src={borrow.owner?.profilePicture}
                                      />
                                      <AvatarFallback>
                                        {borrow.owner?.username
                                          .charAt(0)
                                          .toUpperCase()}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-sm">
                                      From {borrow.owner?.username}
                                    </span>
                                  </div>

                                  <Button
                                    className="mt-4"
                                    size="sm"
                                    variant="outline"
                                    asChild
                                  >
                                    <Link to={`/books/${borrow.book?.id}`}>
                                      View Details
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="pending" className="pt-4">
                  {borrowedByMe.filter((b) => b.status === "PENDING").length ===
                  0 ? (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-muted-foreground">
                          You don't have any pending borrow requests
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Display pending borrow requests */}
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="past" className="pt-4">
                  {borrowedByMe.filter((b) => b.returnDate).length === 0 ? (
                    <Card>
                      <CardContent className="p-6 text-center">
                        <p className="text-muted-foreground">
                          You don't have any past borrows
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Display past borrows */}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Notifications</h2>
                <Button variant="outline" size="sm">
                  Mark All as Read
                </Button>
              </div>

              <Card>
                <CardContent className="p-0">
                  {userNotifications.length === 0 ? (
                    <div className="p-8 text-center">
                      <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        No Notifications
                      </h3>
                      <p className="text-muted-foreground">
                        You don't have any notifications at the moment.
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {userNotifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 flex items-start gap-3 ${!notification.isRead ? "bg-muted/30" : ""}`}
                        >
                          <div
                            className={`rounded-full p-2 ${getNotificationTypeColor(notification.type)}`}
                          >
                            {getNotificationTypeIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <p>{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatDate(notification.createdAt)}
                            </p>
                          </div>
                          {!notification.isRead && (
                            <Badge variant="secondary">New</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

// Helper functions for formatting and display
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getNotificationTypeColor = (type: string) => {
  switch (type) {
    case "BORROW_REQUEST":
      return "bg-blue-100 text-blue-600";
    case "BORROW_APPROVED":
      return "bg-green-100 text-green-600";
    case "BORROW_REJECTED":
      return "bg-red-100 text-red-600";
    case "BOOK_RETURNED":
      return "bg-purple-100 text-purple-600";
    case "FRIEND_REQUEST":
      return "bg-yellow-100 text-yellow-600";
    case "BOOK_DUE":
      return "bg-orange-100 text-orange-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const getNotificationTypeIcon = (type: string) => {
  switch (type) {
    case "BORROW_REQUEST":
      return <BookOpen className="h-4 w-4" />;
    case "BORROW_APPROVED":
      return <CheckCircle className="h-4 w-4" />;
    case "BORROW_REJECTED":
      return <XCircle className="h-4 w-4" />;
    case "BOOK_RETURNED":
      return <BookMarked className="h-4 w-4" />;
    case "FRIEND_REQUEST":
      return <UserPlus className="h-4 w-4" />;
    case "BOOK_DUE":
      return <AlertCircle className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

export default Dashboard;
