var currentStep = 0
var totalSteps = 19
var prompts = [
    "Name",
    "Surname",
    "Age",
    "Gender",
    "Area of residence",
    "Phone Number",
    "Email",
    "Organization",
    "Country",
    "Education level",
    "Language proficiencies ",
    "Related qualifications",
    "Areas of interest or expertise related to energy",
    "Prior experiences or involvement in energy-related projects",
    "Available min/h per week",
    "District comfortable with working",
    "Area of energy preference",
    "Cultural insights",
    "Expecting outcome",
]
var userDetails = {}
var skippedSteps = []

function openPrompt() {
    document.getElementById("promptContainer").style.display = "flex"
    currentStep = 0 // Start from the beginning
    userDetails = {} // Reset user details
    skippedSteps = [] // Reset skipped steps
    updatePrompt()
    updateUserDetails()
    updateProgressBar()
}

function nextStep() {
    if (currentStep < totalSteps - 1) {
        var input
        if (currentStep === 3) {
            input = document.getElementById("promptInput").value
            if (!input) {
                alert("Please enter your gender.")
                return
            }
        } else if (currentStep === 4) {
            input = document.getElementById("promptInput").value
            if (!input) {
                alert("Please agree to the privacy terms.")
                return
            }
        } else {
            input = document.getElementById("promptInput").value
        }

        userDetails[prompts[currentStep]] = input
        document.getElementById("promptInput").value = ""
        currentStep++
        updatePrompt()
        updateUserDetails()
    } else {
        document.getElementById("nextButton").style.display = "none"
        document.getElementById("skipButton").style.display = "none"
        document.getElementById("submitButton").style.display = "inline"
        document.getElementById("promptTitle").innerText = "Thank you!"
        document.getElementById("promptInputContainer").innerHTML = ""
    }
}

function backStep() {
    if (currentStep > 0) {
        currentStep--
        updatePrompt()
        updateUserDetails()
    }
}

function skipStep() {
    if (currentStep < totalSteps - 1) {
        skippedSteps.push(currentStep)
        userDetails[prompts[currentStep]] = ""
        currentStep++
        updatePrompt()
        updateUserDetails()
    } else {
        document.getElementById("nextButton").style.display = "none"
        document.getElementById("skipButton").style.display = "none"
        document.getElementById("submitButton").style.display = "inline"
        document.getElementById("promptTitle").innerText = "Thank you!"
        document.getElementById("promptInputContainer").innerHTML = ""
    }
}

function submitForm() {
    var submittedDetails = "<h2>Submitted Details</h2>"
    for (var i = 0; i < prompts.length; i++) {
        var key = prompts[i]
        var value = userDetails[key] || ""
        submittedDetails += "<p><strong>" + key + ":</strong> " + value + "</p>"
    }
    document.getElementById("submittedDetails").innerHTML = submittedDetails

    document.getElementById("promptContainer").style.display = "none"
    document.getElementById("successPromptContainer").style.display = "flex"
}

function updatePrompt() {
    var promptTitle = document.getElementById("promptTitle")
    var stepTitle = document.getElementById("stepTitle")
    var promptInputContainer = document.getElementById("promptInputContainer")

    if (currentStep < totalSteps) {
        var stepNumber, questionNumber
        if (currentStep < 5) {
            stepNumber = 1
            questionNumber = currentStep + 1
        } else if (currentStep < 10) {
            stepNumber = 2
            questionNumber = currentStep - 4
        } else if (currentStep < 15) {
            stepNumber = 3
            questionNumber = currentStep - 9
        } else {
            stepNumber = 4
            questionNumber = currentStep - 14
        }
        stepTitle.innerText = `Step ${stepNumber}`
        promptTitle.innerText = `Enter your ${prompts[currentStep]}: `
        promptInputContainer.innerHTML = '<input type="text" id="promptInput">'
    } else {
        promptInputContainer.innerHTML = ""
        document.getElementById("promptInput").style.display = "none"
        promptTitle.innerText = "Thank you for completing the steps!"
    }

    // Disable the "Back" button when currentStep is 0
    if (currentStep === 0) {
        document.getElementById("backButton").disabled = true
    } else {
        document.getElementById("backButton").disabled = false
    }
}

function updateUserDetails() {
    var userDetailsDiv = document.getElementById("userDetails")
    userDetailsDiv.innerHTML = ""

    if (currentStep < 5) {
        userDetailsDiv.innerHTML += "<p><strong>Personal details</strong></p>"
        for (let j = 0; j < 5; j++) {
            //Renamed 'i' to 'j'
            if (userDetails[prompts[j]]) {
                userDetailsDiv.innerHTML += "<p>" + prompts[j] + ": " + userDetails[prompts[j]] + "</p>"
            } else {
                userDetailsDiv.innerHTML += "<p>" + prompts[j] + ": </p>"
            }
        }
    } else if (currentStep < 10) {
        userDetailsDiv.innerHTML += "<p><strong>Volunteering Details</strong></p>"
        for (let j = 5; j < 10; j++) {
            //Renamed 'i' to 'j'
            if (userDetails[prompts[j]]) {
                userDetailsDiv.innerHTML += "<p>" + prompts[j] + ": " + userDetails[prompts[j]] + "</p>"
            } else {
                userDetailsDiv.innerHTML += "<p>" + prompts[j] + ": </p>"
            }
        }
    } else if (currentStep < 15) {
        userDetailsDiv.innerHTML += "<p><strong>Education Details</strong></p>"
        for (let j = 10; j < 15; j++) {
            //Renamed 'i' to 'j'
            if (userDetails[prompts[j]]) {
                userDetailsDiv.innerHTML += "<p>" + prompts[j] + ": " + userDetails[prompts[j]] + "</p>"
            } else {
                userDetailsDiv.innerHTML += "<p>" + prompts[j] + ": </p>"
            }
        }
    } else {
        userDetailsDiv.innerHTML += "<p><strong>Social Details</strong></p>"
        for (let j = 15; j < prompts.length; j++) {
            //Renamed 'i' to 'j'
            if (userDetails[prompts[j]]) {
                userDetailsDiv.innerHTML += "<p>" + prompts[j] + ": " + userDetails[prompts[j]] + "</p>"
            } else {
                userDetailsDiv.innerHTML += "<p>" + prompts[j] + ": </p>"
            }
        }
    }
    updateProgressBar()
}

// Update the updateProgressBar function to fix the progress text
function updateProgressBar() {
    var progress = document.getElementById("progressBar")
    var percentage = Math.round((currentStep / totalSteps) * 100)

    progress.innerHTML = `
        <div class="progress-bar-container">
            <div class="progress-bar" style="width: ${percentage}%;"></div>
            <span id="progressText">${percentage}% Complete</span>
        </div>
    `
}

// Add these functions to make the close buttons work
function closePrompt() {
    document.getElementById("promptContainer").style.display = "none"
    // Reset form state if needed
    currentStep = 0
    updatePrompt()
    updateUserDetails()
}

function closeSuccessPrompt() {
    document.getElementById("successPromptContainer").style.display = "none"
}

// Initialize skills animation on page load
document.addEventListener("DOMContentLoaded", () => {
    // Animate skill bars when they come into view
    const skillLevels = document.querySelectorAll(".skill-level")

    // Set initial width to 0
    skillLevels.forEach((skill) => {
        const targetWidth = skill.style.width
        skill.style.width = "0%"

        // Animate to target width after a short delay
        setTimeout(() => {
            skill.style.width = targetWidth
        }, 500)
    })
})

