# React Native Developer Roadmap

> A practical learning checklist for becoming a React Native developer.
>
> The roadmap covers React Native, its ecosystem, and mobile development fundamentals in 2026.

## 1. Prerequisites

Before starting React Native, master the fundamentals:

### JavaScript
- Variables and data types
- Functions and arrow functions
- Scope and closures
- Arrays and objects
- Destructuring
- Spread/rest operators
- Modules (import/export)
- Promises and async/await
- ES6+ features

```javascript
// Arrow functions & destructuring
const greet = ({ name, age }) => `Hi ${name}, age ${age}`;
const person = { name: 'John', age: 30 };
console.log(greet(person));
```

### TypeScript
- Basic types
- Interfaces and type aliases
- Generics
- Union/intersection types
- Utility types
- TypeScript with React Native

```typescript
interface User {
  id: number;
  name: string;
  email?: string;
}

const users: User[] = [];
```

### React Basics
- Components
- JSX/TSX
- Props and state
- Hooks (useState, useEffect)
- Component lifecycle
- Event handling

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
- Mobile UI/UX principles
- Native platforms (iOS/Android)
- App lifecycle
- Touch-based interactions
- Performance constraints

---

## 2. React Native Fundamentals

- [ ] Why React Native
- [ ] Environment setup (Expo vs React Native CLI)
- [ ] Core components (View, Text, ScrollView, etc.)
- [ ] Flexbox layout
- [ ] StyleSheet
- [ ] Platform-specific code
- [ ] Debugging tools
- [ ] Hot reload and Fast Refresh

### Core Components

- [ ] View
- [ ] Text
- [ ] ScrollView
- [ ] FlatList / SectionList
- [ ] Image
- [ ] TextInput
- [ ] Button / TouchableOpacity
- [ ] SafeAreaView
- [ ] Modal

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

## 3. Styling

- [ ] StyleSheet API
- [ ] Inline styles
- [ ] Flexbox layout
- [ ] Platform-specific styles
- [ ] Responsive design
- [ ] Dimensions API
- [ ] Safe area insets

### Styling Libraries

- [ ] Styled Components (React Native)
- [ ] Tamagui
- [ ] NativeWind (Tailwind for React Native)

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

## 4. State Management and Hooks

### React Hooks
- [ ] useState
- [ ] useEffect
- [ ] useContext
- [ ] useReducer
- [ ] useCallback
- [ ] useMemo
- [ ] useRef
- [ ] useLayoutEffect

### Context API
- [ ] createContext
- [ ] useContext
- [ ] Provider pattern
- [ ] Avoid prop drilling

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

- [ ] Redux Toolkit
- [ ] Zustand
- [ ] MobX
- [ ] Recoil
- [ ] Jotai

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

## 5. Navigation

### React Navigation
- [ ] Stack Navigator
- [ ] Tab Navigator
- [ ] Drawer Navigator
- [ ] Native Stack Navigator
- [ ] Route params
- [ ] Deep linking
- [ ] Navigation options
- [ ] Header customization
- [ ] Bottom tab navigation

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
- [ ] React Router Native
- [ ] Expo Router (file-based routing)

---

## 6. API Integration & Data Fetching

- [ ] Fetch API
- [ ] Axios
- [ ] REST APIs
- [ ] HTTP methods
- [ ] Request headers
- [ ] Authentication
- [ ] Loading states
- [ ] Error handling
- [ ] Token management
- [ ] API interceptors

### Data Fetching Libraries

- [ ] TanStack Query / React Query
- [ ] SWR
- [ ] RTK Query

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

## 7. Lists and Optimization

- [ ] FlatList
- [ ] SectionList
- [ ] VirtualizedList
- [ ] List optimization
- [ ] Pagination
- [ ] Infinite scroll
- [ ] Pull to refresh
- [ ] Key extraction

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

## 8. Forms and Validation

- [ ] TextInput handling
- [ ] Form validation
- [ ] Error messages
- [ ] Form state management
- [ ] Submit handling
- [ ] Keyboard management

### Form Libraries

- [ ] React Hook Form
- [ ] Formik
- [ ] Zod / Yup validation

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

## 9. Native Modules & APIs

- [ ] Camera
- [ ] Permissions
- [ ] Geolocation
- [ ] Local storage (AsyncStorage)
- [ ] File system
- [ ] Contacts
- [ ] Calendar
- [ ] Push notifications

### Popular Modules

- [ ] React Native Camera
- [ ] React Native Permissions
- [ ] React Native Location
- [ ] React Native Async Storage
- [ ] React Native Firebase
- [ ] Expo modules (with Expo)

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

## 10. Authentication & Security

- [ ] Login/logout flow
- [ ] Token storage
- [ ] Refresh tokens
- [ ] JWT handling
- [ ] Biometric auth (Face ID, Fingerprint)
- [ ] Secure storage
- [ ] Protected routes
- [ ] Session management

### Security Libraries

- [ ] React Native Keychain
- [ ] React Native Secure Storage
- [ ] JWT decode

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

## 11. Testing

### Unit Testing
- [ ] Jest
- [ ] Vitest
- [ ] Test utilities

### Component Testing
- [ ] React Native Testing Library
- [ ] Detox (E2E)
- [ ] Mock API requests
- [ ] Mock native modules

