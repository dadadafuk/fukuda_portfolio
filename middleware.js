// Vercel Routing Middleware: 全ページに Basic 認証をかける。
// ユーザー名・パスワードは Vercel の環境変数 BASIC_AUTH_USER / BASIC_AUTH_PASSWORD で設定する。
// ※ Astro の src/middleware とは別物（こちらは Vercel のエッジで動く）。

export const config = {
  // 静的アセットも含め全て保護する
  matcher: '/(.*)',
};

function unauthorized() {
  return new Response('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Protected", charset="UTF-8"' },
  });
}

// タイミング攻撃を避けるため定数時間で比較する
function safeEqual(a, b) {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  }
  return diff === 0;
}

export default function middleware(request) {
  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASSWORD;

  // 環境変数が未設定なら公開してしまわないよう、閉じる
  if (!user || !pass) {
    return new Response('Basic auth is not configured', { status: 500 });
  }

  const header = request.headers.get('authorization') ?? '';
  const [scheme, encoded] = header.split(' ');
  if (scheme !== 'Basic' || !encoded) return unauthorized();

  let decoded;
  try {
    // UTF-8 のパスワードにも対応
    decoded = new TextDecoder().decode(
      Uint8Array.from(atob(encoded), (c) => c.charCodeAt(0))
    );
  } catch {
    return unauthorized();
  }

  const sep = decoded.indexOf(':');
  if (sep < 0) return unauthorized();

  const okUser = safeEqual(decoded.slice(0, sep), user);
  const okPass = safeEqual(decoded.slice(sep + 1), pass);
  if (okUser && okPass) return; // 何も返さなければ通常どおりページを配信

  return unauthorized();
}
