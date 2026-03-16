import { notFound } from "next/navigation";
import blogList from "@/data/blog-list.json";
import styles from "../Blog.module.scss";
import BackButton from "@/components/ui/BackButton/BackButton";
import { ShampooFoams } from "@/components/ui/Blog/Articles/ShampooFoams";

const ARTICLE_COMPONENTS: Record<string, React.ReactNode> = {
  "why-does-shampoo-foam": <ShampooFoams />,
};

export default function ArticleDetailsPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Перевіряємо наявність статті в списку та компонентах
  const articleExists = blogList.some((a) => a.slug === slug);
  const Content = ARTICLE_COMPONENTS[slug];

  if (!articleExists || !Content) {
    notFound();
  }

  return (
    <>
      <BackButton />
      <article className="container">
        <div className={styles.fullArticleWrapper}>
          {Content}
        </div>
      </article>
    </>
  );
}