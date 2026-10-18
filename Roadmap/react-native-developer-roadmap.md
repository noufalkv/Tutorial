# React Native Developer Roadmap

> A practical learning checklist for becoming a React Native developer.
>
> The roadmap covers React Native, its ecosystem, and mobile development fundamentals in 2026.

## 1. Introduction

- [ ] **What is React Native?** — A framework for building real native iOS and Android apps with React. Your components render actual platform views (`UIView`, `android.view.View`), not a webview, so the result looks and feels native.
  ```jsx
  // This <Text> becomes a UILabel on iOS and a TextView on Android
  <Text>Native, not HTML</Text>
  ```
- [ ] **Why use React Native?** — One codebase for both platforms, instant feedback via Fast Refresh, the React mental model and npm ecosystem, over-the-air JS updates, and an escape hatch to native code when you need it.
  ```bash
  npx create-expo-app MyApp   # one project, iOS + Android + web
  ```
- [ ] **How React Native works** — JavaScript runs in the Hermes engine and talks to native UI. The New Architecture (default since 0.76) replaces the old async bridge with JSI, letting JS call C++/native code directly and synchronously.
  ```text
  Your JSX  ->  React reconciler  ->  Fabric renderer (C++)  ->  native views
  Your calls ->  TurboModules via JSI               ->  native APIs
  ```
- [ ] **React Native alternatives** — Know the trade-offs before you commit to a stack.
  ```text
  Flutter               Dart + own rendering engine; very consistent UI, separate ecosystem
  Kotlin Multiplatform  share logic in Kotlin, build UI natively (or Compose Multiplatform)
  Capacitor / Ionic     web app in a native shell; fastest for web teams, least native feel
  .NET MAUI             C#/XAML, strong on Windows and enterprise
  Native (Swift/Kotlin) best performance and platform fidelity, two codebases
  ```
- [ ] **When *not* to use React Native** — Heavy 3D/graphics work, deep OS integrations (widgets, watch apps, CarPlay), or a single-platform app built by a native team are usually better served natively.
  ```text
  Rule of thumb: UI-and-API-heavy product -> React Native
                 GPU/OS-heavy product     -> native
  ```

---

## 2. Prerequisites

Before starting React Native, master the fundamentals:

### JavaScript
- **Variables and data types** — Declare values with `const`/`let`; JS has primitives (string, number, boolean, null, undefined) and objects.
  ```javascript
  const name = 'Sam';   // string
  let age = 25;         // number
  const isAdmin = false; // boolean
  ```
- **Functions and arrow functions** — Reusable blocks of logic; arrow functions are the short form used everywhere in React.
  ```javascript
  const add = (a, b) => a + b;
  add(2, 3); // 5
  ```
- **Scope and closures** — Scope decides where a variable is visible; a closure is a function that remembers variables from where it was created.
  ```javascript
  const counter = () => {
    let n = 0;
    return () => ++n;
  };
  const next = counter();
  next(); // 1
  next(); // 2
  ```
- **Arrays and objects** — Arrays hold ordered lists, objects hold key-value pairs; `map`, `filter` and `find` are used constantly in UI code.
  ```javascript
  const nums = [1, 2, 3];
  const doubled = nums.map((n) => n * 2); // [2, 4, 6]
  const user = { id: 1, name: 'Sam' };
  ```
- **Destructuring** — Pull values out of arrays or objects into variables in one line.
  ```javascript
  const { name, age } = { name: 'Sam', age: 25 };
  const [first, second] = ['a', 'b'];
  ```
- **Spread/rest operators** — `...` copies or merges arrays/objects (spread) and collects remaining values (rest); key for immutable state updates.
  ```javascript
  const updated = { ...user, name: 'Alex' };
  const sum = (...nums) => nums.reduce((a, b) => a + b, 0);
  ```
- **Modules (import/export)** — Split code into files and share it with `export` and `import`.
  ```javascript
  // math.js
  export const add = (a, b) => a + b;
  // App.js
  import { add } from './math';
  ```
- **Promises and async/await** — Handle work that finishes later (network, storage); `async/await` makes it read like normal code.
  ```javascript
  const load = async () => {
    const res = await fetch('https://api.example.com/users');
    return res.json();
  };
  ```
- **ES6+ features** — Modern syntax: template literals, optional chaining, nullish coalescing, default params and more.
  ```javascript
  const city = user?.address?.city ?? 'Unknown';
  const msg = `Hello ${user.name}`;
  ```

```javascript
// Arrow functions & destructuring
const greet = ({ name, age }) => `Hi ${name}, age ${age}`;
const person = { name: 'John', age: 30 };
console.log(greet(person));
```

### TypeScript
- **Basic types** — Annotate variables and parameters so mistakes are caught before running the app.
  ```typescript
  let title: string = 'Home';
  let count: number = 0;
  let tags: string[] = ['a', 'b'];
  ```
- **Interfaces and type aliases** — Name the shape of objects; use `interface` for objects and `type` for anything else.
  ```typescript
  interface User { id: number; name: string }
  type ID = string | number;
  ```
- **Generics** — Write reusable types that work with many data types.
  ```typescript
  function first<T>(items: T[]): T {
    return items[0];
  }
  first<number>([1, 2, 3]);
  ```
- **Union/intersection types** — Union (`|`) means one of several types; intersection (`&`) combines types.
  ```typescript
  type Status = 'idle' | 'loading' | 'error';
  type Admin = User & { role: 'admin' };
  ```
- **Utility types** — Built-in helpers that transform existing types.
  ```typescript
  type Preview = Pick<User, 'id' | 'name'>;
  type Draft = Partial<User>;
  type Safe = Omit<User, 'email'>;
  ```
- **TypeScript with React Native** — Type props, state, styles and navigation params so components are safer to use.
  ```tsx
  type ButtonProps = { title: string; onPress: () => void };
  const MyButton = ({ title, onPress }: ButtonProps) => (
    <Button title={title} onPress={onPress} />
  );
  ```

```typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

const users: User[] = [];
```

### React Basics
- **Components** — Reusable UI pieces written as functions that return UI.
  ```jsx
  const Greeting = () => <Text>Hello!</Text>;
  ```
- **JSX/TSX** — HTML-like syntax inside JavaScript/TypeScript that describes the UI; use `{}` to embed values.
  ```jsx
  const name = 'Sam';
  const el = <Text>Hello {name}</Text>;
  ```
- **Props and state** — Props are inputs passed down from a parent; state is data a component owns and can change.
  ```jsx
  const Card = ({ title }) => {
    const [liked, setLiked] = useState(false);
    return <Text onPress={() => setLiked(!liked)}>{title} {liked ? '♥' : '♡'}</Text>;
  };
  ```
- **Hooks (useState, useEffect)** — Functions that let function components hold state and run side effects.
  ```jsx
  const [n, setN] = useState(0);
  useEffect(() => {
    console.log('n changed', n);
  }, [n]);
  ```
- **Component lifecycle** — A component mounts, updates, and unmounts; `useEffect` covers all three phases.
  ```jsx
  useEffect(() => {
    console.log('mounted');
    return () => console.log('unmounted');
  }, []);
  ```
- **Event handling** — Respond to user actions with handler props such as `onPress` and `onChangeText`.
  ```jsx
  <Button title="Save" onPress={() => save()} />
  <TextInput onChangeText={setName} />
  ```

```jsx
import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

### Mobile Development Concepts
#### Mobile UI/UX principles
Design for small screens, one-handed use, and short sessions. Keep layouts simple, put primary actions within thumb reach, and give clear feedback for every interaction.

**Example:** A bottom tab bar (Instagram, Spotify) keeps main navigation reachable by thumb, and a loading spinner tells the user something is happening.

```jsx
<View style={{ flex: 1 }}>
  <ScrollView>{/* content */}</ScrollView>
  {/* Primary action at the bottom, within thumb reach */}
  <Pressable style={{ padding: 16, minHeight: 48 }} onPress={onSave}>
    <Text>Save</Text>
  </Pressable>
</View>
```

#### Native platforms (iOS/Android)
iOS (Swift/Objective-C, Apple) and Android (Kotlin/Java, Google) have different UI conventions, APIs, and app stores. React Native lets you write one JavaScript codebase that renders real native components on both.

**Example:** A `<Switch>` looks like the iOS toggle on iPhone and the Material toggle on Android, from the same code. Android also has a hardware/system back button, while iOS uses swipe-back.

```jsx
import { Platform } from 'react-native';

const label = Platform.OS === 'ios' ? 'Swipe back to go home' : 'Press back to go home';
```

#### App lifecycle
An app moves between states: **active** (foreground), **background** (user switched away), and **inactive/terminated** (closed or killed by the OS). Apps must save state and pause work when leaving the foreground.

**Example:** A music app keeps playing in the background, while a game pauses when a call comes in.

```jsx
import { AppState } from 'react-native';
import { useEffect } from 'react';

useEffect(() => {
  const sub = AppState.addEventListener('change', (state) => {
    if (state === 'background') saveDraft();
    if (state === 'active') refreshData();
  });
  return () => sub.remove();
}, []);
```

#### Touch-based interactions
Mobile input is touch, not mouse: taps, long presses, swipes, drags, and pinch. Touch targets must be large enough (about 44x44pt on iOS, 48x48dp on Android) and give visible feedback on press.

**Example:** Tap a photo to open it, long-press to select it, pinch to zoom, swipe to delete a list row.

```jsx
<Pressable
  onPress={() => console.log('tap')}
  onLongPress={() => console.log('long press')}
  hitSlop={8}
  style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, minHeight: 48 })}
>
  <Text>Tap or hold me</Text>
</Pressable>
```

#### Performance constraints
Phones have limited CPU, memory, battery, and unreliable networks compared to desktops. Aim for 60 FPS, fast startup, small bundles, and minimal wasted re-renders and network calls.

**Example:** Rendering 10,000 rows with `ScrollView` freezes the app, while `FlatList` only renders what is visible. Caching API responses saves battery and works offline.

```jsx
// Virtualized: only visible rows are rendered
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <Row item={item} />}
  initialNumToRender={10}
