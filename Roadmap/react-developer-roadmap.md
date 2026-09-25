# React Developer Roadmap

> Based on the React Developer roadmap from [roadmap.sh](https://roadmap.sh/react).
>
> The roadmap is intended as a practical learning checklist for becoming a React developer. roadmap.sh describes its React roadmap as covering React and its ecosystem in 2026.

## 1. Prerequisites

Before going deep into React, be comfortable with:

### HTML

**Semantic HTML** — Use tags that describe their meaning (`<nav>`, `<article>`) instead of generic `<div>`s, so browsers and screen readers understand the page structure.
```html
<article>
  <header><h1>Post title</h1></header>
  <p>Content...</p>
</article>
```

**Forms and validation** — Built-in input types and attributes validate data before it ever reaches JavaScript.
```html
<input type="email" required minlength="5" />
```

**Accessibility** — Labels and ARIA attributes let assistive tech announce controls correctly.
```html
<label for="name">Name</label>
<input id="name" aria-describedby="name-hint" />
```

**HTML5 APIs** — Browser-native APIs like storage, geolocation, and drag-and-drop, usable without libraries.
```html
<script>
  localStorage.setItem('theme', 'dark');
</script>
```

**Responsive markup** — `viewport` meta tag and `srcset` let markup adapt to screen size and resolution.
```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

### CSS

**Selectors and specificity** — More specific selectors (IDs, inline styles) override less specific ones (element, class) regardless of source order.
```css
#nav a { color: red; }      /* wins over */
.nav-link { color: blue; }
```

**Box model** — Every element is a box made of content, padding, border, and margin; `box-sizing` controls how width is calculated.
```css
.box { box-sizing: border-box; padding: 16px; border: 1px solid #ccc; }
```

**Flexbox** — One-dimensional layout for aligning and distributing items in a row or column.
```css
.row { display: flex; justify-content: space-between; align-items: center; }
```

**CSS Grid** — Two-dimensional layout for arranging items into rows and columns at once.
```css
.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
```

**Responsive design** — Layouts that adapt using relative units and flexible containers, not fixed pixels.
```css
.container { width: 90%; max-width: 1200px; margin: 0 auto; }
```

**Media queries** — Apply different styles based on screen size, orientation, or user preferences.
```css
@media (max-width: 600px) {
  .sidebar { display: none; }
}
```

**CSS variables** — Reusable custom properties for consistent theming and easy updates.
```css
:root { --primary: #3b82f6; }
.btn { background: var(--primary); }
```

**Animations and transitions** — Smoothly animate property changes without JavaScript.
```css
.btn { transition: transform 0.2s ease; }
.btn:hover { transform: scale(1.05); }
```

### JavaScript

**Variables and data types** — `let`/`const` declare block-scoped variables; core types are string, number, boolean, object, array, null, undefined.
```js
let count = 0;
const name = 'Alex';
```

**Functions** — Reusable blocks of logic; arrow functions give shorter syntax and lexical `this`.
```js
const add = (a, b) => a + b;
```

**Scope and closures** — A closure lets an inner function keep access to its outer function's variables after that function returns.
```js
function counter() { let n = 0; return () => ++n; }
const next = counter();
next(); // 1
```

**Arrays and objects** — The two core data structures for lists and key-value data.
```js
const user = { name: 'Alex', roles: ['admin', 'user'] };
```

**Destructuring** — Unpack values from arrays/objects straight into variables.
```js
const { name, roles } = user;
const [first] = roles;
```

**Spread/rest operators** — `...` expands an iterable (spread) or collects remaining arguments (rest).
```js
const merged = { ...user, active: true };
const sum = (...nums) => nums.reduce((a, b) => a + b, 0);
```

**Modules** — Split code across files, exporting and importing only what's needed.
```js
export const add = (a, b) => a + b;
import { add } from './math.js';
```

**DOM and browser APIs** — Interfaces for reading and manipulating the page and browser features.
```js
document.querySelector('#app').textContent = 'Hello';
```

**Events** — Respond to user interactions like clicks, input, and keypresses.
```js
button.addEventListener('click', () => console.log('clicked'));
```

**Promises** — Represent a value that will resolve or reject at some point in the future.
```js
fetch('/api').then((res) => res.json()).catch((err) => console.error(err));
```

**`async` / `await`** — Syntactic sugar over promises that reads like synchronous code.
```js
const load = async () => {
  const res = await fetch('/api');
  return res.json();
};
```

**Fetch API** — Browser-native way to make HTTP requests.
```js
const users = await fetch('/api/users').then((r) => r.json());
```

**Error handling** — Catch and handle runtime errors gracefully instead of crashing.
```js
try { JSON.parse(bad); } catch (e) { console.error('Invalid JSON', e); }
```

**ES6+ features** — Modern syntax additions like template literals, optional chaining, and nullish coalescing.
```js
const msg = `Hello ${user?.name ?? 'Guest'}`;
```

### TypeScript

**Basic types** — Annotate variables and function signatures so the compiler catches type errors.
```ts
let age: number = 30;
const isActive: boolean = true;
```

**Interfaces and type aliases** — Two ways to name and describe the shape of an object.
```ts
interface User { id: number; name: string; email?: string; }
type Point = { x: number; y: number };
```

**Generics** — Write reusable code that works with any type while keeping type safety.
```ts
function first<T>(arr: T[]): T { return arr[0]; }
```

**Union/intersection types** — Combine types: a value is one of several types (`|`) or has all of them (`&`).
```ts
type Id = string | number;
type Admin = User & { isAdmin: true };
```

**Utility types** — Built-in helpers that transform existing types.
```ts
type PartialUser = Partial<User>;
type UserName = Pick<User, 'name'>;
```

**Type narrowing** — Refine a broad type to a specific one inside a conditional.
```ts
const getValue = (val: string | number) =>
  typeof val === 'string' ? val.toUpperCase() : val.toFixed(0);
```

**Type-safe API responses** — Type the shape of data returned from an API call.
```ts
type ApiResponse<T> = { data: T; status: number };
const res: ApiResponse<User[]> = await fetchUsers();
```

**TypeScript with React** — Typing props, state, and events in components.
```tsx
interface Props { name: string; }
const Greet = ({ name }: Props) => <p>Hi {name}</p>;
```

---

## 2. React Fundamentals

**Understand why React is used** — React lets you build UI as reusable, declarative components instead of manually updating the DOM.
```jsx
const App = () => <h1>Declarative UI</h1>; // React updates the DOM for you
```

**Create a React project** — Scaffold a new app with a build tool in one command.
```bash
npm create vite@latest my-app -- --template react
```

**Understand components** — A component is a function that returns UI.
```jsx
const Greeting = () => <p>Hello!</p>;
```

**Learn JSX** — A syntax extension that lets you write HTML-like markup in JavaScript.
```jsx
const el = <h1>Hi there</h1>;
```

**Understand props** — Data passed from a parent component into a child.
```jsx
const Greeting = ({ name }) => <p>Hi {name}</p>;
<Greeting name="Alex" />
```

**Render lists** — Use `.map()` to turn an array of data into an array of elements.
```jsx
{items.map((item) => <li key={item.id}>{item.name}</li>)}
```

**Use keys correctly** — Keys must be stable and unique so React can track list items across renders.
```jsx
<li key={item.id}>{item.name}</li> // not key={index}
```

**Conditional rendering** — Show different UI based on a condition.
```jsx
{isOnline ? <span>Online</span> : <span>Offline</span>}
```

**Event handling** — Attach handlers to DOM events using camelCase props.
```jsx
<button onClick={() => console.log('clicked')}>Click</button>
```

**Component composition** — Build complex UI by nesting smaller components.
```jsx
const Page = () => <Layout><Header /><Content /></Layout>;
```

**Understand one-way data flow** — Data flows from parent to child via props; children notify parents via callbacks.
```jsx
<Child value={count} onChange={setCount} />
```

**Split large components into smaller components** — Break big components into focused, single-purpose pieces.
```jsx
const UserPage = () => <><UserHeader /><UserDetails /></>;
```

### JSX

**JSX syntax** — HTML-like syntax that compiles to `React.createElement()` calls.
```jsx
const el = <div className="box">Hello</div>;
```

**JavaScript expressions in JSX** — Embed any JS expression inside curly braces.
```jsx
<p>{2 + 2}</p>
```

**Conditional JSX** — Use ternaries or `&&` to render conditionally inline.
```jsx
{items.length > 0 && <p>{items.length} items</p>}
```

**Lists and keys** — Rendered arrays need a unique `key` prop on each item.
```jsx
{users.map((u) => <li key={u.id}>{u.name}</li>)}
```

**Fragments** — Group elements without adding an extra DOM node.
```jsx
<>
  <Header />
  <Footer />
</>
```

**`className`** — JSX uses `className` instead of `class` for CSS classes.
```jsx
<div className="card">...</div>
```

**Passing props** — Pass data and callbacks down to child components as attributes.
```jsx
<Button label="Save" onClick={handleSave} />
```

---

## 3. State and Interactivity

**Understand state** — Data that changes over time and triggers a re-render when updated.
```jsx
const [count, setCount] = useState(0);
```

**`useState`** — The hook that adds local state to a function component.
```jsx
const [open, setOpen] = useState(false);
```

**Updating state** — Call the setter function; never mutate state directly.
```jsx
setCount(count + 1); // not count++
```

**Functional state updates** — Pass a function to the setter when the new value depends on the previous one.
```jsx
setCount((prev) => prev + 1);
```

**Updating objects immutably** — Spread the old object and override changed fields.
```jsx
setUser({ ...user, age: user.age + 1 });
```

**Updating arrays immutably** — Create a new array instead of mutating the existing one.
```jsx
setItems([...items, newItem]);
```

**Event handlers** — Functions that respond to user interaction and usually call a state setter.
```jsx
const handleClick = () => setCount((c) => c + 1);
```

**Controlled components** — Form inputs whose value is driven by React state.
```jsx
<input value={text} onChange={(e) => setText(e.target.value)} />
```

**Sharing state between components** — Move state to the closest common parent so siblings can share it.
```jsx
<Parent><List onSelect={setId} /><Details id={id} /></Parent>
```

**Lifting state up** — Move state from a child to its parent so multiple children can use it.
```jsx
const Parent = () => {
  const [id, setId] = useState(null);
  return <><List onSelect={setId} /><Details id={id} /></>;
};
```

**Derived state** — Compute a value from existing state instead of storing it separately.
```jsx
const total = items.reduce((sum, i) => sum + i.price, 0); // not its own state
```

### State Design

**Identify what should be state** — Only data that changes and affects rendering belongs in state.
```jsx
const [query, setQuery] = useState(''); // changes UI → state
```

**Avoid unnecessary duplicated state** — Don't store a value in state if it can be derived from existing state or props.
```jsx
const fullName = `${first} ${last}`; // derive, don't duplicate
```

**Keep state close to where it is used** — Declare state in the component that needs it, not higher than necessary.
```jsx
const Accordion = () => { const [open, setOpen] = useState(false); /* ... */ };
```

**Understand declarative UI** — Describe what the UI should look like for a given state, and let React handle the DOM updates.
```jsx
{isOpen ? <Panel /> : null} // describe, don't manually toggle the DOM
```

**Structure state for maintainability** — Group related state into a single object or reducer when fields change together.
```jsx
const [form, setForm] = useReducer(formReducer, initialForm);
```

---

## 4. React Hooks

### Essential Hooks

**`useState`** — Adds local state to a function component.
```jsx
const [count, setCount] = useState(0);
```

**`useEffect`** — Runs side effects (fetching, subscriptions, timers) after render.
```jsx
useEffect(() => { document.title = `Count: ${count}`; }, [count]);
```

**`useContext`** — Reads a value from a Context Provider without prop drilling.
```jsx
const theme = useContext(ThemeContext);
```

**`useRef`** — Holds a mutable value or DOM reference that doesn't trigger re-renders.
```jsx
const inputRef = useRef(null);
```

### Additional Hooks

**`useReducer`** — Manages complex state transitions with a reducer function, like a local Redux.
```jsx
const [state, dispatch] = useReducer(reducer, { count: 0 });
```

**`useMemo`** — Memoizes an expensive computed value so it's only recalculated when dependencies change.
```jsx
const sorted = useMemo(() => items.sort(), [items]);
```

**`useCallback`** — Memoizes a function reference so it doesn't change on every render.
```jsx
const handleClick = useCallback(() => setCount((c) => c + 1), []);
```

**`useId`** — Generates a stable unique ID, useful for linking labels to inputs.
```jsx
const id = useId();
<label htmlFor={id}>Name</label><input id={id} />
```

**`useTransition`** — Marks a state update as non-urgent so the UI stays responsive.
```jsx
const [isPending, startTransition] = useTransition();
startTransition(() => setResults(filter(query)));
```

**`useDeferredValue`** — Defers re-rendering with a value until more urgent updates finish.
```jsx
const deferredQuery = useDeferredValue(query);
```

**`useLayoutEffect`** — Like `useEffect`, but fires synchronously before the browser paints.
```jsx
useLayoutEffect(() => { el.current.style.opacity = 1; }, []);
```

**`useImperativeHandle`** — Customizes the instance value exposed to a parent via `ref`.
```jsx
useImperativeHandle(ref, () => ({ focus: () => inputRef.current.focus() }));
```

**`useDebugValue`** — Labels a custom hook's value in React DevTools for easier debugging.
```jsx
useDebugValue(isOnline ? 'Online' : 'Offline');
```

### Custom Hooks

**Understand when to create a custom hook** — When the same stateful logic is duplicated across two or more components.
```jsx
// Two components both need { data, loading, error } → extract useFetch
```

**Extract reusable stateful logic** — Move state + effects into a function starting with `use`.
```jsx
const useFetch = (url) => { /* state + useEffect */ };
```

**Follow the Rules of Hooks** — Only call hooks at the top level, never inside loops, conditions, or nested functions.
```jsx
if (loading) return null; // ✅ after hooks, not before useState()
```

**Design reusable hook APIs** — Return a small, predictable shape (object or tuple) that's easy to consume.
```jsx
const { data, loading, error } = useFetch('/api/user');
```

---

## 5. Effects and References

### `useEffect`

**Understand side effects** — Work that reaches outside the component (network, DOM, timers) instead of computing render output.
```jsx
useEffect(() => { console.log('rendered'); });
```

**Effect dependencies** — The array that controls when the effect re-runs.
```jsx
useEffect(() => { fetchUser(id); }, [id]); // re-run only when id changes
```

**Cleanup functions** — A returned function that undoes the effect before it re-runs or the component unmounts.
```jsx
useEffect(() => {
  const id = setInterval(tick, 1000);
  return () => clearInterval(id);
}, []);
```

**Avoid unnecessary effects** — Don't use an effect for something derivable during render.
```jsx
const fullName = `${first} ${last}`; // no effect needed
```

**Understand effect execution** — Effects run after the DOM is painted, in the order they're declared.
```jsx
useEffect(() => console.log('runs after paint'));
```

**Handle subscriptions** — Subscribe in the effect, unsubscribe in the cleanup.
```jsx
useEffect(() => {
  const sub = source.subscribe(setValue);
  return () => sub.unsubscribe();
}, []);
```

**Handle timers** — Always clear `setTimeout`/`setInterval` in cleanup to avoid leaks.
```jsx
useEffect(() => {
  const t = setTimeout(() => setShow(false), 3000);
  return () => clearTimeout(t);
}, []);
```

**Handle browser APIs** — Wrap APIs like `resize` or `matchMedia` in an effect and clean up the listener.
```jsx
useEffect(() => {
  const onResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', onResize);
  return () => window.removeEventListener('resize', onResize);
}, []);
```

### `useRef`

**Store mutable values** — Keep a value across renders without causing a re-render when it changes.
```jsx
const renderCount = useRef(0);
renderCount.current++;
```

**Access DOM elements** — Attach a ref to a JSX element to read or control it directly.
```jsx
<input ref={inputRef} />
```

**Understand refs vs state** — Updating a ref does not trigger a re-render; updating state does.
```jsx
countRef.current++;      // no re-render
setCount((c) => c + 1);  // re-renders
```

**Use refs for imperative operations** — Focusing, scrolling, or measuring elements directly.
```jsx
const focusInput = () => inputRef.current?.focus();
```

---

## 6. Forms

**Controlled forms** — Input value is driven by React state, giving full control over it.
```jsx
<input value={email} onChange={(e) => setEmail(e.target.value)} />
```

**Uncontrolled forms** — The DOM holds the input value; read it via a ref only when needed.
```jsx
<input ref={inputRef} defaultValue="" />
// later: inputRef.current.value
```

**Form validation** — Check input values against rules before accepting them.
```jsx
const isValid = email.includes('@') && password.length >= 8;
```

**Error handling** — Show field-specific feedback when validation fails.
```jsx
{errors.email && <span className="error">{errors.email}</span>}
```

**Submit handling** — Prevent the default page reload and process form data in JS.
```jsx
const handleSubmit = (e) => { e.preventDefault(); saveData(formValues); };
```

**File uploads** — Read files from a file input and send them via `FormData`.
```jsx
const handleFile = (e) => {
  const formData = new FormData();
  formData.append('file', e.target.files[0]);
  fetch('/api/upload', { method: 'POST', body: formData });
};
```

**Dynamic forms** — Add or remove fields at runtime by storing them as an array in state.
```jsx
setFields([...fields, { id: Date.now(), value: '' }]);
```

**React Hook Form** — A performant form library using uncontrolled inputs and refs to minimize re-renders.
```jsx
const { register, handleSubmit } = useForm();
<input {...register('email')} />
```

**Formik** — An older, popular form library with built-in state, validation, and submission handling.
```jsx
<Formik initialValues={{ email: '' }} onSubmit={handleSubmit}>
  <Form><Field name="email" /></Form>
</Formik>
```

**Schema validation** — Define validation rules once, in a schema, and reuse them for parsing and error messages.
```ts
const schema = z.object({ email: z.string().email() });
```

**Yup / Zod** — Popular schema libraries used to validate form data, often paired with React Hook Form.
```jsx
useForm({ resolver: zodResolver(schema) });
```

---

## 7. Data Fetching and APIs

**Fetch API** — Browser-native function for making HTTP requests.
```js
const res = await fetch('/api/users');
```

**Axios** — A popular HTTP client with a simpler API, interceptors, and automatic JSON parsing.
```js
const { data } = await axios.get('/api/users');
```

**REST APIs** — Resource-based HTTP APIs organized around URLs and standard methods.
```text
GET /users, POST /users, GET /users/:id
```

**HTTP methods** — GET reads, POST creates, PUT/PATCH update, DELETE removes.
```js
fetch('/api/users/1', { method: 'DELETE' });
```

**Request headers** — Metadata sent with a request, like content type or auth.
```js
fetch('/api', { headers: { 'Content-Type': 'application/json' } });
```

**Authentication headers** — Send a token so the server can identify the caller.
```js
fetch('/api', { headers: { Authorization: `Bearer ${token}` } });
```

**Loading states** — Track whether a request is in flight to show a spinner/skeleton.
```jsx
{loading && <Spinner />}
```

**Error states** — Track and surface request failures to the user.
```jsx
{error && <p>Failed to load: {error.message}</p>}
```

**Retry handling** — Automatically re-attempt a failed request, often with backoff.
```js
useQuery({ queryKey: ['users'], queryFn: fetchUsers, retry: 3 });
```

**Request cancellation** — Abort an in-flight request, e.g. when the component unmounts.
```js
const controller = new AbortController();
fetch('/api', { signal: controller.signal });
controller.abort();
```

**Pagination** — Fetch data in pages using `page`/`limit` query params.
```js
fetch(`/api/users?page=${page}&limit=20`);
```

**Infinite scrolling** — Load more pages as the user scrolls, appending to existing data.
```jsx
useInfiniteQuery({ queryKey: ['posts'], queryFn: fetchPage, getNextPageParam: (last) => last.nextCursor });
```

**Caching** — Store fetched data so repeat requests don't hit the network again.
```js
useQuery({ queryKey: ['users'], queryFn: fetchUsers, staleTime: 60_000 });
```

**Optimistic updates** — Update the UI immediately, before the server confirms the change.
```js
onMutate: async (newTodo) => setTodos((old) => [...old, newTodo]);
```

### Data-fetching Libraries

**TanStack Query / React Query** — Manages fetching, caching, and syncing server state automatically.
```jsx
const { data } = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
```

**SWR** — A lightweight data-fetching hook built around "stale-while-revalidate" caching.
```jsx
const { data } = useSWR('/api/users', fetcher);
```

**Understand server state vs client state** — Server state (from an API) needs caching/syncing; client state (like a modal being open) doesn't.
```jsx
const [isOpen, setIsOpen] = useState(false); // client state
const { data } = useQuery(['users'], fetchUsers); // server state
```

---

## 8. Routing

**React Router** — The standard client-side routing library for React.
```bash
npm install react-router-dom
```

**Routes** — Map a URL path to the component that should render.
```jsx
<Route path="/about" element={<About />} />
```

**Nested routes** — Render a child route inside a parent's layout via `<Outlet />`.
```jsx
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route path="stats" element={<Stats />} />
</Route>
```

**Route parameters** — Capture dynamic segments of the URL.
```jsx
<Route path="/users/:id" element={<UserDetail />} />
const { id } = useParams();
```

**Query parameters** — Read/write `?key=value` pairs from the URL.
```jsx
const [params] = useSearchParams();
const sort = params.get('sort');
```

**Navigation** — Move between routes with a link or programmatically.
```jsx
<Link to="/users">Users</Link>
const navigate = useNavigate(); navigate('/users');
```

**Protected routes** — Redirect unauthenticated users away from restricted pages.
```jsx
const ProtectedRoute = ({ children }) =>
  isAuth ? children : <Navigate to="/login" />;
```

**Route guards** — Logic that checks conditions (auth, role, permissions) before allowing access to a route.
```jsx
if (user.role !== 'admin') return <Navigate to="/403" />;
```

**Lazy-loaded routes** — Split route components into separate bundles, loaded on demand.
```jsx
const Heavy = lazy(() => import('./Heavy'));
<Suspense fallback={<p>Loading...</p>}><Heavy /></Suspense>
```

**Error routes** — A dedicated route/element rendered when a route throws.
```jsx
<Route path="/users/:id" element={<UserDetail />} errorElement={<ErrorPage />} />
```

**404 handling** — A catch-all route for unmatched URLs.
```jsx
<Route path="*" element={<NotFound />} />
```

---

## 9. State Management

Understand the difference between local state, shared client state, and server state.

### Context API

**`createContext`** — Creates a context object that components can subscribe to.
```jsx
const ThemeContext = createContext('light');
```

**`useContext`** — Reads the nearest Provider's value in a component.
```jsx
const theme = useContext(ThemeContext);
```

**Provider pattern** — Wrap a subtree in a `Provider` to make a value available to all its descendants.
```jsx
<ThemeContext.Provider value={theme}><App /></ThemeContext.Provider>
```

**Avoid unnecessary global state** — Keep state local unless multiple distant components truly need it; global state adds re-render cost and coupling.
```jsx
// A single form's input state doesn't belong in global context
```

### Redux

**Redux fundamentals** — A single, centralized store updated only via dispatched actions.
```text
UI dispatches action → reducer computes new state → UI re-renders
```

**Store** — The single object holding the entire app's state tree.
```js
const store = configureStore({ reducer: rootReducer });
```

**Actions** — Plain objects describing "what happened."
```js
{ type: 'counter/increment' }
```

**Reducers** — Pure functions that compute the next state from the current state and an action.
```js
const reducer = (state, action) => (action.type === 'inc' ? state + 1 : state);
```

**Middleware** — Functions that intercept dispatched actions, e.g. for logging or async logic.
```js
const logger = (store) => (next) => (action) => { console.log(action); return next(action); };
```

**Redux Toolkit** — The official, recommended way to write Redux with far less boilerplate.
```js
const store = configureStore({ reducer: { counter: counterSlice.reducer } });
```

**`createSlice`** — Generates action creators and a reducer from one config object.
```js
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: { increment: (s) => { s.value += 1; } },
});
```

**`createAsyncThunk`** — Handles async logic (like API calls) as a dispatchable action with pending/fulfilled/rejected states.
```js
const fetchUser = createAsyncThunk('user/fetch', (id) => api.getUser(id));
```

**RTK Query** — Data-fetching and caching layer built into Redux Toolkit.
```js
const { data } = useGetUsersQuery();
```

**Selectors** — Functions that read a specific slice of state from the store.
```js
const count = useSelector((state) => state.counter.value);
```

**Normalized state** — Store collections by ID (like a database table) instead of nested arrays, to simplify updates.
```js
{ users: { byId: { 1: { id: 1, name: 'Alex' } }, allIds: [1] } }
```

### Other State Libraries

**Zustand** — A minimal state management library with a simple hook-based API and no boilerplate.
```js
const useStore = create((set) => ({ count: 0, inc: () => set((s) => ({ count: s.count + 1 })) }));
```

**Jotai** — Atomic state management; each piece of state is an independent "atom."
```js
const countAtom = atom(0);
const [count, setCount] = useAtom(countAtom);
```

**MobX** — Observable-based state management that automatically tracks and reacts to changes.
```js
class Store { count = 0; increment = () => this.count++; }
```

**Recoil** — Atom/selector-based state management from Meta, designed for React's concurrent features.
```js
const countState = atom({ key: 'count', default: 0 });
```

---

## 10. Styling

**Plain CSS** — Standard stylesheets imported globally into the app.
```jsx
import './App.css';
<button className="primary">Click</button>
```

**CSS Modules** — CSS files scoped to a single component, avoiding class name collisions.
```jsx
import styles from './Button.module.css';
<button className={styles.primary}>Click</button>
```

**CSS-in-JS** — Write CSS directly in JavaScript, scoped to the component.
```jsx
const style = { color: 'blue', padding: 8 };
<button style={style}>Click</button>
```

**Styled Components** — A CSS-in-JS library using tagged template literals to style components.
```jsx
const Button = styled.button`background: blue; color: white;`;
```

**Tailwind CSS** — A utility-first CSS framework; style using small composable class names.
```jsx
<button className="bg-blue-500 text-white px-4 py-2 rounded">Click</button>
```

**Responsive design** — Layouts that adapt to different screen sizes using relative units and breakpoints.
```jsx
<div className="w-full md:w-1/2">...</div>
```

**Design systems** — A shared set of components, tokens, and rules ensuring visual consistency.
```js
export const spacing = { sm: 8, md: 16, lg: 24 };
```

**Component libraries** — Pre-built, tested UI components you install instead of writing from scratch.
```bash
npm install @mui/material
```

### UI Libraries

Explore at least one:

**Material UI** — A React implementation of Google's Material Design.
```jsx
<Button variant="contained">Click</Button>
```

**Ant Design** — A comprehensive enterprise-focused component library.
```jsx
<Button type="primary">Click</Button>
```

**Chakra UI** — A simple, accessible, themeable component library.
```jsx
<Button colorScheme="blue">Click me</Button>
```

**shadcn/ui** — Copy-paste, unstyled-by-default components built on Radix UI and Tailwind.
```jsx
<Button variant="outline">Click me</Button>
```

---

## 11. React Performance

**Understand React rendering** — Rendering computes what a component's output should look like; it doesn't always touch the real DOM.
```jsx
const App = () => <h1>{count}</h1>; // called on every state/prop change
```

**Reconciliation** — React's algorithm for diffing the new render output against the previous one to find the minimal DOM update.
```text
Old: <p>A</p>  New: <p>B</p>  → React only updates the text node
```

**Component re-rendering** — A component re-renders when its state, props, or context changes.
```jsx
setCount((c) => c + 1); // triggers a re-render of this component
```

**`useMemo`** — Memoizes an expensive computed value between renders.
```jsx
const sorted = useMemo(() => items.sort(), [items]);
```

**`useCallback`** — Memoizes a function so it keeps the same reference between renders.
```jsx
const onClick = useCallback(() => setCount((c) => c + 1), []);
```

**`React.memo`** — Skips re-rendering a component if its props haven't changed.
```jsx
const UserCard = React.memo(({ user }) => <div>{user.name}</div>);
```

**Code splitting** — Break the bundle into smaller chunks loaded only when needed.
```jsx
const Settings = lazy(() => import('./Settings'));
```

**Lazy loading** — Defer loading a component (or image) until it's actually needed.
```jsx
<Suspense fallback={<Spinner />}><Settings /></Suspense>
```

**Suspense** — A component that shows a fallback while its children are still loading.
```jsx
<Suspense fallback={<p>Loading...</p>}><Profile /></Suspense>
```

**Bundle optimization** — Reduce shipped JS via tree-shaking, code splitting, and dropping unused deps.
```bash
npx vite-bundle-visualizer
```

**Virtualization** — Render only the visible rows of a long list instead of all of them.
```jsx
<FixedSizeList height={600} itemCount={items.length} itemSize={35}>{Row}</FixedSizeList>
```

**Avoid unnecessary effects** — Don't use `useEffect` to compute something derivable during render.
```jsx
const fullName = `${first} ${last}`; // no effect needed
```

**Use React DevTools Profiler** — Record a render session to see which components rendered and why.
```text
DevTools → Profiler tab → Record → interact with the app → Stop
```

---

## 12. Error Handling

**Error boundaries** — A component that catches JS errors in its child tree and renders a fallback UI instead of crashing.
```jsx
class ErrorBoundary extends React.Component {
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state?.hasError ? <p>Something broke</p> : this.props.children; }
}
```

**API error handling** — Catch failed requests and show something useful instead of a blank screen.
```jsx
.catch((err) => setError('Failed to load. Please try again.'));
```

**Form errors** — Show validation failures next to the relevant field.
```jsx
{errors.email && <span className="error">{errors.email}</span>}
```

**Loading states** — Indicate that data is being fetched.
```jsx
if (loading) return <div className="skeleton-loader" />;
```

**Empty states** — Show a helpful message when a list or result has no data.
```jsx
if (users.length === 0) return <p>No users found</p>;
```

**Retry mechanisms** — Let the user re-attempt a failed operation.
```jsx
<button onClick={refetch}>Retry</button>
```

**User-friendly error messages** — Translate technical errors into plain language for the user.
```jsx
setError(err.status === 404 ? 'Not found' : 'Something went wrong');
```

**Logging and monitoring** — Send errors to a service so you know about failures in production.
```jsx
componentDidCatch(error, info) { Sentry.captureException(error, { extra: info }); }
```

---

## 13. Authentication and Authorization

**Login/logout flow** — Send credentials to get a token, store it, and clear it on logout.
```jsx
const login = async (email, pw) => { const { token } = await api.login(email, pw); setToken(token); };
```

**Access tokens** — A short-lived token sent with each request to prove identity.
```jsx
fetch('/api/me', { headers: { Authorization: `Bearer ${accessToken}` } });
```

**Refresh tokens** — A longer-lived token used to obtain a new access token without re-login.
```jsx
const { accessToken } = await api.refresh(refreshToken);
```

**JWT** — A signed token encoding claims (like user ID) that the server can verify without a DB lookup.
```jsx
const { sub, role } = jwtDecode(token);
```

**Secure token handling** — Prefer httpOnly cookies over `localStorage` to reduce XSS token theft risk.
```jsx
// Server sets: Set-Cookie: token=...; HttpOnly; Secure; SameSite=Strict
```

**Protected routes** — Redirect unauthenticated users away from pages that require login.
```jsx
!user ? <Navigate to="/login" /> : children;
```

**Role-based access** — Restrict a route or feature to users with a specific role.
```jsx
if (user.role !== 'admin') return <Navigate to="/403" />;
```

**Permission-based access** — Restrict features based on fine-grained permissions, not just a single role.
```jsx
{can('posts:delete') && <button>Delete</button>}
```

**OAuth** — Delegate login to a third-party provider using a standard authorization flow.
```jsx
window.location.href = '/api/auth/github';
```

**Social login** — Let users sign in with an existing account (Google, GitHub, etc.) via OAuth.
```jsx
<button onClick={() => signIn('google')}>Sign in with Google</button>
```

**Session management** — Track whether a user is logged in and keep that state in sync across the app.
```jsx
const { user, loading } = useAuth();
```

```jsx
// Authentication context
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('accessToken');
    if (token) {
      validateToken(token).then(setUser);
    }
    setLoading(false);
  }, []);
  
  const login = async (email, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    const { accessToken, refreshToken } = await response.json();
    
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setUser(await validateToken(accessToken));
  };
  
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// Protected route wrapper
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <p>Loading...</p>;
  
  if (!user) return <Navigate to="/login" />;
  
  if (requiredRole && user.role !== requiredRole) {
    return <div>Access Denied</div>;
  }
  
  return children;
};

