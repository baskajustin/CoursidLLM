// Enums
export type Role = "STUDENT" | "INSTRUCTOR" | "ADMIN";
export type Level = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
export type OrderStatus = "PENDING" | "PAID" | "REFUNDED";
export type MessageRole = "USER" | "ASSISTANT";

// Core types
export interface User {
  id: string;
  name: string | null;
  email: string;
  avatarUrl: string | null;
  role: Role;
  language: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnailUrl: string | null;
  previewVideoUrl: string | null;
  price: number;
  isFree: boolean;
  level: Level;
  category: string;
  language: string;
  published: boolean;
  instructorId: string;
  instructor?: Pick<User, "id" | "name" | "avatarUrl">;
  createdAt: Date;
  updatedAt: Date;
  _count?: { enrollments: number; reviews: number; lessons: number };
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  videoUrl: string | null;
  duration: number;
  order: number;
  content: string | null;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  completedAt: Date | null;
  progressPercent: number;
  course?: Course;
}

export interface LessonProgress {
  id: string;
  enrollmentId: string;
  lessonId: string;
  watchedSeconds: number;
  completed: boolean;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  stripePaymentIntentId: string | null;
  amount: number;
  currency: string;
  status: OrderStatus;
  createdAt: Date;
  orderItems?: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  courseId: string;
  price: number;
  course?: Course;
}

export interface Review {
  id: string;
  userId: string;
  courseId: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user?: Pick<User, "id" | "name" | "avatarUrl">;
}

export interface ChatMessage {
  id: string;
  userId: string;
  lessonId: string;
  role: MessageRole;
  content: string;
  createdAt: Date;
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  issuedAt: Date;
  certificateUrl: string | null;
  course?: Pick<Course, "id" | "title" | "slug">;
}

// API response types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ApiError {
  error: string;
  code?: string;
}

// Chat types
export interface LLMMessage {
  role: "user" | "assistant";
  content: string;
}
