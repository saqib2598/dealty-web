/* eslint-disable indent */
const routes = module.exports = require('next-routes')();

routes
  .add("/", "/landing2")
  .add("/landing", "/landing2")
  .add("contact", "/contact")
  .add("forgot-password", "/forgot-password")
  .add("accept-invitation", "/invite/:token")
  .add("login", "/login")
  .add("log-in", "/login")
  .add("privacy-policy", "/privacy-policy")
  .add("reset-password", "/reset-password")
  .add("add-password", "/add-password")
  .add("add-user-info", "/add-user-info")
  .add("terms", "/terms")
  // .add('payment', '/payment/:planId')
  // .add('plans', '/plans')
  .add("faqs", "/faq")
  .add('about-dealty', '/about-dealty')
  .add('/location', 'location')
  .add("/location/:state/:city", "city")
  .add("inbox", "inbox")
  .add("inbox2", "inbox2")
  .add("blogs/blogs", "/blog")
  .add("blogs/blog-detail", "/blog/:slug")
  .add("blog-unsubscription", "/blog_subscriptions/:token/unsubscribe")

  .add("dashboard/index", "/dashboard")
  .add("dashboard/my-account", "/my-account")
  .add("dashboard/resources", "/resources")
  .add("dashboard/favorites", "/favorites")
  .add("dashboard/offers", "/offers")
  .add("dashboard/appointments", "/appointments")
  .add("dashboard/saved-searches", "/saved-searches")

  .add(
    "dashboard/confirm-home-info",
    "/seller/property/:propertyId/confirm-home-info"
  )
  .add(
    "dashboard/other-home-updates",
    "/seller/property/:propertyId/other-home-updates"
  )
  .add(
    "dashboard/personal-opinion",
    "/seller/property/:propertyId/personal-opinion"
  )
  .add(
    "dashboard/schedule-photographer",
    "/seller/property/:propertyId/schedule-photographer"
  )
  .add("dashboard/add-images", "/seller/property/:propertyId/add-images")
  .add("dashboard/add-video", "/seller/property/:propertyId/add-video")
  .add("dashboard/add-documents", "/seller/property/:propertyId/add-documents")
  .add(
    "dashboard/add-floor-plans",
    "/seller/property/:propertyId/add-floor-plans"
  )
  .add(
    "dashboard/add-community-info",
    "/seller/property/:propertyId/add-community-info"
  )
  .add(
    "dashboard/add-description",
    "/seller/property/:propertyId/add-description"
  )
  .add("dashboard/set-price", "/seller/property/:propertyId/set-price")
  .add(
    "dashboard/listing-pending",
    "/seller/property/:propertyId/listing-pending"
  )
  .add(
    "dashboard/add-open-house-dates",
    "/seller/property/:propertyId/add-open-house-dates"
  )

  .add("dashboard/property", "/seller/property/:propertyId")

  .add("unsubscribe", "/unsubscribe")
  .add("unsubscribe-message", "/unsubscribe/message")

  .add("seller/add-new-property", "/seller/add-new-property")
  .add("seller/confirm-address", "/seller/confirm-address")
  .add("seller/seller-listings", "/seller/:sellerId")
  .add("/dashboard/seller/:sellerId", "seller/seller-listings")

  .add("sign-up/index", "/sign-up")
  .add("sign-up/confirm-address", "/confirm-address")
  .add("sign-up/congrats", "/congrats")
  .add("confirmation", "/confirmation/:token")
  .add("invitationGreeting", "/invitation-greeting")

  // BUYER ROUTES
  .add("buyer/sign-up/index", "/sign-up")
  .add("buyer/home/index", "/buy")
  .add("buyer/home/list/listings", "/buy/homes/listings")
  .add("buyer/home/detail", "/buy/home/:id")
  .add("buyer/home/account", "/buy/account")
  .add("buyer/home/contact", "/buy/contact")
  .add("buyer/home/favorite", "/buy/favorite")

  .add("sitemap.xml", "/sitemap.xml")
  .add("googlec2c09f183e5c0a73.html", "/googlec2c09f183e5c0a73.html")
  .add("robots.txt", "/robots.txt")
  .add("ads.txt", "/ads.txt")
  .add("loan-officer/sign-up/index", "/sign-up")
  .add("loan-officer/homeloan", "/officer/:details")
  .add('resources/Calculator', '/calculator')
  .add('resources/Videos', '/videos')
  .add('resources/Resources', '/resource')
  .add('resources/Directory', '/directory');
