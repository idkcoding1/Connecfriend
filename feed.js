const currentUser = {
    id: 1,
    name: "Tanveer",
    profilePic: "/assignment1/images/me.jpg"
};

const mockUsers = [
    { id: 2, name: "Kaif Sindhi", profilePic: "/assignment1/images/saien.jpg", lastLogin: "10 minutes ago", rating: 3 },
    { id: 3, name: "Furqan Sehto", profilePic: "/assignment1/images/sehto.jpg", lastLogin: "25 minutes ago", rating: 2 },
    { id: 4, name: "Matt", profilePic: "/assignment1/images/matt.jpg", lastLogin: "1 hour ago", rating: 1 },
    { id: 5, name: "Punisher", profilePic: "/assignment1/images/punisher.jpg", lastLogin: "2 hours ago", rating: 3 },
 
];

const mockPosts = [
    {
        id: 1,
        authorId: 2,
        authorName: "Kaif Sindhi",
        authorPic: "/assignment1/images/saien.jpg",
        content: "Just finished a great book! I highly recommend 'The Alchemist' if you enjoy psychological thrillers.",
        time: "15 minutes ago",
        likes: 12,
        dislikes: 2,
        liked: false,
        disliked: false
    },
    {
        id: 2,
        authorId: 3,
        authorName: "Furqan Sehto",
        authorPic: "/assignment1/images/sehto.jpg",
        content: "Beautiful day for hiking! Check out this view from the mountain top.",
        time: "1 hour ago",
        likes: 24,
        dislikes: 0,
        liked: true,
        disliked: false
    },
    {
        id: 3,
        authorId: 5,
        authorName: "Punisher",
        authorPic: "/assignment1/images/punisher.jpg",
        content: "Just launched my new website! It's been months of hard work but I'm so proud of the result. Would love to get your feedback!",
        time: "3 hours ago",
        likes: 45,
        dislikes: 3,
        liked: false,
        disliked: false
    }
];

const mockMessages = [
    {
        id: 1,
        senderId: 2,
        senderName: "Kaif Sindhi",
        senderPic: "/assignment1/images/saien.jpg",
        preview: "Hey, how are you doing?",
        unread: true,
        messages: [
            { sender: 2, content: "Hey, how are you doing?", time: "10:30 AM" }
        ]
    },
    {
        id: 2,
        senderId: 4,
        senderName: "Matt",
        senderPic: "/assignment1/images/matt.jpg",
        preview: "Did you watched Daredevil?",
        unread: false,
        messages: [
            { sender: 4, content: "Hey kaif!", time: "Yesterday" },
            { sender: 1, content: "Hi Sehto! What's up?", time: "Yesterday" },
            { sender: 4, content: "Did you watch Daredevil?", time: "Yesterday" }
        ]
    },
    {
        id: 3,
        senderId: 6,
        senderName: "Matt",
        senderPic: "/assignment1/images/punisher.jpg",
        preview: "Watch Born Again Daredevil!",
        unread: false,
        messages: [
            { sender: 6, content: "Did you watch Daredevil?", time: "2 days ago" }
        ]
    }
];

// Initialize the page
    document.addEventListener('DOMContentLoaded', function() {
    // Set current user info
    document.getElementById('current-user-name').textContent = currentUser.name;
    document.getElementById('current-user-img').src = currentUser.profilePic;
    
    // Load friends list
    loadFriendsList();
    
    // Load news feed
    loadNewsFeed();
    
    // Load messages
    loadMessages();
    
    // Set up event listeners
    setupEventListeners();
});

