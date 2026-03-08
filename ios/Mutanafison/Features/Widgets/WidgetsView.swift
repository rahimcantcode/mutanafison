import SwiftUI

struct WidgetsView: View {
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Text("Widgets")
                    .font(.largeTitle.bold())

                GroupBox("Available Widgets") {
                    VStack(alignment: .leading, spacing: 12) {
                        Text("Prayer Tracker (Medium 2x1)")
                        Text("Streak Counter (Small 1x1)")
                        Text("Lock Screen Quick Progress")
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                }

                GroupBox("How to Add") {
                    VStack(alignment: .leading, spacing: 8) {
                        Text("1. Long-press Home Screen")
                        Text("2. Tap +")
                        Text("3. Search Mutanafison")
                        Text("4. Pick size and add")
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
    WidgetsView()
}
