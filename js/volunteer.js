// JavaScript for the volunteer page functionality

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Handle "See More" buttons
  const seeMoreButtons = document.querySelectorAll(".see-more")

  seeMoreButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()

      // Find the parent review card
      const reviewCard = this.closest(".review-card")

      // Find the review content
      const reviewContent = reviewCard.querySelector(".review-content")

      // Toggle the expanded class
      reviewContent.classList.toggle("expanded")

      // Change button text based on state
      if (reviewContent.classList.contains("expanded")) {
        this.textContent = "See Less"
      } else {
        this.textContent = "See More"
      }
    })
  })

  // Handle emoji selection
  const emojiButtons = document.querySelectorAll(".emoji-btn")

  emojiButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove selected class from all emoji buttons
      emojiButtons.forEach((btn) => btn.classList.remove("selected"))

      // Add selected class to clicked button
      this.classList.add("selected")
    })
  })

  // Handle form submission
  const feedbackForm = document.querySelector(".feedback-form")

  if (feedbackForm) {
    const submitBtn = feedbackForm.querySelector(".submit-btn")
    const cancelBtn = feedbackForm.querySelector(".cancel-btn")
    const textarea = feedbackForm.querySelector("textarea")

    submitBtn.addEventListener("click", (e) => {
      e.preventDefault()

      // Check if an emoji is selected
      const selectedEmoji = feedbackForm.querySelector(".emoji-btn.selected")

      if (!selectedEmoji) {
        alert("Please select an emoji rating before submitting.")
        return
      }

      // Check if textarea has content
      if (!textarea.value.trim()) {
        alert("Please write your feedback before submitting.")
        return
      }

      // Here you would normally send the data to a server
      // For now, we'll just show a success message
      alert("Thank you for your feedback!")

      // Reset the form
      resetForm()
    })

    cancelBtn.addEventListener("click", (e) => {
      e.preventDefault()

      // Confirm before canceling if there's text in the textarea
      if (textarea.value.trim() && !confirm("Are you sure you want to cancel? Your feedback will be lost.")) {
        return
      }

      // Reset the form
      resetForm()
    })

    function resetForm() {
      // Clear textarea
      textarea.value = ""

      // Remove selected class from all emoji buttons
      emojiButtons.forEach((btn) => btn.classList.remove("selected"))
    }
  }
})

