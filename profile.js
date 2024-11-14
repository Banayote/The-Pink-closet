document.addEventListener('DOMContentLoaded', () => {
    const profileImg = document.getElementById('profile-img');
    const bannerImages = document.querySelectorAll('.banner-images img');
    const usernameElem = document.getElementById('username');
    const profilePicUpload = document.getElementById('profile-pic-upload');
    const bannerUpload = document.getElementById('banner-upload');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const closeModal = document.querySelector('.modal .close');
    const editButton = document.getElementById('edit');
    const copyLinkButton = document.getElementById('copy-link');

    let isEditing = false;

    // Initialize profile data
    function initializeProfile() {
        const username = localStorage.getItem('username');
        const profileImgSrc = localStorage.getItem('profileImgSrc');
        const bannerImgsSrc = [
            localStorage.getItem('bannerImgSrc1'),
            localStorage.getItem('bannerImgSrc2'),
            localStorage.getItem('bannerImgSrc3')
        ];

        if (username) usernameElem.textContent = username;
        if (profileImgSrc) profileImg.src = profileImgSrc;
        if (bannerImgsSrc[0]) bannerImages[0].src = bannerImgsSrc[0];
        if (bannerImgsSrc[1]) bannerImages[1].src = bannerImgsSrc[1];
        if (bannerImgsSrc[2]) bannerImages[2].src = bannerImgsSrc[2];
    }

    initializeProfile();

    // Toggle between edit and save mode
    editButton.addEventListener('click', () => {
        isEditing = !isEditing;
        if (isEditing) {
            editButton.textContent = 'Save';
            usernameElem.contentEditable = true;
            profileImg.classList.add('editable');
            bannerImages.forEach(img => img.classList.add('editable'));
        } else {
            editButton.textContent = 'Edit';
            usernameElem.contentEditable = false;
            profileImg.classList.remove('editable');
            bannerImages.forEach(img => img.classList.remove('editable'));

            // Save the profile data
            localStorage.setItem('username', usernameElem.textContent);
            localStorage.setItem('profileImgSrc', profileImg.src);
            localStorage.setItem('bannerImgSrc1', bannerImages[0].src);
            localStorage.setItem('bannerImgSrc2', bannerImages[1].src);
            localStorage.setItem('bannerImgSrc3', bannerImages[2].src);
        }
    });

    // Show modal with image when clicking on profile picture or banner images
    function openModal(imageSrc) {
        modal.style.display = 'block';
        modalImg.src = imageSrc;
    }

    // Handle profile picture click
    profileImg.addEventListener('click', () => {
        if (isEditing) {
            profilePicUpload.click();
        } else {
            openModal(profileImg.src);
        }
    });

    // Handle banner image click
    bannerImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            if (isEditing) {
                bannerUpload.setAttribute('data-index', index);
                bannerUpload.click();
            } else {
                openModal(img.src);
            }
        });
    });

    // Handle profile picture upload
    profilePicUpload.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const imgURL = URL.createObjectURL(file);
            profileImg.src = imgURL;
        }
    });

    // Handle banner image upload
    bannerUpload.addEventListener('change', function () {
        const files = this.files;
        const index = this.getAttribute('data-index');

        if (files.length > 0 && index != null) {
            const imgURL = URL.createObjectURL(files[0]);
            bannerImages[index].src = imgURL;
        }
    });

    // Close modal handler
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of the modal
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Generate profile link
    copyLinkButton.addEventListener('click', () => {
        const username = localStorage.getItem('username');
        if (username) {
            const link = `${window.location.origin}/profile.html?username=${encodeURIComponent(username)}`;
            prompt('Copy this link to share:', link);
        }
    });
});

function goBack() {
    window.history.back();
}

