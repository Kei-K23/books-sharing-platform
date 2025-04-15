import MainLayout from "@/components/layout/MainLayout";
import BookList from "@/components/books/BookList";

const Books = () => {
  return (
    <MainLayout>
      <div className="container-custom py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">
          Browse Books
        </h1>
        <p className="text-muted-foreground mb-8">
          Explore books shared by our community members
        </p>

        <BookList />
      </div>
    </MainLayout>
  );
};

export default Books;
