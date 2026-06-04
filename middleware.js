export const config = {
  matcher: ['/admin.html', '/admin_login.html', '/offers.html', '/analytics.html'],
};

export default function middleware(request) {
  const url = new URL(request.url);
  const hostname = url.hostname;

  const isMainDomain =
    hostname === 'cycleworldpondicherry.in' ||
    hostname === 'www.cycleworldpondicherry.in';

  if (isMainDomain) {
    url.hostname = 'admin.cycleworldpondicherry.in';
    return Response.redirect(url.toString(), 301);
  }
}
