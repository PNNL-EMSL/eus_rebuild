/**
 * This is the template for a 'restricted page'
 *
 * All pages which require a certain role level will extend this class
 *
 * render() will check if user is logged in. if not, will display Login component
 * If user is logged in but does not have priveleges, the user will be shown the Access Denied component
 *
 * This page will handle doLogin which will set loggedIn to true
 * This page will know how to check if the user is logged in
 *
 */