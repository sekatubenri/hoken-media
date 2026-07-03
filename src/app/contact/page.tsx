import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'お問い合わせ' }
export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">お問い合わせ</h1>
      <p className="text-gray-600 mb-6">当サイトへのお問い合わせは、以下のメールアドレスまでご連絡ください。</p>
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <p className="text-gray-900">メールアドレス：<strong>info@wide-assist.com</strong></p>
        <p className="text-sm text-gray-400 mt-2">※ 返信までに2〜3営業日いただく場合がございます。</p>
      </div>
    </div>
  )
}
