import { Link } from "react-router";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { BookOpen, BookMarked, Users, Bookmark } from "lucide-react";
import Hero from "@/components/home/Hero";
import FeaturedBooks from "@/components/home/FeaturedBooks";
import HowItWorks from "@/components/home/HowItWorks";

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <FeaturedBooks />
      <HowItWorks />

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center p-4">
              <BookOpen className="h-8 w-8 mx-auto mb-2" />
              <div className="text-3xl md:text-4xl font-bold mb-1">5,731</div>
              <div className="text-primary-foreground/80">Books Shared</div>
            </div>
            <div className="text-center p-4">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <div className="text-3xl md:text-4xl font-bold mb-1">3,297</div>
              <div className="text-primary-foreground/80">Active Users</div>
            </div>
            <div className="text-center p-4">
              <BookMarked className="h-8 w-8 mx-auto mb-2" />
              <div className="text-3xl md:text-4xl font-bold mb-1">12,518</div>
              <div className="text-primary-foreground/80">Books Borrowed</div>
            </div>
            <div className="text-center p-4">
              <Bookmark className="h-8 w-8 mx-auto mb-2" />
              <div className="text-3xl md:text-4xl font-bold mb-1">28</div>
              <div className="text-primary-foreground/80">Cities</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-secondary/40">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              What Our Users Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join the thousands of readers who have found their next favorite
              book through our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-500 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}
              </div>
              <p className="italic mb-4">
                "I've discovered so many amazing books that I wouldn't have
                found otherwise. The community is friendly and responsive,
                making borrowing and lending books a breeze."
              </p>
              <div className="font-medium">Sarah K.</div>
              <div className="text-sm text-muted-foreground">New York, USA</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-500 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}
              </div>
              <p className="italic mb-4">
                "As someone who reads a lot, this platform has saved me so much
                money while allowing me to share my collection with others. It's
                a win-win situation for book lovers."
              </p>
              <div className="font-medium">Michael T.</div>
              <div className="text-sm text-muted-foreground">London, UK</div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-500 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}
              </div>
              <p className="italic mb-4">
                "Not only have I expanded my reading horizons, but I've also
                made friends who share my literary interests. The platform is
                intuitive and well-designed."
              </p>
              <div className="font-medium">Emily R.</div>
              <div className="text-sm text-muted-foreground">
                Toronto, Canada
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/register">Join Our Community</Link>
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
