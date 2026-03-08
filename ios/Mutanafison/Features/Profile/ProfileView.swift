import SwiftUI

struct ProfileView: View {
    @EnvironmentObject private var appState: AppState

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                VStack(alignment: .center, spacing: 6) {
                    Text(appState.me.avatar)
                        .font(.system(size: 56))
                    Text(appState.me.name)
                        .font(.title3.bold())
                    Text("@\(appState.me.username)")
                        .foregroundStyle(.secondary)
                        .font(.caption)
                }
                .frame(maxWidth: .infinity)

                GroupBox("Stats") {
                    VStack(alignment: .leading, spacing: 8) {
                        LabeledContent("Prayer Streak", value: "7 days")
                        LabeledContent("Prayers This Month", value: "128")
                        LabeledContent("Hizb Read", value: "22")
                        LabeledContent("Taraweeh Nights", value: "16")
                    }
                }

                GroupBox("Achievements") {
                    Text("🏆 First Week • 🔥 7-Day Streak • 📖 Quran Reader")
                }

                GroupBox("Settings") {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Notifications")
                        Text("Ramadan Mode")
                        Text("Daily Quran Goal")
                        Text("Privacy")
                        Text("Sign Out")
                            .foregroundStyle(.red)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                }
            }
            .padding()
        }
        .background(AppTheme.surface.ignoresSafeArea())
    }
}

#Preview {
    ProfileView()
        .environmentObject(AppState())
}
