import express from 'express';
import {
  createReview,
  getProductReviews,
  getAllReviews,
  updateReview,
  deleteReview,
  getReviewSummary
} from '../controllers/reviewController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes (no authentication required)
// Get reviews for a specific product
router.get('/products/:productId/reviews', getProductReviews);

// Get review summary for a product
router.get('/products/:productId/reviews/summary', getReviewSummary);

// Get all reviews (public for now, can be made admin-only later)
router.get('/', getAllReviews);

// Protected routes (authentication required)
// Create a new review
router.post('/', authenticateToken, createReview);

// Update a review
router.patch('/:reviewId', authenticateToken, updateReview);

// Delete a review
router.delete('/:reviewId', authenticateToken, deleteReview);

export default router;