// Load friends list in order of last login
function loadFriendsList() {
    const friendsList = document.getElementById('friends-list');
    friendsList.innerHTML = '';
    
    // Sort mockUsers by lastLogin (most recent first)
    const sortedFriends = [...mockUsers].sort((a, b) => {
        // This is a simple sort for demonstration purposes
        // In a real app, you'd convert timestamps to Date objects for proper comparison
        return a.lastLogin.includes('minute') ? -1 : 1;
    });
    
    sortedFriends.forEach(friend => {
        const friendItem = document.createElement('div');
        friendItem.className = 'friend-item';
        friendItem.dataset.userId = friend.id;
        
        // Get rating icon
        const ratingIcon = getRatingIcon(friend.rating);
        
        friendItem.innerHTML = `
            <img src="${friend.profilePic}" alt="${friend.name}" class="profile-img">
            <div class="friend-info">
                <div class="friend-name">${friend.name}</div>
                <div class="last-login">${friend.lastLogin}</div>
            </div>
            <div class="friend-actions">
                <i class="fas fa-star rate-friend" title="Rate friend"></i>
                <i class="fas fa-comment-alt message-friend" title="Message"></i>
                ${ratingIcon}
            </div>
        `;
        
        friendsList.appendChild(friendItem);
    });
    
    // Also populate select friends dropdown
    const selectFriends = document.getElementById('select-friends');
    selectFriends.innerHTML = '';
    
    sortedFriends.forEach(friend => {
        const friendCheckbox = document.createElement('div');
        friendCheckbox.className = 'select-friend-item';
        friendCheckbox.innerHTML = `
            <input type="checkbox" id="friend-${friend.id}" value="${friend.id}">
            <img src="${friend.profilePic}" alt="${friend.name}">
            <label for="friend-${friend.id}">${friend.name}</label>
        `;
        
        selectFriends.appendChild(friendCheckbox);
    });
}

// Get rating icon based on rating value
function getRatingIcon(rating) {
    let icon = '';
    
    switch(rating) {
        case 1:
            icon = '<i class="fas fa-thumbs-down rating-icon rating-1" title="Stupid"></i>';
            break;
        case 2:
            icon = '<i class="fas fa-smile rating-icon rating-2" title="Cool"></i>';
            break;
        case 3:
            icon = '<i class="fas fa-shield-alt rating-icon rating-3" title="Trustworthy"></i>';
            break;
    }
    
    return icon;
}

// Load news feed
function loadNewsFeed() {
    const feedPosts = document.getElementById('feed-posts');
    feedPosts.innerHTML = '';
    
    mockPosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.dataset.postId = post.id;
        
        const likeClass = post.liked ? 'liked' : '';
        const dislikeClass = post.disliked ? 'disliked' : '';
        
        postElement.innerHTML = `
            <div class="post-header">
                <img src="${post.authorPic}" alt="${post.authorName}" class="profile-img">
                <div class="post-info">
                    <div class="post-author">${post.authorName}</div>
                    <div class="post-time">${post.time}</div>
                </div>
            </div>
            <div class="post-content">
                ${post.content}
            </div>
            <div class="post-footer">
                <div class="post-stats">
                    <div class="likes-count"><i class="fas fa-thumbs-up"></i> ${post.likes}</div>
                    <div class="dislikes-count"><i class="fas fa-thumbs-down"></i> ${post.dislikes}</div>
                </div>
                <div class="post-actions-btns">
                    <button class="like-btn ${likeClass}" data-post-id="${post.id}">
                        <i class="fas fa-thumbs-up"></i> Like
                    </button>
                    <button class="dislike-btn ${dislikeClass}" data-post-id="${post.id}">
                        <i class="fas fa-thumbs-down"></i> Dislike
                    </button>
                </div>
            </div>
        `;
        
        feedPosts.appendChild(postElement);
    });
}

// Load messages
function loadMessages() {
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = '';
    
    mockMessages.forEach(message => {
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';
        messageItem.dataset.userId = message.senderId;
        messageItem.innerHTML = `
            <img src="${message.senderPic}" alt="${message.senderName}" class="profile-img">
            <div class="message-info">
                <div class="message-sender">${message.senderName}</div>
                <div class="message-preview ${message.unread ? 'unread' : ''}">${message.preview}</div>
            </div>
        `;
        
        messageList.appendChild(messageItem);
    });
}

