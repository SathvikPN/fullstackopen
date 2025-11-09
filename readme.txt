Tool,Full Name,Primary Purpose,Analogy,When to Use It

Node.js,Node Runtime Environment,Executes JavaScript code outside the browser.,
The Engine,To run any JavaScript file (node index.js).

npm,Node Package Manager,"Installs, updates, and manages code packages/dependencies for a project.",
The Parts Store/Mechanic,To add a dependency to your project (npm install react).

npx,Node Package Execute,Runs a Node package binary (command) without permanently installing it.,
The Test Drive Mechanic,For one-off commands or tools you don't need to keep (npx create-react-app).

It is forbidden in React to mutate state directly, since it can result in unexpected side effects. 
Changing state has to always be done by setting the state to a new object.

NO ```
const handleLeftClick = () => {
  clicks.left++
  setClicks(clicks)
} ```

OK ```const handleLeftClick = () => {
  const newClicks = { 
    ...clicks, 
    left: clicks.left + 1 
  }
  setClicks(newClicks)
}
```

Objects are not valid as a React child, only primitive types are.

https://fullstackopen.com/en/