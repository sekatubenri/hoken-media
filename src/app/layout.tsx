import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://hoken-select.shop'),
  title: {
    default: '保険ナビ｜生命保険・医療保険・自動車保険の比較ガイド',
    template: '%s｜保険ナビ',
  },
  description: '生命保険・医療保険・自動車保険を徹底比較。保険料シミュレーション、おすすめ保険ランキング、賢い選び方まで完全網羅。',
  openGraph: { type: 'website', locale: 'ja_JP', siteName: '保険ナビ' },
  verification: { google: 'XcyMImXtiMlMj5NBeiKQBcD_Vqrw3EDW0TDFBVTAtaA' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col">
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9320888355424356" crossOrigin="anonymous" strategy="afterInteractive" />
        <header className="border-b border-gray-200 sticky top-0 bg-white z-50 shadow-sm">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <span className="bg-blue-700 text-white text-sm font-bold px-2.5 py-1 rounded">🛡️</span>
              <span className="text-xl font-bold text-gray-900">保険ナビ</span>
            </a>
            <nav className="hidden md:flex gap-1 text-sm">
              <a href="/category/life"     className="px-3 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">生命保険</a>
              <a href="/category/medical"  className="px-3 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">医療保険</a>
              <a href="/category/auto"     className="px-3 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">自動車保険</a>
              <a href="/category/beginner" className="px-3 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">保険入門</a>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="text-sm font-bold text-gray-900">🛡️ 保険ナビ</span>
              <nav className="flex gap-6 text-xs text-gray-400">
                <a href="/category/life"    className="hover:text-gray-600">生命保険</a>
                <a href="/category/medical" className="hover:text-gray-600">医療保険</a>
                <a href="/category/auto"    className="hover:text-gray-600">自動車保険</a>
              </nav>
            </div>
            <nav className="flex justify-center gap-6 text-xs text-gray-400 mt-4">
              <a href="/privacy" className="hover:text-gray-600">プライバシーポリシー</a>
              <a href="/contact" className="hover:text-gray-600">お問い合わせ</a>
            </nav>
            <p className="text-center text-xs text-gray-300 mt-4">© 2026 保険ナビ All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
