import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { OnboardingScreen } from "./screens/OnboardingScreen";
import { AuthScreen } from "./screens/AuthScreen";
import { AddFriendScreen } from "./screens/AddFriendScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { StreakScreen } from "./screens/StreakScreen";
import { RamadanScreen } from "./screens/RamadanScreen";
import { WidgetScreen } from "./screens/WidgetScreen";
import { ProfileScreen } from "./screens/ProfileScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: OnboardingScreen },
      { path: "auth", Component: AuthScreen },
      { path: "add-friend", Component: AddFriendScreen },
      { path: "dashboard", Component: DashboardScreen },
      { path: "streak", Component: StreakScreen },
      { path: "ramadan", Component: RamadanScreen },
      { path: "widget", Component: WidgetScreen },
      { path: "profile", Component: ProfileScreen },
    ],
  },
]);
