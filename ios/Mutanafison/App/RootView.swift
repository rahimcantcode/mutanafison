import SwiftUI

struct RootView: View {
    @EnvironmentObject private var appState: AppState

    var body: some View {
        NavigationStack {
            switch appState.phase {
            case .onboarding:
                OnboardingView()
            case .auth:
                AuthView()
            case .addFriend:
                AddFriendView()
            case .main:
                MainTabView()
            }
        }
    }
}

#Preview {
    RootView()
        .environmentObject(AppState())
}
