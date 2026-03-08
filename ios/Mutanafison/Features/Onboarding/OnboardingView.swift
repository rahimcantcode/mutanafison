import SwiftUI

struct OnboardingView: View {
    @EnvironmentObject private var appState: AppState

    var body: some View {
        VStack(spacing: 20) {
            Spacer()

            Text("☪️")
                .font(.system(size: 64))

            Text("MUTANAFISON")
                .font(.caption)
                .fontWeight(.bold)
                .tracking(3)
                .foregroundStyle(AppTheme.primary)

            Text("Compete in Good Deeds")
                .font(.largeTitle)
                .fontWeight(.bold)
                .multilineTextAlignment(.center)

            Text("Stay consistent in prayer and Quran with friendly competition.")
                .foregroundStyle(.secondary)
                .multilineTextAlignment(.center)

            Spacer()

            Button("Start Competing") {
                appState.phase = .auth
            }
            .buttonStyle(.borderedProminent)
            .tint(AppTheme.primary)

            Button("Learn More") {}
                .buttonStyle(.bordered)
        }
        .padding(24)
        .background(AppTheme.surface.ignoresSafeArea())
    }
}

#Preview {
    OnboardingView()
        .environmentObject(AppState())
}
