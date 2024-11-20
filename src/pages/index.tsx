import { Suspense, lazy, ComponentType } from "react";

// Generic Loadable function with proper types
const Loadable = <P extends object>(Component: ComponentType<P>) => {
  return (props: P) => {
    return (
      <Suspense fallback={<></>}>
        <Component {...props} />
      </Suspense>
    );
  };
};

// Lazy load your components and use Loadable for code splitting
export const LoginPage = Loadable(lazy(() => import("./Login")));
export const SignupPage = Loadable(lazy(() => import("./Signup")));
export const FeedPage = Loadable(lazy(() => import("./FeedSection")));