// Usage
<Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/dashboard" element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } />
  <Route path="/admin" element={
    <ProtectedRoute requiredRole="admin">
      <AdminPanel />
    </ProtectedRoute>
  } />
</Routes>

// JWT token refresh
const api = axios.create({
  baseURL: '/api',
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      const newToken = await fetch('/api/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      }).then(r => r.json());
      
      localStorage.setItem('accessToken', newToken.accessToken);
      return api(error.config);
    }
    return Promise.reject(error);
  }
);
```

---

## 14. Testing

### Unit Testing

**Jest** — A widely-used JS test runner with built-in assertions and mocking.
```js
test('adds numbers', () => { expect(1 + 2).toBe(3); });
```

**Vitest** — A fast, Vite-native test runner with a Jest-compatible API.
```js
import { test, expect } from 'vitest';
```

**Test components** — Render a component and assert on its output.
```jsx
render(<Button label="Save" />);
expect(screen.getByText('Save')).toBeInTheDocument();
```

**Test hooks** — Test a custom hook in isolation using `renderHook`.
```jsx
const { result } = renderHook(() => useCounter());
```

**Mock dependencies** — Replace real modules (API calls, timers) with fakes during tests.
```js
jest.mock('./api', () => ({ getUsers: jest.fn(() => Promise.resolve([])) }));
```

### Component Testing

**React Testing Library** — Tests components the way a user interacts with them, via the rendered DOM.
```jsx
render(<LoginForm />);
```

**User-centric testing** — Query by role/label/text, not implementation details like class names.
```jsx
screen.getByRole('button', { name: /submit/i });
```

**Mock API requests** — Intercept network calls so tests don't depend on a real backend.
```jsx
global.fetch = jest.fn(() => Promise.resolve({ json: () => ({ name: 'Alex' }) }));
```

**Test forms** — Simulate typing and submitting to verify form behavior.
```jsx
await userEvent.type(screen.getByLabelText('Email'), 'a@b.com');
```

**Test accessibility** — Assert there are no a11y violations in rendered output.
```jsx
expect(await axe(container)).toHaveNoViolations();
```

### End-to-End Testing

**Playwright** — A modern E2E testing framework that drives real browsers.
```js
await page.goto('/login');
await page.click('button[type=submit]');
```

**Cypress** — A popular E2E testing tool with an interactive test runner.
```js
cy.visit('/login');
cy.get('button').click();
```

**Test critical user journeys** — Cover the flows that matter most to the business (checkout, signup).
```js
test('user can complete checkout', async ({ page }) => { /* ... */ });
```

**Test authentication flows** — Verify login, logout, and protected-route redirects work end-to-end.
```js
await page.fill('#email', 'a@b.com');
await expect(page).toHaveURL('/dashboard');
```

**Test API integration** — Verify the frontend correctly sends requests and handles real (or mocked) responses.
```js
await page.route('/api/users', (route) => route.fulfill({ json: [] }));
```

```jsx
// Unit Testing with Jest
describe('Counter', () => {
  it('increments count when button is clicked', () => {
    const { getByText } = render(<Counter />);
    const button = getByText('Increment');
    
    fireEvent.click(button);
    
    expect(getByText('Count: 1')).toBeInTheDocument();
  });
});

