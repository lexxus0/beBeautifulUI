import Image from "next/image";
import Link from "next/link";
import blogList from "@/data/blog-list.json";
import styles from "./Blog.module.scss";
import BackButton from "@/components/ui/BackButton/BackButton";

export default function BlogPage() {
  const themes = Array.from(new Set(blogList.map((a) => a.theme)));

  return (
    <>
      <BackButton href="/">Головна</BackButton>
      <div className="container">
        {themes.map((theme) => (
          <section key={theme} className={styles.themeBlock}>
            {/* <h2 className={styles.themeName}>{theme}</h2> */}
            
            <div className={styles.articlesList}>
              {blogList
                .filter((article) => article.theme === theme)
                .sort((a, b) => b.id - a.id)
                .map((article) => (
                  <div key={article.id} className={styles.blogCard}>
                    <div className={styles.cardContent}>
                      
                      {/* ФОТО ДЛЯ ДЕСКТОПА */}
                      <div className={styles.imageWrapperDesktop}>
                        <Image
                          src={article.imageUrl}
                          alt={article.title}
                          width={600}
                          height={400}
                          loading="lazy"
                          className={styles.img}
                        />
                      </div>

                      <div className={styles.textContent}>
                        <span className={styles.date}>{article.date}</span>
                        <h3 className={styles.articleTitle}>{article.title}</h3>
                        <p className={styles.text1}>{article.paragraph1}</p>

                        {/* ФОТО ДЛЯ МОБІЛКИ */}
                        <div className={styles.imageWrapperMobile}>
                          <Image
                            src={article.imageUrl}
                            alt={article.title}
                            width={600}
                            height={400}
                            className={styles.img}
                          />
                        </div>

                        <p className={styles.text2}>{article.paragraph2}</p>
                        
                        <Link
                          href={`/blog/${article.slug}`}
                          className={styles.readMoreBtn}
                        >
                          Читати повністю
                        </Link>
                      </div>

                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}