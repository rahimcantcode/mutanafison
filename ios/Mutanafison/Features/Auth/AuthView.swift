import SwiftUI

struct AuthView: View {
    enum Mode: String, CaseIterable {
        case signup = "Sign Up"
        case login = "Log In"
    }

    @EnvironmentObject private var appState: AppState
    @State private var mode: Mode = .signup
    @State private var email = ""
    @State private var password = ""

    var body: some View {
        Form {
            Section {
                Picker("Mode", selection: $mode) {
                    ForEach(Mode.allCases, id: \.self) { mode in
                        Text(mode.rawValue).tag(mode)
                    }
                }
                .pickerStyle(.segmented)
            }

            Section("Credentials") {
                TextField("Email or phone", text: $email)
                    .keyboardType(.emailAddress)
                    .autocorrectionDisabled()
                SecureField("Password", text: $password)
            }

            Section("Quick Demo") {
                Button("Use Demo User") {
                    mode = .login
                    email = "demo@mutanafison.app"
                    password = "Demo1234!"
                }

                Button("Use Admin Tester") {
                    mode = .login
                    email = "admin@mutanafison.app"
                    password = "Admin5678#"
                }
            }

            Section {
                Button(mode == .signup ? "Create Account" : "Continue") {
                    appState.completeAuth()
                }
                .frame(maxWidth: .infinity)
            }
        }
        .navigationTitle(mode == .signup ? "Create Account" : "Welcome Back")
        .toolbar {
            ToolbarItem(placement: .topBarLeading) {
                Button("Back") { appState.phase = .onboarding }
            }
        }
    }
}

#Preview {
    AuthView()
        .environmentObject(AppState())
}
