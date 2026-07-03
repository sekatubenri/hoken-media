import Link from 'next/link'
import type { Article } from '@/lib/articles'

const CATEGORY_STYLES: Record<string, { bg: string; icon: string }> = {
  life:    { bg: 'from-blue-600 to-indigo-700',   icon: '💙' },
  medical: { bg: 'from-rose-500 to-pink-600',     icon: '🏥' },
  auto:    { bg: 'from-slate-600 to-gray-700',    icon: '🚗' },
  beginner:{ bg: 'from-violet-500 to-purple-700', icon: '📋' },
}

export default function ArticleCard({ article }: { article: Article }) {
  const style = CATEGORY_STYLES[article.category] || CATEGORY_STYLES.life
  return (
    <Link href={`/article/${article.slug}`}
      className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className={`bg-gradient-to-br ${style.bg} h-40 flex flex-col items-center justify-center p-4 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
        <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-2">
          <span className="text-3xl">{style.icon}</span>
        </div>
        <span className="text-white/90 text-xs font-medium">{article.categoryLabel}</span>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-900 text-sm leading-relaxed mb-3 line-clamp-3 group-hover:text-blue-700 transition-colors">{article.title}</h3>
        <p className="text-xs text-gray-400">{article.date}</p>
      </div>
    </Link>
  )
}