// Component Testing with React Testing Library
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('LoginForm', () => {
  it('submits form with correct data', async () => {
    const user = userEvent.setup();
    const mockSubmit = jest.fn();
    
    render(<LoginForm onSubmit={mockSubmit} />);
    
    await user.type(screen.getByLabelText('Email'), 'test@example.com');
    await user.type(screen.getByLabelText('Password'), 'password123');
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
});

// Hook Testing
import { renderHook, act } from '@testing-library/react';

describe('useFetch', () => {
  it('fetches data successfully', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ name: 'John' }) })
    );
    
    const { result } = renderHook(() => useFetch('/api/user'));
    
    await waitFor(() => {
      expect(result.current.data).toEqual({ name: 'John' });
    });
  });
});

// E2E Testing with Cypress
describe('User Login Flow', () => {
  it('logs in successfully', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    
    cy.url().should('include', '/dashboard');
    cy.get('h1').should('contain', 'Dashboard');
  });
});
```

---

## 15. Accessibility

**Semantic HTML** — Use the right element for the job (`<button>`, `<nav>`) so assistive tech understands it for free.
```jsx
<button onClick={submit}>Save</button> // not <div onClick={submit}>
```

**Keyboard navigation** — Every interactive element must be reachable and usable with only a keyboard.
```jsx
<div role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onClick()} />
```

**Focus management** — Move focus intentionally, e.g. to a modal when it opens.
```jsx
useEffect(() => { if (isOpen) closeButtonRef.current?.focus(); }, [isOpen]);
```

**ARIA** — Attributes that add accessibility semantics HTML can't express alone.
```jsx
<input aria-invalid={!!error} aria-describedby="email-error" />
```

**Screen readers** — Software that reads the page aloud; test with VoiceOver/NVDA, not just visually.
```jsx
<span className="sr-only">Loading results</span>
```

**Accessible forms** — Every input needs a linked, visible label.
```jsx
<label htmlFor="email">Email</label><input id="email" />
```

**Color contrast** — Text must have enough contrast against its background to be readable (WCAG AA: 4.5:1).
```css
.text { color: #1a1a1a; background: #ffffff; } /* passes AA */
```

**Accessible modals/dialogs** — Use `role="dialog"`, trap focus inside, and close on Escape.
```jsx
<div role="dialog" aria-modal="true" aria-labelledby="title">...</div>
```

**Automated accessibility testing** — Catch common a11y issues automatically in CI.
```jsx
expect(await axe(container)).toHaveNoViolations();
```

**WCAG fundamentals** — The standard accessibility guidelines: Perceivable, Operable, Understandable, Robust.
```text
Target conformance level: AA (the common legal/industry baseline)
```

```jsx
// Semantic HTML and ARIA labels
const AccessibleButton = () => {
  const inputRef = useRef(null);
  
  return (
    <div>
      <label htmlFor="username">Username</label>
      <input
        id="username"
        ref={inputRef}
        type="text"
        aria-describedby="username-hint"
      />
      <span id="username-hint">Enter your username (4-20 characters)</span>
    </div>
  );
};

// Focus management
const Modal = ({ isOpen, onClose }) => {
  const closeButtonRef = useRef(null);
  
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div role="dialog" aria-labelledby="modal-title">
      <h2 id="modal-title">Confirm Action</h2>
      <p>Are you sure?</p>
      <button ref={closeButtonRef} onClick={onClose}>
        Close
      </button>
    </div>
  );
};

