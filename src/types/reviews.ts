// Types for reviews API integration
export interface Review {
  _id: string;
  productId: string;
  author: {
    _id: string;
    name: string;
  };
  rating: number; // 1-5
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsResponse {
  data: Review[];
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface ReviewSummary {
  avg: number;
  count: number;
}

export interface CreateReviewData {
  productId: string;
  rating: number;
  comment: string;
}

export interface UpdateReviewData {
  rating?: number;
  comment?: string;
}

// Error types for better error handling
export class ReviewError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'ReviewError';
  }
}

export class AuthError extends ReviewError {
  constructor(message = 'Authentication required') {
    super(message, 401);
    this.name = 'AuthError';
  }
}

export class ValidationError extends ReviewError {
  constructor(message = 'Validation error', public fieldErrors?: Record<string, string>) {
    super(message, 422);
    this.name = 'ValidationError';
  }
}

export class DuplicateError extends ReviewError {
  constructor(message = 'You have already reviewed this product') {
    super(message, 409);
    this.name = 'DuplicateError';
  }
}
