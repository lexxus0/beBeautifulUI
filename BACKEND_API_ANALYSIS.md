# Backend API Analysis & Required Changes

## Current Backend API Structure

### Base URL
```
https://be-beautiful-backend.onrender.com/api
```

## Current API Endpoints

### 1. Reviews API (Legacy - Currently Used)

#### GET `/web-reviews`
**Current Usage:**
```javascript
GET /web-reviews?perPage=10&page=1
```

**Current Response Structure:**
```json
{
  "status": 200,
  "message": "Reviews fetched successfully",
  "data": [
    {
      "_id": "68c6fb158ce9a19e5ded444b",
      "name": "Mykola Dodiak",
      "location": "Київ",
      "rating": 4,
      "comment": "Another about lotion",
      "createdAt": "2025-01-14T17:16:42.242Z",
      "likes": 0,
      "dislikes": 0,
      "hasLiked": false,
      "hasDisliked": false
      // ❌ MISSING: productId field
    }
  ],
  "pagination": {
    "total": 10,
    "page": 1,
    "perPage": 10,
    "totalPages": 1
  }
}
```

#### POST `/web-reviews`
**Current Usage:**
```javascript
POST /web-reviews
{
  "productId": "6835fbea6d968a8c4f6222e9",
  "rating": 4,
  "comment": "lotion",
  "text": "lotion",
  "name": "Mykola Dodiak",
  "location": "Київ",
  "userName": "Mykola Dodiak",
  "userLocation": "Київ",
  "email": "user@example.com",
  "userId": "user123"
}
```

**Current Response:**
```json
{
  "status": 201,
  "message": "Review submitted successfully",
  "data": {
    "_id": "68c707e407acd3ff0888b28e"
    // ❌ MISSING: productId in response
    // ❌ MISSING: other review fields
  }
}
```

### 2. Products API

#### GET `/products`
**Current Usage:**
```javascript
GET /products?perPage=8&page=1&category=shampoo&volumeOptions=250ml&keyword=search
```

**Response Structure:**
```json
{
  "data": [
    {
      "_id": "6835fbea6d968a8c4f6222e9",
      "name": "Moisturizing Body Lotion",
      "sku": "MBL001",
      "volumeOptions": ["250ml", "500ml"],
      "priceByVolume": [
        {
          "volume": "250ml",
          "price": 299,
          "_id": "vol1"
        }
      ],
      "stockQuantity": 100,
      "features": ["Moisturizing", "Natural"],
      "description": "Product description",
      "instructions": "Usage instructions",
      "activeIngredients": [
        {
          "name": "Aloe Vera",
          "description": "Natural moisturizer",
          "_id": "ing1"
        }
      ],
      "inciList": ["Aloe Barbadensis Leaf Extract"],
      "category": "body-care",
      "isVegan": true,
      "reviews": [], // ❌ Empty array - should contain product reviews
      "isPromoted": false,
      "imageUrl": "https://picsum.photos/600",
      "inStock": true,
      "createdAt": "2025-01-14T10:00:00.000Z",
      "updatedAt": "2025-01-14T10:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 1,
    "page": 1,
    "perPage": 8,
    "totalPages": 1
  }
}
```

### 3. Auth API

#### POST `/auth/login`
#### POST `/auth/register`
#### POST `/auth/refresh`
#### GET `/auth/current`
#### POST `/auth/logout`

## Issues Identified

### 1. Reviews API Issues

#### ❌ Missing Product Association
- **Problem**: Reviews don't have `productId` field in API responses
- **Impact**: Cannot filter reviews by product
- **Current Workaround**: Frontend shows all reviews for all products

#### ❌ Incomplete Review Creation Response
- **Problem**: POST `/web-reviews` only returns `_id`, missing other fields
- **Impact**: Frontend has to reconstruct review object

#### ❌ No Product-Specific Review Endpoints
- **Problem**: No endpoint like `/products/{productId}/reviews`
- **Impact**: Cannot fetch reviews for specific products

### 2. Data Structure Mismatches

#### Frontend Expects:
```typescript
interface IReview {
  _id: string;
  productId: string; // ❌ Missing in API
  name: string;
  location: string;
  rating: number;
  comment: string;
  createdAt: string;
  likes: number;
  dislikes: number;
  hasLiked?: boolean;
  hasDisliked?: boolean;
}
```

#### Backend Returns:
```typescript
// Missing productId field
// Missing proper review creation response
```

## Required Backend Changes

### 1. Fix Reviews API Structure

#### A. Update Review Model
```javascript
// Backend Review Model should include:
{
  _id: ObjectId,
  productId: ObjectId, // ✅ ADD THIS
  userId: ObjectId,
  name: String,
  location: String,
  rating: Number,
  comment: String,
  createdAt: Date,
  updatedAt: Date,
  likes: Number,
  dislikes: Number,
  likedBy: [ObjectId],
  dislikedBy: [ObjectId]
}
```

