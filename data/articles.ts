import { getPublishedArticles } from "@/lib/content";

export {
  getAllArticles,
  getArticleBySlug,
  getArticleNavigation,
  getPublishedArticles,
  getRelatedArticles,
} from "@/lib/content";

export const articles = getPublishedArticles();
