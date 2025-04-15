import { BookPlus, BookOpen, Users, RotateCcw } from "lucide-react";

const steps = [
  {
    icon: <BookPlus className="h-10 w-10 text-primary" />,
    title: "Add Your Books",
    description:
      "Start by listing books from your collection that you're willing to share with others.",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: "Browse & Borrow",
    description:
      "Explore books shared by the community and request to borrow the ones you'd like to read.",
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Connect & Share",
    description:
      "Meet with the book owner to pick up the book or arrange for a convenient exchange.",
  },
  {
    icon: <RotateCcw className="h-10 w-10 text-primary" />,
    title: "Return & Review",
    description:
      "Return the book by the due date and leave a review about your reading experience.",
  },
];

const HowItWorks = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform makes sharing and borrowing books simple and rewarding
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 border border-border transition-transform hover:-translate-y-1"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="relative mt-16 p-8 bg-primary text-primary-foreground rounded-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">
              Ready to join our community?
            </h3>
            <p className="mb-6">
              Share your books, discover new reads, and connect with fellow book
              lovers in your area.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/register"
                className="py-2 px-6 bg-white text-primary font-medium rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Sign Up Now
              </a>
              <a
                href="/how-it-works"
                className="py-2 px-6 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="absolute -z-10 -inset-3 bg-primary rounded-3xl blur-xl opacity-50" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
