import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookWithDetails } from "@/utils/types";
import { Heart } from "lucide-react";

interface BookCardProps {
  book: BookWithDetails;
  isFavorite?: boolean;
  onToggleFavorite?: (bookId: string) => void;
}

const BookCard = ({
  book,
  isFavorite = false,
  onToggleFavorite,
}: BookCardProps) => {
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onToggleFavorite) {
      onToggleFavorite(book.id);
    }
  };

  const getBookConditionText = (bookId: string) => {
    console.log(bookId);

    // This would come from BookCopy in a real implementation
    // Just using random values for the prototype
    const conditions = ["As New", "Very Good", "Good", "Fair"];
    return conditions[Math.floor(Math.random() * conditions.length)];
  };

  return (
    <Link to={`/books/${book.id}`}>
      <Card className="overflow-hidden h-full transition-all duration-200 hover:shadow-md group">
        <div className="relative aspect-[2/3] overflow-hidden bg-secondary">
          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-4 text-center">
              <span className="font-serif text-lg">{book.title}</span>
            </div>
          )}

          {onToggleFavorite && (
            <button
              onClick={toggleFavorite}
              className="absolute top-2 right-2 p-2 bg-white/80 rounded-full shadow-sm hover:bg-white transition-colors"
            >
              <Heart
                className={`h-4 w-4 ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                }`}
              />
            </button>
          )}
        </div>

        <CardContent className="p-4">
          <h3 className="font-medium line-clamp-1">{book.title}</h3>
          {book.author && (
            <p className="text-sm text-muted-foreground line-clamp-1">
              by {book.author}
            </p>
          )}

          <div className="flex items-center justify-between mt-2">
            <Badge variant="outline" className="text-xs">
              {getBookConditionText(book.id)}
            </Badge>

            <span className="text-xs text-muted-foreground">
              {book.language}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default BookCard;
