import {
  BookCondition,
  BookCopyFormat,
  BorrowRequestStatus,
  FriendShipStatus,
  UserRole,
} from "./types";

export const users = [
  {
    id: "1",
    username: "sarah_reader",
    email: "sarah@example.com",
    password: "password123",
    location: "New York, USA",
    isVerify: true,
    profilePicture:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287&auto=format&fit=crop",
    bio: "Book enthusiast and coffee lover. I enjoy reading fiction and historical novels.",
    role: "MEMBER" as UserRole,
    createdAt: new Date("2023-01-15").toISOString(),
    updatedAt: new Date("2023-01-15").toISOString(),
  },
  {
    id: "2",
    username: "james_bookworm",
    email: "james@example.com",
    password: "password123",
    location: "London, UK",
    isVerify: true,
    profilePicture:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop",
    bio: "Fantasy and sci-fi reader. Proud owner of a large book collection.",
    role: "MEMBER" as UserRole,
    createdAt: new Date("2023-02-20").toISOString(),
    updatedAt: new Date("2023-02-20").toISOString(),
  },
  {
    id: "3",
    username: "emily_novels",
    email: "emily@example.com",
    password: "password123",
    location: "Toronto, Canada",
    isVerify: true,
    profilePicture:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop",
    bio: "Literature teacher who loves to share knowledge through books.",
    role: "MEMBER" as UserRole,
    createdAt: new Date("2023-03-10").toISOString(),
    updatedAt: new Date("2023-03-10").toISOString(),
  },
  {
    id: "4",
    username: "david_stories",
    email: "david@example.com",
    password: "password123",
    location: "Sydney, Australia",
    isVerify: true,
    profilePicture:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1287&auto=format&fit=crop",
    bio: "Romance and mystery books collector. Always looking to expand my collection.",
    role: "MEMBER" as UserRole,
    createdAt: new Date("2023-04-05").toISOString(),
    updatedAt: new Date("2023-04-05").toISOString(),
  },
  {
    id: "5",
    username: "admin_user",
    email: "admin@example.com",
    password: "adminpass123",
    location: "San Francisco, USA",
    isVerify: true,
    profilePicture:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1470&auto=format&fit=crop",
    bio: "Platform administrator and book enthusiast.",
    role: "ADMIN" as UserRole,
    createdAt: new Date("2023-01-01").toISOString(),
    updatedAt: new Date("2023-01-01").toISOString(),
  },
];