/>
```

---

## 3. React Native Fundamentals

- [ ] **Why React Native** — One JavaScript/TypeScript codebase produces real native iOS and Android apps, with fast iteration and a huge ecosystem.
  ```jsx
  // The same component runs on iOS and Android
  <Text>Hello from both platforms</Text>
  ```
- [ ] **Environment setup (Expo vs React Native CLI)** — Expo is the fastest way to start with managed tooling; the bare CLI gives full native control.
  ```bash
  npx create-expo-app MyApp        # Expo
  npx @react-native-community/cli init MyApp  # bare CLI
  ```
- [ ] **Core components (View, Text, ScrollView, etc.)** — Building blocks that map to native views; you use these instead of `div` and `p`.
  ```jsx
  <View>
    <Text>Hello</Text>
  </View>
  ```
- [ ] **Flexbox layout** — Layout system for arranging children; column by default, controlled by `flexDirection`, `justifyContent` and `alignItems`.
  ```jsx
  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }} />
  ```
- [ ] **StyleSheet** — `StyleSheet.create` defines styles once and reuses them by name.
  ```jsx
  const styles = StyleSheet.create({
    title: { fontSize: 24, fontWeight: 'bold' },
  });
  ```
- [ ] **Platform-specific code** — Branch behavior or UI per platform when iOS and Android differ.
  ```jsx
  const pad = Platform.OS === 'ios' ? 20 : 10;
  ```
- [ ] **Debugging tools** — Tools to inspect logs, components, network and performance while developing.
  ```javascript
  console.log('user:', user);   // shows in Metro terminal / DevTools
  // Shake device or press 'j' in Expo to open DevTools
  ```
- [ ] **Hot reload and Fast Refresh** — Code changes appear on the device in about a second without losing component state.
  ```javascript
  // Edit a Text label and save: the app updates instantly.
  // Press 'r' in the Metro terminal to reload manually.
  ```
- [ ] **Metro bundler** — React Native's JavaScript bundler. It watches your files, resolves imports, transforms them with Babel and serves the bundle to the app over HTTP.
  ```bash
  npx react-native start --reset-cache   # clear the transform cache
  ```
  ```javascript
  // metro.config.js
  const { getDefaultConfig } = require('expo/metro-config');
  const config = getDefaultConfig(__dirname);
  config.resolver.sourceExts.push('svg');
  module.exports = config;
  ```
- [ ] **create-expo-app** — The standard way to scaffold a project, with TypeScript and Expo Router wired up.
  ```bash
  npx create-expo-app@latest MyApp --template default
  cd MyApp && npx expo start
  ```
- [ ] **Running on a real device** — A simulator can't test the camera, push notifications, biometrics or real performance. Test on hardware early.
  ```bash
  npx expo start                  # scan the QR code with Expo Go / dev client
  npx expo run:ios --device       # bare build onto a connected iPhone
  npx expo run:android --device   # bare build onto a connected Android
  ```
- [ ] **Expo Snack** — Browser-based playground that runs React Native without any local setup; ideal for sharing reproductions and trying snippets.
  ```text
  https://snack.expo.dev  -> edit, pick iOS/Android/Web, share the URL
  ```
- [ ] **Expo trade-offs** — Expo gives you prebuilt native modules, EAS Build and OTA updates. The cost is some indirection: custom native code needs a config plugin and a development build, and `expo-*` packages pin native versions.
  ```bash
  npx expo prebuild        # generate ios/ and android/ to edit native code
  npx expo install --fix   # align package versions with your SDK
  ```

### Core Components

- [ ] **View** — The basic container for layout, like a `div`.
  ```jsx
  <View style={{ padding: 16 }}>
    <Text>Inside a view</Text>
  </View>
  ```
- [ ] **Text** — Displays text; all text must be inside `<Text>`.
  ```jsx
  <Text style={{ fontSize: 18 }} numberOfLines={2}>Long text is truncated after two lines</Text>
  ```
- [ ] **ScrollView** — A scrollable container that renders all children at once; good for short content.
  ```jsx
  <ScrollView>
    <Text>Item 1</Text>
    <Text>Item 2</Text>
  </ScrollView>
  ```
- [ ] **FlatList / SectionList** — Efficient scrolling lists that render only visible rows; SectionList adds grouped sections.
  ```jsx
  <FlatList data={items} keyExtractor={(i) => i.id} renderItem={({ item }) => <Text>{item.name}</Text>} />
  ```
- [ ] **Image** — Shows local or remote images; remote images need explicit width and height.
  ```jsx
  <Image source={{ uri: 'https://picsum.photos/200' }} style={{ width: 100, height: 100 }} />
  ```
- [ ] **TextInput** — Text entry field controlled by state.
  ```jsx
  const [text, setText] = useState('');
  <TextInput value={text} onChangeText={setText} placeholder="Type here" />
  ```
- [ ] **Button / TouchableOpacity** — `Button` is a simple native button; `TouchableOpacity` (or `Pressable`) wraps custom UI with press feedback.
  ```jsx
  <Button title="Save" onPress={save} />
  <TouchableOpacity onPress={save}><Text>Custom button</Text></TouchableOpacity>
  ```
- [ ] **SafeAreaView** — Keeps content clear of the notch, status bar and home indicator.
  ```jsx
  <SafeAreaView style={{ flex: 1 }}>
    <Text>Safe content</Text>
  </SafeAreaView>
  ```
- [ ] **Modal** — Overlays content above the screen for dialogs and pickers.
  ```jsx
  <Modal visible={open} animationType="slide" onRequestClose={() => setOpen(false)}>
    <Text>I'm a modal</Text>
  </Modal>
  ```
- [ ] **Pressable** — The modern, flexible press primitive: press states, long press and an enlarged hit area.
  ```jsx
  <Pressable
    onPress={save}
    onLongPress={showMenu}
    hitSlop={8}
    style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
  >
    <Text>Save</Text>
  </Pressable>
  ```
- [ ] **ImageBackground** — Renders children on top of an image, the equivalent of a CSS background image.
  ```jsx
  <ImageBackground source={{ uri }} style={{ flex: 1 }} resizeMode="cover">
    <Text style={{ color: '#fff' }}>Over the image</Text>
  </ImageBackground>
  ```
- [ ] **Switch** — A boolean on/off toggle rendered natively per platform.
  ```jsx
  const [on, setOn] = useState(false);
  <Switch value={on} onValueChange={setOn} />
  ```
- [ ] **ActivityIndicator** — The platform spinner, for loading states.
  ```jsx
  {isLoading && <ActivityIndicator size="large" color="#2b78e4" />}
  ```
- [ ] **StatusBar** — Controls the clock/battery bar: text colour, background and visibility.
  ```jsx
  <StatusBar barStyle="light-content" backgroundColor="#111" translucent />
  ```
- [ ] **KeyboardAvoidingView** — Moves content out from under the on-screen keyboard; the behaviour differs per platform.
  ```jsx
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  >
    <TextInput placeholder="Message" />
  </KeyboardAvoidingView>
  ```
- [ ] **RefreshControl** — Adds pull-to-refresh to a `ScrollView` or `FlatList`.
  ```jsx
  <FlatList
    data={items}
    renderItem={renderRow}
    refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refetch} />}
  />
  ```

### Basic Layout

```typescript
import { View, Text, StyleSheet } from 'react-native';

export const App = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Hello React Native</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
```

---

## 4. Styling

- [ ] **StyleSheet API** — The full API for creating and composing style objects; supports arrays to merge styles.
  ```jsx
  <Text style={[styles.title, isActive && styles.active]} />
  ```
- [ ] **Inline styles** — Style objects written directly on the component; fine for dynamic values.
  ```jsx
  <View style={{ width: progress * 100 + '%', height: 4 }} />
  ```
- [ ] **Flexbox layout** — Layout system for arranging children; column by default, controlled by `flexDirection`, `justifyContent` and `alignItems`.
  ```jsx
  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }} />
  ```
- [ ] **Platform-specific styles** — Use `Platform.select` to give different styles per OS.
  ```jsx
  const shadow = Platform.select({
    ios: { shadowOpacity: 0.2, shadowRadius: 4 },
    android: { elevation: 4 },
  });
  ```
- [ ] **Responsive design** — Adapt layout to screen size and orientation with percentages, flex and hooks.
  ```jsx
  const { width } = useWindowDimensions();
  const columns = width > 600 ? 3 : 2;
  ```
- [ ] **Dimensions API** — Read screen or window size directly (prefer `useWindowDimensions` so it updates on rotation).
  ```jsx
  const { width, height } = Dimensions.get('window');
  ```
- [ ] **Safe area insets** — Exact padding needed for notches and system bars, from `react-native-safe-area-context`.
  ```jsx
  const insets = useSafeAreaInsets();
  <View style={{ paddingTop: insets.top }} />
  ```

### Styling Libraries

- [ ] **Styled Components (React Native)** — CSS-in-JS: write component styles with template literals.
  ```jsx
  const Title = styled.Text`
    font-size: 24px;
    color: tomato;
  `;
  ```
- [ ] **Tamagui** — A UI kit and styling system with an optimizing compiler for fast cross-platform apps.
  ```jsx
  <XStack padding="$4" gap="$2">
    <Text color="$blue10">Hello</Text>
  </XStack>
  ```
- [ ] **NativeWind (Tailwind for React Native)** — Use Tailwind utility classes in React Native.
  ```jsx
  <View className="flex-1 items-center justify-center bg-white">
    <Text className="text-xl font-bold">Hello</Text>
  </View>
  ```

```typescript
import { View, useWindowDimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  androidOnly: {
    ...Platform.select({
      android: { marginTop: 10 },
      ios: { marginTop: 20 },
    }),
  },
});