#### B. Update GET `/web-reviews` Response
```json
{
  "status": 200,
  "message": "Reviews fetched successfully",
  "data": [
    {
      "_id": "68c6fb158ce9a19e5ded444b",
      "productId": "6835fbea6d968a8c4f6222e9", // ✅ ADD THIS
      "name": "Mykola Dodiak",
      "location": "Київ",
      "rating": 4,
      "comment": "Another about lotion",
      "createdAt": "2025-01-14T17:16:42.242Z",
      "likes": 0,
      "dislikes": 0,
      "hasLiked": false,
      "hasDisliked": false
    }
  ],
  "pagination": {
    "total": 10,
    "page": 1,
    "perPage": 10,
    "totalPages": 1
  }
}
```

#### C. Update POST `/web-reviews` Response
```json
{
  "status": 201,
  "message": "Review submitted successfully",
  "data": {
    "_id": "68c707e407acd3ff0888b28e",
    "productId": "6835fbea6d968a8c4f6222e9", // ✅ ADD THIS
    "name": "Mykola Dodiak",
    "location": "Київ",
    "rating": 4,
    "comment": "lotion",
    "createdAt": "2025-01-14T17:16:42.242Z",
    "likes": 0,
    "dislikes": 0,
    "hasLiked": false,
    "hasDisliked": false
  }
}
```

### 2. Add Product-Specific Review Endpoints

#### A. GET `/products/{productId}/reviews`
```javascript
GET /products/6835fbea6d968a8c4f6222e9/reviews?page=1&limit=10
```

**Response:**
```json
{
  "status": 200,
  "message": "Product reviews fetched successfully",
  "data": [
    {
      "_id": "68c6fb158ce9a19e5ded444b",
      "productId": "6835fbea6d968a8c4f6222e9",
      "name": "Mykola Dodiak",
      "location": "Київ",
      "rating": 4,
      "comment": "Another about lotion",
      "createdAt": "2025-01-14T17:16:42.242Z",
      "likes": 0,
      "dislikes": 0,
      "hasLiked": false,
      "hasDisliked": false
    }
  ],
  "pagination": {
    "total": 5,
    "page": 1,
    "perPage": 10,
    "totalPages": 1
  }
}
```

#### B. GET `/products/{productId}/reviews/summary`
```javascript
GET /products/6835fbea6d968a8c4f6222e9/reviews/summary
```

**Response:**
```json
{
  "status": 200,
  "message": "Review summary fetched successfully",
  "data": {
    "avg": 4.2,
    "count": 5,
    "distribution": {
      "5": 2,
      "4": 2,
      "3": 1,
      "2": 0,
      "1": 0
    }
  }
}
```

### 3. Update Products API

#### A. Include Reviews in Product Response
```json
{
  "_id": "6835fbea6d968a8c4f6222e9",
  "name": "Moisturizing Body Lotion",
  // ... other fields
  "reviews": [
    {
      "_id": "68c6fb158ce9a19e5ded444b",
      "productId": "6835fbea6d968a8c4f6222e9",
      "name": "Mykola Dodiak",
      "location": "Київ",
      "rating": 4,
      "comment": "Another about lotion",
      "createdAt": "2025-01-14T17:16:42.242Z",
      "likes": 0,
      "dislikes": 0,
      "hasLiked": false,
      "hasDisliked": false
    }
  ],
  "reviewSummary": {
    "avg": 4.2,
    "count": 5
  }
}
```

## Implementation Priority

### High Priority (Critical)
1. ✅ Add `productId` field to review model and responses
2. ✅ Update POST `/web-reviews` to return complete review object
3. ✅ Add GET `/products/{productId}/reviews` endpoint

### Medium Priority
4. ✅ Add GET `/products/{productId}/reviews/summary` endpoint
5. ✅ Update products API to include review summary
6. ✅ Add review reaction endpoints (like/dislike)

### Low Priority
7. ✅ Add review update/delete endpoints
8. ✅ Add review moderation features
9. ✅ Add review analytics

## Frontend Changes Needed

Once backend is updated, frontend should:

1. **Update API calls** to use product-specific endpoints
2. **Remove workarounds** for missing productId
3. **Use proper review summary** from API
4. **Implement review reactions** (like/dislike)
5. **Add review management** (edit/delete for own reviews)

## Testing Checklist

- [ ] Reviews can be fetched for specific products
- [ ] Review creation returns complete review object
- [ ] Review summary is calculated correctly
- [ ] Product pages show correct reviews
- [ ] Review reactions work properly
- [ ] Authentication works with review operations
