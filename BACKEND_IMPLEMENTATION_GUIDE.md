# Backend Implementation Guide

## Required Backend Changes

Your frontend is now updated to use the proper API endpoints that match your schema. Here's what you need to implement on the backend:

### 1. Review Model (Already Correct)
```javascript
const reviewSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: "products", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, maxlength: 1000 },
}, { timestamps: true, versionKey: false });

reviewSchema.index({ userId: 1, productId: 1 }, { unique: true });
```

### 2. Required API Endpoints

#### A. GET `/api/reviews`
**Purpose**: Get all reviews (for admin or general listing)
```javascript
// GET /api/reviews?page=1&limit=10
export const getReviews = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    
    const reviews = await ReviewModel.find()
      .populate('productId', 'name')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await ReviewModel.countDocuments();
    
    res.json({
      status: 200,
      data: reviews,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

#### B. GET `/api/products/:productId/reviews`
**Purpose**: Get reviews for a specific product
```javascript
// GET /api/products/6835fbea6d968a8c4f6222e9/reviews?page=1&limit=10
export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    
    const reviews = await ReviewModel.find({ productId })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await ReviewModel.countDocuments({ productId });
    
    res.json({
      status: 200,
      data: reviews,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

#### C. POST `/api/reviews`
**Purpose**: Create a new review
```javascript
// POST /api/reviews
export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user._id; // From authentication middleware
    
    // Check if user already reviewed this product
    const existingReview = await ReviewModel.findOne({ userId, productId });
    if (existingReview) {
      return res.status(409).json({ 
        error: 'You have already reviewed this product' 
      });
    }
    
    const review = new ReviewModel({
      productId,
      rating,
      comment,
      userId
    });
    
    const savedReview = await review.save();
    
    // Populate the response with user and product info
    await savedReview.populate('userId', 'name email');
    await savedReview.populate('productId', 'name');
    
    res.status(201).json({
      status: 201,
      message: 'Review created successfully',
      data: savedReview
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({ 
        error: 'You have already reviewed this product' 
      });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};
```

#### D. GET `/api/products/:productId/reviews/summary`
**Purpose**: Get review summary for a product
```javascript
// GET /api/products/6835fbea6d968a8c4f6222e9/reviews/summary
export const getReviewSummary = async (req, res) => {
  try {
    const { productId } = req.params;
    
    const summary = await ReviewModel.aggregate([
      { $match: { productId: new mongoose.Types.ObjectId(productId) } },
      {
        $group: {
          _id: null,
          avg: { $avg: '$rating' },
          count: { $sum: 1 },
          distribution: {
            $push: '$rating'
          }
        }
      }
    ]);
    
    if (summary.length === 0) {
      return res.json({
        status: 200,
        data: {
          avg: 0,
          count: 0,
          distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
        }
      });
    }
    
    const { avg, count, distribution } = summary[0];
    const ratingDistribution = distribution.reduce((acc, rating) => {
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {});
    
    res.json({
      status: 200,
      data: {
        avg: Math.round(avg * 10) / 10, // Round to 1 decimal
        count,
        distribution: {
          5: ratingDistribution[5] || 0,
          4: ratingDistribution[4] || 0,
          3: ratingDistribution[3] || 0,
          2: ratingDistribution[2] || 0,
          1: ratingDistribution[1] || 0
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

#### E. PATCH `/api/reviews/:id`
**Purpose**: Update a review
```javascript
// PATCH /api/reviews/68c6fb158ce9a19e5ded444b
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;
    
    const review = await ReviewModel.findOne({ _id: id, userId });
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    
    const updatedReview = await review.save();
    await updatedReview.populate('userId', 'name email');
    await updatedReview.populate('productId', 'name');
    
    res.json({
      status: 200,
      data: updatedReview
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

#### F. DELETE `/api/reviews/:id`
**Purpose**: Delete a review
```javascript
// DELETE /api/reviews/68c6fb158ce9a19e5ded444b
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    
    const review = await ReviewModel.findOneAndDelete({ _id: id, userId });
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }
    
    res.json({
      status: 200,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

### 3. Route Configuration

```javascript
// routes/reviews.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Your auth middleware

const {
  getReviews,
  getProductReviews,
  createReview,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

const {
  getReviewSummary
} = require('../controllers/productController');

// Review routes
router.get('/', getReviews);
router.post('/', auth, createReview);
router.patch('/:id', auth, updateReview);
router.delete('/:id', auth, deleteReview);

// Product-specific review routes
router.get('/products/:productId/reviews', getProductReviews);
router.get('/products/:productId/reviews/summary', getReviewSummary);

module.exports = router;
```

### 4. Response Format

All endpoints should return data in this format:
```json
{
  "status": 200,
  "message": "Success message (optional)",
  "data": {
    // The actual data
  },
  "pagination": {
    // For paginated endpoints
    "total": 10,
    "page": 1,
    "limit": 10,
    "totalPages": 1
  }
}
```

### 5. Error Handling

```javascript
// Common error responses
{
  "error": "Error message",
  "status": 400 // HTTP status code
}

// Specific error cases:
// 401 - Unauthorized (not logged in)
// 409 - Conflict (duplicate review)
// 404 - Not found
// 422 - Validation error
// 500 - Server error
```

### 6. Authentication Middleware

Make sure your auth middleware:
1. Verifies JWT tokens
2. Adds `req.user` with user information
3. Handles token expiration
4. Returns proper 401 responses

### 7. Testing Checklist

- [ ] GET `/api/reviews` returns all reviews with pagination
- [ ] GET `/api/products/:productId/reviews` returns product-specific reviews
- [ ] POST `/api/reviews` creates review and returns complete object
- [ ] POST `/api/reviews` prevents duplicate reviews (409 error)
- [ ] GET `/api/products/:productId/reviews/summary` returns correct summary
- [ ] PATCH `/api/reviews/:id` updates review (only for review owner)
- [ ] DELETE `/api/reviews/:id` deletes review (only for review owner)
- [ ] All endpoints require authentication where needed
- [ ] All endpoints return proper error messages
- [ ] All endpoints return data in correct format

### 8. Database Migration

If you have existing reviews without `productId`, you'll need to:
1. Add `productId` field to existing reviews
2. Update the unique index
3. Ensure all reviews have valid `productId` references

Once you implement these endpoints, your frontend will work perfectly with your existing schema!