export const books = [
  {
    id: "1",
    title: "To Kill a Mockingbird",
    description:
      "A novel about racial injustice and loss of innocence in the American South during the 1930s. Follows young Scout Finch as she observes her father, Atticus, defend a black man falsely accused of rape.",
    language: "English",
    author: "Harper Lee",
    publisher: "J.B. Lippincott & Co.",
    isbn: "9780061120084",
    publishedYear: new Date("1960-07-11").toISOString(),
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1287&auto=format&fit=crop",
    pageCount: 281,
    ownerId: "1",
    createdAt: new Date("2023-05-10").toISOString(),
    updatedAt: new Date("2023-05-10").toISOString(),
  },
  {
    id: "2",
    title: "1984",
    description:
      "A dystopian novel set in Airstrip One, a province of the superstate Oceania in a world of perpetual war and government surveillance. Follows the life of Winston Smith, a low-ranking member of the ruling Party.",
    language: "English",
    author: "George Orwell",
    publisher: "Secker & Warburg",
    isbn: "9780451524935",
    publishedYear: new Date("1949-06-08").toISOString(),
    coverImage:
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1288&auto=format&fit=crop",
    pageCount: 328,
    ownerId: "2",
    createdAt: new Date("2023-05-12").toISOString(),
    updatedAt: new Date("2023-05-12").toISOString(),
  },
  {
    id: "3",
    title: "Pride and Prejudice",
    description:
      "A romantic novel following the character development of Elizabeth Bennet, the protagonist of the book, who learns about the repercussions of hasty judgments and comes to appreciate the difference between superficial goodness and actual goodness.",
    language: "English",
    author: "Jane Austen",
    publisher: "T. Egerton, Whitehall",
    isbn: "9780141439518",
    publishedYear: new Date("1813-01-28").toISOString(),
    coverImage:
      "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=1529&auto=format&fit=crop",
    pageCount: 432,
    ownerId: "3",
    createdAt: new Date("2023-05-15").toISOString(),
    updatedAt: new Date("2023-05-15").toISOString(),
  },
  {
    id: "4",
    title: "The Great Gatsby",
    description:
      "A novel that examines the decay of the American Dream in the 1920s. Set on Long Island and in New York City, it follows the mysterious millionaire Jay Gatsby and his obsession to reunite with his former lover, Daisy Buchanan.",
    language: "English",
    author: "F. Scott Fitzgerald",
    publisher: "Charles Scribner's Sons",
    isbn: "9780743273565",
    publishedYear: new Date("1925-04-10").toISOString(),
    coverImage:
      "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1376&auto=format&fit=crop",
    pageCount: 180,
    ownerId: "4",
    createdAt: new Date("2023-05-18").toISOString(),
    updatedAt: new Date("2023-05-18").toISOString(),
  },
  {
    id: "5",
    title: "The Catcher in the Rye",
    description:
      "A novel that follows the experiences of teenager Holden Caulfield in New York City over the course of several days after being expelled from prep school. Holden narrates his story in a cynical and jaded language style.",
    language: "English",
    author: "J.D. Salinger",
    publisher: "Little, Brown and Company",
    isbn: "9780316769488",
    publishedYear: new Date("1951-07-16").toISOString(),
    coverImage:
      "https://images.unsplash.com/photo-1531928351158-2f736078e0a1?q=80&w=1287&auto=format&fit=crop",
    pageCount: 277,
    ownerId: "1",
    createdAt: new Date("2023-05-20").toISOString(),
    updatedAt: new Date("2023-05-20").toISOString(),
  },
  {
    id: "6",
    title: "The Hobbit",
    description:
      "A fantasy novel following the quest of home-loving Bilbo Baggins to win a share of the treasure guarded by Smaug the dragon. Along the way, he encounters trolls, elves, goblins, and the mysterious Gollum.",
    language: "English",
    author: "J.R.R. Tolkien",
    publisher: "George Allen & Unwin",
    isbn: "9780547928227",
    publishedYear: new Date("1937-09-21").toISOString(),
    coverImage:
      "https://images.unsplash.com/photo-1621351183012-e2110f8d9184?q=80&w=1335&auto=format&fit=crop",
    pageCount: 310,
    ownerId: "2",
    createdAt: new Date("2023-05-22").toISOString(),
    updatedAt: new Date("2023-05-22").toISOString(),
  },
  {
    id: "7",
    title: "Harry Potter and the Philosopher's Stone",
    description:
      "The first novel in the Harry Potter series that introduces Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry.",
    language: "English",
    author: "J.K. Rowling",
    publisher: "Bloomsbury",
    isbn: "9780747532743",
    publishedYear: new Date("1997-06-26").toISOString(),
    coverImage:
      "https://images.unsplash.com/photo-1626618012641-bfbca5a31239?q=80&w=1464&auto=format&fit=crop",
    pageCount: 223,
    ownerId: "3",
    createdAt: new Date("2023-05-25").toISOString(),
    updatedAt: new Date("2023-05-25").toISOString(),
  },
  {
    id: "8",
    title: "The Lord of the Rings",
    description:
      "An epic high-fantasy novel that follows hobbits Frodo Baggins, Sam Gamgee, Merry Brandybuck and Pippin Took and others including Gandalf the wizard and Aragorn the king as they fight against the Dark Lord Sauron to save Middle-earth from the One Ring.",
    language: "English",
    author: "J.R.R. Tolkien",
    publisher: "George Allen & Unwin",
    isbn: "9780618640157",
    publishedYear: new Date("1954-07-29").toISOString(),
    coverImage:
      "https://images.unsplash.com/photo-1695653422259-8a74ffe3487e?q=80&w=1287&auto=format&fit=crop",
    pageCount: 1178,
    ownerId: "4",
    createdAt: new Date("2023-05-28").toISOString(),
    updatedAt: new Date("2023-05-28").toISOString(),
  },
];