// Responsive design
export const ResponsiveView = () => {
  const { width } = useWindowDimensions();
  const isSmall = width < 500;
  
  return <View style={{ width: isSmall ? '100%' : '50%' }} />;
};
```

---

## 5. State Management and Hooks

### React Hooks
- [ ] **useState** — Adds a piece of state to a component.
  ```jsx
  const [count, setCount] = useState(0);
  setCount((c) => c + 1);
  ```
- [ ] **useEffect** — Runs side effects (fetching, subscriptions) after render.
  ```jsx
  useEffect(() => {
    fetchUser(id).then(setUser);
  }, [id]);
  ```
- [ ] **useContext** — Reads a value from the nearest context provider without prop drilling.
  ```jsx
  const theme = useContext(ThemeContext);
  ```
- [ ] **useReducer** — State managed by a reducer function; good for complex state transitions.
  ```jsx
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  dispatch({ type: 'increment' });
  ```
- [ ] **useCallback** — Keeps a function reference stable between renders so memoized children don't re-render.
  ```jsx
  const onPress = useCallback((id) => select(id), []);
  ```
- [ ] **useMemo** — Caches the result of an expensive calculation until dependencies change.
  ```jsx
  const sorted = useMemo(() => [...items].sort(byName), [items]);
  ```
- [ ] **useRef** — Holds a mutable value or a reference to an element that survives re-renders without triggering them.
  ```jsx
  const inputRef = useRef(null);
  <TextInput ref={inputRef} />
  inputRef.current?.focus();
  ```
- [ ] **useLayoutEffect** — Like `useEffect` but runs before the screen paints; use for measuring layout.
  ```jsx
  useLayoutEffect(() => {
    viewRef.current?.measure((x, y, w, h) => setHeight(h));
  }, []);
  ```

### Context API
- [ ] **createContext** — Creates a context object to share values across the tree.
  ```jsx
  const AuthContext = createContext(null);
  ```
- [ ] **useContext** — Reads a value from the nearest context provider without prop drilling.
  ```jsx
  const theme = useContext(ThemeContext);
  ```
- [ ] **Provider pattern** — Wrap part of the app in a Provider so every child can access the value.
  ```jsx
  <AuthContext.Provider value={{ user, login, logout }}>
    <App />
  </AuthContext.Provider>
  ```
- [ ] **Avoid prop drilling** — Don't pass props through many layers that don't use them; use context or a store instead.
  ```jsx
  // Instead of <A user={user}><B user={user}><C user={user} /></B></A>
  const user = useContext(UserContext); // read it directly in C
  ```

```typescript
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext<'light' | 'dark'>('light');

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
```

### State Management Libraries

- [ ] **Redux Toolkit** — The standard Redux toolset: slices, reducers and store with little boilerplate.
  ```javascript
  const slice = createSlice({
    name: 'counter', initialState: 0,
    reducers: { inc: (s) => s + 1 },
  });
  ```
- [ ] **Zustand** — Tiny, hook-based global store with no providers.
  ```javascript
  const useStore = create((set) => ({
    count: 0,
    inc: () => set((s) => ({ count: s.count + 1 })),
  }));
  const count = useStore((s) => s.count);
  ```
- [ ] **MobX** — Observable state that updates the UI automatically when it changes.
  ```javascript
  class Store {
    count = 0;
    constructor() { makeAutoObservable(this); }
    inc() { this.count++; }
  }
  ```
- [ ] **Recoil** — Atom-based state where components subscribe to small pieces of state.
  ```javascript
  const countAtom = atom({ key: 'count', default: 0 });
  const [count, setCount] = useRecoilState(countAtom);
  ```
- [ ] **Jotai** — Minimal atom-based state management with a simple API.
  ```javascript
  const countAtom = atom(0);
  const [count, setCount] = useAtom(countAtom);
  ```

```typescript
import { createSlice, configureStore } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
  },
});

export const store = configureStore({
  reducer: { counter: counterSlice.reducer },
});
```

---

## 6. Navigation

### React Navigation
- [ ] **Stack Navigator** — Screens stack on top of each other, like pages with a back button.
  ```jsx
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
  ```
- [ ] **Tab Navigator** — Bottom tabs for switching between top-level sections.
  ```jsx
  <Tab.Navigator>
    <Tab.Screen name="Feed" component={Feed} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
  ```
- [ ] **Drawer Navigator** — A side menu that slides in from the edge.
  ```jsx
  <Drawer.Navigator>
    <Drawer.Screen name="Home" component={Home} />
  </Drawer.Navigator>
  ```
- [ ] **Native Stack Navigator** — A stack that uses real native navigation controllers for better performance and native transitions.
  ```jsx
  const Stack = createNativeStackNavigator();
  ```
- [ ] **Route params** — Pass data between screens.
  ```jsx
  navigation.navigate('Details', { id: 42 });
  const { id } = route.params;
  ```
- [ ] **Deep linking** — Open a specific screen from a URL such as `myapp://product/42`.
  ```jsx
  const linking = {
    prefixes: ['myapp://'],
    config: { screens: { Product: 'product/:id' } },
  };
  <NavigationContainer linking={linking} />
  ```
- [ ] **Navigation options** — Configure screen title, header visibility, gestures and animation.
  ```jsx
  <Stack.Screen name="Details" component={Details} options={{ title: 'Product', headerShown: true }} />
  ```
- [ ] **Header customization** — Change the header title, buttons and style.
  ```jsx
  options={{
    headerRight: () => <Button title="Edit" onPress={edit} />,
    headerStyle: { backgroundColor: '#222' },
  }}
  ```
- [ ] **Bottom tab navigation** — Tabs pinned to the bottom, with icons and badges.
  ```jsx
  <Tab.Screen name="Inbox" component={Inbox} options={{ tabBarBadge: 3 }} />
  ```

```typescript
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
```

### Other Navigation Solutions
- [ ] **React Router Native** — React Router's API for native apps; a familiar option for web developers.
  ```jsx
  <NativeRouter>
    <Route path="/" element={<Home />} />
  </NativeRouter>
  ```
- [ ] **Expo Router (file-based routing)** — Routes are created from files in the `app/` folder, like Next.js.
  ```text
  app/index.tsx          -> /
  app/profile/[id].tsx   -> /profile/42
  ```

### Deep Linking

- [ ] **URL schemes and universal links** — Let a URL open a specific screen in your app: a custom scheme (`myapp://`) plus verified https links (Universal Links on iOS, App Links on Android).
  ```json
  // app.json
  { "expo": { "scheme": "myapp", "ios": { "associatedDomains": ["applinks:myapp.com"] } } }
  ```
- [ ] **Linking configuration (React Navigation)** — Map incoming paths onto your navigator tree.
  ```jsx
  const linking = {
    prefixes: ['myapp://', 'https://myapp.com'],
    config: { screens: { Profile: 'profile/:id', Settings: 'settings' } },
  };
  <NavigationContainer linking={linking}>{/* ... */}</NavigationContainer>
  ```
- [ ] **Handling links at runtime** — Read the URL that launched the app, and listen while it runs.
  ```javascript
  const initialUrl = await Linking.getInitialURL();
  const sub = Linking.addEventListener('url', ({ url }) => route(url));
  await Linking.openURL('tel:+15551234');   // also opens other apps
  ```
- [ ] **Testing deep links** — Fire links at a simulator or device from the CLI.
  ```bash
  npx uri-scheme open "myapp://profile/42" --ios
  adb shell am start -W -a android.intent.action.VIEW -d "myapp://profile/42"
  ```

---

## 7. API Integration & Data Fetching

- [ ] **Fetch API** — Built-in function for HTTP requests.
  ```javascript
  const res = await fetch('https://api.example.com/users');
  const users = await res.json();
  ```
- [ ] **Axios** — HTTP client with cleaner syntax, automatic JSON handling and interceptors.
  ```javascript
  const { data } = await axios.get('/users');
  ```
- [ ] **REST APIs** — Resource-based HTTP APIs: URLs are resources and HTTP methods are actions.
  ```text
  GET /users/1      // read one user
  POST /users       // create a user
  ```
- [ ] **HTTP methods** — GET reads, POST creates, PUT/PATCH updates, DELETE removes.
  ```javascript
  await axios.post('/todos', { title: 'Buy milk' });
  await axios.delete('/todos/1');
  ```
- [ ] **Request headers** — Metadata sent with a request, such as content type and auth token.
  ```javascript
  fetch(url, { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } });
  ```
- [ ] **Authentication** — Proving who the user is; the server returns a token that later requests include.
  ```javascript
  const { token } = await api.post('/login', { email, password });
  ```
- [ ] **Loading states** — Show the user that data is on its way.
  ```jsx
  if (loading) return <ActivityIndicator />;
  ```
- [ ] **Error handling** — Catch failures and show a useful message or retry option.
  ```javascript
  try {
    await api.get('/users');
  } catch (e) {
    setError('Could not load users');
  }
  ```
- [ ] **Token management** — Store, attach and refresh access tokens safely.
  ```javascript
  const token = await SecureStore.getItemAsync('accessToken');
  ```
- [ ] **API interceptors** — Run code on every request/response, e.g. add auth headers or handle 401s globally.
  ```javascript
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
  ```
### Network Connectivity

- [ ] **Connectivity status** — Detect whether the device is online and what kind of connection it has, so you can show offline UI instead of failing silently.
  ```javascript
  import NetInfo from '@react-native-community/netinfo';

  const sub = NetInfo.addEventListener((state) => {
    console.log(state.isConnected, state.type); // true 'wifi' | 'cellular' | 'none'
  });
  const { isInternetReachable } = await NetInfo.fetch();
  ```
- [ ] **Offline-first behaviour** — Cache responses, queue writes while offline and replay them on reconnect.
  ```jsx
  // TanStack Query pauses and resumes queries with connectivity
  onlineManager.setEventListener((setOnline) =>
    NetInfo.addEventListener((s) => setOnline(!!s.isConnected)),
  );
  ```
- [ ] **Timeouts and retries** — Mobile networks drop out; always bound a request and back off between retries.
  ```javascript
  const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  ```


### Data Fetching Libraries

- [ ] **TanStack Query / React Query** — Fetching, caching, refetching and loading/error state handled for you.
  ```jsx
  const { data, isLoading } = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
  ```
- [ ] **SWR** — Lightweight data-fetching hook: show cached data, then revalidate.
  ```jsx
  const { data, error } = useSWR('/api/users', fetcher);
  ```
- [ ] **RTK Query** — Data fetching and caching built into Redux Toolkit.
  ```jsx
  const { data } = useGetUsersQuery();
  ```

```typescript
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axios.get<User[]>('/api/users');
      return response.data;
    },
  });
};

// Usage
export const UsersList = () => {
  const { data, isLoading, error } = useUsers();
  
  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading users</Text>;
  
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
```

---

## 8. Lists and Optimization

- [ ] **FlatList** — Virtualized list: only rows near the screen are rendered.
  ```jsx
  <FlatList data={users} keyExtractor={(u) => u.id} renderItem={({ item }) => <Text>{item.name}</Text>} />
  ```
- [ ] **SectionList** — A list grouped into sections with headers, like contacts by letter.
  ```jsx
  <SectionList
    sections={[{ title: 'A', data: ['Alice', 'Adam'] }]}
    renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
    renderItem={({ item }) => <Text>{item}</Text>}
  />
  ```
- [ ] **VirtualizedList** — The base component behind FlatList for custom data sources.
  ```jsx
  <VirtualizedList data={data} getItem={(d, i) => d[i]} getItemCount={(d) => d.length} renderItem={renderRow} keyExtractor={(i) => i.id} />
  ```
- [ ] **List optimization** — Keep rows cheap: memoize rows, use fixed sizes and tune batch sizes.
  ```jsx
  const Row = React.memo(({ item }) => <Text>{item.name}</Text>);
  <FlatList getItemLayout={(_, i) => ({ length: 56, offset: 56 * i, index: i })} />
  ```
- [ ] **Pagination** — Load data in pages instead of everything at once.
  ```javascript
  const res = await api.get('/posts', { params: { page, limit: 20 } });
  ```
- [ ] **Infinite scroll** — Load the next page automatically as the user nears the end.
  ```jsx
  <FlatList data={posts} onEndReached={loadMore} onEndReachedThreshold={0.5} />
  ```