// Accessible form with error handling
const AccessibleForm = () => {
  const [errors, setErrors] = useState({});
  
  return (
    <form noValidate>
      <div>
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>
    </form>
  );
};

// Automated accessibility testing
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should have no accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## 16. React Ecosystem

Learn how React fits into the wider ecosystem.

**React Router** — Client-side routing library for mapping URLs to components.
```jsx
<Route path="/users/:id" element={<UserDetail />} />
```

**TanStack Query** — Fetches, caches, and syncs server data with automatic refetching.
```jsx
const { data } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos });
```

**Redux Toolkit** — The standard, opinionated way to write Redux logic with less boilerplate.
```js
const slice = createSlice({ name: 'user', initialState, reducers: {} });
```

**RTK Query** — Data-fetching and caching layer built into Redux Toolkit.
```js
const api = createApi({ endpoints: (b) => ({ getUsers: b.query({ query: () => '/users' }) }) });
```

**React Hook Form** — Performant form library that minimizes re-renders using uncontrolled inputs.
```jsx
const { register } = useForm();
<input {...register('email')} />
```

**Zod / Yup** — Schema validation libraries used to validate form and API data with TypeScript inference.
```ts
const schema = z.object({ email: z.string().email() });
```

**Storybook** — Build and preview UI components in isolation from the app.
```jsx
export const Primary = () => <Button variant="primary">Click</Button>;
```