export const bookCopies = [
  {
    id: "1",
    bookId: "1",
    isAvailable: true,
    condition: "VERY_GOOD" as BookCondition,
    notes: "Slight wear on the cover, but pages are in excellent condition.",
    format: "PAPER_BACK" as BookCopyFormat,
    createdAt: new Date("2023-05-10").toISOString(),
    updatedAt: new Date("2023-05-10").toISOString(),
  },
  {
    id: "2",
    bookId: "2",
    isAvailable: true,
    condition: "GOOD" as BookCondition,
    notes: "Some highlighting in the first few chapters.",
    format: "PAPER_BACK" as BookCopyFormat,
    createdAt: new Date("2023-05-12").toISOString(),
    updatedAt: new Date("2023-05-12").toISOString(),
  },
  {
    id: "3",
    bookId: "3",
    isAvailable: false,
    condition: "FINE" as BookCondition,
    notes: "Special edition with gold-trimmed pages.",
    format: "HARD_COVER" as BookCopyFormat,
    createdAt: new Date("2023-05-15").toISOString(),
    updatedAt: new Date("2023-05-15").toISOString(),
  },
  {
    id: "4",
    bookId: "4",
    isAvailable: true,
    condition: "GOOD" as BookCondition,
    notes: "Some dog-eared pages.",
    format: "PAPER_BACK" as BookCopyFormat,
    createdAt: new Date("2023-05-18").toISOString(),
    updatedAt: new Date("2023-05-18").toISOString(),
  },
  {
    id: "5",
    bookId: "5",
    isAvailable: true,
    condition: "VERY_GOOD" as BookCondition,
    notes: "Like new condition.",
    format: "HARD_COVER" as BookCopyFormat,
    createdAt: new Date("2023-05-20").toISOString(),
    updatedAt: new Date("2023-05-20").toISOString(),
  },
  {
    id: "6",
    bookId: "5",
    isAvailable: true,
    condition: "GOOD" as BookCondition,
    notes: "Digital copy, available for 2-week loan.",
    format: "E_BOOK" as BookCopyFormat,
    createdAt: new Date("2023-05-21").toISOString(),
    updatedAt: new Date("2023-05-21").toISOString(),
  },
  {
    id: "7",
    bookId: "6",
    isAvailable: false,
    condition: "AS_NEW" as BookCondition,
    notes: "Collector's edition with illustrations.",
    format: "HARD_COVER" as BookCopyFormat,
    createdAt: new Date("2023-05-22").toISOString(),
    updatedAt: new Date("2023-05-22").toISOString(),
  },
  {
    id: "8",
    bookId: "7",
    isAvailable: true,
    condition: "GOOD" as BookCondition,
    notes: "Well-loved copy.",
    format: "PAPER_BACK" as BookCopyFormat,
    createdAt: new Date("2023-05-25").toISOString(),
    updatedAt: new Date("2023-05-25").toISOString(),
  },
  {
    id: "9",
    bookId: "8",
    isAvailable: true,
    condition: "FINE" as BookCondition,
    notes: "Complete trilogy in one volume.",
    format: "HARD_COVER" as BookCopyFormat,
    createdAt: new Date("2023-05-28").toISOString(),
    updatedAt: new Date("2023-05-28").toISOString(),
  },
  {
    id: "10",
    bookId: "8",
    isAvailable: true,
    condition: "VERY_GOOD" as BookCondition,
    notes: "Professional narration by Andy Serkis.",
    format: "AUDIO_BOOK" as BookCopyFormat,
    createdAt: new Date("2023-05-29").toISOString(),
    updatedAt: new Date("2023-05-29").toISOString(),
  },
];

export const borrowRequests = [
  {
    id: "1",
    bookCopyId: "3",
    borrowerId: "2",
    status: "ACCEPTED" as BorrowRequestStatus,
    requestDate: new Date("2023-06-05").toISOString(),
    approvedDate: new Date("2023-06-06").toISOString(),
    dueDate: new Date("2023-07-06").toISOString(),
    returnDate: null,
    createdAt: new Date("2023-06-05").toISOString(),
    updatedAt: new Date("2023-06-06").toISOString(),
  },
  {
    id: "2",
    bookCopyId: "7",
    borrowerId: "4",
    status: "ACCEPTED" as BorrowRequestStatus,
    requestDate: new Date("2023-06-10").toISOString(),
    approvedDate: new Date("2023-06-11").toISOString(),
    dueDate: new Date("2023-07-11").toISOString(),
    returnDate: null,
    createdAt: new Date("2023-06-10").toISOString(),
    updatedAt: new Date("2023-06-11").toISOString(),
  },
  {
    id: "3",
    bookCopyId: "1",
    borrowerId: "3",
    status: "PENDING" as BorrowRequestStatus,
    requestDate: new Date("2023-06-15").toISOString(),
    approvedDate: null,
    dueDate: null,
    returnDate: null,
    createdAt: new Date("2023-06-15").toISOString(),
    updatedAt: new Date("2023-06-15").toISOString(),
  },
  {
    id: "4",
    bookCopyId: "5",
    borrowerId: "2",
    status: "REJECTED" as BorrowRequestStatus,
    requestDate: new Date("2023-06-20").toISOString(),
    approvedDate: null,
    dueDate: null,
    returnDate: null,
    createdAt: new Date("2023-06-20").toISOString(),
    updatedAt: new Date("2023-06-21").toISOString(),
  },
  {
    id: "5",
    bookCopyId: "8",
    borrowerId: "1",
    status: "PENDING" as BorrowRequestStatus,
    requestDate: new Date("2023-06-25").toISOString(),
    approvedDate: null,
    dueDate: null,
    returnDate: null,
    createdAt: new Date("2023-06-25").toISOString(),
    updatedAt: new Date("2023-06-25").toISOString(),
  },
];

