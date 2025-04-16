import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarDays,
  MapPin,
  BookOpen,
  Heart,
  Share2,
  Flag,
  MessageSquare,
  Star,
} from "lucide-react";
import { books, users, reviews, bookCopies, tags } from "@/utils/dummyData";
import { BookCopy, BookWithDetails, Review, Tag, User } from "@/utils/types";
import { toast } from "sonner";

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<BookWithDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedCopy, setSelectedCopy] = useState<string>("");
  const [borrowMessage, setBorrowMessage] = useState("");
  const [bookOwner, setBookOwner] = useState<User | null>(null);
  const [bookReviews, setBookReviews] = useState<
    Array<Review & { user: User }>
  >([]);
  const [copies, setCopies] = useState<BookCopy[]>([]);
  const [bookTags, setBookTags] = useState<Tag[]>([]);

  useEffect(() => {
    // In a real app, this would be an API call
    if (!id) return;

    setTimeout(() => {
      const foundBook = books.find((b) => b.id === id);

      if (foundBook) {
        // Get book owner
        const owner = users.find((u) => u.id === foundBook.ownerId) || null;
        setBookOwner(owner);

        // Get book reviews
        const bookReviewsList = reviews
          .filter((r) => r.bookId === id)
          .map((review) => {
            const user = users.find((u) => u.id === review.userId);
            return { ...review, user: user! };
          });
        setBookReviews(bookReviewsList);

        // Get book copies
        const bookCopiesList = bookCopies.filter((copy) => copy.bookId === id);
        setCopies(bookCopiesList);

        // Get book tags
        const tagIds = bookTags
          .filter((bt) => bt.bookId === id)
          .map((bt) => bt.tagId);
        const tagsList = tags.filter((tag) => tagIds.includes(tag.id));
        setBookTags(tagsList);

        // Set the book with additional details
        setBook({
          ...foundBook,
          owner,
          copies: bookCopiesList,
          tags: tagsList,
          reviews: bookReviewsList,
          reviewCount: bookReviewsList.length,
          averageRating:
            bookReviewsList.length > 0
              ? bookReviewsList.reduce(
                  (acc, review) => acc + review.rating,
                  0
                ) / bookReviewsList.length
              : 0,
        });

        // Randomly set favorite status
        setIsFavorite(Math.random() > 0.5);
      }

      setIsLoading(false);
    }, 500);
  }, [id]);

  const handleBorrowRequest = () => {
    if (!selectedCopy) {
      toast.error("You need to select which copy you want to borrow");
      return;
    }

    toast.success(
      `Your request has been sent to ${bookOwner?.username}. You'll be notified when they respond.`
    );
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);

    toast.success(
      isFavorite
        ? "This book has been removed from your favorites"
        : "This book has been added to your favorites"
    );
  };

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="animate-pulse">
          <div className="h-8 w-2/3 bg-muted rounded mb-4"></div>
          <div className="h-4 w-1/3 bg-muted rounded mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-[3/4] bg-muted rounded"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-full"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
              <div className="h-10 bg-muted rounded w-1/3 mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
        <p className="mb-6">
          The book you are looking for does not exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/books">Browse Books</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-custom py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Book Cover */}
        <div>
          <div className="aspect-[3/4] bg-secondary rounded-lg overflow-hidden shadow-md">
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-8">
                <span className="font-serif text-2xl text-center">
                  {book.title}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Book Details */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">
            {book.title}
          </h1>
          {book.author && <p className="text-xl mb-4">by {book.author}</p>}

          <div className="flex flex-wrap gap-2 mb-6">
            {bookTags.map((tag) => (
              <Badge key={tag.id} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <div className="flex-none w-32 text-muted-foreground">
                Language:
              </div>
              <div>{book.language}</div>
            </div>

            {book.publisher && (
              <div className="flex items-center">
                <div className="flex-none w-32 text-muted-foreground">
                  Publisher:
                </div>
                <div>{book.publisher}</div>
              </div>
            )}

            {book.publishedYear && (
              <div className="flex items-center">
                <div className="flex-none w-32 text-muted-foreground">
                  Published:
                </div>
                <div>{new Date(book.publishedYear).getFullYear()}</div>
              </div>
            )}

            {book.isbn && (
              <div className="flex items-center">
                <div className="flex-none w-32 text-muted-foreground">
                  ISBN:
                </div>
                <div>{book.isbn}</div>
              </div>
            )}

            <div className="flex items-center">
              <div className="flex-none w-32 text-muted-foreground">Pages:</div>
              <div>{book.pageCount}</div>
            </div>

            {book?.averageRating && book?.averageRating > 0 && (
              <div className="flex items-center">
                <div className="flex-none w-32 text-muted-foreground">
                  Rating:
                </div>
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={`${
                          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                          star <= Math.round(book?.averageRating!)
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2">
                    {book?.averageRating.toFixed(1)} ({book.reviewCount}{" "}
                    reviews)
                  </span>
                </div>
              </div>
            )}
          </div>

          <p className="mb-8">{book.description}</p>

          <div className="flex flex-wrap gap-4">
            {copies.some((copy) => copy.isAvailable) ? (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex-1 sm:flex-none">
                    Borrow this Book
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request to Borrow</DialogTitle>
                    <DialogDescription>
                      Submit a request to borrow this book from{" "}
                      {bookOwner?.username}.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="py-4">
                    <div className="mb-4">
                      <label className="text-sm font-medium mb-1 block">
                        Select Copy
                      </label>
                      <Select
                        value={selectedCopy}
                        onValueChange={setSelectedCopy}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a copy" />
                        </SelectTrigger>
                        <SelectContent>
                          {copies
                            .filter((copy) => copy.isAvailable)
                            .map((copy) => (
                              <SelectItem key={copy.id} value={copy.id}>
                                {copy.format.replace("_", " ")} -{" "}
                                {copy.condition.replace("_", " ")}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="mb-4">
                      <label className="text-sm font-medium mb-1 block">
                        Message (Optional)
                      </label>
                      <Textarea
                        placeholder="Add a message to the book owner..."
                        value={borrowMessage}
                        onChange={(e) => setBorrowMessage(e.target.value)}
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button onClick={handleBorrowRequest}>Send Request</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            ) : (
              <Button disabled className="flex-1 sm:flex-none">
                Currently Unavailable
              </Button>
            )}

            <Button
              variant="outline"
              className="flex-1 sm:flex-none"
              onClick={toggleFavorite}
            >
              <Heart
                className={`mr-2 h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
              />
              {isFavorite ? "Favorited" : "Add to Favorites"}
            </Button>

            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon">
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="about" className="mt-8">
        <TabsList className="grid w-full md:w-1/2 lg:w-1/3 grid-cols-3">
          <TabsTrigger value="about">About Owner</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        {/* About Owner Tab */}
        <TabsContent value="about" className="py-4">
          <Card>
            <CardHeader>
              <CardTitle>Book Owner</CardTitle>
              <CardDescription>
                Information about who shared this book
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={bookOwner?.profilePicture}
                    alt={bookOwner?.username}
                  />
                  <AvatarFallback>
                    {bookOwner?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="text-lg font-medium">{bookOwner?.username}</h3>

                  <div className="flex items-center text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{bookOwner?.location}</span>
                  </div>

                  <div className="flex items-center text-muted-foreground mt-1">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      Member since{" "}
                      {new Date(
                        bookOwner?.createdAt || ""
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center text-muted-foreground mt-1">
                    <BookOpen className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {Math.floor(Math.random() * 50) + 5} books shared
                    </span>
                  </div>

                  <p className="mt-4">{bookOwner?.bio}</p>

                  <div className="mt-4">
                    <Button variant="outline" asChild>
                      <Link to={`/profile/${bookOwner?.id}`}>View Profile</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Availability Tab */}
        <TabsContent value="availability" className="py-4">
          <Card>
            <CardHeader>
              <CardTitle>Book Copies</CardTitle>
              <CardDescription>
                Available formats and conditions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {copies.length === 0 ? (
                <p>No copies available at the moment.</p>
              ) : (
                <div className="space-y-4">
                  {copies.map((copy) => (
                    <div
                      key={copy.id}
                      className={`p-4 border rounded-md ${copy.isAvailable ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">
                            {copy.format
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0) + word.slice(1).toLowerCase()
                              )
                              .join(" ")}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Condition:{" "}
                            {copy.condition
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0) + word.slice(1).toLowerCase()
                              )
                              .join(" ")}
                          </p>
                          {copy.notes && (
                            <p className="text-sm mt-1">{copy.notes}</p>
                          )}
                        </div>
                        <Badge
                          variant={copy.isAvailable ? "outline" : "secondary"}
                        >
                          {copy.isAvailable ? "Available" : "Borrowed"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="py-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Reader Reviews</CardTitle>
                  <CardDescription>
                    {bookReviews.length}{" "}
                    {bookReviews.length === 1 ? "review" : "reviews"} for this
                    book
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Write a Review
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Review this Book</DialogTitle>
                      <DialogDescription>
                        Share your thoughts about "{book.title}" with the
                        community
                      </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                      <div className="mb-4">
                        <label className="text-sm font-medium mb-1 block">
                          Rating
                        </label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <Button
                              key={rating}
                              variant="outline"
                              size="sm"
                              className="p-2"
                            >
                              <Star className="h-5 w-5" />
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="text-sm font-medium mb-1 block">
                          Your Review
                        </label>
                        <Textarea
                          placeholder="Share your experience with this book..."
                          className="min-h-[120px]"
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button>Submit Review</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              {bookReviews.length === 0 ? (
                <div className="text-center py-8">
                  <h3 className="font-medium text-lg mb-2">No Reviews Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Be the first to review this book
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {bookReviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-6 last:border-b-0"
                    >
                      <div className="flex items-start gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={review.user?.profilePicture}
                            alt={review.user?.username}
                          />
                          <AvatarFallback>
                            {review.user?.username.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">
                                {review.user?.username}
                              </h4>
                              <div className="flex items-center mt-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    size={14}
                                    className={`${
                                      star <= review.rating
                                        ? "text-yellow-500 fill-yellow-500"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                                <span className="text-xs text-muted-foreground ml-2">
                                  {new Date(
                                    review.createdAt
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <p className="mt-2">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookDetail;