**ESLint** — Statically analyzes code to catch bugs and enforce style rules.
```bash
npx eslint src/ --fix
```

**Prettier** — Automatically formats code to a consistent style.
```bash
npx prettier --write src/
```

**React DevTools** — Browser extension for inspecting the component tree, props, and re-renders.
```text
Install from Chrome/Firefox extension store → open DevTools → "Components" tab
```

**Vite** — Fast dev server and build tool with instant hot module replacement.
```bash
npm create vite@latest my-app -- --template react-ts
```

---

## 17. Meta-Frameworks

Learn at least one React-based framework.

### Next.js

**App Router** — File-system based routing where folders under `app/` map to URL paths.
```text
app/blog/[slug]/page.tsx → /blog/:slug
```

**Server Components** — Components that render on the server by default and ship no JS to the client.
```tsx
async function Page() { const data = await db.query(); return <List data={data} />; }
```

**Client Components** — Opt into interactivity and browser APIs with `'use client'`.
```tsx
'use client';
const [count, setCount] = useState(0);
```

**Server Actions** — Functions that run on the server, callable directly from a form or client component.
```tsx
'use server';
export async function createPost(data) { await db.post.create({ data }); }
```

**Routing** — `Link` and file conventions handle navigation without extra config.
```tsx
<Link href="/about">About</Link>
```

