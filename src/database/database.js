const Closure = {
  key: 1,
  name: "Closures",
  summary:
    "Closures are an important concept in JavaScript that allows functions to retain access to variables from their outer scope even after the outer function has finished executing.",
  examples: [
    {
      id: 1,
      name: "Closure example",
      explanation: "",
      code: `
  function createCounter() {
    let count = 0; // Local variable within the function's scope
  
    return function() {
      count++; // Using the variable from the closure
      return count;
    };
  }
  
  const counter = createCounter();
  
  console.log(counter()); // 1
  console.log(counter()); // 2
  console.log(counter()); // 3
          `,
    },
  ],
};

const Promises = {
  key: 2,
  name: "Promises",
  summary: `<strong>A promise in JavaScript</strong> is an object that represents the eventual completion or failure of an asynchronous operation, and its resulting value. <strong>Promises are used to handle asynchronous operations</strong> in a more organized and structured way.

A promise can be in one of three states:
1. <strong>Pending</strong> - the asynchronous operation is IN PROGRESS.
2. <strong>Fulfilled</strong> - the asynchronous operation is successfully COMPLETED, and the promise is resolved with a value.
3. <strong>Rejected</strong> - the asynchronous operation encounters an ERROR or fails, and the promise is rejected with a reason (error message or object).

<strong>Promises provide a cleaner way to handle asynchronous code</strong> by allowing you to attach <strong>.then()</strong> and <strong>.catch()</strong> handlers to them:
- The <strong>.then()</strong> method is used to specify what should happen when the promise is fulfilled (resolved successfully). It takes a callback function that receives the resolved value as an argument.

- The <strong>.catch()</strong> method is used to specify what should happen when the promise is rejected (encounters an error). It takes a callback function that receives the rejection reason (error) as an argument.

- The <strong>.finally()</strong> method is used to specify what to happen after the asynchronous operation is done. It doesn't matter if it's successful or failed.


`,
  examples: [
    {
      id: 1,
      name: "Single Promise",
      explanation: `In this example, since arrived is set to true, the promise will call the resolve function with the message "Driver Arrived". As a result, the <strong>.then()</strong> block will be executed, and the message will be logged to the console.

If you were to change arrived to false, the promise would call the reject function with the message "Driver Bailed". In that case, the <strong>.catch()</strong> block would be executed instead of the <strong>.then()</strong> block, and the error message would be logged to the console.`,
      code: `
  const arrived = true; // Assume the driver has arrived

  const ride = new Promise((resolve, reject) => {
    if (arrived) {
      resolve("Driver Arrived");
    } else {
      reject("Driver Bailed");
    }
  });
  
  // Using the promise's then method to handle success
  ride.then(message => {
    console.log(message); // Output: "Driver Arrived"
  }).catch(error => {
    console.error(error); // This block will not be executed in this example
  });
      
  `,
    },
    {
      id: 2,
      name: "Promise.All()",
      explanation: `In this example, the <strong>getUserDetails</strong> function creates promises for fetching user information, orders, and address. It then uses <strong>Promise.all()</strong> to wait for all three promises to resolve. Once they all resolve, the <strong>.then()</strong> block is executed, and you can access the results of each promise in the array.

Remember that if any of the promises in <strong>Promise.all()</strong> reject, the <strong>.catch()</strong> block will be triggered with the corresponding error.
      `,
      code: `
      // Simulating asynchronous tasks with setTimeout
      function fetchUser(userId) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({ id: userId, name: "John" });
          }, 1000);
        });
      }
      
      function fetchOrders(userId) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({ userId, orders: ["Order 1", "Order 2"] });
          }, 1500);
        });
      }
      
      function fetchAddress(userId) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({ userId, address: "123 Main St" });
          }, 1200);
        });
      }

      function getUserDetails(userId) {
        const userPromise = fetchUser(userId);
        const ordersPromise = fetchOrders(userId);
        const addressPromise = fetchAddress(userId);
      
        return Promise.all([userPromise, ordersPromise, addressPromise])
          .then(([user, orders, address]) => {
            return { user, orders, address };
          })
          .catch(error => {
            console.error("An error occurred:", error);
          });
      }
      
      // Usage
      const userId = 1;
      getUserDetails(userId)
        .then(details => {
          console.log("User Details:", details);
        })
        .catch(error => {
          console.error("Error fetching user details:", error);
        });      
  `,
    },
    {
      id: 3,
      name: "Promise.race()",
      explanation: `      
In this example, <strong>promise2 fulfills faster than promise1 rejects</strong>, so the resulting promise from <strong>Promise.any()</strong> resolves with the value '<strong>Two</strong>'.

<strong>Example Scenarios:</strong>
<strong>1. Fastest Server Response:</strong> You're fetching data from multiple servers, and you want to use the data from the server that responds the quickest.

<strong>2. Timeout Handling:</strong> You want to implement a timeout for an asynchronous operation, and you want to consider the result of the operation if it completes within a certain time, otherwise you take an alternative action.
`,
      code: `
const promise1 = new Promise((resolve) => setTimeout(resolve, 1000, 'One'));
const promise2 = new Promise((resolve) => setTimeout(resolve, 500, 'Two'));

Promise.race([promise1, promise2])
  .then(value => {
    console.log(value); // Output: 'Two' (since promise2 resolves faster)
  })
  .catch(error => {
    console.error(error);
  });    
  `,
    },
    {
      id: 4,
      name: "Promise.any()",
      explanation: `
<strong>Introduced in ECMAScript 2021,</strong> the <strong>Promise.any()</strong> method takes an iterable of promises and returns a new promise that resolves with the value of the first fulfilled promise in the iterable. 

If all promises are rejected, it rejects with an <strong>AggregateError</strong> containing the rejection reasons.
      
<strong>Example Scenarios:</strong>
<strong>1. Fallback Sources:</strong> You have multiple sources to fetch data from, and you want to use the first source that provides data, regardless of the others.
      
<strong>2. Alternative Approaches:</strong> You have multiple algorithms to solve a problem, and you want to use the first algorithm that successfully produces a solution, even if other algorithms might fail.
      
`,
      code: `
const promise1 = new Promise((_, reject) => setTimeout(reject, 1000, 'One failed'));
const promise2 = new Promise(resolve => setTimeout(resolve, 500, 'Two'));
      
Promise.any([promise1, promise2])
  .then(value => {
    console.log(value); // Output: 'Two' (since promise2 fulfills)
  })
  .catch(errors => {
    console.error(errors); // This block won't be executed in this example
  });    
  `,
    },
  ],
};