- [ ] **Pull to refresh** — Pull down to reload the list.
  ```jsx
  <FlatList data={posts} refreshing={refreshing} onRefresh={reload} />
  ```
- [ ] **Key extraction** — Give each row a stable unique key so React can update rows efficiently.
  ```jsx
  <FlatList keyExtractor={(item) => item.id} />
  ```

```typescript
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { useState } from 'react';

interface Item {
  id: string;
  title: string;
}

export const OptimizedList = () => {
  const [data, setData] = useState<Item[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  
  const handleRefresh = async () => {
    setRefreshing(true);
    // Fetch data
    setRefreshing(false);
  };
  
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text>{item.title}</Text>}
      keyExtractor={(item) => item.id}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
  );
};
```

---

## 9. Forms and Validation

- [ ] **TextInput handling** — Keep the input value in state and update it on every change.
  ```jsx
  const [email, setEmail] = useState('');
  <TextInput value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
  ```
- [ ] **Form validation** — Check input before submitting: required fields, formats and lengths.
  ```javascript
  const isValid = /\S+@\S+\.\S+/.test(email) && password.length >= 8;
  ```
- [ ] **Error messages** — Tell the user what's wrong and how to fix it, next to the field.
  ```jsx
  {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
  ```
- [ ] **Form state management** — Track values, errors, touched and submitting state for the whole form.
  ```jsx
  const [form, setForm] = useState({ email: '', password: '' });
  setForm({ ...form, email: 'a@b.com' });
  ```
- [ ] **Submit handling** — Validate, send data, and handle the result including loading and errors.
  ```jsx
  const onSubmit = async () => {
    setLoading(true);
    try { await api.post('/login', form); } finally { setLoading(false); }
  };
  ```
- [ ] **Keyboard management** — Stop the keyboard covering inputs and dismiss it on tap.
  ```jsx
  <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
    <TextInput />
  </KeyboardAvoidingView>
  ```

### Form Libraries

- [ ] **React Hook Form** — Performant form library with minimal re-renders.
  ```jsx
  const { control, handleSubmit } = useForm();
  <Button title="Send" onPress={handleSubmit(onSubmit)} />
  ```
- [ ] **Formik** — Popular form library that manages values, errors and submission.
  ```jsx
  <Formik initialValues={{ email: '' }} onSubmit={save}>
    {({ handleChange, handleSubmit }) => <TextInput onChangeText={handleChange('email')} />}
  </Formik>
  ```
- [ ] **Zod / Yup validation** — Schema libraries that describe valid data once and validate against it.
  ```typescript
  const schema = z.object({ email: z.string().email(), age: z.number().min(18) });
  schema.parse(data);
  ```

```typescript
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button, Text, View } from 'react-native';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be 8+ characters'),
});

type FormData = z.infer<typeof schema>;

export const LoginForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: { email: '', password: '' },
  });
  
  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
  };
  
  return (
    <View>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <Text>{errors.email.message}</Text>}
      
      <Button title="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
```

---

## 10. Native Modules & APIs

- [ ] **Camera** — Take photos or record video, and scan barcodes.
  ```jsx
  <CameraView style={{ flex: 1 }} facing="back" />
  ```
- [ ] **Permissions** — Ask the user before using sensitive features like camera or location.
  ```jsx
  const { status } = await Camera.requestCameraPermissionsAsync();
  if (status !== 'granted') return;
  ```
- [ ] **Geolocation** — Get the device position for maps and nearby search.
  ```javascript
  const { coords } = await Location.getCurrentPositionAsync({});
  console.log(coords.latitude, coords.longitude);
  ```
- [ ] **Local storage (AsyncStorage)** — Simple persistent key-value storage for small data such as settings.
  ```javascript
  await AsyncStorage.setItem('theme', 'dark');
  const theme = await AsyncStorage.getItem('theme');
  ```
- [ ] **File system** — Read, write and download files on the device.
  ```javascript
  await FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'note.txt', 'hello');
  ```
- [ ] **Contacts** — Read the user's address book (with permission).
  ```javascript
  const { data } = await Contacts.getContactsAsync({ fields: [Contacts.Fields.PhoneNumbers] });
  ```
- [ ] **Calendar** — Read or create calendar events.
  ```javascript
  await Calendar.createEventAsync(calendarId, { title: 'Meeting', startDate, endDate });
  ```
- [ ] **Push notifications** — Send messages to the user even when the app is closed.
  ```javascript
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  // send token to your server
  ```
### Storage Options

- [ ] **AsyncStorage** — Unencrypted, asynchronous key-value store for small data such as settings and flags. Not for sensitive data.
  ```javascript
  await AsyncStorage.setItem('onboarded', 'true');
  const value = await AsyncStorage.getItem('onboarded');
  ```
- [ ] **expo-secure-store** — Encrypted key-value storage backed by the iOS Keychain and Android Keystore. Use it for tokens and secrets.
  ```javascript
  await SecureStore.setItemAsync('refreshToken', token);
  const token = await SecureStore.getItemAsync('refreshToken');
  ```
- [ ] **expo-file-system** — Read, write, move, delete and download files in the app's sandboxed directories.
  ```javascript
  const path = FileSystem.documentDirectory + 'notes.json';
  await FileSystem.writeAsStringAsync(path, JSON.stringify(notes));
  const { uri } = await FileSystem.downloadAsync(remoteUrl, FileSystem.cacheDirectory + 'img.png');
  ```
- [ ] **expo-sqlite** — A real on-device SQL database for relational or large data sets, with transactions.
  ```javascript
  const db = await SQLite.openDatabaseAsync('app.db');
  await db.execAsync('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, title TEXT)');
  await db.runAsync('INSERT INTO todos (title) VALUES (?)', 'Buy milk');
  const rows = await db.getAllAsync('SELECT * FROM todos');
  ```
- [ ] **Other storage options** — Pick by shape of data and performance needs.
  ```text
  react-native-mmkv   synchronous, very fast key-value (JSI); drop-in AsyncStorage replacement
  op-sqlite           fastest SQLite binding, supports encryption and sync
  WatermelonDB        reactive, lazy-loading ORM over SQLite; built for 10k+ records
  Realm / Atlas       object database with built-in device-to-cloud sync
  react-native-keychain  native credential storage, alternative to SecureStore
  ```
- [ ] **Choosing a store** — A quick decision rule.
  ```text
  flags & settings       -> MMKV or AsyncStorage
  tokens & credentials   -> SecureStore / Keychain
  files, images, exports -> expo-file-system
  relational / queryable -> expo-sqlite, op-sqlite, WatermelonDB
  ```


### Popular Modules

- [ ] **React Native Camera** — Community camera library (older); today `react-native-vision-camera` or `expo-camera` are preferred.
  ```jsx
  <Camera style={{ flex: 1 }} device={device} isActive />
  ```
- [ ] **React Native Permissions** — One API to check and request permissions on iOS and Android.
  ```javascript
  const result = await request(PERMISSIONS.IOS.CAMERA);
  ```
- [ ] **React Native Location** — Library for device location updates.
  ```javascript
  Geolocation.getCurrentPosition((pos) => console.log(pos.coords));
  ```
- [ ] **React Native Async Storage** — The standard async key-value storage package.
  ```javascript
  await AsyncStorage.setItem('user', JSON.stringify(user));
  ```
- [ ] **React Native Firebase** — Native Firebase SDKs for auth, Firestore, analytics and messaging.
  ```javascript
  await auth().signInWithEmailAndPassword(email, password);
  ```
- [ ] **Expo modules (with Expo)** — Ready-made native APIs (camera, location, sensors) that work in Expo apps with no native setup.
  ```bash
  npx expo install expo-camera expo-location
  ```

```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save data
const saveUser = async (user: User) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Failed to save user:', error);
  }
};

// Retrieve data
const getUser = async (): Promise<User | null> => {
  try {
    const data = await AsyncStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Failed to retrieve user:', error);
    return null;
  }
};

// Usage with hooks
export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    getUser().then(setUser);
  }, []);
  
  return user;
};
```

---

## 11. Authentication & Security

- [ ] **Login/logout flow** — Sign in, keep the user signed in, and clear everything on sign out.
  ```javascript
  const login = async () => { const t = await api.login(email, pw); await save(t); setUser(t.user); };
  const logout = async () => { await clear(); setUser(null); };
  ```
- [ ] **Token storage** — Store tokens in secure storage, not plain AsyncStorage.
  ```javascript
  await SecureStore.setItemAsync('accessToken', token);
  ```
- [ ] **Refresh tokens** — A long-lived token used to get a new short-lived access token without logging in again.
  ```javascript
  const { accessToken } = await api.post('/auth/refresh', { refreshToken });
  ```
- [ ] **JWT handling** — A JWT is a signed token containing claims such as user id and expiry.
  ```javascript
  const { exp } = jwtDecode(token);
  const expired = exp * 1000 < Date.now();
  ```
- [ ] **Biometric auth (Face ID, Fingerprint)** — Unlock or confirm actions with the user's face or fingerprint.
  ```javascript
  const result = await LocalAuthentication.authenticateAsync({ promptMessage: 'Unlock' });
  if (result.success) unlock();
  ```
- [ ] **Secure storage** — Encrypted storage backed by iOS Keychain / Android Keystore.
  ```javascript
  await SecureStore.setItemAsync('refreshToken', token);
  ```
- [ ] **Protected routes** — Only show private screens to signed-in users.
  ```jsx
  {user ? <Stack.Screen name="Home" component={Home} /> : <Stack.Screen name="Login" component={Login} />}
  ```
- [ ] **Session management** — Restore the session on launch and expire it when appropriate.
  ```jsx
  useEffect(() => {
    SecureStore.getItemAsync('accessToken').then((t) => setSignedIn(!!t));
  }, []);
  ```

### Security Libraries

- [ ] **React Native Keychain** — Stores credentials in the iOS Keychain / Android Keystore.
  ```javascript
  await Keychain.setGenericPassword('user', token);
  const creds = await Keychain.getGenericPassword();
  ```
- [ ] **React Native Secure Storage** — Encrypted key-value storage for secrets (e.g. `expo-secure-store`).
  ```javascript
  await SecureStore.setItemAsync('apiKey', key);
  ```
- [ ] **JWT decode** — Read a token's payload (claims) on the client; this does not verify the signature.
  ```javascript
  const payload = jwtDecode(token);
  console.log(payload.sub);
  ```

```typescript
import * as SecureStore from 'expo-secure-store';
import jwtDecode from 'jwt-decode';

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const login = async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    const { accessToken, refreshToken } = await response.json();
    
    // Store securely
    await SecureStore.setItemAsync('accessToken', accessToken);
    await SecureStore.setItemAsync('refreshToken', refreshToken);
    
    setIsLoggedIn(true);
  };
  
  const logout = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    setIsLoggedIn(false);
  };
  
  return { isLoggedIn, login, logout };
};
```

