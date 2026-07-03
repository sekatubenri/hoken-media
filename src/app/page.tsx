import { getAllArticles } from '@/lib/articles'
import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'

const CATEGORIES = [
  { key: 'life',     label: '生命保険',   icon: '💙', desc: '死亡・就業不能に備える',   color: 'from-blue-500 to-indigo-600' },
  { key: 'medical',  label: '医療保険',   icon: '🏥', desc: '入院・手術の費用をカバー', color: 'from-rose-500 to-pink-600' },
  { key: 'auto',     label: '自動車保険', icon: '🚗', desc: '任意保険の賢い選び方',     color: 'from-slate-500 to-gray-700' },
  { key: 'beginner', label: '保険入門',   icon: '📋', desc: '保険の基本から学ぶ',       color: 'from-violet-500 to-purple-700' },
]

export default function Home() {
  const articles = getAllArticles()
  return (
    <div>
      <section className="bg-gradient-to-b from-blue-800 to-blue-900 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            あなたに必要な保険が、<br className="md:hidden" />わかる。
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
            生命保険・医療保険・自動車保険を徹底比較。<br className="hidden md:block" />
            保険料を下げて、必要な保障だけを残す。
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <Link key={cat.key} href={`/category/${cat.key}`}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all text-center group">
              <div className={`bg-gradient-to-br ${cat.color} w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3`}>
                <span className="text-xl">{cat.icon}</span>
              </div>
              <h3 className="font-bold text-sm text-gray-900 group-hover:text-blue-700 transition-colors">{cat.label}</h3>
              <p className="text-xs text-gray-400 mt-1">{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
          <span className="w-1 h-6 bg-blue-700 rounded-full"></span>
          最新記事
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  )
}
