import SwiftUI

struct MainTabView: View {
    @EnvironmentObject private var appState: AppState

    var body: some View {
        TabView(selection: $appState.selectedTab) {
            DashboardView()
                .tabItem { Label("Home", systemImage: "house.fill") }
                .tag(AppTab.dashboard)

            StreakView()
                .tabItem { Label("Streak", systemImage: "flame.fill") }
                .tag(AppTab.streak)

            RamadanView()
                .tabItem { Label("Ramadan", systemImage: "moon.stars.fill") }
                .tag(AppTab.ramadan)

            WidgetsView()
                .tabItem { Label("Widgets", systemImage: "square.grid.2x2.fill") }
                .tag(AppTab.widgets)

            ProfileView()
                .tabItem { Label("Profile", systemImage: "person.fill") }
                .tag(AppTab.profile)
        }
        .tint(.green)
    }
}