---

## 12. Testing

### Unit Testing
- [ ] **Jest** — The default test runner: runs tests, mocks modules and checks results.
  ```javascript
  test('adds', () => {
    expect(add(1, 2)).toBe(3);
  });
  ```
- [ ] **Vitest** — A fast Jest-compatible test runner (mainly for Vite/web projects).
  ```javascript
  import { test, expect } from 'vitest';
  test('adds', () => expect(1 + 2).toBe(3));
  ```
- [ ] **Test utilities** — Helpers that reduce test setup, like custom render functions with providers.
  ```jsx
  const renderWithProviders = (ui) => render(<Provider store={store}>{ui}</Provider>);
  ```

### Component Testing
- [ ] **React Native Testing Library** — Test components the way a user sees them: by text and role.
  ```jsx
  render(<Counter />);
  fireEvent.press(screen.getByText('Increment'));
  expect(screen.getByText('Count: 1')).toBeTruthy();
  ```
- [ ] **Detox (E2E)** — Gray-box end-to-end tests that drive the real app on a simulator.
  ```javascript
  await element(by.id('login-button')).tap();
  await expect(element(by.text('Welcome'))).toBeVisible();
  ```
- [ ] **Mock API requests** — Replace network calls with fake responses so tests are fast and stable.
  ```javascript
  jest.spyOn(api, 'get').mockResolvedValue({ data: [{ id: 1 }] });
  ```
- [ ] **Mock native modules** — Replace native code that doesn't exist in Jest.
  ```javascript
  jest.mock('expo-secure-store', () => ({ getItemAsync: jest.fn() }));
  ```
- [ ] **React Test Renderer** — Renders a component tree to plain JavaScript objects with no device involved. Testing Library is built on it; reach for it directly only for snapshot or tree-shape assertions.
  ```javascript
  import { create } from 'react-test-renderer';

  const tree = create(<Profile name="Sam" />).toJSON();
  expect(tree).toMatchSnapshot();
  ```
- [ ] **Testing hooks** — Render a hook in isolation and assert on its result across updates.
  ```javascript
  const { result } = renderHook(() => useCounter());
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
  ```

### E2E Testing
- [ ] **Detox** — End-to-end testing framework for React Native.
  ```javascript
  await device.launchApp();
  await element(by.id('email')).typeText('a@b.com');
  ```
- [ ] **Maestro** — Simple YAML-based UI tests for mobile apps.
  ```yaml
  appId: com.myapp
  ---
  - launchApp
  - tapOn: "Login"
  - assertVisible: "Welcome"
  ```
- [ ] **Appium** — Cross-platform automation framework using WebDriver, for native apps.
  ```javascript
  await driver.$('~login-button').click();
  ```

```typescript
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Counter } from './Counter';

describe('Counter', () => {
  it('increments count on button press', () => {
    render(<Counter />);
    
    const button = screen.getByRole('button');
    fireEvent.press(button);
    
    expect(screen.getByText('Count: 1')).toBeOnTheScreen();
  });
});
```

---

## 13. Performance Optimization

- [ ] **Rendering performance** — Avoid unnecessary re-renders and heavy work on the UI thread.
  ```jsx
  const Row = React.memo(({ item }) => <Text>{item.name}</Text>);
  ```
- [ ] **useCallback optimization** — Stable function props stop memoized children re-rendering.
  ```jsx
  const onSelect = useCallback((id) => select(id), []);
  <Row onSelect={onSelect} />
  ```
- [ ] **useMemo optimization** — Avoid recomputing expensive derived data on each render.
  ```jsx
  const total = useMemo(() => items.reduce((s, i) => s + i.price, 0), [items]);
  ```
- [ ] **List virtualization** — Render only what is on screen, which keeps memory low.
  ```jsx
  <FlatList data={bigList} windowSize={5} initialNumToRender={10} renderItem={renderRow} />
  ```
- [ ] **Code splitting** — Load rarely used code on demand to speed up startup.
  ```javascript
  const Settings = React.lazy(() => import('./Settings'));
  ```
- [ ] **Image optimization** — Use right-sized images and caching, e.g. `expo-image`.
  ```jsx
  <Image source={{ uri }} style={{ width: 100, height: 100 }} contentFit="cover" cachePolicy="disk" />
  ```
- [ ] **Bundle size analysis** — Find what makes the JS bundle large.
  ```bash
  npx react-native-bundle-visualizer
  ```
- [ ] **Memory leaks** — Clean up subscriptions and timers in effects so they don't outlive the component.
  ```javascript
  useEffect(() => {
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  ```
- [ ] **FlatList key optimization** — Stable, unique keys let FlatList reuse rows instead of recreating them (never use array index for changing lists).
  ```jsx
  keyExtractor={(item) => item.id}
  ```
- [ ] **Understand frame rates** — Mobile UI runs at 60fps (120fps on newer devices), so every frame has ~16ms. React Native has two threads to watch: the JS thread (your code) and the UI thread (native rendering). Open the Perf Monitor and find which one drops.
  ```text
  JS frame drops  -> too much work in JS: heavy renders, big loops, JSON parsing
  UI frame drops  -> too many/too deep views, expensive shadows, large images
  ```
- [ ] **Common sources of slowness** — Know the usual suspects before you profile.
  ```text
  console.log left in release builds        animating layout props instead of transforms
  re-rendering a whole list on each keystroke  unbatched setState in loops
  ScrollView where a FlatList belongs      unoptimised/oversized remote images
  inline arrow props to memoized children   running in dev mode and calling it slow
  ```
- [ ] **Measure release builds, not dev builds** — Dev mode adds validation, yellow-box warnings and no minification. Performance numbers from `__DEV__` are meaningless.
  ```bash
  npx expo run:ios --configuration Release
  npx expo run:android --variant release
  ```
- [ ] **Optimising FlatList config** — The props that actually matter, and `getItemLayout` when rows are a fixed height.
  ```jsx
  <FlatList
    data={items}
    renderItem={renderRow}
    keyExtractor={(i) => i.id}
    initialNumToRender={10}      // just enough to fill one screen
    maxToRenderPerBatch={10}     // rows rendered per batch while scrolling
    windowSize={5}               // screens of content kept mounted
    removeClippedSubviews        // detach off-screen views (Android)
    getItemLayout={(_, index) => ({ length: 72, offset: 72 * index, index })}
  />
  ```
- [ ] **FlashList** — Shopify's drop-in FlatList replacement that recycles views instead of unmounting them; much better for long or complex lists.
  ```jsx
  <FlashList data={items} renderItem={renderRow} estimatedItemSize={72} />
  ```
- [ ] **RAM bundles and inline requires** — Load each module the first time it is used instead of parsing the whole bundle at startup. Inline requires alone usually cut startup time noticeably.
  ```javascript
  // metro.config.js
  module.exports = {
    transformer: {
      getTransformOptions: async () => ({
        transform: { inlineRequires: true },
      }),
    },
  };
  ```
- [ ] **Profiling** — Find the real hot spot rather than guessing.
  ```bash
  # Hermes CPU sampling profile -> open in Chrome DevTools / Perfetto
  # Dev Menu > Start/Stop Sampling Profiler, then:
  npx react-native profile-hermes ./profiles
  ```
  ```text
  React DevTools Profiler  which components re-render and why
  Perf Monitor             live JS/UI fps and view counts
  Xcode Instruments        native CPU, memory, allocations (iOS)
  Android Studio Profiler  CPU, memory, energy (Android)
  ```
- [ ] **Speeding up builds** — Slow builds cost more time than slow apps. Cache dependencies and avoid rebuilding native code you did not change.
  ```bash
  npx expo start                      # JS-only changes need no rebuild
  eas build --platform ios --local    # reuse the local cache
  ```
  ```text
  ccache for iOS native builds        Gradle configuration cache + build cache
  build only the ABI you test on      keep a dev client instead of rebuilding per change
  EAS Build remote cache              avoid `expo prebuild --clean` unless necessary
  ```

```typescript
import { useMemo, useCallback } from 'react';
import { FlatList } from 'react-native';

export const OptimizedComponent = ({ items }: { items: Item[] }) => {
  // Memoize expensive calculation
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.name.localeCompare(b.name));
  }, [items]);
  
  // Memoize callback to prevent child re-renders
  const handlePress = useCallback((id: string) => {
    console.log('Item pressed:', id);
  }, []);
  
  return (
    <FlatList
      data={sortedItems}
      renderItem={({ item }) => (
        <ItemRow item={item} onPress={handlePress} />
      )}
      keyExtractor={(item) => item.id}
      maxToRenderPerBatch={10}
      windowSize={10}
    />
  );
};
```

---

## 14. Debugging

- [ ] **React Native Debugger** — Legacy standalone debugging app; React Native DevTools is the modern built-in replacement.
  ```javascript
  // In the Metro terminal press 'j' to open React Native DevTools
  ```
- [ ] **Console logging** — Quick way to inspect values while running.
  ```javascript
  console.log('state:', state);
  console.warn('deprecated');
  console.error('failed', err);
  ```
- [ ] **Breakpoints** — Pause execution at a line and inspect variables step by step.
  ```javascript
  debugger; // pauses when DevTools is attached
  ```
- [ ] **Performance monitoring** — Watch FPS, render times and startup time.
  ```javascript
  // Open the Perf Monitor from the Dev Menu, or use React DevTools Profiler
  ```
- [ ] **Network inspection** — See requests, responses and status codes.
  ```javascript
  // DevTools > Network tab shows every fetch/XHR call
  ```
- [ ] **Redux DevTools** — Inspect actions and state changes over time.
  ```javascript
  const store = configureStore({ reducer, devTools: true });
  ```
- [ ] **Error boundaries** — Catch render errors and show a fallback instead of crashing the whole app.
  ```jsx
  class ErrorBoundary extends React.Component {
    state = { hasError: false };
    static getDerivedStateFromError() { return { hasError: true }; }
    render() { return this.state.hasError ? <Text>Oops</Text> : this.props.children; }
  }
  ```
- [ ] **In-app Developer Menu** — The entry point to every on-device debugging tool: reload, DevTools, element inspector, Perf Monitor and the sampling profiler.
  ```text
  iOS simulator      Cmd + D          Android emulator  Cmd/Ctrl + M
  Physical device    shake it         Expo              press 'm' in the terminal
  Any device         adb shell input keyevent 82   (Android)
  ```
- [ ] **Fast Refresh** — Edits appear in about a second while component state is preserved. It is on by default; a full reload happens when you edit a module with no React component, and a syntax error shows a LogBox overlay until fixed.
  ```javascript
  // Forcing a remount is sometimes what you want:
  // @refresh reset
  ```
