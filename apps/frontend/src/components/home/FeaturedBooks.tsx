import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { books, users, tags, bookTags } from "@/utils/dummyData";
import { BookWithDetails, Tag } from "@/utils/types";

const FeaturedBooks = () => {
  const [featuredBooks, setFeaturedBooks] = useState<BookWithDetails[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Get random books for featured section
    const randomBooks = [...books]
      .sort(() => 0.5 - Math.random())
      .slice(0, 6)
      .map((book) => {
        // Get the owner of the book
        const owner = users.find((user) => user.id === book.ownerId);

        // Get the tags for the book
        const bookTagIds = bookTags
          .filter((bt) => bt.bookId === book.id)
          .map((bt) => bt.tagId);

        const bookTagsList = tags.filter((tag) => bookTagIds.includes(tag.id));

        return {
          ...book,
          owner,
          tags: bookTagsList,
        };
      });

    setFeaturedBooks(randomBooks);
  }, []);

  const nextBook = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredBooks.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevBook = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? featuredBooks.length - 1 : prevIndex - 1
    );
  };

  if (featuredBooks.length === 0) {
    return null;
  }

  const currentBook = featuredBooks[currentIndex];

  return (
    <section className="section-padding bg-secondary/40">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Featured Books
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover remarkable reads shared by our community members
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Featured Book Image */}
          <div className="relative aspect-[3/4] bg-white rounded-lg shadow-lg overflow-hidden">
            {currentBook.coverImage ? (
              <img
                src={currentBook.coverImage}
                alt={currentBook.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-secondary">
                <span className="font-serif text-2xl text-secondary-foreground">
                  {currentBook.title}
                </span>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <div className="flex flex-wrap gap-2">
                {currentBook.tags?.map((tag: Tag) => (
                  <span
                    key={tag.id}
                    className="text-xs font-medium py-1 px-2 bg-white/20 text-white rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Featured Book Info */}
          <div className="bg-white rounded-lg shadow p-8">
            <h3 className="text-2xl font-bold font-serif mb-2">
              {currentBook.title}
            </h3>
            {currentBook.author && (
              <p className="text-lg text-muted-foreground mb-4">
                by {currentBook.author}
              </p>
            )}

            <p className="mb-6 line-clamp-4">{currentBook.description}</p>

            <div className="flex items-center mb-6">
              <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                {currentBook.owner?.profilePicture ? (
                  <img
                    src={currentBook.owner.profilePicture}
                    alt={currentBook.owner.username}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-primary flex items-center justify-center text-white">
                    {currentBook.owner?.username.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">Shared by</p>
                <p className="text-sm text-muted-foreground">
                  {currentBook.owner?.username}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild>
                <Link to={`/books/${currentBook.id}`}>View Details</Link>
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevBook}
                  className="hover:text-muted-foreground cursor-pointer"
                  aria-label="Previous book"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextBook}
                  aria-label="Next book"
                  className="hover:text-muted-foreground cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBooks;
