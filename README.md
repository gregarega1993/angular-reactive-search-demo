# Angular Reactive Search Demo 🚀
Welcome to my Angular Reactive Search Demo project! 

The goal of this project was to create a news search in a completely reactive way, without the use of manual subscriptions. The project relies on Angular, RxJS, and NgRx Component Store, handles errors, uses trackBy to update only those items in the DOM that have changed, and uses debounce to avoid sending a request on every keystroke.

##Installation
To get started with the project, simply clone the repository and run the following command to install the dependencies: `npm install`
Run `ng serve` for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

##Features
- Reactive search using NgRx Component Store
- Error handling
- trackBy to optimize rendering performance
- Debouncing to avoid sending a request on every keystroke


##Technologies Used
- Angular
- RxJS
- NgRx component store

##Contributing
Contributions are always welcome! If you'd like to contribute, please fork the repository and create a new branch for your changes. Once you're done, submit a pull request and I'll review your changes. 🤝

##Credits
This project was created by Gregor Ajdič. 👨‍💻

##License
This project is licensed under the MIT license. 📝
