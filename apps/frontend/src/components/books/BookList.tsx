import { useState, useEffect } from "react";
import {
  books,
  users,
  tags,
  bookTags,
  userBookFavorites,
} from "@/utils/dummyData";
import { BookWithDetails } from "@/utils/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import BookCard from "./BookCard";

const BookList = () => {
  const [displayedBooks, setDisplayedBooks] = useState<BookWithDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [pageCountRange, setPageCountRange] = useState([0, 1200]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [availableLanguages, setAvailableLanguages] = useState<string[]>([]);
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const currentUserId = "1"; // In a real app, this would come from authentication

  useEffect(() => {
    // Generate enhanced books with owner and tags information
    const enhancedBooks = books.map((book) => {
      // Get the owner
      const owner = users.find((user) => user.id === book.ownerId);

      // Get the tags
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

    // Get user favorites
    const userFavs = userBookFavorites
      .filter((fav) => fav.userId === currentUserId)
      .map((fav) => fav.bookId);

    setFavorites(userFavs);

    // Extract unique languages
    const languages = [...new Set(books.map((book) => book.language))];
    setAvailableLanguages(languages);

    // Apply initial filters
    filterBooks(enhancedBooks);
  }, [currentUserId]);

  const filterBooks = (
    booksToFilter: BookWithDetails[] = [...displayedBooks]
  ) => {
    if (displayedBooks.length === 0 && booksToFilter.length === 0) {
      booksToFilter = books.map((book) => {
        const owner = users.find((user) => user.id === book.ownerId);
        const bookTagIds = bookTags
          .filter((bt) => bt.bookId === book.id)
          .map((bt) => bt.tagId);
        const bookTagsList = tags.filter((tag) => bookTagIds.includes(tag.id));
        return { ...book, owner, tags: bookTagsList };
      });
    }

    let filtered = booksToFilter;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (book.author &&
            book.author.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply language filter
    if (selectedLanguage) {
      filtered = filtered.filter((book) => book.language === selectedLanguage);
    }

    // Apply tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((book) => {
        const bookTagNames =
          book.tags?.map((tag) => tag.name.toLowerCase()) || [];
        return selectedTags.some((tag) =>
          bookTagNames.includes(tag.toLowerCase())
        );
      });
    }

    // Apply page count filter
    filtered = filtered.filter(
      (book) =>
        book.pageCount >= pageCountRange[0] &&
        book.pageCount <= pageCountRange[1]
    );

    setDisplayedBooks(filtered);

    // Check if any filter is applied
    setIsFilterApplied(
      !!searchQuery ||
        !!selectedLanguage ||
        selectedTags.length > 0 ||
        pageCountRange[0] > 0 ||
        pageCountRange[1] < 1200
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedLanguage("");
    setSelectedTags([]);
    setPageCountRange([0, 1200]);

    // Reset to original books
    const enhancedBooks = books.map((book) => {
      const owner = users.find((user) => user.id === book.ownerId);
      const bookTagIds = bookTags
        .filter((bt) => bt.bookId === book.id)
        .map((bt) => bt.tagId);
      const bookTagsList = tags.filter((tag) => bookTagIds.includes(tag.id));
      return { ...book, owner, tags: bookTagsList };
    });

    setDisplayedBooks(enhancedBooks);
    setIsFilterApplied(false);
  };

  const handleTagSelect = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter((t) => t !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  const toggleFavorite = (bookId: string) => {
    if (favorites.includes(bookId)) {
      setFavorites(favorites.filter((id) => id !== bookId));
    } else {
      setFavorites([...favorites, bookId]);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterBooks();
  };

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search books by title or author..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[400px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filter Books</SheetTitle>
                <SheetDescription>
                  Narrow down the book list with these filters
                </SheetDescription>
              </SheetHeader>

              <div className="py-6 space-y-6">
                {/* Language Filter */}
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={selectedLanguage}
                    onValueChange={setSelectedLanguage}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Languages</SelectItem>
                      {availableLanguages.map((language, index) => (
                        <SelectItem key={index} value={language}>
                          {language}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Page Count Filter */}
                <div className="space-y-2">
                  <Label>Page Count</Label>
                  <Slider
                    value={pageCountRange}
                    onValueChange={setPageCountRange}
                    min={0}
                    max={1200}
                    step={50}
                    className="my-6"
                  />
                  <div className="flex justify-between">
                    <span className="text-sm">{pageCountRange[0]} pages</span>
                    <span className="text-sm">{pageCountRange[1]} pages</span>
                  </div>
                </div>

                {/* Tags Filter */}
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag.id}
                        variant={
                          selectedTags.includes(tag.name)
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => handleTagSelect(tag.name)}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <SheetFooter className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={clearFilters}>
                  Reset Filters
                </Button>
                <SheetClose asChild>
                  <Button onClick={() => filterBooks()}>Apply Filters</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </form>
      </div>

      {/* Applied Filters */}
      {isFilterApplied && (
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Applied filters:
          </span>

          {searchQuery && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: {searchQuery}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setSearchQuery("");
                  filterBooks();
                }}
              />
            </Badge>
          )}

          {selectedLanguage && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Language: {selectedLanguage}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setSelectedLanguage("");
                  filterBooks();
                }}
              />
            </Badge>
          )}

          {selectedTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="flex items-center gap-1"
            >
              Tag: {tag}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  setSelectedTags(selectedTags.filter((t) => t !== tag));
                  filterBooks();
                }}
              />
            </Badge>
          ))}

          <Button
            variant="link"
            size="sm"
            onClick={clearFilters}
            className="text-sm"
          >
            Clear all
          </Button>
        </div>
      )}

      {/* Books Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {displayedBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isFavorite={favorites.includes(book.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>

      {/* Empty State */}
      {displayedBooks.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No books found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or search query
          </p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      )}
    </div>
  );
};

export default BookList;
