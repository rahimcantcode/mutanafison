import SwiftUI

struct DashboardView: View {
    @EnvironmentObject private var appState: AppState
    @State private var reminderMessage = ""
    @State private var showReminderAlert = false

    var myCount: Int { appState.prayerStatuses.filter(\.mine).count }
    var friendCount: Int { appState.prayerStatuses.filter(\.friend).count }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                VStack(alignment: .leading, spacing: 4) {
                    Text("Assalamu Alaykum")
                        .font(.title2.bold())
                    Text("Prayer completion today")
                        .foregroundStyle(.secondary)
                }

                GroupBox {
                    HStack {
                        VStack(alignment: .leading) {
                            Text("You: \(myCount)/5")
                                .font(.headline)
                            Text("Friend: \(friendCount)/5")
                                .foregroundStyle(.secondary)
                        }
                        Spacer()
                        Text(myCount == 5 ? "🏆" : "📊")
                            .font(.largeTitle)
                    }
                }

                Text("Today's Prayers")
                    .font(.headline)

                ForEach(appState.prayerStatuses) { status in
                    VStack(spacing: 8) {
                        HStack {
                            VStack(alignment: .leading) {
                                Text(status.prayer.name)
                                    .font(.headline)
                                Text("\(status.prayer.arabic) • \(status.prayer.time)")
                                    .foregroundStyle(.secondary)
                                    .font(.caption)
                            }
                            Spacer()
                            Toggle("", isOn: Binding(
                                get: { status.mine },
                                set: { _ in appState.toggleMyPrayer(status.id) }
                            ))
                            .labelsHidden()
                        }

                        HStack {
                            Label(status.mine ? "You: done" : "You: pending", systemImage: status.mine ? "checkmark.circle.fill" : "clock")
                                .font(.caption)
                                .foregroundStyle(status.mine ? .green : .secondary)
                            Spacer()
                            if !status.friend {
                                Button("Remind Friend") {
                                    reminderMessage = "Remind Ahmed for \(status.prayer.name)."
                                    showReminderAlert = true
                                }
                                .buttonStyle(.bordered)
                                .tint(AppTheme.accent)
                            } else {
                                Text("Friend: done")
                                    .font(.caption)
                                    .foregroundStyle(.green)
                            }
                        }
                    }
                    .padding()
                    .background(.white)
                    .clipShape(RoundedRectangle(cornerRadius: 14))
                }
            }
            .padding()
        }
        .background(AppTheme.surface.ignoresSafeArea())
        .alert("Reminder", isPresented: $showReminderAlert) {
            Button("OK", role: .cancel) {}
        } message: {
            Text(reminderMessage)
        }
    }
}

#Preview {
    DashboardView()
        .environmentObject(AppState())
}
