import { IProductReview, IUIReview, IWebReview } from "@/types/reviews";

export function normalizeReview(
  raw: IWebReview | IProductReview,
  currentUserId: string
): IUIReview {
  const isProduct = "productId" in raw;

  const name = isProduct ? raw.author?.name || "Anonymous" : raw.name;

  const location = isProduct ? raw.author?.location || "" : raw.location || "";

  const hasLiked = raw.likedBy?.includes(currentUserId ?? "") || false;
  const hasDisliked = raw.dislikedBy?.includes(currentUserId ?? "") || false;
  
  const isMine = isProduct ? raw.userId.toString() === currentUserId.toString() : false; // веб-відгук ніколи не мій

  return {
    _id: raw._id,
    productId: isProduct ? raw.productId : null,
    userId: isProduct ? raw.userId : null,
    name,
    location,
    rating: raw.rating,
    comment: raw.comment ?? "",
    createdAt: raw.createdAt,

    likes: raw.likes ?? 0,
    dislikes: raw.dislikes ?? 0,
    hasLiked,
    hasDisliked,
    isMine,
  };
}