const AsyncFunction = {
  key: 3,
  name: "Async Functions",
  summary: `<strong>Async functions</strong> are a powerful feature in JavaScript that simplify working with asynchronous operations. They provide a more readable and manageable way to handle asynchronous code by making it look and behave more like synchronous code.

<strong>Key Points:</strong>

1. <strong>Definition:</strong> An async function is declared using the <strong>async</strong> keyword before the <strong>function</strong> keyword, like this: <strong>async function functionName() { ... }</strong>.

2. <strong>Implicit Promise:</strong> Async functions always return a <strong>Promise</strong>. If the function directly returns a value, that value becomes the resolved value of the returned Promise.

3. <strong>Await Keyword:</strong> Inside an async function, you can use the <strong>await</strong> keyword to pause the execution of the function until a <strong>Promise</strong> is resolved. This allows you to write asynchronous code that appears to be sequential.

4. <strong>Error Handling:</strong> Async functions can use regular <strong>try-catch</strong> blocks to handle errors that might occur during asynchronous operations.

5. <strong>Benefits:</strong> Async functions improve code <strong>readability</strong>, reduce callback nesting, enhance <strong>error handling</strong>, and make asynchronous code easier to write and understand.`,
  examples: [
    {
      id: 1,
      name: "Async Function Returning a Value",
      explanation: `In this example, <strong>myAsyncFunction</strong> is an async function that returns the value <strong>'Hello, world!'</strong>. The function implicitly wraps this value in a <strong>Promise</strong>, making it accessible through the <strong>.then()</strong> method when the Promise resolves.`,
      code: `
      async function myAsyncFunction() {
        return 'Hello, world!';
      }
      
      myAsyncFunction()
        .then(result => {
          console.log(result); // Outputs: Hello, world!
        })
        .catch(error => {
          console.error(error.message);
        });
          `,
    },
    {
      id: 2,
      name: "Using Await Inside Async Function",
      explanation: `In this example, the <strong>fetchDataAsync</strong> async function uses the <strong>await</strong> keyword to pause until the <strong>fetchData</strong> Promise is resolved. It then returns the resolved value. The function also handles errors using a <strong>try-catch</strong> block.`,
      code: `
      const fetchData = () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const data = 'Fetched data';
            resolve(data);
          }, 1000);
        });
      };
      
      async function fetchDataAsync() {
        try {
          const result = await fetchData(); // Pauses until Promise is resolved
          return result; // Returns resolved value
        } catch (error) {
          console.error(error.message);
          throw error; // Re-throw the error if needed
        }
      }
      
      fetchDataAsync()
        .then(result => {
          console.log(result); // Outputs: Fetched data
        })
        .catch(error => {
          console.error('Outer error:', error.message);
        });
      
          `,
    },
  ],
};

