// script.js

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-feedback');
    const feedbackResult = document.getElementById('feedback-result');
    const feedbackSong = document.getElementById('feedback-song');
    const averageRatingDiv = document.getElementById('average-rating');
    let feedbackHistory = [];
    let totalRating = 0;
    let totalFeedbacks = 0;

    submitButton.addEventListener('click', () => {
        const userName = document.getElementById('user-name').value.trim();
        const rating = document.querySelector('input[name="rating"]:checked');
        const feedback = document.getElementById('feedback').value.trim();
        const emojiReaction = document.getElementById('emoji-reaction').value;

        let formValid = true;

        // Check if fields are filled and highlight errors
        if (userName === '') {
            document.getElementById('user-name').classList.add('error');
            formValid = false;
        } else {
            document.getElementById('user-name').classList.remove('error');
        }

        if (!rating) {
            document.getElementById('stars').classList.add('error');
            formValid = false;
        } else {
            document.getElementById('stars').classList.remove('error');
        }

        if (feedback === '') {
            document.getElementById('feedback').classList.add('error');
            formValid = false;
        } else {
            document.getElementById('feedback').classList.remove('error');
        }

        if (!emojiReaction) {
            document.getElementById('emoji-reaction').classList.add('error');
            formValid = false;
        } else {
            document.getElementById('emoji-reaction').classList.remove('error');
        }

        if (!formValid) {
            alert('Please fill out all required fields.');
            return;
        }

        const now = new Date();
        const timestamp = now.toLocaleString();

        const feedbackEntry = {
            name: userName,
            rating: parseInt(rating.value),
            feedback: feedback,
            emoji: emojiReaction,
            date: timestamp
        };

        feedbackHistory.push(feedbackEntry);
        totalRating += feedbackEntry.rating;
        totalFeedbacks++;
        displayFeedbackHistory();
        displayAverageRating();

        // Play the feedback song
        feedbackSong.play().then(() => {
            console.log('Song is playing');
        }).catch((error) => {
            console.error('Error playing the feedback song:', error);
            alert('Feedback submitted, but the song did not play.');
        });

        // Show thank you message
        displayThankYouMessage();

        // Clear the form after submission
        document.getElementById('feedback-form').reset();
    });

    function displayFeedbackHistory() {
        feedbackResult.innerHTML = '<h2>Feedback History</h2>';
        feedbackHistory.forEach(entry => {
            feedbackResult.innerHTML += `
                <div class="feedback-entry">
                    <p><strong>${entry.name}</strong> (${entry.date})</p>
                    <p><strong>Rating:</strong> ${entry.rating} stars</p>
                    <p><strong>Feedback:</strong> ${entry.feedback}</p>
                    <p><strong>Reaction:</strong> ${entry.emoji}</p>
                    <hr>
                </div>
            `;
        });
    }

    function displayAverageRating() {
        const averageRating = (totalRating / totalFeedbacks).toFixed(2);
        const averageRatingPercentage = ((averageRating / 5) * 100).toFixed(2);
        averageRatingDiv.innerHTML = `<h2>Average Rating</h2><p>${averageRatingPercentage}% (${averageRating} out of 5 stars)</p>`;
    }

    function displayThankYouMessage() {
        const thankYouMessage = document.createElement('div');
        thankYouMessage.className = 'thank-you-message';
        thankYouMessage.textContent = 'Thank you for your feedback!';
        
        const container = document.querySelector('.container');
        container.appendChild(thankYouMessage);

        // Remove the message after a few seconds
        setTimeout(() => {
            thankYouMessage.remove();
        }, 5000);
    }
});
