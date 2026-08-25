import React from 'react'

const PrivacyPolicy = () => {
  return (
    <main className="my-4 space-y-4 md:mx-30 lg:mx-48">

      <div className="bg-white py-8 px-4 md:px-25 rounded-xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-8">
          TABbeast 販売に関する個人情報
        </h2>
        <p className="text-slate-600 text-sm md:text-base leading-relaxed space-y-2">
          TABbeast の購入・ログインにあたり、メールアドレス、決済関連情報（Stripe 経由。カード番号は当方サーバーに保存しません）、セッション Cookie、ダウンロード／利用ログに類する技術情報を取り扱うことがあります。
          <br />
          決済は Stripe、メール送信は Resend、インフラは Cloudflare を利用します。取得した情報は、購入権の管理、ログイン、サポート、不正防止の目的に限り使用します。
          <br />
          詳細な販売条件は
          <a href="/legal/terms" className="text-blue-600 hover:text-blue-800 underline mx-1">利用規約</a>
          および
          <a href="/legal/tokushoho" className="text-blue-600 hover:text-blue-800 underline mx-1">特定商取引法に基づく表記</a>
          を参照してください。
        </p>
      </div>

      <div className="bg-white py-8 px-4 md:px-25 rounded-xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-8">
          プライバシーポリシー
        </h2>
        <h3 className="text-xl font-bold text-slate-800 mb-4 text-center">
          アフィリエイトリンクについて
        </h3>
        <p className="text-slate-600 text-sm md:text-base">
          当サイトは、Amazon.co.jpを宣伝しリンクすることによって紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、 Amazonアソシエイト・プログラムの参加者です。
          <br />
          また、当サイトでは、第三者配信の広告サービスGoogleアドセンスを利用しています。
          <br />
          このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報 「Cookie」(氏名、住所、メールアドレス、電話番号は含まれません) を使用することがあります。
          <br />
          Cookieを無効にする設定およびGoogleアドセンスに関する詳細は<a href="https://myadcenter.google.com/home?sasb=true&ref=ad-settings" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">「Google広告設定」</a>をご覧ください。
        </p>
      </div>

      <div className="bg-white py-8 px-4 md:px-25 rounded-xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-slate-800 mb-8">
          免責事項
        </h2>
        <p className="text-slate-600 text-sm md:text-base">
          当サイトの一部コンテンツは、アフィリエイトプログラムを使って商品を紹介しています。当該紹介商品に関するお問い合わせ、購入、支払い等は、リンク先の販売店と直接行っていただくようお願いいたします。
          <br />
          TABbeast 製品版の販売については、当サイト（Stripe 決済）で直接行います。
          <br />
          掲載情報については、できる限り正確な情報を表示するよう努めておりますが、その内容の正確性や安全性を保証するものではありません。
          <br />
          予告なしに情報の変更・削除を行うこともあります。
          <br />
          当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますので、あらかじめご了承ください。
          <br />
          また、Amazonアソシエイトの商品価格や在庫状況は常に変動します。最終的な情報は、Amazon.co.jpの販売ページにてご自身でご確認をお願いいたします。
        </p>
      </div>
    </main>
  )
}

export default PrivacyPolicy