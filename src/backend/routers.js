//Read Our Wix Router API here  http://wix.to/94BuAAs/wix-router.html

import { ok, notFound, WixRouterSitemapEntry } from "wix-router";

/**
 * @param {import('wix-router').WixRouterRequest} request
 */
export function auth_Router(request) {
  // Get item name from URL request
  const action = request.path[0];
  const oobCode = request.query;

  if (!action || !oobCode) {
    return notFound();
  }

  switch (action) {
    case "resetPassword":
      return ok("password-reset-page");
    // case "recoverEmail":
    //   return ok("edit-email");
    //   case "verifyEmail":
    //   return ok("verify-email");
    default:
      // Error: invalid mode.
      return notFound();
  }
  // Render item page
}

export function auth_SiteMap(sitemapRequest) {
  return {};
}
