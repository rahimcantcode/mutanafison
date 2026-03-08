import Foundation

enum AppPhase {
    case onboarding
    case auth
    case addFriend
    case main
}

enum AppTab: Hashable {
    case dashboard
    case streak
    case ramadan
    case widgets
    case profile
}

struct User: Identifiable {
    let id = UUID()
    let name: String
    let username: String
    let avatar: String
}

struct Prayer: Identifiable {
    let id: String
    let name: String
    let arabic: String
    let time: String
}

struct PrayerStatus: Identifiable {
    let id = UUID()
    let prayer: Prayer
    var mine: Bool
    var friend: Bool
}

final class AppState: ObservableObject {
    @Published var phase: AppPhase = .onboarding
    @Published var selectedTab: AppTab = .dashboard

    @Published var me = User(name: "Rahim Al-Hassan", username: "rahim.mutanafison", avatar: "👨‍💼")
    @Published var friend = User(name: "Ahmed", username: "ahmed", avatar: "👨‍🎓")

    @Published var prayerStatuses: [PrayerStatus] = [
        .init(prayer: .init(id: "fajr", name: "Fajr", arabic: "الفجر", time: "5:15 AM"), mine: true, friend: true),
        .init(prayer: .init(id: "dhuhr", name: "Dhuhr", arabic: "الظهر", time: "12:30 PM"), mine: true, friend: true),
        .init(prayer: .init(id: "asr", name: "Asr", arabic: "العصر", time: "3:45 PM"), mine: true, friend: false),
        .init(prayer: .init(id: "maghrib", name: "Maghrib", arabic: "المغرب", time: "6:15 PM"), mine: false, friend: false),
        .init(prayer: .init(id: "isha", name: "Isha", arabic: "العشاء", time: "8:00 PM"), mine: false, friend: false)
    ]

    func completeAuth() {
        phase = .addFriend
    }

    func finishFriendStep() {
        phase = .main
        selectedTab = .dashboard
    }

    func toggleMyPrayer(_ id: UUID) {
        guard let index = prayerStatuses.firstIndex(where: { $0.id == id }) else { return }
        prayerStatuses[index].mine.toggle()
    }
}
