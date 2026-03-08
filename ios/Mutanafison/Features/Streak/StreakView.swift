import SwiftUI

struct StreakView: View {
    private let weekData: [Bool] = [true, true, true, true, true, true, false]

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Text("Streak")
                    .font(.largeTitle.bold())

                GroupBox {
                    VStack(alignment: .leading, spacing: 6) {
                        Text("Current Streak")
                            .foregroundStyle(.secondary)
                        Text("7 days 🔥")
                            .font(.title.bold())
                        Text("Best: 14 • Month: 24/30 • Total: 89")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }

                Text("This Week")
                    .font(.headline)

                HStack(spacing: 8) {
                    ForEach(Array(weekData.enumerated()), id: \.offset) { index, done in
                        VStack(spacing: 8) {
                            RoundedRectangle(cornerRadius: 8)
                                .fill(done ? .green : (index == 6 ? AppTheme.accent : .gray.opacity(0.2)))
                                .frame(width: 26, height: done ? 56 : 24)
                            Text(["M", "T", "W", "T", "F", "S", "S"][index])
                                .font(.caption2)
                                .foregroundStyle(.secondary)
                        }
                    }
                }

                GroupBox("Comparison") {
                    VStack(alignment: .leading, spacing: 10) {
                        Text("Rahim: 7")
                        Text("Ahmed: 3")
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
    StreakView()
}
