import { IProductReview, IUIReview, IWebReview } from "@/types/reviews";

export function normalizeReview(
  raw: IWebReview | IProductReview,
  currentUserId?: string
): IUIReview {

  const productId = (raw as IProductReview).productId ?? null;
  const userId = (raw as IProductReview).userId ?? null;

  const name =
    (raw as IProductReview).author?.name ??
    (raw as IWebReview).name ??
    "Anonymous";

  const location =
    (raw as IProductReview).author?.location ??
    (raw as IWebReview).location ??
    "";

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
