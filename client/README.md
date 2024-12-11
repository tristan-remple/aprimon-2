# Aprimon Tracker

## Tasks
- ✅ Display all aprimon caught as Cards
- ✅ Display wishlist aprimon
- ✅ Sorting
- Filtering
- Searching
- ✅ Display current user stats
- ✅ Allow user switching
- ✅ Click on Card to view details
- ✅ Edit aprimon details
- ✅ Edit egg moves
- ✅ View all possible aprimon
- ✅ Add aprimon from browse menu
- ✅ Add new aprimon
- ✅ Add egg queue
- ✅ Confirm hatches
- ✅ Confirm shiny
- ✅ Display as shiny
- ✅ Remove aprimon
- ✅ Login
- ✅ Logout
- Register
- ✅ Authentication
- ✅ Check logged in user on refresh
- ✅ Sidebar different between users own page and other users pages

## Accessibility
- implement keyboard navigation
    - sidebar buttons operable
    - cards selectable OR skippable
    - modal window works as intended
- double check contrast
- ensure that all images and abbreviations are labeled
- include a modal about page usage
- implement svg icons
    - change color on hover/focus without replacing icon

## State
- array of aprimon
    - total list (of user)
    - sorted and filtered list
- user information
    - username, bio, ign
    - total eggs, total types, total shinies, shiny ratio, since last
- queue
    - number
    - aprimon
    - form

## Components
- Card
- CardBadge
- Collection (card container)
- Header
- Sidebar
- SideButtonHeader
- SideButton
- SideStat
- Zoom
- ZoomStat
- EggCollection
- EggMove
- ZoomButton
- ZoomAuto
- ZoomDrop
- ZoomNumber
- ZoomCheck