const ReactComponents = {
  key: 4,
  name: "React Components",
  summary: `<strong>In React</strong>, components can be categorized into different types based on their functionality and how they are used within the application. Here are some common types of components:`,
  examples: [
    {
      id: 1,
      name: "Functional Components",
      explanation: `<strong>Functional components</strong> are a newer and simpler way to define React components using JavaScript functions. They receive props as their arguments and return JSX elements to render. With the introduction of React Hooks, functional components can now also manage state and lifecycle events, making them more powerful and easier to understand.`,
      code: `
import React, { useState, useEffect } from 'react';

function FunctionalComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('Component mounted or updated');
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default FunctionalComponent;
          `,
    },
    {
      id: 2,
      name: "Custom Hook Components",
      explanation: `<strong>Custom hooks</strong> can be used in functional components to abstract away complex logic and make the code more organized and reusable. A custom hook is essentially a JavaScript function that follows a specific naming convention. It usually starts with the word "use" (e.g., <strong>useCustomHook</strong>). By convention, custom hooks often use other built-in hooks such as useState, useEffect, useContext, etc., to build more complex behavior that can be reused across multiple components.`,
      code: `
import { useState } from 'react';

function useCounter(initialValue) {
  const [count, setCount] = useState(initialValue);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return { count, increment, decrement };
}

export default useCounter;
          `,
    },
    {
      id: 3,
      name: "Class Components",
      explanation: `<strong>Class components</strong> are the traditional way of creating React components. They are defined using ES6 classes and extend the base React.Component class. They have a render() method that returns the JSX representation of the component's UI. Class components can hold state using the this.state object, and they have lifecycle methods like componentDidMount and componentDidUpdate for handling component events and updates.`,
      code: `
import React, { Component } from 'react';

class ClassComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    console.log('Component mounted');
  }

  componentDidUpdate() {
    console.log('Component updated');
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

export default ClassComponent;
          `,
    },
    {
      id: 4,
      name: "Pure Components",
      explanation: `<strong>Pure components</strong> are a type of class component that automatically perform a shallow comparison of props and state to determine if the component should re-render. They are useful for optimizing performance by avoiding unnecessary re-renders. In this example, the <strong>PureCounter</strong> component is a pure component. It extends PureComponent instead of the regular Component class. As a result, the <strong>PureCounter</strong> component will only re-render if the props (count) change.`,
      code: `
class PureCounter extends PureComponent {
  render() {
    console.log('Rendering PureCounter component');
    return (
      <div>
        <p>Count: {this.props.count}</p>
      </div>
    );
  }
}
          `,
    },
  ],
};

