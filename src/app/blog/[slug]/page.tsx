import { notFound } from "next/navigation";
import blogList from "@/data/blog-list.json";
import styles from "../Blog.module.scss";
import BackButton from "@/components/ui/BackButton/BackButton";
import { ShampooFoams } from "@/components/ui/Blog/Articles/ShampooFoams";
import { Myths } from "@/components/ui/Blog/Articles/Myths";
import { HairStory } from "@/components/ui/Blog/Articles/HairStory";

const ARTICLE_COMPONENTS: Record<string, React.ReactNode> = {
  "why-does-shampoo-foam": <ShampooFoams />,
  "5-myths-about-hair-care": <Myths />,
  "what-hair-can-tell-about-our-body": <HairStory />,
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