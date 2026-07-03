import { getArticle, getAllArticles } from '@/lib/articles'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return {}
  return { title: article.title, description: article.description }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) notFound()

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-6 flex items-center gap-3">
        <Link href={`/category/${article.category}`} className="text-xs bg-blue-100 text-blue-700 font-medium px-2.5 py-1 rounded-full hover:bg-blue-200 transition-colors">
          {article.categoryLabel}
        </Link>
        <span className="text-xs text-gray-400">{article.date}</span>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-10">{article.title}</h1>
      <article
        className="prose prose-lg max-w-none
          prose-headings:text-gray-900 prose-headings:font-bold
          prose-h2:text-xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200
          prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3 prose-h3:pl-3 prose-h3:border-l-4 prose-h3:border-blue-600
          prose-p:text-gray-700 prose-p:leading-8
          prose-li:text-gray-700 prose-li:leading-7
          prose-strong:text-gray-900 prose-strong:font-bold
          prose-a:text-blue-700 prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
      <div className="mt-16 pt-8 border-t border-gray-200 flex justify-between items-center">
        <Link href="/" className="text-blue-700 text-sm font-medium hover:underline">← 記事一覧に戻る</Link>
        <Link href={`/category/${article.category}`} className="text-gray-500 text-sm hover:text-blue-700">{article.categoryLabel}の記事をもっと見る</Link>
      </div>
    </div>
  )
}
