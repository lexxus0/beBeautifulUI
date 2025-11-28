// "use client";

// import React, { useEffect } from 'react';
// import { useReviews } from '@/hooks/useReviews';
// import StarRating from '@/helpers/StarRating';

// interface ReviewSummaryProps {
//   productId: string;
// }

// export default function ReviewSummary({ productId }: ReviewSummaryProps) {
//   const { summary, loadSummary, isLoading } = useReviews(productId);

//   useEffect(() => {
//     loadSummary();
//   }, [loadSummary]);

//   if (isLoading) {
//     return (
//       <div className="flex items-center gap-4 mb-6">
//         <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
//         <div className="animate-pulse bg-gray-200 h-6 w-24 rounded"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex items-center gap-4 mb-6">
//       <div className="flex items-center gap-2">
//         <span className="text-2xl font-bold text-gray-900">
//           {summary.avg.toFixed(1)}
//         </span>
//         <StarRating rating={Math.round(summary.avg)} size={20} color="#FFD700" />
//       </div>
//       <span className="text-gray-600">
//         ({summary.count} відгуків)
//       </span>
//     </div>
//   );
// }
