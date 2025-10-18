import { ReviewModel } from '../models/Review.js';
import { ProductModel } from '../models/Product.js';

// Create a new review
export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user._id; // From JWT middleware

    // Validate product exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check if user already reviewed this product
    const existingReview = await ReviewModel.findOne({ userId, productId });
    if (existingReview) {
      return res.status(409).json({
        success: false,
        message: 'You have already reviewed this product'
      });
    }

    // Create new review
    const review = new ReviewModel({
      productId,
      userId,
      rating,
      comment: comment || ''
    });

    await review.save();

    // Populate user data for response
    await review.populate('userId', 'name email');

    res.status(201).json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Create review error:', error);
    
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'You have already reviewed this product'
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get reviews for a specific product
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Validate product exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Get reviews with pagination
    const reviews = await ReviewModel.find({ productId })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await ReviewModel.countDocuments({ productId });

    // Transform reviews to include author info
    const transformedReviews = reviews.map(review => ({
      _id: review._id,
      productId: review.productId,
      userId: review.userId._id,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      author: {
        _id: review.userId._id,
        name: review.userId.name || review.userId.email
      }
    }));

    res.json({
      success: true,
      data: transformedReviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get product reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get all reviews (admin)
export const getAllReviews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const reviews = await ReviewModel.find()
      .populate('userId', 'name email')
      .populate('productId', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ReviewModel.countDocuments();

    const transformedReviews = reviews.map(review => ({
      _id: review._id,
      productId: review.productId._id,
      userId: review.userId._id,
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
      updatedAt: review.updatedAt,
      author: {
        _id: review.userId._id,
        name: review.userId.name || review.userId.email
      },
      product: {
        _id: review.productId._id,
        name: review.productId.name
      }
    }));

    res.json({
      success: true,
      data: transformedReviews,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get all reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update review
export const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;

    const review = await ReviewModel.findOne({ _id: reviewId, userId });
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or you are not authorized to update it'
      });
    }

    // Update fields if provided
    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;

    await review.save();
    await review.populate('userId', 'name email');

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Update review error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: Object.values(error.errors).map(err => err.message)
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete review
export const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id;

    const review = await ReviewModel.findOne({ _id: reviewId, userId });
    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found or you are not authorized to delete it'
      });
    }

    await ReviewModel.findByIdAndDelete(reviewId);

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get review summary for a product
export const getReviewSummary = async (req, res) => {
  try {
    const { productId } = req.params;

    // Validate product exists
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Calculate average rating and count
    const result = await ReviewModel.aggregate([
      { $match: { productId: product._id } },
      {
        $group: {
          _id: null,
          avg: { $avg: '$rating' },
          count: { $sum: 1 }
        }
      }
    ]);

    const summary = result.length > 0 ? {
      avg: Math.round(result[0].avg * 10) / 10, // Round to 1 decimal place
      count: result[0].count
    } : {
      avg: 0,
      count: 0
    };

    res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    console.error('Get review summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

