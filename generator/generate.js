const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SITE = { name: '保険ナビ', url: 'https://hoken-media.vercel.app' };

const AFFILIATE_TOP = `
<div style="background:#eff6ff;border:2px solid #2563eb;border-radius:8px;padding:16px;margin:24px 0;">
  <p style="font-weight:bold;color:#1e40af;margin:0 0 8px;">【PR】無料で最適な保険をプロに相談</p>
  <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">
    <li><a href="https://px.a8.net/svt/ejp?a8mat=HOKEN_PLACEHOLDER_1" rel="nofollow" style="display:inline-block;background:#2563eb;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-weight:bold;">▶ 保険マンモス（無料FP相談）</a></li>
    <li><a href="https://px.a8.net/svt/ejp?a8mat=HOKEN_PLACEHOLDER_2" rel="nofollow" style="display:inline-block;background:#0f766e;color:#fff;padding:8px 16px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:14px;">▶ ほけんの窓口（全国店舗・無料相談）</a></li>
  </ul>
</div>`;

const AFFILIATE_BOTTOM = `
<div style="background:#fffbeb;border:2px solid #d97706;border-radius:8px;padding:16px;margin:24px 0;">
  <p style="font-weight:bold;color:#92400e;margin:0 0 12px;">📚 保険・お金の知識を深める本</p>
  <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">
    <li><a href="https://www.amazon.co.jp/dp/4296115626?linkCode=ll2&tag=mirainikibouw-22&ref_=as_li_ss_tl" rel="nofollow" target="_blank" style="color:#1d4ed8;text-decoration:underline;">▶ 本当の自由を手に入れるお金の大学【Amazon】</a></li>
    <li><a href="https://www.amazon.co.jp/dp/4822289745?linkCode=ll2&tag=mirainikibouw-22&ref_=as_li_ss_tl" rel="nofollow" target="_blank" style="color:#1d4ed8;text-decoration:underline;">▶ 保険ぎらいは正しい 「人生最大の無駄遣い」をなくす方法【Amazon】</a></li>
    <li><a href="https://www.amazon.co.jp/dp/4492733590?linkCode=ll2&tag=mirainikibouw-22&ref_=as_li_ss_tl" rel="nofollow" target="_blank" style="color:#1d4ed8;text-decoration:underline;">▶ 保険はこうして選びなさい【Amazon】</a></li>
  </ul>
</div>
<div style="background:#fff0f0;border:2px solid #e00;border-radius:8px;padding:16px;margin:24px 0;">
  <p style="font-weight:bold;color:#c00;margin:0 0 12px;">🛒 楽天ブックスで人気の保険本</p>
  <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">
    <li><a href="https://hb.afl.rakuten.co.jp/ichiba/5570f8cd.82e98484.5570f8ce.5b744630/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F16448854%2F&link_type=text&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJ0ZXh0In0" target="_blank" rel="nofollow sponsored noopener" style="color:#c00;text-decoration:underline;">▶ 本当の自由を手に入れるお金の大学【楽天ブックス】</a></li>
    <li><a href="https://hb.afl.rakuten.co.jp/ichiba/5570f8cd.82e98484.5570f8ce.5b744630/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F17671054%2F&link_type=text&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJ0ZXh0In0" target="_blank" rel="nofollow sponsored noopener" style="color:#c00;text-decoration:underline;">▶ お金の不安がなくなる 最強の節約術【楽天ブックス】</a></li>
  </ul>
</div>`;

async function generateArticle() {
  const topicsPath = path.join(__dirname, '..', 'unused-topics.json');
  const contentDir = path.join(__dirname, '..', 'content');

  const topics = JSON.parse(fs.readFileSync(topicsPath, 'utf-8'));
  const existingFiles = new Set(fs.readdirSync(contentDir));

  const topic = topics.find(t => !existingFiles.has(t.filename));
  if (!topic) { console.log('全トピック生成完了'); process.exit(0); }

  console.log(`生成中: ${topic.title}`);
  const today = new Date().toISOString().split('T')[0];

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 4000,
    messages: [{
      role: 'user',
      content: `あなたは保険比較メディア「${SITE.name}」の専門ライターです。
SEOに最適化された保険情報記事を生成してください。

トピック: ${topic.title}
カテゴリ: ${topic.category}

以下のJSON形式のみで出力してください（前後に余分なテキスト不要）:
{
  "title": "タイトル（SEO最適化、40〜60文字、年や具体的な数字を含める）",
  "description": "メタディスクリプション（120文字以内）",
  "category": "${topic.category}",
  "date": "${today}",
  "content": "HTMLコンテンツ"
}

contentの要件:
- 2500文字以上のHTML本文
- h2見出しを5〜8個、h3も適宜使用
- ul/ol/liリスト、tableを積極的に活用
- 具体的な保険料・保障額・比較表などを含める
- 読者の疑問に答える実践的な内容
- JSON文字列として正しくエスケープ（"は\\"、改行は\\n）`
    }],
  });

  const text = message.content[0].text.trim();
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('レスポンスにJSONが見つかりません');

  const article = JSON.parse(jsonMatch[0]);
  if (article.content.includes('<h2')) {
    article.content = article.content.replace('<h2', AFFILIATE_TOP + '<h2');
  } else {
    article.content = AFFILIATE_TOP + article.content;
  }
  article.content = article.content + AFFILIATE_BOTTOM;

  fs.writeFileSync(path.join(contentDir, topic.filename), JSON.stringify(article, null, 2));
  const remaining = topics.filter(t => t.filename !== topic.filename);
  fs.writeFileSync(topicsPath, JSON.stringify(remaining, null, 2));
  console.log(`完了: ${topic.filename}`);
}

generateArticle().catch(err => { console.error('エラー:', err.message); process.exit(1); });