const ReactRouter = {
  key: 5,
  name: "React Router",
  summary: `<strong>React Router</strong> is a library that provides navigation and routing capabilities to your React applications. It allows you to create single-page applications (SPAs) where different components are rendered based on the URL, mimicking the behavior of traditional multi-page applications.

<strong>react-router-dom</strong> is a specific package within the React Router ecosystem that's designed for web applications. It provides components that allow you to define and manage routing within your React app.`,
  examples: [
    {
      id: 1,
      name: "Setting Up Router:",
      explanation:
        "In your main application file (often index.js or App.js), you need to wrap your application components with the <strong>BrowserRouter</strong>. This component provides the routing context for your app.",
      code: `  import React from 'react';
  import ReactDOM from 'react-dom';
  import { BrowserRouter } from 'react-router-dom';
  import App from './App';
  
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById('root')
  );
          `,
    },
    {
      id: 2,
      name: "Defining Routes:",
      explanation:
        "In <strong>React Router v6</strong>, you define routes using the <strong>[Routes]</strong> component, which can be nested within your application. Each individual route is defined using the <strong>[Route]</strong> element, and route rendering is controlled by using the <strong>element</strong> prop. Here's how it's done:",
      code: `  import React from 'react';
  import { Routes, Route } from 'react-router-dom';
  import Home from './Home';
  import About from './About';
  import Contact from './Contact';

  const App = () => {
    return (
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    );
  };

  export default App;     
          `,
    },
    {
      id: 3,
      name: "Nested Routes:",
      explanation: `In between a <strong>Route</strong> component you can embed another <strong>Route</strong>:
Now our route structure looks like this:
"/"
"/about"
"/posts"
"/posts/new"
"/posts/123"`,
      code: `  <Router>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='posts' element={<Posts />}>
            <Route path='new' element={<NewPost />} /> {/*A nested route!*/}
            <Route path=':postId' element={<Post />} /> {/*A nested route!*/}
        </Route>
    </Routes>
  </Router>  
          `,
    },
    {
      id: 4,
      name: "Navigation Component",
      explanation:
        "Navigation is done with the <strong>[Link]</strong> component:",
      code: `  
  import React from 'react';
  import { Link } from 'react-router-dom';

  const Navigation = () => {
    return (
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    );
  };

  export default Navigation;
  `,
    },
    {
      id: 5,
      name: "useRoutes Hook",
      explanation: `With this setup, the <strong>useRoutes</strong> hook will take care of rendering the appropriate components based on the URL structure and the defined routes.

Remember to adjust the paths and components to match your actual application's structure.`,
      code: `  
  import React from 'react';
  import { BrowserRouter, useRoutes } from 'react-router-dom';
  import Home from './Home';
  import About from './About';
  import Contact from './Contact';
  import UserProfile from './UserProfile';
  import UserPosts from './UserPosts';

  const routes = [
    { path: '/', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },
    {
      path: '/user/:userId', element: <UserProfile />,
      children: [
        { path: 'posts', element: <UserPosts /> }
      ],
    },
  ];

  const App = () => {
    const routeResult = useRoutes(routes);

    return (
      <BrowserRouter>
        {routeResult}
      </BrowserRouter>
    );
  };

  export default App;
      
  `,
    },
    {
      id: 6,
      name: "Link",
      explanation: `In React Router v6, the <strong>Link</strong> component is used to create navigation links within your application. It provides a way to navigate between different routes without causing a full page reload. The <strong>Link</strong> component accepts a few important properties:
      `,
      code: `  
1. to (required): This property specifies the destination URL that the link should navigate to. It can be a string or an object containing information about the target route.

  <Link to="/">Home</Link>
  <Link to="/about">About</Link>
  <Link to={{ pathname: "/contact", state: { from: "header" } }}>Contact</Link>

2. replace: When this property is set to true, clicking the link will replace the current entry in the history stack instead of adding a new entry.

  <Link to="/home" replace={true}>Home</Link>

3. state: This property allows you to pass state data to the linked route. The state data will be available in the location.state object in the target route.

  <Link to={{ pathname: "/dashboard", state: { user: "John" } }}>Dashboard</Link>
  `,
    },
    {
      id: 7,
      name: "NavLink",
      explanation: `<strong>Link:</strong>
The Link component is used for basic navigation between routes. It renders an anchor ([a]) element with the provided to prop.

<strong>NavLink:</strong>
When we use the NavLink as a tag, it automatically inherit an active class when clicked. On the other hand, the Link tag does now have an active class when clicked

Here are some parameters that the NavLink has:
      `,
      code: `  
1. Style - has active class 
2. State - Can define state - works like Context
<li>
  <NavLink
  style={({isActive}) => {
    return isActive ? {color: "red"} : {}
  }}
  to='/'
  state={{name: "Ivan", age: 23}}
  >
  {({isActive}) => {
    return isActive ? "Active Home" : "Home"
  }}
</NavLink>
</li>      
  `,
    },
    {
      id: 8,
      name: "Navigate and useNavigate",
      explanation: `The <strong>Navigate</strong> component is used to trigger navigation to a specific route. It can be used within your component's JSX to initiate navigation when a certain condition is met.

The <strong>useNavigate</strong> hook returns a function that you can use to programmatically navigate to different routes. It's a powerful way to trigger navigation directly in your functional components.
      `,
      code: `  
Navigate:

  import React from 'react';
  import { Navigate } from 'react-router-dom';

  const ProtectedRoute = ({ isAuthenticated, children }) => {

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to the login page
  }

  return <div>{children}</div>; // Render the protected content
  };

  export default ProtectedRoute;

//---------------------------------------------------------------------  

useNavigate Hook:

  import React from 'react';
  import { useNavigate } from 'react-router-dom';

  const UserProfile = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/profile/edit'); // Option 1: Navigate to the profile edit page

    navigate(-1); // Option 2: Navigate to the previous page (1 page back)
  };

  return (
      <div>
        <h2>User Profile</h2>
        <button onClick={handleEditProfile}>Edit Profile</button>
      </div>
    );
  };

  export default UserProfile;


  `,
    },
    {
      id: 9,
      name: "useSearchParams",
      explanation: `The <strong>useSearchParams</strong> hook is a part of the React Router v6 library and provides a convenient way to access and update the query parameters of the current URL. Query parameters are the key-value pairs that follow the question mark (?) in a URL, used to pass additional information to a web server or a web application.
            
Here's an example URL with search parameters and a hash:
  https://example.com<u>/path/to/resource</u><strong>?name=value1&age=value2</strong><u>#section2</u>

In this example:
<strong>Pathname</strong>: <u>/path/to/resource</u>
<strong>Search</strong>: <strong>?name=value1&age=value2</strong>
<strong>Hash</strong>: <u>#section2</u>


In your functional component, call the <strong>useSearchParams</strong> hook to get a tuple containing two elements:
    
The first element is the <strong>URLSearchParams</strong> object, which allows you to read and manipulate the query parameters of the current URL.
The second element is the function to update the query parameters.
    
In this example, the <strong>searchParams</strong> object is used to access the value of a query parameter named paramName. The <strong>updateQueryParam</strong> function is used to update the value of the query parameter and then apply the updated parameters using the <strong>setSearchParams</strong> function.
    `,
      code: `const MyComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Access query parameters
  const queryParamValue = searchParams.get('paramName');

  // Update query parameters
  const updateQueryParam = () => {
    searchParams.set('paramName', 'newValue');
    setSearchParams(searchParams);
  };

  return (
    <div>
      <p>Query Parameter Value: {queryParamValue}</p>
      <button onClick={updateQueryParam}>Update Query Param</button>
    </div>
  );
};
      
          `,
    },
    {
      id: 10,
      name: "useLocation",
      explanation: `The <strong>useLocation</strong> hook is a part of the <strong>react-router-dom</strong> library in React Router v6. It provides access to the current location object, which represents the current URL. The location object includes information about the pathname, search, hash, state, and other properties of the current URL.
            
In your functional component, call the <strong>useLocation</strong> hook to get the current location object. The location object contains various properties:
    
<strong>pathname</strong>: The path portion of the URL.
<strong>search</strong>: The query string portion of the URL.
<strong>hash</strong>: The hash portion of the URL.
<strong>state</strong>: Any state data associated with the location.
    `,
      code: `  import React from 'react';
      import { useLocation } from 'react-router-dom';
      
      const MyComponent = () => {
        const location = useLocation();
      
        return (
          <div>
            <p>Pathname: {location.pathname}</p>
            <p>Search: {location.search}</p>
            <p>Hash: {location.hash}</p>
          </div>
        );
      };
      
          `,
    },
  ],
};

const TypeScript = {
  key: 1,
  name: "TypeScript",
  summary:
    "Closures are an important concept in JavaScript that allows functions to retain access to variables from their outer scope even after the outer function has finished executing.",
  examples: [
    {
      id: 1,
      name: "Closure example",
      explanation: "",
      code: `
  function createCounter() {
    let count = 0; // Local variable within the function's scope
  
    return function() {
      count++; // Using the variable from the closure
      return count;
    };
  }
  
  const counter = createCounter();
  
  console.log(counter()); // 1
  console.log(counter()); // 2
  console.log(counter()); // 3
          `,
    },
  ],
};

export const database = [
  Closure,
  Promises,
  AsyncFunction,
  ReactComponents,
  ReactRouter,
];
