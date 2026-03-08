import SwiftUI

struct RamadanView: View {
    private let ramadanDay = 18

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Text("Ramadan Mode")
                    .font(.largeTitle.bold())

                GroupBox {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("Day \(ramadanDay) of 30")
                            .font(.headline)
                        ProgressView(value: Double(ramadanDay), total: 30)
                            .tint(AppTheme.accent)
                        Text("\(30 - ramadanDay) days remaining")
                            .font(.caption)
                            .foregroundStyle(.secondary)
                    }
                }

                GroupBox("Quran Progress") {
                    VStack(alignment: .leading, spacing: 12) {
                        LabeledContent("Rahim", value: "22/60 Hizb")
                        LabeledContent("Ahmed", value: "15/60 Hizb")
                    }
                }

                GroupBox("Daily Target") {
                    VStack(alignment: .leading, spacing: 10) {
                        LabeledContent("Rahim", value: "1.5/2")
                        LabeledContent("Ahmed", value: "1/2")
                    }
                }

                GroupBox("Taraweeh Tracker") {
                    VStack(alignment: .leading, spacing: 10) {
                        LabeledContent("Rahim", value: "16 nights")
                        LabeledContent("Ahmed", value: "12 nights")
                    }
                }
            }
            .padding()
        }
        .background(AppTheme.surface.ignoresSafeArea())
    }
}

#Preview {
    RamadanView()
}
