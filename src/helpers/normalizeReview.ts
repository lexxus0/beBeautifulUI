import { IProductReview, IReviewInProduct, IUIReview, IWebReview } from "@/types/reviews";

export function normalizeReview(
  raw: IWebReview | IProductReview | IReviewInProduct,
  currentUserId?: string
): IUIReview {

  const productId = "productId" in raw ? raw.productId : null;
  const userId = "userId" in raw ? raw.userId : null;

  const name =
    "author" in raw
      ? raw.author?.name ?? "Anonymous"
      : "name" in raw
      ? raw.name
      : "Anonymous";

  const location =
    "author" in raw
      ? raw.author?.location ?? ""
      : "location" in raw
      ? raw.location
      : "";

  const likedBy = raw.likedBy ?? [];
  const dislikedBy = raw.dislikedBy ?? [];

  return {
    _id: raw._id,
    productId,
    userId,
    name,
    location,
    rating: raw.rating,
    comment: raw.comment ?? "",
    createdAt: raw.createdAt,

    likes: raw.likes ?? likedBy.length,
    dislikes: raw.dislikes ?? dislikedBy.length,
    likedBy,
    dislikedBy,

    isMine: userId === currentUserId,
  };
}
