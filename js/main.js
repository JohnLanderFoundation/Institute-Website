// SHOW AND HIDE SEARCH BAR ON NAVIGATION WHEN SEARCH ICON IS CLICKED
const nav = document.querySelector(".nav-items")
const toggleSearch = document.querySelectorAll(
    ".nav-items [data-toggle-searchbar]"
)
toggleSearch.forEach((element) => {
    element.addEventListener("click", (e) => {
        value = element.dataset.toggleSearchbar
        if (value === "open") {
            nav.dataset.searchbarOpened = "true"
        }
        if (value === "close") {
            nav.dataset.searchbarOpened = "false"
        }
    })
})

// MAKE NAVIGATION BAR STICKY BY ADDING A CLASS "scrolled" WHEN SCROLLED PAST A CERTAIN HEIGHT
const navigation = document.querySelector("[data-navigation]")
window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero-header")
    if (window.scrollY > hero.offsetHeight) {
        navigation.classList.add("scrolled")
    } else {
        navigation.classList.remove("scrolled")
    }
})

// TOGGLE VISIBILITY OF NAVIGATION BAR WHEN HAMBURGER ICON IS CLICKED
const dropdownToggleBtn = document.querySelectorAll("nav .dropdown")
dropdownToggleBtn.forEach((button) => {
    let parent = button.closest("li")
    parent.addEventListener("click", () => {
        if (button.getAttribute("aria-expanded") === "false") {
            button.setAttribute("aria-expanded", "true")
            console.log(button.getAttribute("aria-expanded"))
        } else {
            button.setAttribute("aria-expanded", "false")
            console.log(button.getAttribute("aria-expanded"))
        }
    })
})

// TOGGLE VISIBILITY DROPDOWN ITEMS IN NAVIGATION WHEN CLICKED
const open = document.querySelector(".open-nav")
open.addEventListener("click", () => {
    const nav = document.querySelector(".nav-items")
    nav.classList.toggle("display-none")
    open.classList.toggle("nav-opened")
})

// LOGIC TO OPEN AND CLOSE DETAILS ABOUT A COURSE IN THE COURSE-DETAILS PAGE
const course = document.querySelectorAll(
    ".course-details [data-toggle-course-details]"
)
course.forEach((element) => {
    element.addEventListener("click", () => {
        toggleCourseDetails(element)
    })
})

// FUNCTION FOR COURSE-DETAILS TOGGLE PAGE
function toggleCourseDetails(targetElement) {
    const showElement = targetElement
        .closest(".course-details__box")
        .querySelector(".course-details__content")
    if (showElement.getAttribute("aria-expanded") === "false") {
        showElement.setAttribute("aria-expanded", "true")
    } else {
        showElement.setAttribute("aria-expanded", "false")
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // CREATING SMOOTH PAGE TO PAGE TRANSITIONS
    let navLinks = document.querySelectorAll("[data-nav-link]")
    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault()
            let href = link.getAttribute("href")
            document.body.classList.add("fade-out")
            setTimeout(() => {
                window.location.href = href
            }, 500)
        })
    })
    // INTERSECTION OBSERVER TO ANIMATE ENTRY OF ELEMENTS INTO THE PAGE
    const desktopThreshold = 0.1 //enter normally on desktop screens
    const mobileThreshold = 0.05 // enter sooner on mobile screens
    const observerOptions = {
        root: null,
        margin: "-0px",
        threshold: window.innerWidth < 768 ? mobileThreshold : desktopThreshold,
    }
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            const { target } = entry
            if (entry.isIntersecting) {
                target.classList.add(target.dataset.animation)
                observer.unobserve(target)
            }
        }, observerOptions)
    })
    document.querySelectorAll("[data-animation]").forEach((element) => {
        observer.observe(element)
    })

    // SECTION TO HANDLE PAGINATION FOR EVENT CARDS

    const eventContainer = document.querySelector("[data-event-wrapper]")
    const itemsPerPage = eventContainer?.dataset.itemsPerPage // Change this to dynamically adjust items per page
    const events = Array.from(eventContainer.querySelectorAll(".event-card"))
    const paginationControls = document.getElementById("pagination-controls")
    let currentPage = 1
    const totalPages = Math.ceil(events.length / itemsPerPage)

    function displayEvents() {
        events.forEach((event, index) => {
            event.style.display =
                index >= (currentPage - 1) * itemsPerPage &&
                index < currentPage * itemsPerPage
                    ? "block"
                    : "none"
        })
        renderPagination()
    }

    function renderPagination() {
        paginationControls.innerHTML = ""
        if (totalPages <= 1) return // No pagination needed if only one page

        const prevButton = document.createElement("button")
        prevButton.innerText = "Previous"
        prevButton.disabled = currentPage === 1
        prevButton.addEventListener("click", () => {
            currentPage--
            displayEvents()
            scrollToTop()
        })
        paginationControls.appendChild(prevButton)

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement("button")
            pageButton.innerText = i
            pageButton.className = currentPage === i ? "active" : ""
            pageButton.addEventListener("click", () => {
                currentPage = i
                displayEvents()
                scrollToTop()
            })
            paginationControls.appendChild(pageButton)
        }

        const nextButton = document.createElement("button")
        nextButton.innerText = "Next"
        nextButton.disabled = currentPage === totalPages
        nextButton.addEventListener("click", () => {
            currentPage++
            displayEvents()
            scrollToTop()
        })
        paginationControls.appendChild(nextButton)
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }
    displayEvents()

    const container = document.querySelector(
        ".courses.features__card-container"
    )
    const prevButton = document.querySelector(".prev")
    const nextButton = document.querySelector(".next")

    nextButton.addEventListener("click", () => {
        container.scrollBy({ left: 300, behavior: "smooth" })
    })

    prevButton.addEventListener("click", () => {
        container.scrollBy({ left: -300, behavior: "smooth" })
    })
})
