import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-primary/5">
      <div className="container-custom py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight">
              Share Books,
              <br />
              Connect Readers
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Join our community of book lovers to share your collection, borrow
              from others, and discover your next favorite read.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg" className="font-medium">
                <Link to="/register">Join the Community</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-medium"
              >
                <Link to="/books">
                  Browse Books
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white rounded-lg shadow-md p-6 transform rotate-[-3deg]">
                  <BookOpen className="h-8 w-8 text-primary mb-2" />
                  <h3 className="text-lg font-medium">5,000+ Books</h3>
                  <p className="text-sm text-muted-foreground">
                    Available in our community library
                  </p>
                </div>
                <div className="bg-accent text-accent-foreground rounded-lg shadow-md p-6 transform translate-y-2">
                  <Users className="h-8 w-8 mb-2" />
                  <h3 className="text-lg font-medium">Friendly Community</h3>
                  <p className="text-sm">Connect with fellow book lovers</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-secondary rounded-lg shadow-md p-6 transform rotate-[3deg]">
                  <h3 className="text-lg font-medium">Simple Borrowing</h3>
                  <p className="text-sm text-muted-foreground">
                    Easy request and return process
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 transform translate-y-2">
                  <h3 className="text-lg font-medium">Digital & Physical</h3>
                  <p className="text-sm text-muted-foreground">
                    Multiple formats available
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-accent/20 to-primary/20 rounded-3xl blur-xl opacity-50" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
