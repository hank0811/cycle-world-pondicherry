export const config = {
  matcher: ['/', '/admin.html', '/admin_login.html', '/offers.html', '/analytics.html'],
};

export default function middleware(request) {
  const url = new URL(request.url);
  const hostname = url.hostname;
  const pathname = url.pathname;

  const isMainDomain =
    hostname === 'cycleworldpondicherry.in' ||
    hostname === 'www.cycleworldpondicherry.in';

  const isAdminDomain = hostname === 'admin.cycleworldpondicherry.in';

  // Block admin pages on main domain — redirect to admin subdomain
  const adminPaths = ['/admin.html', '/admin_login.html', '/offers.html', '/analytics.html'];
  if (isMainDomain && adminPaths.includes(pathname)) {
    url.hostname = 'admin.cycleworldpondicherry.in';
    return Response.redirect(url.toString(), 301);
  }

  // On admin subdomain root → go to login page
  if (isAdminDomain && pathname === '/') {
    url.pathname = '/admin_login.html';
    return Response.redirect(url.toString(), 302);
  }
}
