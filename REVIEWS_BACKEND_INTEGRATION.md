# Reviews Backend Integration Guide

## MongoDB Schema

Your MongoDB schema for reviews:

```javascript
import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "products", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true }, // Added missing userId field
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, maxlength: 1000 },
  },
  { timestamps: true, versionKey: false }
);

reviewSchema.index({ userId: 1, productId: 1 }, { unique: true });

export const ReviewModel = model("reviews", reviewSchema);
```

## Required API Endpoints

### 1. Create Review
**POST** `/api/reviews`

**Request Body:**
```json
{
  "productId": "string (ObjectId)",
  "rating": "number (1-5)",
  "comment": "string (optional, max 1000 chars)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "productId": "string",
    "userId": "string",
    "rating": "number",
    "comment": "string",
    "createdAt": "string (ISO date)",
    "updatedAt": "string (ISO date)"
  }
}
```

**Error Responses:**
- `400` - Validation error (invalid rating, comment too long)
- `401` - Unauthorized (user not logged in)
- `409` - Conflict (user already reviewed this product)

### 2. Get Product Reviews
**GET** `/api/products/:productId/reviews`

**Query Parameters:**
- `page` (optional, default: 1)
- `limit` (optional, default: 10)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "productId": "string",
      "userId": "string",
      "rating": "number",
      "comment": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "author": {
        "_id": "string",
        "name": "string"
      }
    }
  ],
  "pagination": {
    "page": "number",
    "limit": "number",
    "total": "number",
    "pages": "number"
  }
}
```

### 3. Get All Reviews (Admin)
**GET** `/api/reviews`

**Query Parameters:**
- `page` (optional, default: 1)
- `limit` (optional, default: 10)

**Response:** Same as product reviews endpoint

### 4. Update Review
**PATCH** `/api/reviews/:reviewId`

**Request Body:**
```json
{
  "rating": "number (1-5, optional)",
  "comment": "string (optional, max 1000 chars)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "productId": "string",
    "userId": "string",
    "rating": "number",
    "comment": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
}
```

### 5. Delete Review
**DELETE** `/api/reviews/:reviewId`

**Response:**
```json
{
  "success": true,
  "message": "Review deleted successfully"
}
```

### 6. Get Review Summary
**GET** `/api/products/:productId/reviews/summary`

**Response:**
```json
{
  "success": true,
  "data": {
    "avg": "number (average rating)",
    "count": "number (total reviews)"
  }
}
```

## Backend Implementation Notes

### Authentication
- All review operations require user authentication
- Extract `userId` from JWT token
- Validate that user exists and is active

### Validation
- `productId`: Must be valid ObjectId and product must exist
- `rating`: Required, must be between 1-5
- `comment`: Optional, max 1000 characters
- Unique constraint: One review per user per product

### Error Handling
- Return appropriate HTTP status codes
- Provide clear error messages
- Handle duplicate review attempts gracefully

### Database Queries
- Use proper indexing for performance
- Populate user data for display
- Implement pagination for large datasets

## Frontend Integration

The frontend has been updated to work with this schema:

1. **Types**: Updated to include `userId` field
2. **Redux Operations**: Handle the new data structure
3. **ReviewForm**: Sends correct data format
4. **Error Handling**: Handles 409 conflicts for duplicate reviews

## Testing

Test the following scenarios:
1. Create review with valid data
2. Attempt to create duplicate review (should return 409)
3. Create review without authentication (should return 401)
4. Create review with invalid rating (should return 400)
5. Create review with comment over 1000 chars (should return 400)
6. Fetch reviews with pagination
7. Update existing review
8. Delete review

## Security Considerations

1. **Authorization**: Users can only modify their own reviews
2. **Input Validation**: Sanitize all inputs
3. **Rate Limiting**: Prevent spam reviews
4. **Data Privacy**: Don't expose sensitive user data in reviews