// Setup all event listeners
function setupEventListeners() {
    // User menu dropdown
    const userMenu = document.querySelector('.user-menu');
    userMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        const dropdown = this.querySelector('.dropdown-menu');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Close dropdown when clicking elsewhere
    document.addEventListener('click', function() {
        const dropdown = document.querySelector('.dropdown-menu');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
    });

    // Share options dropdown
    const shareOptionsBtn = document.getElementById('share-options-btn');
    shareOptionsBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const dropdown = document.getElementById('share-options');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Share option selection
    const shareOptions = document.querySelectorAll('input[name="share-option"]');
    shareOptions.forEach(option => {
        option.addEventListener('change', function() {
            const selectFriends = document.getElementById('select-friends');
            if (this.value === 'select') {
                selectFriends.classList.remove('hidden');
            } else {
                selectFriends.classList.add('hidden');
            }
        });
    });

    // Like and dislike buttons
    const likeButtons = document.querySelectorAll('.like-btn');
    const dislikeButtons = document.querySelectorAll('.dislike-btn');

    likeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = this.dataset.postId;
            const post = mockPosts.find(p => p.id == postId);
            const dislikeBtn = document.querySelector(`.dislike-btn[data-post-id="${postId}"]`);
            
            if (this.classList.contains('liked')) {
                // Unlike
                this.classList.remove('liked');
                post.likes--;
                post.liked = false;
            } else {
                // Like
                this.classList.add('liked');
                post.likes++;
                post.liked = true;
                
                // Remove dislike if present
                if (dislikeBtn.classList.contains('disliked')) {
                    dislikeBtn.classList.remove('disliked');
                    post.dislikes--;
                    post.disliked = false;
                }
            }
            
            // Update counts
            updateLikeCounts(postId, post.likes, post.dislikes);
        });
    });

    dislikeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const postId = this.dataset.postId;
            const post = mockPosts.find(p => p.id == postId);
            const likeBtn = document.querySelector(`.like-btn[data-post-id="${postId}"]`);
            
            if (this.classList.contains('disliked')) {
                // Remove dislike
                this.classList.remove('disliked');
                post.dislikes--;
                post.disliked = false;
            } else {
                // Dislike
                this.classList.add('disliked');
                post.dislikes++;
                post.disliked = true;
                
                // Remove like if present
                if (likeBtn.classList.contains('liked')) {
                    likeBtn.classList.remove('liked');
                    post.likes--;
                    post.liked = false;
                }
            }
            
            // Update counts
            updateLikeCounts(postId, post.likes, post.dislikes);
        });
    });

    // Update like/dislike counts
    function updateLikeCounts(postId, likes, dislikes) {
        const post = document.querySelector(`.post[data-post-id="${postId}"]`);
        post.querySelector('.likes-count').innerHTML = `<i class="fas fa-thumbs-up"></i> ${likes}`;
        post.querySelector('.dislikes-count').innerHTML = `<i class="fas fa-thumbs-down"></i> ${dislikes}`;
    }

    // Rate friend button
    const rateFriendButtons = document.querySelectorAll('.rate-friend');
    rateFriendButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const userId = this.closest('.friend-item').dataset.userId;
            const friend = mockUsers.find(u => u.id == userId);
            
            // Open rating modal
            const ratingModal = document.getElementById('rating-modal');
            document.getElementById('friend-to-rate').textContent = friend.name;
            ratingModal.dataset.userId = userId;
            ratingModal.style.display = 'block';
            
            // Select current rating if exists
            const ratingOptions = document.querySelectorAll('.rating-option');
            ratingOptions.forEach(option => {
                option.classList.remove('selected');
                if (option.dataset.rating == friend.rating) {
                    option.classList.add('selected');
                }
            });
        });
    });

    // Rating option selection
    const ratingOptions = document.querySelectorAll('.rating-option');
    ratingOptions.forEach(option => {
        option.addEventListener('click', function() {
            ratingOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Submit rating
    document.getElementById('submit-rating').addEventListener('click', function() {
        const selectedRating = document.querySelector('.rating-option.selected');
        if (!selectedRating) return;
        
        const rating = parseInt(selectedRating.dataset.rating);
        const userId = document.getElementById('rating-modal').dataset.userId;
        const friend = mockUsers.find(u => u.id == userId);
        
        // Update friend rating
        friend.rating = rating;
        
        // Update UI
        const friendItem = document.querySelector(`.friend-item[data-user-id="${userId}"]`);
        const ratingIconContainer = friendItem.querySelector('.friend-actions');
        
        // Remove old rating icon
        const oldRatingIcon = ratingIconContainer.querySelector('.rating-icon');
        if (oldRatingIcon) {
            oldRatingIcon.remove();
        }
        
        // Add new rating icon
        const ratingIconHTML = getRatingIcon(rating);
        ratingIconContainer.insertAdjacentHTML('beforeend', ratingIconHTML);
        
        // Close modal
        document.getElementById('rating-modal').style.display = 'none';
    });

    // Message friend button
    const messageFriendButtons = document.querySelectorAll('.message-friend');
    messageFriendButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const userId = this.closest('.friend-item').dataset.userId;
            const friend = mockUsers.find(u => u.id == userId);
            
            // Check if there's an existing message thread
            const existingMessage = mockMessages.find(m => m.senderId == userId);
            
            if (existingMessage) {
                // Open existing message thread
                openMessageThread(existingMessage);
            } else {
                // Create new message thread
                const newMessage = {
                    id: mockMessages.length + 1,
                    senderId: friend.id,
                    senderName: friend.name,
                    senderPic: friend.profilePic,
                    preview: "New conversation",
                    unread: false,
                    messages: []
                };
                
                mockMessages.push(newMessage);
                loadMessages();
                openMessageThread(newMessage);
            }
        });
    });

    // Message list item click
    document.getElementById('message-list').addEventListener('click', function(e) {
        const messageItem = e.target.closest('.message-item');
        if (!messageItem) return;
        
        const userId = messageItem.dataset.userId;
        const message = mockMessages.find(m => m.senderId == userId);
        
        if (message) {
            openMessageThread(message);
            
            // Mark as read
            if (message.unread) {
                message.unread = false;
                messageItem.querySelector('.message-preview').classList.remove('unread');
            }
        }
    });

    // Open message thread
    function openMessageThread(message) {
        const messageModal = document.getElementById('message-modal');
        const messageUserImg = document.getElementById('message-user-img');
        const messageUserName = document.getElementById('message-user-name');
        const messageHistory = document.getElementById('message-history');
        
        messageUserImg.src = message.senderPic;
        messageUserName.textContent = message.senderName;
        
        // Load message history
        messageHistory.innerHTML = '';
        message.messages.forEach(msg => {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${msg.sender === currentUser.id ? 'sent' : 'received'}`;
            messageElement.innerHTML = `
                ${msg.content}
                <div class="message-time">${msg.time}</div>
            `;
            
            messageHistory.appendChild(messageElement);
        });
        
        // Show modal
        messageModal.style.display = 'block';
        messageModal.dataset.userId = message.senderId;
        
        // Focus on input
        setTimeout(() => {
            const textarea = messageModal.querySelector('textarea');
            textarea.focus();
        }, 100);
    }

    // Send message
    const messageInputs = document.querySelectorAll('.message-input button');
    messageInputs.forEach(btn => {
        btn.addEventListener('click', function() {
            const messageModal = this.closest('.modal');
            const textarea = messageModal.querySelector('textarea');
            const content = textarea.value.trim();
            
            if (!content) return;
            
            const userId = messageModal.dataset.userId;
            const message = mockMessages.find(m => m.senderId == userId);
            
            if (message) {
                // Add new message
                const now = new Date();
                const timeString = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
                
                const newMessage = {
                    sender: currentUser.id,
                    content: content,
                    time: timeString
                };
                
                message.messages.push(newMessage);
                message.preview = content;
                
                // Update UI
                const messageElement = document.createElement('div');
                messageElement.className = 'message sent';
                messageElement.innerHTML = `
                    ${content}
                    <div class="message-time">${timeString}</div>
                `;
                
                document.getElementById('message-history').appendChild(messageElement);
                
                // Clear input
                textarea.value = '';
                
                // Update message list
                loadMessages();
            }
        });
    });

    // Message input enter key
    const textareas = document.querySelectorAll('.message-input textarea');
    textareas.forEach(textarea => {
        textarea.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.closest('.message-input').querySelector('button').click();
            }
        });
    });

    // Add friend button
    document.querySelector('.add-friend-btn').addEventListener('click', function() {
        const addFriendModal = document.getElementById('add-friend-modal');
        addFriendModal.style.display = 'block';
        
        // Focus on search input
        setTimeout(() => {
            document.getElementById('friend-search').focus();
        }, 100);
    });

    // Friend search
    document.getElementById('friend-search').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const searchResults = document.getElementById('search-results');
        
        if (searchTerm.length < 2) {
            searchResults.innerHTML = '<p>Type at least 2 characters to search</p>';
            return;
        }
        
        // Filter users that are not already friends
        const nonFriendUsers = [
            { id: 9, name: "Robert Clark", profilePic: "/assignment1/images/a.jpg" },
            { id: 10, name: "Patricia Lee", profilePic: "/assignment1/images/b.jpg" },
            { id: 11, name: "Thomas White", profilePic: "/assignment1/images/c.jpg" },
            { id: 12, name: "Jennifer Adams", profilePic: "/assignment1/images/d.jpg" }
        ];
        
        const filteredUsers = nonFriendUsers.filter(user => 
            user.name.toLowerCase().includes(searchTerm)
        );
        
        if (filteredUsers.length === 0) {
            searchResults.innerHTML = '<p>No users found</p>';
            return;
        }
        
        searchResults.innerHTML = '';
        filteredUsers.forEach(user => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result';
            resultItem.dataset.userId = user.id;
            resultItem.innerHTML = `
                <img src="${user.profilePic}" alt="${user.name}">
                <div class="user-name">${user.name}</div>
                <button class="add-friend-btn" style="width: auto; margin-left: auto;">Add Friend</button>
            `;
            
            searchResults.appendChild(resultItem);
        });
    });

    // New message button
    document.querySelector('.new-message-btn').addEventListener('click', function() {
        const newMessageModal = document.getElementById('new-message-modal');
        newMessageModal.style.display = 'block';
        
        // Focus on search input
        setTimeout(() => {
            document.getElementById('message-search').focus();
        }, 100);
    });

    // Message search
    document.getElementById('message-search').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const searchResults = document.getElementById('message-search-results');
        
        if (searchTerm.length < 2) {
            searchResults.innerHTML = '<p>Type at least 2 characters to search</p>';
            return;
        }
        
        // Filter all users
        const allUsers = [...mockUsers, 
            { id: 9, name: "Robert Clark", profilePic: "/assignment1/images/a.jpg" },
            { id: 10, name: "Patricia Lee", profilePic: "/assignment1/images/b.jpg" },
            { id: 11, name: "Thomas White", profilePic: "/assignment1/images/c.jpg" },
            { id: 12, name: "Jennifer Adams", profilePic: "/assignment1/images/d.jpg" }
        ];
        
        const filteredUsers = allUsers.filter(user => 
            user.name.toLowerCase().includes(searchTerm)
        );
        
        if (filteredUsers.length === 0) {
            searchResults.innerHTML = '<p>No users found</p>';
            return;
        }
        
        searchResults.innerHTML = '';
        filteredUsers.forEach(user => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result';
            resultItem.dataset.userId = user.id;
            resultItem.innerHTML = `
                <img src="${user.profilePic}" alt="${user.name}">
                <div class="user-name">${user.name}</div>
                <button class="message-btn" style="width: auto; margin-left: auto;">Message</button>
            `;
            
            searchResults.appendChild(resultItem);
        });
    });

    // Modal close buttons
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Event delegation for search results actions
    document.addEventListener('click', function(e) {
        // Add friend button in search results
        if (e.target.classList.contains('add-friend-btn') && e.target.closest('.search-result')) {
            const userId = e.target.closest('.search-result').dataset.userId;
            const userToAdd = {
                id: parseInt(userId),
                name: e.target.closest('.search-result').querySelector('.user-name').textContent,
                profilePic: e.target.closest('.search-result').querySelector('img').src,
                lastLogin: "Just now",
                rating: 0
            };
            
            // Add user to friends list
            mockUsers.push(userToAdd);
            loadFriendsList();
            
            // Close modal
            document.getElementById('add-friend-modal').style.display = 'none';
            
            // Show confirmation
            alert(`${userToAdd.name} has been added to your friends list!`);
        }
        
        // Message button in search results
        if (e.target.classList.contains('message-btn')) {
            const userId = e.target.closest('.search-result').dataset.userId;
            const userName = e.target.closest('.search-result').querySelector('.user-name').textContent;
            const userPic = e.target.closest('.search-result').querySelector('img').src;
            
            // Check if there's an existing message thread
            const existingMessage = mockMessages.find(m => m.senderId == userId);
            
            if (existingMessage) {
                // Open existing message thread
                openMessageThread(existingMessage);
            } else {
                // Create new message thread
                const newMessage = {
                    id: mockMessages.length + 1,
                    senderId: parseInt(userId),
                    senderName: userName,
                    senderPic: userPic,
                    preview: "New conversation",
                    unread: false,
                    messages: []
                };
                
                mockMessages.push(newMessage);
                loadMessages();
                openMessageThread(newMessage);
            }
            
            // Close modal
            document.getElementById('new-message-modal').style.display = 'none';
        }
    });

    // Post creator
    const postBtn = document.querySelector('.post-btn');
    postBtn.addEventListener('click', function() {
        const textarea = document.querySelector('.post-creator textarea');
        const content = textarea.value.trim();
        
        if (!content) return;
        
        // Get share option
        const shareOption = document.querySelector('input[name="share-option"]:checked').value;
        let sharedWith = 'All Friends';
        
        if (shareOption === 'select') {
            const selectedFriends = Array.from(document.querySelectorAll('#select-friends input:checked')).map(cb => {
                const friendId = cb.value;
                const friend = mockUsers.find(u => u.id == friendId);
                return friend ? friend.name : '';
            }).filter(Boolean);
            
            if (selectedFriends.length === 0) {
                alert('Please select at least one friend to share with.');
                return;
            }
            
            sharedWith = selectedFriends.join(', ');
        }
        
        // Create new post
        const newPost = {
            id: mockPosts.length + 1,
            authorId: currentUser.id,
            authorName: currentUser.name,
            authorPic: currentUser.profilePic,
            content: content,
            time: "Just now",
            likes: 0,
            dislikes: 0,
            liked: false,
            disliked: false,
            sharedWith: sharedWith
        };
        
        // Add to posts and refresh feed
        mockPosts.unshift(newPost);
        loadNewsFeed();
        
        // Clear textarea
        textarea.value = '';
        
        // Hide share dropdown
        document.getElementById('share-options').style.display = 'none';
        document.getElementById('select-friends').classList.add('hidden');
        document.querySelector('input[name="share-option"][value="all"]').checked = true;
    });
}