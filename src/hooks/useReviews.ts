import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { 
  fetchReviews, 
  createReview, 
  updateReview, 
  deleteReview, 
  fetchReviewSummary 
} from '@/store/reviews/operations';
import { 
  selectReviews, 
  selectReviewsLoading, 
  selectReviewsError, 
  selectReviewsPagination,
  selectReviewSummary 
} from '@/store/reviews/selectors';
import { CreateReviewData, UpdateReviewData } from '@/types/reviews';
import { useCallback } from 'react';

export function useReviews(productId?: string) {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(selectReviews);
  const isLoading = useAppSelector(selectReviewsLoading);
  const error = useAppSelector(selectReviewsError);
  const pagination = useAppSelector(selectReviewsPagination);
  const summary = useAppSelector(selectReviewSummary(productId || ''));

  const loadReviews = useCallback((page = 1, limit = 10, sort = '-createdAt') => {
    if (productId) {
      dispatch(fetchReviews({ productId, limit, currentPage: page, sort }));
    }
  }, [dispatch, productId]);

  const loadSummary = useCallback(() => {
    if (productId) {
      dispatch(fetchReviewSummary({ productId }));
    }
  }, [dispatch, productId]);

  const addReview = useCallback(async (data: CreateReviewData) => {
    try {
      await dispatch(createReview(data)).unwrap();
      // Refresh reviews and summary after creating
      loadReviews();
      loadSummary();
    } catch (error) {
      throw error;
    }
  }, [dispatch, loadReviews, loadSummary]);

  const editReview = useCallback(async (id: string, data: UpdateReviewData) => {
    try {
      await dispatch(updateReview({ id, data })).unwrap();
      // Refresh summary after updating
      loadSummary();
    } catch (error) {
      throw error;
    }
  }, [dispatch, loadSummary]);

  const removeReview = useCallback(async (id: string) => {
    try {
      await dispatch(deleteReview({ id })).unwrap();
      // Refresh summary after deleting
      loadSummary();
    } catch (error) {
      throw error;
    }
  }, [dispatch, loadSummary]);

  return {
    reviews,
    summary,
    isLoading,
    error,
    pagination,
    loadReviews,
    loadSummary,
    addReview,
    editReview,
    removeReview,
  };
}