**Layouts** — Shared UI that wraps nested routes and persists across navigation.
```tsx
export default function Layout({ children }) { return <><Nav />{children}</>; }
```

**Loading UI** — A `loading.tsx` file shown automatically while a route's data loads.
```tsx
export default function Loading() { return <p>Loading...</p>; }
```

**Error UI** — An `error.tsx` file that catches errors thrown in that route segment.
```tsx
'use client';
export default function Error({ error }) { return <p>{error.message}</p>; }
```

**Data fetching** — `fetch` calls in Server Components run at build or request time, with built-in caching.
```tsx
const posts = await fetch('https://api.example.com/posts').then((r) => r.json());
```

**Caching** — Control how long fetched data is reused before revalidating.
```tsx
fetch(url, { next: { revalidate: 60 } });
```

**Middleware** — Code that runs before a request completes, e.g. for auth checks or redirects.
```ts
export function middleware(req) { if (!req.cookies.get('token')) return NextResponse.redirect('/login'); }
```

**Authentication** — Typically handled with a library like NextAuth.js, or custom cookie/JWT logic.
```tsx
const session = await getServerSession(authOptions);
```

**API/route handlers** — Define REST endpoints via `route.ts` files.
```ts
export async function GET() { return Response.json({ ok: true }); }
```

**Deployment** — Next.js apps deploy easily to Vercel, or self-host with `next start`/Docker.
```bash
vercel --prod
```

Also be aware of alternatives such as:

**Remix / React Router framework capabilities** — A full-stack React framework built around web fundamentals (loaders, actions, nested routing).
```tsx
export async function loader() { return json(await getPosts()); }
```

**Gatsby** — A static-site generator for React, focused on content-heavy sites built at build time.
```bash
gatsby build
```

```jsx
// Next.js - App Router basic setup
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}

// app/page.tsx - Home page
export default function Home() {
  return <h1>Welcome</h1>;
}

// app/dashboard/page.tsx - Nested route
export default function Dashboard() {
  return <div>Dashboard</div>;
}

// Server Component (default)
// app/users/page.tsx
async function getUsers() {
  const res = await fetch('https://api.example.com/users');
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();
  
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}

// Client Component
'use client';

import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
}

// Server Action
'use server';

export async function createUser(formData) {
  const name = formData.get('name');
  const res = await fetch('https://api.example.com/users', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
  return res.json();
}

// Using Server Action in Client Component
'use client';

export default function UserForm() {
  return (
    <form action={createUser}>
      <input name="name" />
      <button type="submit">Create</button>
    </form>
  );
}

// API Route
// app/api/users/route.ts
export async function GET() {
  return Response.json({ name: 'John' });
}

export async function POST(request) {
  const body = await request.json();
  return Response.json({ success: true });
}
```

---

## 18. Build Tools

**npm** — Node's default package manager, bundled with Node.js.
```bash
npm install axios
```

**pnpm** — A fast, disk-space-efficient package manager using a shared content-addressable store.
```bash
pnpm install
```

**yarn** — An alternative package manager with workspaces and a lockfile, similar to npm.
```bash
yarn add axios
```

**Vite** — A fast dev server and bundler using native ES modules for instant startup.
```bash
npm create vite@latest
```

**Webpack** — A configurable, widely-used module bundler (used under the hood by many older setups).
```js
module.exports = { entry: './src/index.js', output: { filename: 'bundle.js' } };
```

**Babel** — Transpiles modern/JSX JavaScript into browser-compatible code.
```json
{ "presets": ["@babel/preset-react", "@babel/preset-env"] }
```

**ESLint** — Statically analyzes code to catch bugs and enforce style rules.
```bash
npx eslint src/ --fix
```

**Prettier** — Automatically formats code to a consistent style.
```bash
npx prettier --write src/
```

**Environment variables** — Configuration values injected at build/run time, kept out of source code.
```bash
VITE_API_URL=https://api.example.com
```

**Source maps** — Map minified production code back to original source for debugging.
```js
build: { sourcemap: true }
```

**Production builds** — An optimized, minified bundle meant for deployment.
```bash
npm run build
```

**Bundle analysis** — Visualize what's taking up space in your final bundle.
```bash
npx vite-bundle-visualizer
```

```bash
# npm package management
npm install package-name
npm install --save-dev webpack
npm run build
npm run dev

# Vite configuration
# vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    minify: 'terser',
  },
  server: {
    port: 3000,
  },
})

# ESLint setup
# .eslintrc.json
{
  "extends": "eslint:recommended",
  "parserOptions": { "ecmaVersion": "latest" },
  "rules": {
    "no-unused-vars": "error",
    "no-console": "warn"
  }
}

# Prettier formatting
# .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5"
}

# Environment variables
# .env
VITE_API_URL=https://api.example.com
VITE_API_KEY=your_key_here

# Access in code
const apiUrl = import.meta.env.VITE_API_URL;

# Build and bundle analysis
npm run build
npx webpack-bundle-analyzer dist/stats.json
```

---

## 19. Security

**XSS** — Injecting malicious scripts into a page; React escapes content by default, preventing most cases.
```jsx
<div>{userInput}</div> // safe — React escapes this automatically
```

**CSRF** — Tricking a logged-in user's browser into making an unwanted request; mitigated with tokens/SameSite cookies.
```jsx
fetch('/api', { headers: { 'X-CSRF-Token': csrfToken } });
```

**CORS** — Server-controlled policy on which origins may call an API.
```text
Access-Control-Allow-Origin: https://yourdomain.com
```

**Content Security Policy** — A response header restricting what scripts/resources a page may load.
```text
Content-Security-Policy: default-src 'self'
```

**Secure authentication** — Store tokens safely and always use HTTPS for auth traffic.
```jsx
fetch('/api/login', { credentials: 'include' }); // cookie-based, not localStorage
```

**Secure cookies** — Mark auth cookies `Secure`, `HttpOnly`, and `SameSite` to limit theft/misuse.
```text
Set-Cookie: token=...; Secure; HttpOnly; SameSite=Strict
```

**Dependency vulnerabilities** — Regularly audit and update packages with known security issues.
```bash
npm audit fix
```

**Input validation** — Never trust client input; validate on both client and server.
```jsx
if (!/^[^\s@]+@[^\s@]+$/.test(email)) throw new Error('Invalid email');
```

**Avoid exposing secrets in frontend code** — API keys shipped to the browser are public; route sensitive calls through a backend.
```jsx
// ❌ const API_KEY = 'sk_live_123'; — visible to anyone
// ✅ call your own /api route, which holds the secret server-side
```

```jsx
// Prevent XSS - React escapes by default
const safe = <div>{userInput}</div>; // Safe

// Don't use dangerouslySetInnerHTML
const unsafe = <div dangerouslySetInnerHTML={{ __html: userInput }} />; // Unsafe!

// CSRF protection
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

const createUser = async (userData) => {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'X-CSRF-Token': csrfToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// CORS configuration
// Backend should set correct headers
// Access-Control-Allow-Origin: https://yourdomain.com
// Access-Control-Allow-Credentials: true

// Secure cookies
const setSecureCookie = (name, value) => {
  document.cookie = `${name}=${value}; Secure; HttpOnly; SameSite=Strict`;
};

// Input validation
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const handleSubmit = (formData) => {
  if (!validateEmail(formData.email)) {
    throw new Error('Invalid email');
  }
  // Process form
};

// Content Security Policy header (server-side)
// Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'

// Sanitize HTML input
import DOMPurify from 'dompurify';

const sanitize = (html) => {
  return DOMPurify.sanitize(html);
};

// Never store secrets in frontend code
// ❌ Don't do this:
const API_KEY = 'sk_live_12345'; // Exposed in browser

// ✅ Do this instead - use backend proxy
const response = await fetch('/api/external-service', {
  method: 'POST',
  body: JSON.stringify({ data }),
});

// Check dependencies for vulnerabilities
// npm audit
// npm audit fix
```

