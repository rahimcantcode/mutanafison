# Mutanafison iOS (SwiftUI)

This repository is now organized as a Swift-first iOS app foundation so you can continue building in Xcode.

## Structure

- `ios/Mutanafison/App`: app entrypoint, root navigation, tab shell
- `ios/Mutanafison/Domain`: app state and domain models
- `ios/Mutanafison/Features`: one folder per feature/screen
- `ios/Mutanafison/Shared`: shared theme and reusable app-wide pieces
- `legacy/web-prototype`: original React/Vite prototype preserved for reference

## Current Flow (SwiftUI)

- Onboarding -> Auth -> Add Friend -> Main Tab App
- Tabs: Dashboard, Streak, Ramadan, Widgets, Profile

## Open in Xcode

1. Create a new iOS App project in Xcode named `Mutanafison` (SwiftUI lifecycle).
2. Replace the generated source files with files from `ios/Mutanafison`.
3. Ensure target iOS version is set (recommended iOS 17+).
4. Build and run.

## Migration Notes

The SwiftUI code mirrors the key behavior/data from the original prototype:

- Prayer tracking and friend comparison
- Streak and Ramadan progress concepts
- Widget concepts and profile/settings sections

Use `legacy/web-prototype/src/app/screens` as a visual/UX reference while continuing implementation in Swift.