export const reviews = [
  {
    id: "1",
    bookId: "1",
    userId: "2",
    rating: 5,
    comment:
      "A timeless classic that everyone should read. The characters are so well developed and the story is powerful.",
    createdAt: new Date("2023-07-10").toISOString(),
    updatedAt: new Date("2023-07-10").toISOString(),
  },
  {
    id: "2",
    bookId: "2",
    userId: "3",
    rating: 4,
    comment:
      "A chilling dystopian novel that remains relevant today. The world-building is excellent, though the pacing can be slow at times.",
    createdAt: new Date("2023-07-12").toISOString(),
    updatedAt: new Date("2023-07-12").toISOString(),
  },
  {
    id: "3",
    bookId: "3",
    userId: "4",
    rating: 5,
    comment:
      "Jane Austen's wit and social commentary shine in this romantic classic. Elizabeth Bennet is one of literature's most endearing heroines.",
    createdAt: new Date("2023-07-15").toISOString(),
    updatedAt: new Date("2023-07-15").toISOString(),
  },
  {
    id: "4",
    bookId: "4",
    userId: "1",
    rating: 4,
    comment:
      "Beautifully written with vivid imagery. The exploration of wealth, love, and the American Dream is masterfully done.",
    createdAt: new Date("2023-07-18").toISOString(),
    updatedAt: new Date("2023-07-18").toISOString(),
  },
  {
    id: "5",
    bookId: "5",
    userId: "2",
    rating: 3,
    comment:
      "A good exploration of teenage angst and alienation, though Holden can be a frustrating protagonist at times.",
    createdAt: new Date("2023-07-20").toISOString(),
    updatedAt: new Date("2023-07-20").toISOString(),
  },
];

export const tags = [
  { id: "1", name: "Fiction" },
  { id: "2", name: "Classics" },
  { id: "3", name: "Fantasy" },
  { id: "4", name: "Science Fiction" },
  { id: "5", name: "Young Adult" },
  { id: "6", name: "Romance" },
  { id: "7", name: "Mystery" },
  { id: "8", name: "Thriller" },
  { id: "9", name: "Historical Fiction" },
  { id: "10", name: "Biography" },
];

export const bookTags = [
  { bookId: "1", tagId: "1" }, // To Kill a Mockingbird - Fiction
  { bookId: "1", tagId: "2" }, // To Kill a Mockingbird - Classics
  { bookId: "2", tagId: "1" }, // 1984 - Fiction
  { bookId: "2", tagId: "2" }, // 1984 - Classics
  { bookId: "2", tagId: "4" }, // 1984 - Science Fiction
  { bookId: "3", tagId: "1" }, // Pride and Prejudice - Fiction
  { bookId: "3", tagId: "2" }, // Pride and Prejudice - Classics
  { bookId: "3", tagId: "6" }, // Pride and Prejudice - Romance
  { bookId: "4", tagId: "1" }, // The Great Gatsby - Fiction
  { bookId: "4", tagId: "2" }, // The Great Gatsby - Classics
  { bookId: "5", tagId: "1" }, // The Catcher in the Rye - Fiction
  { bookId: "5", tagId: "2" }, // The Catcher in the Rye - Classics
  { bookId: "5", tagId: "5" }, // The Catcher in the Rye - Young Adult
  { bookId: "6", tagId: "1" }, // The Hobbit - Fiction
  { bookId: "6", tagId: "3" }, // The Hobbit - Fantasy
  { bookId: "7", tagId: "1" }, // Harry Potter - Fiction
  { bookId: "7", tagId: "3" }, // Harry Potter - Fantasy
  { bookId: "7", tagId: "5" }, // Harry Potter - Young Adult
  { bookId: "8", tagId: "1" }, // The Lord of the Rings - Fiction
  { bookId: "8", tagId: "3" }, // The Lord of the Rings - Fantasy
];