- [ ] **LogBox** — The overlay that shows warnings and errors in development: yellow for warnings, red for fatals, with a symbolicated stack trace you can tap into.
  ```javascript
  import { LogBox } from 'react-native';

  LogBox.ignoreLogs(['Require cycle:']);  // silence a known, harmless warning
  LogBox.ignoreAllLogs(true);             // only for demos/screenshots
  ```
- [ ] **Source maps** — Release stack traces point at minified bundle offsets. Upload source maps so crash reports show your original files and line numbers.
  ```bash
  npx react-native bundle --platform ios --dev false \
    --entry-file index.js --bundle-output main.jsbundle \
    --sourcemap-output main.jsbundle.map
  ```
  ```bash
  # Expo + Sentry uploads them automatically on each EAS build
  npx sentry-expo upload-sourcemaps dist
  ```
- [ ] **Debugging native crashes** — A crash with no JS stack is native. Read the platform logs.
  ```bash
  npx react-native log-ios        # or open the Xcode console
  npx react-native log-android    # or: adb logcat *:E
  ```
- [ ] **Crash and error reporting** — Capture what happens on real users' devices, not just yours.
  ```javascript
  import * as Sentry from '@sentry/react-native';

  Sentry.init({ dsn: process.env.EXPO_PUBLIC_SENTRY_DSN, tracesSampleRate: 0.2 });
  ```

```typescript
import { useEffect } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

export const App = () => {
  useEffect(() => {
    // Log app lifecycle
    console.log('App mounted');
    
    return () => console.log('App unmounted');
  }, []);
  
  return (
    <ErrorBoundary>
      <MainScreen />
    </ErrorBoundary>
  );
};

class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error) {
    console.error('Error caught:', error);
  }
  
  render() {
    // Render fallback UI
    return this.props.children;
  }
}
```

---

## 15. Platform-Specific Development

- [ ] **iOS-specific features** — Features that exist only on iOS, e.g. Face ID, Apple Pay, Live Activities and haptics.
  ```javascript
  if (Platform.OS === 'ios') ActionSheetIOS.showActionSheetWithOptions({ options: ['Cancel', 'Delete'], cancelButtonIndex: 0 }, onSelect);
  ```
- [ ] **Android-specific features** — Features that exist only on Android, e.g. hardware back button and ToastAndroid.
  ```javascript
  if (Platform.OS === 'android') ToastAndroid.show('Saved', ToastAndroid.SHORT);
  ```
- [ ] **Platform detection** — Check the OS and version at runtime.
  ```javascript
  Platform.OS;      // 'ios' | 'android'
  Platform.Version; // OS version
  ```
- [ ] **Platform-specific styles** — Use `Platform.select` to give different styles per OS.
  ```jsx
  const shadow = Platform.select({
    ios: { shadowOpacity: 0.2, shadowRadius: 4 },
    android: { elevation: 4 },
  });
  ```
- [ ] **Platform-specific navigation** — Follow each platform's habits: swipe-back on iOS, back button and drawer on Android.
  ```jsx
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => { goBack(); return true; });
    return () => sub.remove();
  }, []);
  ```
- [ ] **Native module linking** — Autolinking connects native libraries to the project; run pod install on iOS after adding a package.
  ```bash
  npm install react-native-permissions
  cd ios && pod install
  ```
- [ ] **Platform-specific file extensions** — Metro picks the right file per platform automatically, which keeps branching out of your components.
  ```text
  Button.ios.tsx      used on iOS
  Button.android.tsx  used on Android
  Button.native.tsx   used on iOS + Android (not web)
  Button.web.tsx      used on web
  Button.tsx          fallback
  ```
  ```jsx
  import { Button } from './Button';   // no extension: Metro resolves it
  ```
- [ ] **react-native-web** — Renders React Native components to DOM elements so the same code runs in a browser. Expo wires it up for you.
  ```bash
  npx expo install react-native-web react-dom
  npx expo start --web
  ```
  ```jsx
  // Guard anything that has no web equivalent
  if (Platform.OS !== 'web') await Haptics.impactAsync();
  ```

```typescript
import { Platform, View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        paddingTop: 60,
      },
      android: {
        paddingTop: 40,
      },
    }),
  },
});

export const PlatformAwareComponent = () => {
  if (Platform.OS === 'ios') {
    return <IosComponent />;
  }
  
  return <AndroidComponent />;
};
```

---

## 16. Build and Deployment

### Development
- [ ] **Expo Go** — App for running Expo projects on a phone instantly by scanning a QR code.
  ```bash
  npx expo start   # scan the QR code with Expo Go
  ```
- [ ] **Expo CLI** — Command-line tool to start, build and manage Expo apps.
  ```bash
  npx expo install expo-camera
  npx expo start
  ```
- [ ] **React Native CLI** — Bare workflow tooling for full control of the native projects.
  ```bash
  npx react-native run-ios
  npx react-native run-android
  ```
- [ ] **Simulator/Emulator** — Virtual devices on your computer: iOS Simulator (Xcode) and Android Emulator (Android Studio).
  ```bash
  npx expo start --ios   # opens iOS Simulator
  ```
- [ ] **Physical device testing** — Test on real hardware for accurate performance, camera and sensors.
  ```bash
  npx expo run:android --device
  ```
- [ ] **Hot reload** — Updates code on screen while the app is running.
  ```javascript
  // Save the file and the running app updates automatically
  ```

### Production Build
- [ ] **iOS build configuration** — Bundle identifier, version, permissions text and capabilities in `Info.plist`/app config.
  ```json
  // app.json
  { "expo": { "ios": { "bundleIdentifier": "com.me.myapp", "buildNumber": "1" } } }
  ```
- [ ] **Android build configuration** — Package name, version code and permissions in `build.gradle`/app config.
  ```json
  // app.json
  { "expo": { "android": { "package": "com.me.myapp", "versionCode": 1 } } }
  ```
- [ ] **Signing certificates** — Cryptographic identity required to publish (iOS certificates/profiles, Android keystore).
  ```bash
  eas credentials
  ```
- [ ] **App Store submission** — Upload a build to App Store Connect and pass Apple review.
  ```bash
  eas submit --platform ios
  ```
- [ ] **Google Play Store submission** — Upload an AAB to Google Play Console and complete the store listing.
  ```bash
  eas submit --platform android
  ```
- [ ] **Versioning and releases** — Use semantic versions plus incrementing build numbers.
  ```json
  // app.json
  "version": "1.2.0", "ios": { "buildNumber": "14" }, "android": { "versionCode": 14 }
  ```
- [ ] **Over-the-air updates (EAS Update)** — Ship JavaScript fixes to users without a store release.
  ```bash
  eas update --branch production --message "Fix login bug"
  ```
### Publishing to the Stores

- [ ] **Apple App Store** — Prepare the listing and metadata in App Store Connect, then ship through TestFlight before public release.
  ```bash
  eas build --platform ios --profile production
  eas submit --platform ios --latest
  ```
  ```text
  Apple Developer Program membership ($99/yr)
  App icon 1024x1024, screenshots for each required device size
  Privacy policy URL + App Privacy ("data nutrition label") answers
  Privacy manifest (PrivacyInfo.xcprivacy) declaring required-reason APIs
  Encryption / export compliance answers
  Age rating, category, keywords, support URL
  TestFlight: internal testers instantly, external testers after a review
  Review typically ~24-48h; rejections are common on 4.2 (minimum functionality)
  and 5.1.1 (asking for data you don't need)
  ```
- [ ] **Google Play Store** — Upload an AAB (APKs are no longer accepted for new apps) and move it through the testing tracks.
  ```bash
  eas build --platform android --profile production
  eas submit --platform android --latest
  ```
  ```text
  Play Console developer account ($25 one-time) + identity verification
  Android App Bundle (.aab), signed via Play App Signing
  Data safety form, privacy policy, target API level requirements
  Content rating questionnaire, ads declaration
  Tracks: internal -> closed -> open -> production (staged rollout %)
  New personal developer accounts need a closed test before production
  ```
- [ ] **Store assets and metadata** — The same set is needed twice, so generate it once and reuse.
  ```text
  icon (1024px), adaptive icon (Android), splash screen
  5-8 screenshots per platform, feature graphic 1024x500 (Android)
  short + full description, what's-new text, localisations
  ```
- [ ] **Release checklist** — Run through this before every submission.
  ```text
  version + build number bumped          release build tested on a real device
  API pointing at production             source maps uploaded to crash reporting
  console logs / debug flags removed     permissions have clear usage strings
  deep links verified                    rollback plan (EAS Update channel) ready
  ```


### Build Tools & Services

- [ ] **EAS Build** — Cloud service that builds iOS and Android binaries for you.
  ```bash
  eas build --platform all --profile production
  ```
- [ ] **Fastlane** — Automates building, signing and uploading to the stores.
  ```bash
  fastlane ios beta   # build and upload to TestFlight
  ```
- [ ] **GitHub Actions** — CI/CD that runs tests and builds on every push or pull request.
  ```yaml
  on: [push]
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - run: npm ci && npm test
  ```
- [ ] **AppCenter** — Microsoft's build/distribution service. Note: App Center was retired in 2025, so prefer EAS or Firebase App Distribution.
  ```javascript
  // Migrate to EAS Build + EAS Submit or Firebase App Distribution
  ```
- [ ] **Xcode** — Apple's IDE for iOS builds, signing, simulators and profiling.
  ```bash
  open ios/MyApp.xcworkspace
  ```
- [ ] **Android Studio** — Google's IDE for Android builds, emulators and profiling.
  ```bash
  open -a "Android Studio" android
  ```

```bash
# Build iOS with EAS
eas build --platform ios

# Build Android with EAS
eas build --platform android

# Local iOS build
cd ios
xcodebuild -workspace MyApp.xcworkspace -scheme MyApp -configuration Release

# Local Android build
cd android
./gradlew assembleRelease
```

---

## 17. Advanced Topics

- [ ] **Custom native modules** — Write Swift/Kotlin code and call it from JavaScript when no library exists.
  ```javascript
  const { BatteryModule } = NativeModules;
  const level = await BatteryModule.getLevel();
  ```
- [ ] **Native bridges** — The older async message channel between JS and native code (replaced by JSI in the New Architecture).
  ```javascript
  NativeModules.MyModule.doWork('input');
  ```
- [ ] **JSI (JavaScript Interface)** — Lets JavaScript call native C++ code directly and synchronously, without the old bridge.
  ```javascript
  // JSI powers Reanimated, MMKV and Fabric/TurboModules
  const value = storage.getString('key'); // synchronous
  ```
