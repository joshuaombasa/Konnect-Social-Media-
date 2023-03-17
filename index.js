import tweetsData from './data.js'

const containerEl = document.getElementById("container")
const konnectBtn = document.getElementById("konnect-btn")

const users = new GetCharacters()


function render() {
    containerEl.innerHTML = users.getCharactersHtml()
}

render()

konnectBtn.addEventListener("click", () => {
    const tweetInput  = document.getElementById("tweet-input")
    if (tweetInput.value) {
        tweetsData.unshift(
            {
                handle: `@EngineerOmbasa`,
                profilePic: `images/love.png`,
                likes: 0,
                retweets: 0,
                tweetText: tweetInput.value,
                replies: [],
                isLiked: false,
                isRetweeted: false,
                uuid: 1237136151755646e6
            }
        )

        render()

        tweetInput.value = ''
    }
})




document.addEventListener("click", users.handleClicks)





function GetCharacters() {
    // Object.assign(this, data)
    
    this.handleClicks = (e) => {
        if (e.target.dataset.like) {
            this.handleLikes(e.target.dataset.like)
        } else if (e.target.dataset.retweet) {
            this.handleRetweet(e.target.dataset.retweet)
        }
    
        render()
    }

    this.handleLikes = (tweetId) => {
        const targetObject = tweetsData.filter((tweet) => {
            if (tweetId === tweet.uuid) {
                return tweet
            }
        })[0]
    
        if (targetObject.isLiked) {
            targetObject.likes --
            targetObject.isLiked = false
        } else {
            targetObject.likes ++
            targetObject.isLiked = true
        } 
    }

    this.handleRetweet = (tweetId) => {
        const targetObject = tweetsData.filter((tweet) => {
            if (tweetId === tweet.uuid) {
                return tweet
            }
        })[0]
    
        if (targetObject.isRetweeted) {
            targetObject.retweets --
            targetObject.isRetweeted = false
        } else {
            targetObject.isRetweeted = true
            targetObject.retweets ++
        }
    }
    

    this.getCharactersHtml = () => {
        const tweetsHtml = tweetsData.map((tweet) => {
            const {profilePic, handle, tweetText,likes, retweets, replies, uuid} = tweet
            return`
        <div class="tweetContainer" id="tweetContainer">
            <img src="${profilePic}"  class="profile-pic" id="profile-pic">
            <div class="tweettextArea" id="tweettextArea">
                <p class="handle" id="handle">${handle}</p>
                <p class="tweetText">${tweetText}</p>
                <div class="tweetStats">
                    <small class="tweetStatLike"   data-like="${uuid}">${likes}</small>
                    <small class="tweetStatRetweet"  data-retweet="${uuid}">${retweets}</small>
                    <small class="tweetStatReply"  >${replies.length}</small>
                </div>
            </div>
        </div>
            `
        }).join('')

        return tweetsHtml
    }
}