export const userBookFavorites = [
  { userId: "1", bookId: "2" }, // User 1 favorites 1984
  { userId: "1", bookId: "6" }, // User 1 favorites The Hobbit
  { userId: "2", bookId: "1" }, // User 2 favorites To Kill a Mockingbird
  { userId: "2", bookId: "3" }, // User 2 favorites Pride and Prejudice
  { userId: "3", bookId: "4" }, // User 3 favorites The Great Gatsby
  { userId: "3", bookId: "7" }, // User 3 favorites Harry Potter
  { userId: "4", bookId: "5" }, // User 4 favorites The Catcher in the Rye
  { userId: "4", bookId: "8" }, // User 4 favorites The Lord of the Rings
];

export const friendships = [
  {
    requesterId: "1",
    receiverId: "2",
    status: "ACCEPTED" as FriendShipStatus,
    createdAt: new Date("2023-08-05").toISOString(),
  },
  {
    requesterId: "1",
    receiverId: "3",
    status: "ACCEPTED" as FriendShipStatus,
    createdAt: new Date("2023-08-10").toISOString(),
  },
  {
    requesterId: "2",
    receiverId: "4",
    status: "ACCEPTED" as FriendShipStatus,
    createdAt: new Date("2023-08-15").toISOString(),
  },
  {
    requesterId: "3",
    receiverId: "4",
    status: "PENDING" as FriendShipStatus,
    createdAt: new Date("2023-08-20").toISOString(),
  },
  {
    requesterId: "4",
    receiverId: "1",
    status: "PENDING" as FriendShipStatus,
    createdAt: new Date("2023-08-25").toISOString(),
  },
];

export const notifications = [
  {
    id: "1",
    userId: "1",
    type: "BORROW_REQUEST",
    message:
      "James has requested to borrow your copy of 'To Kill a Mockingbird'",
    isRead: false,
    createdAt: new Date("2023-09-05").toISOString(),
  },
  {
    id: "2",
    userId: "2",
    type: "BORROW_APPROVED",
    message: "Emily has approved your request to borrow 'Pride and Prejudice'",
    isRead: true,
    createdAt: new Date("2023-09-10").toISOString(),
  },
  {
    id: "3",
    userId: "3",
    type: "BOOK_RETURNED",
    message: "James has returned your copy of 'Pride and Prejudice'",
    isRead: false,
    createdAt: new Date("2023-09-15").toISOString(),
  },
  {
    id: "4",
    userId: "4",
    type: "FRIEND_REQUEST",
    message: "Emily has sent you a friend request",
    isRead: false,
    createdAt: new Date("2023-09-20").toISOString(),
  },
  {
    id: "5",
    userId: "1",
    type: "BOOK_DUE",
    message: "The book 'Harry Potter' is due to be returned tomorrow",
    isRead: false,
    createdAt: new Date("2023-09-25").toISOString(),
  },
];

export const userActivities = [
  {
    id: "1",
    userId: "1",
    action: "Added a new book: To Kill a Mockingbird",
    createdAt: new Date("2023-10-05").toISOString(),
  },
  {
    id: "2",
    userId: "2",
    action: "Borrowed: Pride and Prejudice from Emily",
    createdAt: new Date("2023-10-10").toISOString(),
  },
  {
    id: "3",
    userId: "3",
    action: "Shared The Great Gatsby with the community",
    createdAt: new Date("2023-10-15").toISOString(),
  },
  {
    id: "4",
    userId: "4",
    action: "Reviewed: The Catcher in the Rye (3 stars)",
    createdAt: new Date("2023-10-20").toISOString(),
  },
  {
    id: "5",
    userId: "1",
    action: "Returned: Harry Potter to Emily",
    createdAt: new Date("2023-10-25").toISOString(),
  },
];

export const getCurrentUser = () => {
  // In a real app, this would check authentication
  return users[0]; // Return the first user as the current user for demo
};
