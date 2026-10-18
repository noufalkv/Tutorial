import './Pages.css';
import './BoxSizingDemo.css';
import Accordion from '../components/Accordion';

function React() {
  const tanstackItems = [
    {
      title: '📚 What is TanStack Query (React Query)?',
      content: (
        <div>
          <p>
            TanStack Query (formerly React Query) is a powerful library for managing server state in React applications.
            It provides hooks and utilities to fetch, cache, update, and synchronize data from APIs with minimal boilerplate.
          </p>
          <h4>Key Benefits:</h4>
          <ul>
            <li><strong>Automatic Caching:</strong> Caches data intelligently and reduces redundant API calls</li>
            <li><strong>Synchronization:</strong> Keeps server state in sync with client state automatically</li>
            <li><strong>Background Refetching:</strong> Updates stale data in the background</li>
            <li><strong>Error Handling:</strong> Built-in error handling and retry logic</li>
            <li><strong>DevTools:</strong> Comes with powerful debugging tools</li>
            <li><strong>Performance:</strong> Optimizes data fetching and reduces network requests</li>
          </ul>
        </div>
      ),
    },
    {
      title: '⚙️ Installation & Setup',
      content: (
        <div>
          <p>Install the package and React Query dependencies:</p>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
            {`npm install @tanstack/react-query`}
          </pre>
          <h4>Basic Setup (main.jsx):</h4>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
            {`import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>,
  document.getElementById('root')
);`}
          </pre>
        </div>
      ),
    },
    {
      title: '🎣 Commonly Used Functions (Highlighted)',
      content: (
        <div>
          <h4>1. <span style={{ backgroundColor: '#ffe6e6', padding: '2px 6px', borderRadius: '3px' }}>useQuery</span> - Fetch Data</h4>
          <p>The most commonly used hook for fetching and caching data.</p>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
            {`const { data, isLoading, error } = useQuery({
  queryKey: ['users'], // Unique cache key
  queryFn: () => fetch('/api/users').then(res => res.json()),
  staleTime: 1000 * 60 * 5, // 5 minutes
  gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
});`}
          </pre>

          <h4>2. <span style={{ backgroundColor: '#e6f0ff', padding: '2px 6px', borderRadius: '3px' }}>useMutation</span> - Create/Update/Delete Data</h4>
          <p>Handles POST, PUT, DELETE requests and mutations.</p>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
            {`const { mutate, isPending } = useMutation({
  mutationFn: (newUser) =>
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
    }).then(res => res.json()),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['users'] });
  },
});

// Usage: mutate({ name: 'John' });`}
          </pre>

          <h4>3. <span style={{ backgroundColor: '#e6ffe6', padding: '2px 6px', borderRadius: '3px' }}>useQueries</span> - Fetch Multiple Queries</h4>
          <p>Execute multiple queries at once.</p>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
            {`const results = useQueries({
  queries: [
    { queryKey: ['user', 1], queryFn: () => fetchUser(1) },
    { queryKey: ['user', 2], queryFn: () => fetchUser(2) },
  ],
});`}
          </pre>

          <h4>4. <span style={{ backgroundColor: '#fff0e6', padding: '2px 6px', borderRadius: '3px' }}>queryClient.invalidateQueries</span> - Refresh Cache</h4>
          <p>Force refetch data when it becomes stale.</p>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
            {`// Invalidate all queries with 'users' key
queryClient.invalidateQueries({ queryKey: ['users'] });

// Invalidate specific query
queryClient.invalidateQueries({ queryKey: ['users', userId] });`}
          </pre>

          <h4>5. <span style={{ backgroundColor: '#ffe6f0', padding: '2px 6px', borderRadius: '3px' }}>queryClient.prefetchQuery</span> - Preload Data</h4>
          <p>Load data before it's needed for better UX.</p>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
            {`await queryClient.prefetchQuery({
  queryKey: ['users', userId],
  queryFn: () => fetchUser(userId),
});`}
          </pre>
        </div>
      ),
    },
    {
      title: '💡 Practical Example: User List',
      content: (
        <div>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
            {`import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

function UserList() {
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users');
      return response.json();
    },
  });

  // Add new user
  const addUserMutation = useMutation({
    mutationFn: async (newUser) => {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      return response.json();
    },
    onSuccess: () => {
      // Automatically refresh user list
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Users</h2>
      <button onClick={() => addUserMutation.mutate({ name: 'New User' })}>
        Add User
      </button>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;`}
          </pre>
        </div>
      ),
    },
    {
      title: '⚡ Advanced Features',
      content: (
        <div>
          <h4>Dependent Queries (Query Chains):</h4>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
            {`const { data: user } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetchUser(userId),
});

// Only run when user exists
const { data: posts } = useQuery({
  queryKey: ['posts', user?.id],
  queryFn: () => fetchPosts(user.id),
  enabled: !!user, // Only run if user is truthy
});`}
          </pre>

          <h4>Polling (Auto-refresh):</h4>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
            {`const { data } = useQuery({
  queryKey: ['liveData'],
  queryFn: () => fetchLiveData(),
  refetchInterval: 5000, // Refetch every 5 seconds
});`}
          </pre>

          <h4>Infinite Queries (Pagination/Infinite Scroll):</h4>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
            {`const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
  queryKey: ['products'],
  queryFn: ({ pageParam = 1 }) => fetchProducts(pageParam),
  getNextPageParam: (lastPage) => lastPage.nextPage,
});`}
          </pre>
        </div>
      ),
    },
    {
      title: '📊 Common Patterns & Best Practices',
      content: (
        <div>
          <ul>
            <li><strong>Always use queryKey arrays:</strong> Enables smart cache invalidation</li>
            <li><strong>Set appropriate staleTime:</strong> Balance between freshness and API calls</li>
            <li><strong>Use retry options:</strong> Built-in retry mechanism for failed requests</li>
            <li><strong>Handle errors gracefully:</strong> Provide user feedback for failed requests</li>
            <li><strong>Combine with loading states:</strong> Show spinners while fetching</li>
            <li><strong>Prefetch data:</strong> Improve perceived performance by loading data early</li>
            <li><strong>Use suspense:</strong> Integrate with React Suspense for cleaner code (experimental)</li>
          </ul>
        </div>
      ),
    },
    {
      title: '🚀 TanStack Query vs Redux: When Redux is NOT Required',
      content: (
        <div>
          <h4>✅ Use TanStack Query ALONE (No Redux Needed) When:</h4>
          <ul>
            <li><strong>Your app is primarily API-driven:</strong> Main focus is fetching, displaying, and updating data</li>
            <li><strong>Simple state structure:</strong> Most state comes from server, minimal client-only state</li>
            <li><strong>No complex cross-cutting logic:</strong> You don't need global middleware or complex interceptors</li>
            <li><strong>Limited derived state:</strong> You don't need to compute state from multiple sources</li>
            <li><strong>No undo/redo needed:</strong> Not tracking action history for time-travel debugging</li>
            <li><strong>Simple component communication:</strong> Props and Context API are sufficient for passing data</li>
            <li><strong>Straightforward UI state:</strong> Only need loading, error, and data states from queries</li>
          </ul>

          <h4>Example: Simple CRUD App (No Redux):</h4>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
            {`// A blog app with posts - TanStack Query handles everything
function BlogApp() {
  // Server state (posts data)
  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  });

  // Mutations for create/update/delete
  const { mutate: createPost } = useMutation({...});
  const { mutate: updatePost } = useMutation({...});
  const { mutate: deletePost } = useMutation({...});

  // Local UI state (can use useState)
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const filteredPosts = posts?.filter(p =>
    p.title.includes(searchTerm)
  ).sort(...);

  return (
    <div>
      <input onChange={e => setSearchTerm(e.target.value)} />
      <select onChange={e => setSortBy(e.target.value)} />
      {filteredPosts?.map(post => (
        <PostCard
          key={post.id}
          post={post}
          onUpdate={updatePost}
          onDelete={deletePost}
        />
      ))}
    </div>
  );
}`}
          </pre>

          <h4>❌ You Still NEED Redux + TanStack Query When:</h4>
          <ul>
            <li><strong>Complex global UI state:</strong> Modals, sidebars, notifications, theme toggling</li>
            <li><strong>Authentication state:</strong> User info, tokens, permissions (often better with Context, but Redux is common)</li>
            <li><strong>Complex derived state:</strong> Computed values from multiple data sources</li>
            <li><strong>Form state management:</strong> Multi-step forms, conditional fields (consider Formik/React Hook Form instead)</li>
            <li><strong>Middleware needs:</strong> Analytics, logging, custom interceptors for all actions</li>
            <li><strong>Time-travel debugging:</strong> Development tools need to replay actions</li>
            <li><strong>Undo/redo functionality:</strong> Need to track history of state changes</li>
            <li><strong>Offline support:</strong> Complex logic for syncing when reconnected</li>
          </ul>

          <h4>Example: Complex App (Redux + TanStack Query):</h4>
          <pre style={{ backgroundColor: '#f5f5f5', padding: '15px', borderRadius: '5px', overflow: 'auto' }}>
            {`// A project management app needs both
// Redux for: UI state, user prefs, modals, notifications
// TanStack Query for: projects, tasks, comments (server data)

// Redux slice
const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: true,
    activeModal: null,
    notifications: [],
    darkMode: false
  },
  reducers: { /* ... */ }
});

// TanStack Query hooks
function ProjectApp() {
  const dispatch = useDispatch();
  const ui = useSelector(state => state.ui);

  // Server state managed by TanStack
  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects
  });

  const { mutate: createProject } = useMutation({
    mutationFn: api.createProject,
    onSuccess: () => {
      dispatch(showNotification('Project created!'));
      queryClient.invalidateQueries(['projects']);
    }
  });

  return (
    <div>
      <Sidebar isOpen={ui.sidebarOpen} />
      {ui.activeModal && <Modal />}
      <ProjectList projects={projects} />
      <NotificationCenter notifications={ui.notifications} />
    </div>
  );
}`}
          </pre>

          <h4>📌 Decision Tree:</h4>
          <ul>
            <li><strong>Is it server data?</strong> → Use TanStack Query</li>
            <li><strong>Is it UI state (modals, sidebar)?</strong> → Use Context API or Redux</li>
            <li><strong>Is it user prefs/auth?</strong> → Use Context API or Redux</li>
            <li><strong>Is it filtered/sorted version of server data?</strong> → Compute in component with useMemo</li>
            <li><strong>Need global actions + middleware?</strong> → Use Redux</li>
          </ul>

          <h4>💡 Modern Trend:</h4>
          <p>
            Many modern apps use <strong>TanStack Query + Context API</strong> (no Redux) for:
            <ul>
              <li>Simpler setup and less boilerplate</li>
              <li>Better separation of concerns (server vs UI state)</li>
              <li>Smaller bundle size</li>
              <li>Still get powerful server state management</li>
            </ul>
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="page">
      <h1>React</h1>

      <div className="simple-demo">
        <h2>Box-Sizing Example</h2>

        <div className="example">
          <h3>content-box (Default)</h3>
          <div className="box-default">100px + padding</div>
          <p>Set: width: 100px; padding: 20px;</p>
          <p>Actual size: 140px</p>
        </div>

        <div className="example">
          <h3>border-box (Better)</h3>
          <div className="box-border">100px total</div>
          <p>Set: width: 100px; padding: 20px; box-sizing: border-box;</p>
          <p>Actual size: 100px</p>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2>🔗 TanStack Query (React Query) Guide</h2>
        <Accordion items={tanstackItems} />
      </div>
    </div>
  );
}

export default React;