---

## 20. Advanced React Concepts

**Rendering model** — React re-runs a component function to compute new output, then reconciles it against the DOM.
```jsx
const App = () => <p>{count}</p>; // called again whenever count changes
```

**Reconciliation** — React's diffing algorithm that finds the minimal set of DOM changes needed.
```text
Compares old vs new element tree by type + key
```

**Concurrent rendering concepts** — React can prepare multiple versions of the UI and interrupt low-priority work for urgent updates.
```jsx
startTransition(() => setResults(filter(query))); // low priority
```

**Suspense** — Declaratively show a fallback while a component or data isn't ready yet.
```jsx
<Suspense fallback={<Spinner />}><Profile /></Suspense>
```

**Transitions** — Mark a state update as non-urgent so typing/clicks stay responsive.
```jsx
const [isPending, startTransition] = useTransition();
```

**Server Components** — Components rendered on the server, sending zero JS to the client.
```tsx
async function Page() { const data = await db.query(); return <List data={data} />; }
```

**Hydration** — The process of attaching React's event handlers to server-rendered HTML in the browser.
```text
Server sends HTML → browser paints it → React "hydrates" it to become interactive
```

**Streaming** — Send HTML to the browser in chunks as it becomes ready, instead of all at once.
```tsx
<Suspense fallback={<Skeleton />}><SlowSection /></Suspense>
```

**Error boundaries** — Catch render errors in a subtree and show a fallback instead of a blank screen.
```jsx
<ErrorBoundary fallback={<p>Something broke</p>}><Widget /></ErrorBoundary>
```

**Portals** — Render children into a DOM node outside the parent component's hierarchy.
```jsx
ReactDOM.createPortal(<Modal />, document.getElementById('modal-root'));
```

**Compound components** — Related components that share implicit state via context, used together as a unit.
```jsx
<Select><Select.Trigger /><Select.Menu /></Select>
```

**Render props** — Pass a function as a prop that a component calls to render its output.
```jsx
<MouseTracker>{(pos) => <p>{pos.x}, {pos.y}</p>}</MouseTracker>
```

**Higher-order components** — A function that takes a component and returns a new, enhanced component.
```jsx
const withLogger = (Component) => (props) => { console.log('render'); return <Component {...props} />; };
```

**Controlled vs uncontrolled components** — Controlled inputs are driven by state; uncontrolled inputs manage their own value internally.
```jsx
<input value={v} onChange={set} /> // controlled
<input defaultValue="" ref={r} />  // uncontrolled
```

**Headless components** — Components that provide behavior/state but no markup, letting you fully own the UI.
```jsx
const { isOpen, toggle } = useDisclosure(); // no rendered output
```

```jsx
// Suspense with lazy loading
const ProfilePage = lazy(() => import('./ProfilePage'));

const App = () => (
  <Suspense fallback={<p>Loading profile...</p>}>
    <ProfilePage />
  </Suspense>
);

// useTransition for non-urgent updates
import { useTransition } from 'react';

const SearchUsers = () => {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Mark this update as non-urgent
    startTransition(() => {
      setResults(searchUsers(value));
    });
  };
  
  return (
    <div>
      <input onChange={handleSearch} />
      {isPending && <p>Searching...</p>}
      {results.map(r => <div key={r.id}>{r.name}</div>)}
    </div>
  );
};

// Portal - Render outside component tree
const Modal = ({ children }) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>,
    document.getElementById('modal-root')
  );
};

// Compound components pattern
const Select = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="select">{children}</div>
    </SelectContext.Provider>
  );
};

Select.Trigger = ({ children }) => {
  const { setIsOpen } = useContext(SelectContext);
  return <button onClick={() => setIsOpen(true)}>{children}</button>;
};

Select.Menu = ({ children }) => {
  const { isOpen } = useContext(SelectContext);
  return isOpen && <ul>{children}</ul>;
};

// Usage
<Select>
  <Select.Trigger>Open menu</Select.Trigger>
  <Select.Menu>
    <li>Option 1</li>
    <li>Option 2</li>
  </Select.Menu>
</Select>

// Render Props pattern
const MouseTracker = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };
  
  return (
    <div onMouseMove={handleMouseMove}>
      {children(position)}
    </div>
  );
};

// Usage
<MouseTracker>
  {(position) => (
    <p>Mouse at: {position.x}, {position.y}</p>
  )}
</MouseTracker>

// Higher-Order Component (HOC)
const withLogger = (Component) => {
  return (props) => {
    useEffect(() => {
      console.log(`${Component.name} mounted`);
      return () => console.log(`${Component.name} unmounted`);
    }, []);
    
    return <Component {...props} />;
  };
};

const MyComponent = () => <div>Hello</div>;
export default withLogger(MyComponent);
```

---

## 21. Architecture and Code Quality

**Feature-based folder structure** — Group files by feature/domain instead of by file type, so related code lives together.
```text
features/checkout/{Checkout.tsx, useCheckout.ts, checkoutApi.ts}
```

**Component composition** — Build complex UI by combining small components instead of one large one.
```jsx
<Card><Card.Header /><Card.Body /></Card>
```

**Separation of concerns** — Keep UI, business logic, and data-fetching in distinct layers.
```text
components/ (UI) · hooks/ (logic) · services/ (API calls)
```

**Reusable components** — Generic, prop-driven components used across multiple features.
```jsx
<Button variant="primary" size="sm">Save</Button>
```

**Custom hooks** — Extract and share stateful logic between components.
```js
const { data, loading } = useFetch('/api/user');
```

**Service/API layer** — A dedicated module for all HTTP calls, kept separate from components.
```js
// services/userService.js
export const getUser = (id) => axios.get(`/users/${id}`);
```

**State management architecture** — A clear plan for where each kind of state lives (local, global, server).
```text
Local: useState · Global: Zustand/Redux · Server: TanStack Query
```

**Error-handling strategy** — A consistent, app-wide approach to catching and displaying errors.
```jsx
<ErrorBoundary fallback={<ErrorPage />}><App /></ErrorBoundary>
```

**Design systems** — A shared library of components, tokens, and rules for visual consistency.
```js
// tokens.js
export const colors = { primary: '#3b82f6' };
```

**Dependency management** — Keeping packages up to date and minimal to reduce risk and bundle size.
```bash
npm outdated && npm update
```

**Type-safe architecture** — Using TypeScript end-to-end so data shapes are checked at compile time.
```ts
interface User { id: number; name: string; }
```

**Code review practices** — Structured PR review focused on correctness, readability, and consistency.
```text
Small PRs · clear description · at least one approving review before merge
```

Example structure:

```text
src/
├── app/
├── components/
├── features/
├── hooks/
├── services/
├── store/
├── types/
├── utils/
├── routes/
└── main.tsx
```

---

## 22. Git and Team Development

**Git fundamentals** — Track file changes as commits, forming a history you can inspect and revert.
```bash
git add . && git commit -m "Add login form"
```

**Branching** — Isolate work on a separate line so `main` stays stable.
```bash
git checkout -b feature/login
```

**Pull requests** — Propose merging a branch into another, with review before it lands.
```bash
gh pr create --title "Add login form" --body "Implements #42"
```

**Code reviews** — Teammates read a PR's diff and leave comments before approving.
```text
Look for: correctness, readability, tests, edge cases
```

**Rebase** — Replay commits from one branch onto another, producing a linear history.
```bash
git rebase main
```

**Merge** — Combine two branches' histories, keeping both sets of commits.
```bash
git merge feature/login
```

**Cherry-pick** — Apply a single specific commit from one branch onto another.
```bash
git cherry-pick a1b2c3d
```

**Revert** — Undo a commit by creating a new commit that reverses its changes.
```bash
git revert a1b2c3d
```

**Reset** — Move the branch pointer to an earlier commit (careful: can discard history).
```bash
git reset --soft HEAD~1
```

**Resolve merge conflicts** — Manually choose which changes to keep when Git can't auto-merge.
```text
Edit the <<<<<<< / ======= / >>>>>>> markers, then git add + commit
```

**Conventional commits** — A standard commit message format that tools can parse for changelogs.
```text
feat(auth): add JWT refresh token support
```

