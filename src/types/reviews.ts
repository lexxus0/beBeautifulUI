// Types for reviews API integration
export interface IWebReview {
  _id: string;
  name: string;
  location: string;
  rating: number;
  comment?: string;
  likes: number;
  dislikes: number;
  likedBy?: string[];
  dislikedBy?: string[];
  // hasLiked?: boolean;
  // hasDisliked?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IProductReview {
  _id: string;
  productId: string;
  userId: string;

  rating: number;
  comment?: string;
  likes: number;
  dislikes: number;
  likedBy?: string[];
  dislikedBy?: string[];
  // hasLiked?: boolean;
  // hasDisliked?: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    _id: string;
    name: string;
    location?: string;
  };
}

export interface IWebReviewResponse {
  data: IWebReview[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export interface IProductReviewResponse {
  data: IProductReview[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export interface ILocalReaction {
  likes?: number;
  dislikes?: number;
  likedBy?: string[];
  dislikedBy?: string[];
  // hasLiked?: boolean;
  // hasDisliked?: boolean;
}

export interface CreateReviewData {
  productId: string;
  rating: number;
  comment?: string;
}

export interface UpdateReviewData {
  rating?: number;
  comment?: string;
}

export interface IUIReview {
  _id: string;
  productId?: string | null;
  userId?: string | null;

  name: string;
  location: string;
  rating: number;
  comment: string;
  createdAt: string;

  likes: number;
  dislikes: number;
  likedBy?: string[];
  dislikedBy?: string[];
  // hasLiked: boolean;
  // hasDisliked: boolean;
  // --- UI helper ---
  isMine: boolean;
}

// Error types for better error handling
export class ReviewError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = "ReviewError";
  }
}

export class AuthError extends ReviewError {
  constructor(message = "Authentication required") {
    super(message, 401);
    this.name = "AuthError";
  }
}

export class ValidationError extends ReviewError {
  constructor(
    message = "Validation error",
    public fieldErrors?: Record<string, string>
  ) {
    super(message, 422);
    this.name = "ValidationError";
  }
}

export class DuplicateError extends ReviewError {
  constructor(message = "You have already reviewed this product") {
    super(message, 409);
    this.name = "DuplicateError";
  }
}
