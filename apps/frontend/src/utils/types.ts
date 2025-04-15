export enum UserRole {
  MEMBER = "MEMBER",
  ADMIN = "ADMIN",
}

export enum BookCondition {
  AS_NEW = "AS_NEW",
  FINE = "FINE",
  VERY_GOOD = "VERY_GOOD",
  GOOD = "GOOD",
  FAIR = "FAIR",
  POOR = "POOR",
}

export enum BookCopyFormat {
  HARD_COVER = "HARD_COVER",
  PAPER_BACK = "PAPER_BACK",
  E_BOOK = "E_BOOK",
  AUDIO_BOOK = "AUDIO_BOOK",
}

export enum BorrowRequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
  RETURNED = "RETURNED",
}

export enum FriendShipStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  location: string;
  isVerify: boolean;
  profilePicture?: string;
  bio?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  language: string;
  author?: string;
  publisher?: string;
  isbn?: string;
  publishedYear?: string;
  coverImage?: string;
  pageCount: number;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookCopy {
  id: string;
  bookId: string;
  isAvailable: boolean;
  condition: BookCondition;
  notes?: string;
  format: BookCopyFormat;
  createdAt: string;
  updatedAt: string;
}

export interface BorrowRequest {
  id: string;
  bookCopyId: string;
  borrowerId: string;
  status: BorrowRequestStatus;
  requestDate: string;
  approvedDate?: string;
  dueDate?: string;
  returnDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  bookId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface BookTag {
  bookId: string;
  tagId: string;
}

export interface UserBookFavorite {
  userId: string;
  bookId: string;
}

export interface Friendship {
  requesterId: string;
  receiverId: string;
  status: FriendShipStatus;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  createdAt: string;
}

export type BookWithDetails = Book & {
  owner?: User;
  copies?: BookCopy[];
  tags?: Tag[];
  reviews?: Review[];
  reviewCount?: number;
  averageRating?: number;
};