- [ ] **Hermes engine** — The optimized JS engine for React Native: faster startup and lower memory. Enabled by default.
  ```javascript
  const usingHermes = !!global.HermesInternal;
  ```
- [ ] **Reanimated (animations)** — Smooth animations that run on the UI thread.
  ```jsx
  const x = useSharedValue(0);
  const style = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
  x.value = withTiming(100);
  ```
- [ ] **Gesture handler** — Native-driven gestures: pan, pinch, swipe, long press.
  ```jsx
  const pan = Gesture.Pan().onUpdate((e) => { x.value = e.translationX; });
  <GestureDetector gesture={pan}><Animated.View /></GestureDetector>
  ```
- [ ] **Web support (React Native Web)** — Run the same components in the browser.
  ```bash
  npx expo start --web
  ```
### The New Architecture

- [ ] **New Architecture overview** — Default since React Native 0.76. The async JSON bridge is gone; JS and native share memory through JSI, which makes native calls synchronous and rendering concurrent-safe.
  ```text
  Old: JS  --JSON over the bridge-->  native   (async, serialised, batched)
  New: JS  --JSI (shared C++ memory)-->  native   (sync, typed, direct)
  ```
- [ ] **Fabric (the renderer)** — The C++ rendering system. It builds an immutable shadow tree, supports React 18/19 concurrent features and Suspense, and allows synchronous layout measurement.
  ```jsx
  // Fabric is what makes these work correctly in RN
  <Suspense fallback={<ActivityIndicator />}>
    <Profile />
  </Suspense>
  ```
- [ ] **TurboModules** — Native modules with a typed spec, loaded lazily and called directly over JSI instead of through the bridge.
  ```typescript
  // NativeCalculator.ts — the spec Codegen reads
  import type { TurboModule } from 'react-native';
  import { TurboModuleRegistry } from 'react-native';

  export interface Spec extends TurboModule {
    add(a: number, b: number): number;   // synchronous, no Promise needed
  }
  export default TurboModuleRegistry.getEnforcing<Spec>('Calculator');
  ```
- [ ] **Codegen** — Generates the C++/Obj-C/Java glue from your TypeScript specs at build time, so JS and native types can't drift apart.
  ```json
  // package.json
  { "codegenConfig": { "name": "AppSpecs", "type": "all", "jsSrcsDir": "specs" } }
  ```
- [ ] **Bridgeless mode** — The final step: the app boots with no bridge at all. Anything still calling `NativeModules` directly or relying on bridge internals must be migrated.
  ```javascript
  // Check what your app is actually running
  global.nativeFabricUIManager   // defined when Fabric is on
  global.RN$Bridgeless           // true in bridgeless mode
  ```
- [ ] **Interop layer and migration** — Old-architecture libraries keep working through the interop layer, but check your dependencies before migrating.
  ```bash
  npx @react-native-community/cli doctor
  # https://reactnative.directory  -> filter by "New Architecture" support
  ```
- [ ] **Expo Modules API** — The friendliest way to write native code today: Swift and Kotlin DSLs, no Codegen boilerplate, works with Expo config plugins.
  ```bash
  npx create-expo-module my-module
  ```
  ```swift
  public class MyModule: Module {
    public func definition() -> ModuleDefinition {
      Name("MyModule")
      Function("greet") { (name: String) in "Hello, \(name)!" }
    }
  }
  ```
- [ ] **Nitro Modules** — A third-party alternative to TurboModules with faster, lower-overhead JSI bindings; used by libraries like `react-native-nitro-sqlite`.
  ```bash
  npm install react-native-nitro-modules
  ```


### Animation Libraries

- [ ] **React Native Reanimated** — Animation library with worklets that run on the UI thread.
  ```jsx
  scale.value = withSpring(1.2);
  ```
- [ ] **React Native Gesture Handler** — Replaces the JS touch system with native gesture recognizers.
  ```jsx
  <Swipeable renderRightActions={() => <Text>Delete</Text>}><Row /></Swipeable>
  ```
- [ ] **Moti** — Declarative animations on top of Reanimated.
  ```jsx
  <MotiView from={{ opacity: 0, translateY: 20 }} animate={{ opacity: 1, translateY: 0 }} />
  ```
- [ ] **React Native Animation** — The built-in `Animated` API for simple animations.
  ```jsx
  const opacity = useRef(new Animated.Value(0)).current;
  Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }).start();
  ```

```typescript
import Animated, { 
  useSharedValue, 
  withSpring 
} from 'react-native-reanimated';

export const AnimatedButton = () => {
  const scale = useSharedValue(1);
  
  const handlePress = () => {
    scale.value = withSpring(1.2, { damping: 5 });
  };
  
  return (
    <Animated.View 
      style={[{ transform: [{ scale }] }]}
    >
      <Pressable onPress={handlePress}>
        <Text>Press me</Text>
      </Pressable>
    </Animated.View>
  );
};
```

---

## 18. Backend Integration

- [ ] **REST APIs** — Resource-based HTTP APIs: URLs are resources and HTTP methods are actions.
  ```text
  GET /users/1      // read one user
  POST /users       // create a user
  ```
- [ ] **GraphQL** — Query exactly the fields you need from a single endpoint.
  ```javascript
  const { data } = useQuery(gql`{ user(id: 1) { name email } }`);
  ```
- [ ] **WebSockets** — Persistent two-way connection for real-time data like chat.
  ```javascript
  const ws = new WebSocket('wss://example.com/chat');
  ws.onmessage = (e) => addMessage(JSON.parse(e.data));
  ws.send(JSON.stringify({ text: 'hi' }));
  ```
- [ ] **Firebase** — Google's backend-as-a-service: auth, database, storage and messaging.
  ```javascript
  const snap = await firestore().collection('users').doc(uid).get();
  ```
- [ ] **AWS Amplify** — AWS toolkit for auth, APIs and storage.
  ```javascript
  await signIn({ username, password });
  ```
- [ ] **Supabase** — Open-source Firebase alternative built on Postgres.
  ```javascript
  const { data } = await supabase.from('todos').select('*');
  ```

```typescript
import { useSubscription, gql } from '@apollo/client';

const MESSAGES_SUBSCRIPTION = gql`
  subscription OnMessageCreated {
    messageCreated {
      id
      text
      createdAt
    }
  }
`;

export const ChatScreen = () => {
  const { data } = useSubscription(MESSAGES_SUBSCRIPTION);
  
  return (
    <FlatList
      data={data?.messageCreated ? [data.messageCreated] : []}
      renderItem={({ item }) => <MessageItem message={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};
```

---

## 19. Code Quality & Best Practices

- [ ] **ESLint setup** — Finds bugs and enforces code rules.
  ```bash
  npx eslint . --fix
  ```
- [ ] **Prettier formatting** — Automatic consistent formatting.
  ```bash
  npx prettier --write .
  ```
- [ ] **Type safety (TypeScript)** — Use strict types instead of `any` to catch errors early.
  ```json
  // tsconfig.json
  { "compilerOptions": { "strict": true } }
  ```
- [ ] **Project structure** — Organize code by feature or by type so it stays easy to navigate.
  ```text
  src/features/auth/  (screens, hooks, api)
  src/components/     (shared UI)
  ```
- [ ] **Code review practices** — Small pull requests, clear descriptions and constructive feedback.
  ```text
  PR title: fix(auth): refresh token before expiry
  Checklist: tests, screenshots, no console logs
  ```
- [ ] **Naming conventions** — Consistent names: PascalCase components, camelCase functions, `use` prefix for hooks.
  ```javascript
  const UserCard = () => {};      // component
  const useUser = () => {};       // hook
  const fetchUser = () => {};     // function
  ```
- [ ] **Documentation** — README, comments and docs that explain why, not just what.
  ```javascript
  /** Returns the user's display name, falling back to email. */
  const displayName = (u) => u.name ?? u.email;
  ```
- [ ] **Accessibility (a11y)** — Make the app usable by everyone, including screen-reader users.
  ```jsx
  <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={close} />
  ```

### Folder Structure
```
src/
├── components/
├── screens/
├── navigation/
├── services/
├── hooks/
├── utils/
├── types/
├── store/
├── constants/
└── App.tsx
```

---

## 20. Accessibility

- [ ] **accessible labels** — Give every interactive element a description a screen reader can read.
  ```jsx
  <Image source={logo} accessibilityLabel="Company logo" />
  ```
- [ ] **Screen reader support** — Works with VoiceOver (iOS) and TalkBack (Android); test with them turned on.
  ```javascript
  AccessibilityInfo.announceForAccessibility('Item added to cart');
  ```
- [ ] **Keyboard navigation** — Users with external keyboards or switch devices can reach and activate every control.
  ```jsx
  <TextInput returnKeyType="next" onSubmitEditing={() => passwordRef.current?.focus()} />
  ```
- [ ] **Touch targets** — Make tappable areas at least 44x44pt (iOS) / 48x48dp (Android).
  ```jsx
  <Pressable hitSlop={12} style={{ minWidth: 48, minHeight: 48 }} />
  ```
- [ ] **Color contrast** — Text must contrast enough with the background (4.5:1 for normal text).
  ```javascript
  // Good: #111 text on #fff (about 18:1)
  // Bad: #aaa text on #fff (about 2.3:1)
  ```
- [ ] **Text scaling** — Respect the user's system font size.
  ```jsx
  <Text allowFontScaling maxFontSizeMultiplier={1.5}>Readable at large sizes</Text>
  ```
- [ ] **WCAG compliance** — International accessibility guidelines (aim for level AA).
  ```javascript
  // Checks: labels, contrast 4.5:1, touch size, focus order, no info by color alone
  ```

```typescript
import { View, Text, TouchableOpacity, AccessibilityInfo } from 'react-native';

export const AccessibleButton = () => {
  return (
    <TouchableOpacity
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Submit form"
      accessibilityHint="Submits the form with your data"
      onPress={() => console.log('Pressed')}
    >
      <Text>Submit</Text>
    </TouchableOpacity>
  );
};
```

---

## 21. React Native Ecosystem

Essential tools and libraries:

- [ ] **React Navigation** — The standard navigation library (stack, tabs, drawer).
  ```jsx
  <NavigationContainer>{/* navigators */}</NavigationContainer>
  ```
- [ ] **TanStack Query** — Server-state library: caching, background refetch, retries.
  ```jsx
  const { data } = useQuery({ queryKey: ['todos'], queryFn: getTodos });
  ```
- [ ] **Redux Toolkit** — The standard Redux toolset: slices, reducers and store with little boilerplate.
  ```javascript
  const slice = createSlice({
    name: 'counter', initialState: 0,
    reducers: { inc: (s) => s + 1 },
  });
  ```