### E2E Testing
- [ ] Detox
- [ ] Maestro
- [ ] Appium

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

## 12. Performance Optimization

- [ ] Rendering performance
- [ ] useCallback optimization
- [ ] useMemo optimization
- [ ] List virtualization
- [ ] Code splitting
- [ ] Image optimization
- [ ] Bundle size analysis
- [ ] Memory leaks
- [ ] FlatList key optimization

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

## 13. Debugging

- [ ] React Native Debugger
- [ ] Console logging
- [ ] Breakpoints
- [ ] Performance monitoring
- [ ] Network inspection
- [ ] Redux DevTools
- [ ] Error boundaries

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

## 14. Platform-Specific Development

- [ ] iOS-specific features
- [ ] Android-specific features
- [ ] Platform detection
- [ ] Platform-specific styles
- [ ] Platform-specific navigation
- [ ] Native module linking

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

## 15. Build and Deployment

### Development
- [ ] Expo Go
- [ ] Expo CLI
- [ ] React Native CLI
- [ ] Simulator/Emulator
- [ ] Physical device testing
- [ ] Hot reload

### Production Build
- [ ] iOS build configuration
- [ ] Android build configuration
- [ ] Signing certificates
- [ ] App Store submission
- [ ] Google Play Store submission
- [ ] Versioning and releases
- [ ] Over-the-air updates (EAS Update)

### Build Tools & Services

- [ ] EAS Build
- [ ] Fastlane
- [ ] GitHub Actions
- [ ] AppCenter
- [ ] Xcode
- [ ] Android Studio

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

## 16. Advanced Topics

- [ ] Custom native modules
- [ ] Native bridges
- [ ] JSI (JavaScript Interface)
- [ ] Hermes engine
- [ ] Reanimated (animations)
- [ ] Gesture handler
- [ ] Web support (React Native Web)

### Animation Libraries

- [ ] React Native Reanimated
- [ ] React Native Gesture Handler
- [ ] Moti
- [ ] React Native Animation

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

## 17. Backend Integration

- [ ] REST APIs
- [ ] GraphQL
- [ ] WebSockets
- [ ] Firebase
- [ ] AWS Amplify
- [ ] Supabase

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

## 18. Code Quality & Best Practices

- [ ] ESLint setup
- [ ] Prettier formatting
- [ ] Type safety (TypeScript)
- [ ] Project structure
- [ ] Code review practices
- [ ] Naming conventions
- [ ] Documentation
- [ ] Accessibility (a11y)

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

## 19. Accessibility

- [ ] accessible labels
- [ ] Screen reader support
- [ ] Keyboard navigation
- [ ] Touch targets
- [ ] Color contrast
- [ ] Text scaling
- [ ] WCAG compliance

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

## 20. React Native Ecosystem

Essential tools and libraries:

- [ ] React Navigation
- [ ] TanStack Query
- [ ] Redux Toolkit
- [ ] React Hook Form
- [ ] Zod / Yup
- [ ] Axios
- [ ] Date-fns / Day.js
- [ ] React Native Reanimated
- [ ] Gesture Handler
- [ ] Firebase
- [ ] Sentry (error tracking)

---

## 21. Expo Framework

Learn about Expo for managed app development:

- [ ] Expo Go
- [ ] Expo modules
- [ ] EAS Build
- [ ] EAS Update
- [ ] Expo Camera
- [ ] Expo Notifications
- [ ] Expo Contacts
- [ ] Over-the-air updates

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

## 22. Monorepo & Workspaces

- [ ] Monorepo setup
- [ ] Yarn workspaces / pnpm
- [ ] Shared code between apps
- [ ] Shared components
- [ ] Shared utilities

---

## 23. CI/CD & Automation

- [ ] GitHub Actions
- [ ] EAS Build
- [ ] Fastlane
- [ ] AppCenter
- [ ] Automated testing
- [ ] Automated deployment

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

## 24. Useful Resources

- [ ] React Native docs
- [ ] Expo docs
- [ ] React Navigation docs
- [ ] Firebase docs
- [ ] Community libraries (OpenBase)
- [ ] React Native papers (UI kit)
- [ ] Native Base

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
| Deployment | ⬜ |
| Advanced Topics | ⬜ |

---

# Sample Project Ideas

## Beginner
- [ ] Todo App
- [ ] Weather App
- [ ] Notes App
- [ ] Calculator
- [ ] Expense Tracker

## Intermediate
- [ ] Chat Application
- [ ] Social Media Feed
- [ ] E-commerce App
- [ ] Music Player
- [ ] Fitness Tracker

## Advanced
- [ ] Full-stack App with Backend
- [ ] Real-time Collaboration App
- [ ] Complex State Management
- [ ] Custom Native Modules
- [ ] Production-grade Application

---

# Reference

- React Native official documentation: https://reactnative.dev/
- Expo documentation: https://docs.expo.dev/
- React Navigation: https://reactnavigation.org/
- React Native Community: https://github.com/react-native-community
- OpenBase (Find Libraries): https://openbase.com/

> Note: This roadmap is based on industry standards and best practices for React Native development in 2026. The mobile development landscape evolves constantly, so continuous learning is essential.
