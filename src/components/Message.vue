<template>
    <div class="message" :class="{'message-response' : message.sender.isResponse}">
        <img class="message-img" v-if="!message.sender.isResponse" :src="message.sender.profilePicture"/>
        <div class="message-container">
            <div class="message-meta">
                <span class="message-name">{{ message.sender.name }}</span>
                <span class="message-time">{{ message.time }}</span>
            </div>
            <p class="message-text">{{ message.text }}</p>
        </div>
        <img class="message-img" v-if="message.sender.isResponse" :src="message.sender.profilePicture"/>
    </div>
</template>

<script scoped>
export default {
    name: "Message",
    props: {
        message: Object,
    },
};
</script>

<style scoped>
.message {
    display: flex;
    height: auto;
    margin-bottom: 25px;
    border-radius: 30px;
    width: 95%;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
}

.message-container {
    padding: 8px;
    background-color: #F5F5F5;
    padding-left: 10px;
    text-align: left;
    width: 100%;
    overflow-wrap: break-word;
    margin-left: 10px;
    border-radius: 10px;
}

.message-img {
    width: 70px;
    height: 70px;
    border-radius: 50px;
}

.message-response {
    width: 95%;
}

.message-response .message-img {
    margin-left: 10px;
}

.message-meta {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-evenly;
    padding-right: 5px;
    margin-bottom: 5px;
}

.message-name {
    font-weight: bold;
    width: 40%;
}

.message-time {
    text-align: right;
    font-size: 14px;
    width: 60%;
    color: gray;
}

.message-text {
    padding-right: 5px;
    font-size: 14px;
}
</style>
