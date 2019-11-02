# Fake Bank APP

A (deadly) simple React + Firebase banking application.

The front-end was developed with React library. The back-end was designed using Firebase Cloud Functions, wrapped through Express framework to provide a clean REST design. Requests are handled with Axios library. Data are managed in Firestore database (provided by the Firebase platform).

This app was created for educational purposes to test Firebase capabilities and is not suitable for production environments. Many things should be designed differently. For instance, this app uses a lazy authentication mechanism that requires the user to pass his credentials in the request body every time he requests a resource. A better approach would be to authenticate the user only one time (by using a sign in form) and use session cookies.

## Live version

A live version of this app exists under [https://fake-bank-test.web.app](https://fake-bank-test.web.app).

## API

You can find the whole REST API documented here: [https://GeorgeGkas.github.io/fake-bank-react-firebase](https://GeorgeGkas.github.io/fake-bank-react-firebase)

## License

The source code of this project is licensed under the [MIT](LICENSE.md) license.
