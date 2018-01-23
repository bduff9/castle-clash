# TODO

## Files

* Example Todos app (<https://github.com/meteor/todos>)
* Fix TS errors as found: <https://github.com/Microsoft/TypeScript/wiki/JSDoc-support-in-JavaScript>

## Database

* Figure out needed tables
  * Create files and definitions for:
    * Heroes
    * My Heroes

## Assets

* Sort through assets in public/assets

## App

* _Create basic sign in (Password, Google, Facebook, Twitter) in LoginPage_
  * Finish registration page
    * Send verify email on register
  * Include accounts logic (onCreate, merge, etc.?)
* Assign users to admin
* Create admin screens for heroes
* Create basic hero entry screen
* Create basic hero view screen
* Loader? <https://github.com/danilowoz/react-content-loader>
* Animated page transitions
* Image recognition?
  * Pixfinder <https://www.npmjs.com/package/pixfinder>
  * Maybe also OCR after we identify the areas to look in?

## Performance

* React
  * Immutable JS?
  * PureComponent and pass primitives where possible
  * Check re-renders and implement shouldComponentUpdate (<https://blog.logrocket.com/make-react-fast-again-part-1-performance-timeline-f7f39f676f58>)
  * LogRocket?
* mongodb
  * Indexes (<https://docs.mongodb.com/manual/reference/method/db.collection.createIndex/>)
