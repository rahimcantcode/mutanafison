import SwiftUI

struct AddFriendView: View {
    enum InviteMode: String, CaseIterable {
        case link = "Invite Link"
        case username = "Username"
        case qr = "QR Code"
    }

    @EnvironmentObject private var appState: AppState
    @State private var mode: InviteMode = .link
    @State private var username = ""

    var body: some View {
        VStack(spacing: 16) {
            Picker("Invite", selection: $mode) {
                ForEach(InviteMode.allCases, id: \.self) { mode in
                    Text(mode.rawValue).tag(mode)
                }
            }
            .pickerStyle(.segmented)

            GroupBox {
                switch mode {
                case .link:
                    VStack(alignment: .leading, spacing: 8) {
                        Text("mutanafison.app/join/rahim-xyz")
                            .font(.callout.monospaced())
                        Button("Copy Invite Link") {}
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                case .username:
                    VStack(alignment: .leading, spacing: 8) {
                        TextField("friend username", text: $username)
                            .textInputAutocapitalization(.never)
                        Button("Send Request") {}
                            .disabled(username.isEmpty)
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                case .qr:
                    VStack(spacing: 10) {
                        Text("QR Placeholder")
                            .font(.headline)
                        RoundedRectangle(cornerRadius: 12)
                            .fill(.gray.opacity(0.15))
                            .frame(width: 180, height: 180)
                    }
                    .frame(maxWidth: .infinity)
                }
            }

            Spacer()

            Button("Skip for Now") {
                appState.finishFriendStep()
            }
            .buttonStyle(.borderedProminent)
            .tint(AppTheme.primary)
        }
        .padding()
        .navigationTitle("Add a Friend")
        .toolbar {
            ToolbarItem(placement: .topBarLeading) {
                Button("Back") { appState.phase = .auth }
            }
        }
    }
}

#Preview {
    AddFriendView()
        .environmentObject(AppState())
}