**CI checks** — Automated build/lint/test runs that gate merging a PR.
```yaml
on: pull_request
jobs:
  test: { runs-on: ubuntu-latest, steps: [ { run: npm test } ] }
```

---

## 23. CI/CD and Deployment

**Build React applications in CI** — Run the build step on every push to catch build-breaking errors early.
```yaml
- run: npm run build
```

**Run linting** — Fail the pipeline if code doesn't meet style/quality rules.
```yaml
- run: npm run lint
```

**Run unit tests** — Fail the pipeline if any test breaks.
```yaml
- run: npm test
```

**Run E2E tests** — Verify critical user flows work against a real running app.
```yaml
- run: npm run test:e2e
```

**Build production bundles** — Generate the optimized, minified output for deployment.
```bash
npm run build
```

**Environment configuration** — Inject different values (API URLs, keys) per environment (dev/staging/prod).
```bash
# .env.production
VITE_API_URL=https://api.prod.example.com
```

**Deployment pipelines** — Automate the path from merged code to a live deployment.
```text
push → CI (lint, test, build) → deploy → smoke test
```

**Docker fundamentals** — Package the app and its runtime into a portable container image.
```bash
docker build -t my-app . && docker run -p 3000:3000 my-app
```

**CDN** — Serve static assets from edge locations close to users for faster load times.
```text
Vercel/Netlify/CloudFront automatically put your build behind a CDN
```

**HTTPS** — Encrypt traffic between the browser and server; required for secure cookies and many browser APIs.
```text
Most hosts (Vercel, Netlify) provide free HTTPS certificates automatically
```

**Monitoring** — Track errors and performance in production after deployment.
```js
Sentry.init({ dsn: process.env.SENTRY_DSN });
```

Useful platforms/tools:

**GitHub Actions** — CI/CD pipelines defined as YAML workflows, run directly on GitHub.
```yaml
on: push
jobs: { build: { runs-on: ubuntu-latest, steps: [{ run: npm run build }] } }
```

**AWS** — Cloud platform for hosting via S3/CloudFront, ECS, or Amplify.
```bash
aws s3 sync dist/ s3://my-bucket
```

**Vercel** — Zero-config hosting built by the Next.js team; deploys on every git push.
```bash
vercel --prod
```

**Netlify** — Static/JAMstack hosting with built-in CI, forms, and edge functions.
```bash
netlify deploy --prod
```

**Docker** — Containerize the app so it runs identically across environments.
```dockerfile
FROM node:18-alpine
CMD ["npm", "start"]
```

**Kubernetes fundamentals** — Orchestrate containers at scale across multiple machines.
```bash
kubectl apply -f deployment.yaml
```

```yaml
# GitHub Actions workflow for React app
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Lint
        run: npm run lint
      
      - name: Unit tests
        run: npm run test
      
      - name: Build
        run: npm run build
      
      - name: E2E tests
        run: npm run test:e2e
      
      - name: Deploy to Vercel
        uses: vercel/action@v4
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

```dockerfile
# Dockerfile for React app
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

```bash
# Docker build and run
docker build -t my-react-app .
docker run -p 3000:3000 my-react-app

# Deployment checklist
# 1. Run linting: npm run lint
# 2. Run tests: npm run test
# 3. Build: npm run build
# 4. Check bundle size: npm run analyze
# 5. Deploy to staging first
# 6. Run E2E tests on staging
# 7. Deploy to production
```

---

## 24. AI-Assisted React Development

Modern React development can also include AI-assisted development workflows.

**GitHub Copilot** — Inline AI code completion inside your editor as you type.
```text
// type a comment, Copilot suggests the implementation below it
```

**Claude Code** — A CLI/IDE agent that can read a repo, make multi-file edits, and run commands.
```bash
claude "add a loading state to UserList.tsx"
```

**OpenAI Codex** — An AI coding agent that can plan and execute multi-step coding tasks.
```text
Give it a task description; it edits files and reports back a diff
```

**Cursor** — An AI-native code editor built around chat-driven edits and codebase context.
```text
Cmd+K on a selection → describe the change → apply the diff
```

**AI-assisted debugging** — Paste an error and stack trace to get likely causes and fixes.
```text
"TypeError: cannot read property 'map' of undefined — why, and how to fix?"
```

**AI-assisted test generation** — Ask the assistant to generate unit tests for a given function/component.
```text
"Write Jest tests for this useFetch hook covering loading, success, and error"
```

**AI-assisted code review** — Have the assistant review a diff for bugs, style, and missed edge cases before opening a PR.
```bash
/code-review
```

**MCP fundamentals** — Model Context Protocol lets an AI assistant call external tools/data sources in a standard way.
```json
{ "mcpServers": { "github": { "command": "npx", "args": ["-y", "@mcp/github"] } } }
```

**Agentic development workflows** — Letting an AI agent plan, edit, run, and verify changes across a task, not just autocomplete a line.
```text
Prompt → agent edits files → runs tests → reports results
```

Use AI to accelerate development while still understanding:

**Generated code** — Read and understand every AI-written line before committing it; don't ship what you can't explain.

**Security implications** — Check AI-suggested code for injection risks, exposed secrets, or unsafe defaults.

**Performance implications** — Verify AI suggestions don't introduce unnecessary re-renders or N+1 requests.

**Dependencies** — Confirm any AI-suggested package is maintained, necessary, and not a security risk.

**Architecture decisions** — Treat AI output as a suggestion, not a substitute for your own design judgment.

**Test coverage** — AI-generated code still needs tests proving it behaves correctly, not just that it compiles.

---

# Practical Project Path

Use projects to validate each stage of the roadmap.

## Beginner

- [ ] Counter application
- [ ] Todo application
- [ ] Weather application
- [ ] Expense tracker
- [ ] Form validation application

## Intermediate

- [ ] E-commerce frontend
- [ ] Admin dashboard
- [ ] Authentication application
- [ ] Product search application
- [ ] CRUD application with REST API

## Advanced

- [ ] Banking dashboard
- [ ] Multi-role admin portal
- [ ] Real-time chat application
- [ ] Large-scale form workflow
- [ ] Micro-frontend application
- [ ] Next.js full-stack application

## Production-Level Project

Build one complete application with:

- [ ] React + TypeScript
- [ ] Authentication
- [ ] Role-based authorization
- [ ] REST/GraphQL API
- [ ] State management
- [ ] Server-state management
- [ ] Form validation
- [ ] Error handling
- [ ] Accessibility
- [ ] Unit tests
- [ ] E2E tests
- [ ] CI/CD
- [ ] Monitoring
- [ ] Production deployment

---

# Recommended Learning Order

```text
HTML
  ↓
CSS
  ↓
JavaScript
  ↓
TypeScript
  ↓
React Fundamentals
  ↓
Hooks + State
  ↓
Forms
  ↓
API / Data Fetching
  ↓
React Router
  ↓
State Management
  ↓
Testing
  ↓
Performance
  ↓
Accessibility
  ↓
Authentication
  ↓
Next.js / React Framework
  ↓
Architecture
  ↓
CI/CD + Deployment
  ↓
Production Projects
```

# Quick Reference: Essential Imports

```typescript
// React & Hooks
import React, { useState, useEffect, useContext, useCallback, useMemo, useRef } from 'react';

// React Router
import { BrowserRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';

// State Management
import { useSelector, useDispatch, Provider } from 'react-redux';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Forms
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// HTTP
import axios from 'axios';

// Styling
import styled from 'styled-components';
import { useStyles } from '@mui/styles'; // Material UI

// Testing
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
```

---

# Progress Tracker

| Area | Status |
|---|---|
| HTML | ⬜ |
| CSS | ⬜ |
| JavaScript | ⬜ |
| TypeScript | ⬜ |
| React Fundamentals | ⬜ |
| Hooks | ⬜ |
| State Management | ⬜ |
| Forms | ⬜ |
| API / Data Fetching | ⬜ |
| Routing | ⬜ |
| Testing | ⬜ |
| Accessibility | ⬜ |
| Performance | ⬜ |
| Authentication | ⬜ |
| Next.js | ⬜ |
| Architecture | ⬜ |
| CI/CD | ⬜ |
| Production Project | ⬜ |

## Reference

- React Developer Roadmap: https://roadmap.sh/react
- React official documentation: https://react.dev/

> Note: This Markdown is a structured learning checklist based on the roadmap.sh React roadmap and React ecosystem topics. The interactive roadmap itself may change over time.