- [ ] **React Hook Form** — Performant form library with minimal re-renders.
  ```jsx
  const { control, handleSubmit } = useForm();
  <Button title="Send" onPress={handleSubmit(onSubmit)} />
  ```
- [ ] **Zod / Yup** — Schema validation for forms and API data.
  ```typescript
  const schema = z.object({ name: z.string().min(1) });
  ```
- [ ] **Axios** — HTTP client with cleaner syntax, automatic JSON handling and interceptors.
  ```javascript
  const { data } = await axios.get('/users');
  ```
- [ ] **Date-fns / Day.js** — Small date utilities for formatting and math.
  ```javascript
  format(new Date(), 'dd MMM yyyy');   // date-fns
  dayjs().add(1, 'day').format('YYYY-MM-DD'); // Day.js
  ```
- [ ] **React Native Reanimated** — Animation library with worklets that run on the UI thread.
  ```jsx
  scale.value = withSpring(1.2);
  ```
- [ ] **Gesture Handler** — Native gesture support for swipes, drags and pinch.
  ```jsx
  <GestureHandlerRootView style={{ flex: 1 }}>{/* app */}</GestureHandlerRootView>
  ```
- [ ] **Firebase** — Google's backend-as-a-service: auth, database, storage and messaging.
  ```javascript
  const snap = await firestore().collection('users').doc(uid).get();
  ```
- [ ] **Sentry (error tracking)** — Captures crashes and errors from real users with stack traces.
  ```javascript
  Sentry.init({ dsn: 'https://...@sentry.io/123' });
  Sentry.captureException(error);
  ```

---

## 22. Expo Framework

Learn about Expo for managed app development:

- [ ] **Expo Go** — App for running Expo projects on a phone instantly by scanning a QR code.
  ```bash
  npx expo start   # scan the QR code with Expo Go
  ```
- [ ] **Expo modules** — Ready-to-use native APIs such as camera, sensors and file system.
  ```bash
  npx expo install expo-haptics
  ```
- [ ] **EAS Build** — Cloud service that builds iOS and Android binaries for you.
  ```bash
  eas build --platform all --profile production
  ```
- [ ] **EAS Update** — Push JavaScript and asset updates over the air.
  ```bash
  eas update --branch production
  ```
- [ ] **Expo Camera** — Camera preview, photos, video and barcode scanning.
  ```jsx
  <CameraView style={{ flex: 1 }} onBarcodeScanned={handleScan} />
  ```
- [ ] **Expo Notifications** — Local and push notifications.
  ```javascript
  await Notifications.scheduleNotificationAsync({
    content: { title: 'Reminder', body: 'Time to stretch' },
    trigger: { seconds: 60 },
  });
  ```
- [ ] **Expo Contacts** — Access the device's contacts.
  ```javascript
  const { data } = await Contacts.getContactsAsync();
  ```
- [ ] **Over-the-air updates** — Deliver fixes without going through app store review (JS/asset changes only).
  ```bash
  eas update --message "Hotfix"
  ```

```typescript
import * as Contacts from 'expo-contacts';
import * as Location from 'expo-location';

export const useDeviceFeatures = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    }
  };
  
  return { location, getLocation };
};
```

---

## 23. Monorepo & Workspaces

- [ ] **Monorepo setup** — Keep multiple apps and packages in one repository.
  ```text
  apps/mobile
  apps/web
  packages/ui
  packages/utils
  ```
- [ ] **Yarn workspaces / pnpm** — Package managers that link local packages together.
  ```json
  // package.json
  { "workspaces": ["apps/*", "packages/*"] }
  ```
- [ ] **Shared code between apps** — Put logic used by mobile and web in a shared package.
  ```javascript
  import { formatPrice } from '@myorg/utils';
  ```
- [ ] **Shared components** — A common UI library used by several apps.
  ```jsx
  import { Button } from '@myorg/ui';
  ```
- [ ] **Shared utilities** — Helpers, types and API clients reused across apps.
  ```javascript
  import { api } from '@myorg/api';
  ```

---

## 24. CI/CD & Automation

- [ ] **GitHub Actions** — CI/CD that runs tests and builds on every push or pull request.
  ```yaml
  on: [push]
  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v4
        - run: npm ci && npm test
  ```
- [ ] **EAS Build** — Cloud service that builds iOS and Android binaries for you.
  ```bash
  eas build --platform all --profile production
  ```
- [ ] **Fastlane** — Automates building, signing and uploading to the stores.
  ```bash
  fastlane ios beta   # build and upload to TestFlight
  ```
- [ ] **AppCenter** — Microsoft's build/distribution service. Note: App Center was retired in 2025, so prefer EAS or Firebase App Distribution.
  ```javascript
  // Migrate to EAS Build + EAS Submit or Firebase App Distribution
  ```
- [ ] **Automated testing** — Run tests automatically on every push.
  ```yaml
  - run: npm test -- --ci
  ```
- [ ] **Automated deployment** — Build and release automatically when code merges to main.
  ```yaml
  - run: eas build --platform all --non-interactive
  - run: eas submit --platform all --latest
  ```

```yaml
# GitHub Actions workflow
name: Build and Test

on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm test
      - run: eas build --platform android
```

---

## 25. Useful Resources

- [ ] **React Native docs** — Official guides and API reference at reactnative.dev.
  *Example:* Look up: `FlatList` props, `Platform` API, New Architecture guide.
- [ ] **Expo docs** — Official Expo guides, SDK reference and EAS docs at docs.expo.dev.
  *Example:* Look up: `expo-camera` usage, EAS Build setup.
- [ ] **React Navigation docs** — Official navigation guides at reactnavigation.org.
  *Example:* Look up: authentication flow, deep linking setup.
- [ ] **Firebase docs** — Guides for Firebase products at firebase.google.com/docs.
  *Example:* Look up: Authentication, Firestore queries.
- [ ] **Community libraries (OpenBase)** — Directory for comparing libraries by popularity and maintenance.
  *Example:* Compare two state libraries before picking one.
- [ ] **React Native papers (UI kit)** — React Native Paper, a Material Design component library.
  *Example:* `<Button mode="contained" onPress={save}>Save</Button>`
- [ ] **Native Base** — A UI component library (now largely superseded by gluestack-ui).
  *Example:* `<Button onPress={save}>Save</Button>`

---

# Recommended Learning Order

```
JavaScript Fundamentals
       ↓
TypeScript Basics
       ↓
React Fundamentals
       ↓
React Native Setup & Core Components
       ↓
Styling & Layout (Flexbox)
       ↓
State Management (useState, useContext)
       ↓
Navigation (React Navigation)
       ↓
API Integration & Data Fetching
       ↓
Forms & Validation
       ↓
Native APIs (Camera, Location, etc.)
       ↓
Authentication & Security
       ↓
Testing
       ↓
Performance Optimization
       ↓
Debugging & Error Handling
       ↓
Advanced Patterns (Reanimated, JSI)
       ↓
Deployment & CI/CD
       ↓
Production Applications
```

---

# Quick Reference: Essential Imports

```typescript
// Core
import { View, Text, ScrollView, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import { useState, useEffect, useContext, useCallback, useMemo } from 'react';
import { StyleSheet, Platform, Dimensions, SafeAreaView } from 'react-native';

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// State Management
import { useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';

// Forms
import { useForm, Controller } from 'react-hook-form';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
```

---

# Progress Tracker

| Area | Status |
|---|---|
| Introduction & Alternatives | ⬜ |
| JavaScript | ⬜ |
| TypeScript | ⬜ |
| React Basics | ⬜ |
| React Native Fundamentals | ⬜ |
| Styling & Layout | ⬜ |
| Navigation | ⬜ |
| State Management | ⬜ |
| Forms | ⬜ |
| API Integration | ⬜ |
| Native APIs | ⬜ |
| Authentication | ⬜ |
| Testing | ⬜ |
| Performance | ⬜ |
| Debugging | ⬜ |
| Platform-Specific Code | ⬜ |
| Accessibility | ⬜ |
| Deployment | ⬜ |
| Advanced Topics | ⬜ |
| New Architecture | ⬜ |
| Publishing to Stores | ⬜ |

---

# Sample Project Ideas

## Beginner
- [ ] **Todo App** — Add, complete and delete tasks.
  *Example:* Practices state, lists and AsyncStorage persistence.
- [ ] **Weather App** — Show the weather for a city or your location.
  *Example:* Practices fetching an API, loading/error states and geolocation.
- [ ] **Notes App** — Create, edit and search notes.
  *Example:* Practices forms, navigation and local storage.
- [ ] **Calculator** — Basic arithmetic with a button grid.
  *Example:* Practices layout with flexbox and state logic.
- [ ] **Expense Tracker** — Log spending and view totals by category.
  *Example:* Practices forms, lists, derived data and charts.

## Intermediate
- [ ] **Chat Application** — Send and receive messages in real time.
  *Example:* Practices WebSockets or Firebase, lists and keyboard handling.
- [ ] **Social Media Feed** — Scrollable feed with likes and comments.
  *Example:* Practices infinite scroll, images and optimistic updates.
- [ ] **E-commerce App** — Browse products, add to cart, and check out.
  *Example:* Practices navigation, global state (cart) and payments.
- [ ] **Music Player** — Play audio with playlist controls.
  *Example:* Practices audio APIs, background playback and app lifecycle.
- [ ] **Fitness Tracker** — Track workouts and steps.
  *Example:* Practices sensors, permissions and charts.

## Advanced
- [ ] **Full-stack App with Backend** — An app with your own API and database.
  *Example:* Practices auth, REST/GraphQL and deployment.
- [ ] **Real-time Collaboration App** — Multiple users edit the same data at once.
  *Example:* Practices WebSockets, conflict handling and presence.
- [ ] **Complex State Management** — An app with a lot of shared and async state.
  *Example:* Practices Redux Toolkit or Zustand with TanStack Query.
- [ ] **Custom Native Modules** — An app that needs its own native code.
  *Example:* Practices writing a Swift/Kotlin module and calling it from JS.
- [ ] **Production-grade Application** — A complete app ready for real users.
  *Example:* Practices testing, CI/CD, monitoring with Sentry and store release.

---

# Reference

- React Native official documentation: https://reactnative.dev/
- React Native developer roadmap: https://roadmap.sh/react-native
- Expo documentation: https://docs.expo.dev/
- React Navigation: https://reactnavigation.org/
- React Native Community: https://github.com/react-native-community
- OpenBase (Find Libraries): https://openbase.com/
- React Native Directory (library support matrix): https://reactnative.directory/
- New Architecture guide: https://reactnative.dev/architecture/landing-page
- Expo Snack (online playground): https://snack.expo.dev/

> Note: This roadmap is based on industry standards and best practices for React Native development in 2026. The mobile development landscape evolves constantly, so continuous learning is essential.
