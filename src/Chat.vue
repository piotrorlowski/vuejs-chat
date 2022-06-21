<template>
    <div class="app">
        <div class="app-header" >
            <img class="app-header-img" :src="users[0].picture.medium"/>
            <p class="app-header-text">{{users[0].name.first}}</p>
            <span @click="toggleChat" class="material-icons md-18 app-header-icon">close</span>
        </div>
        <div class="app-container" :class="{'closed': isClosed}">
            <Message
                v-for="message in messages"
                :key="message.id"
                :message="message"
            />
        </div>
        <b-form class="app-form" @submit.prevent="onSubmit">
            <b-input-group prepend="Message">
                <b-form-input autocomplete="off" v-model="text"></b-form-input>
                <b-input-group-append>
                    <button type="submit" class="btn btn-info">Send</button>
                </b-input-group-append>
            </b-input-group>
        </b-form>
    </div>
</template>

<script>
import Message from "./components/Message.vue";
import { mapState, mapActions } from "vuex";
export default {
    name: "Chat",
    components: {
        Message,
    },
    data() {
        return {
            text: "",
            responses: [
                "I'm good, thanks for asking :)",
                "Sorry, I didn't understand",
                "Beautiful wheather today, isn't it?",
                "Have a nice day, bye!",
            ],
            isClosed: false,
        }
    },
    async mounted() {
        await this.getUser();
    },
    computed: {
        ...mapState(["users", "messages"]),
    },
    watch: {
        messages(prev, current) {
            if (current[current.length - 1].sender.isResponse) {
                const text = this.responses[Math.floor(Math.random() * 4)];
                setTimeout(() => {
                    const message = this.generateMessage(text, this.users[0], false);
                    this.sendMessage(message);
                }, 1500);
                setTimeout(() => {
                    this.scrollChat()
                }, 1600);
            }
        }
    },
    methods: {
        ...mapActions(["getUser", "sendMessage"]),
        toggleChat() {
            this.isClosed = !this.isClosed;
        },
        onSubmit() {
            if (this.text.trim() !== "") {
                const message = this.generateMessage(this.text, this.users[1], true);
                this.sendMessage(message);
                this.text = '';
                setTimeout(() => {
                    this.scrollChat();
                }, 100);
            }
        },
        generateMessage(text, user, isResponse) {
            const date = new Date();
            const id = this.messages[this.messages.length - 1].id + 1;
            return {
                id,
                text,
                time: date.toLocaleString('pl-PL'),
                sender: {
                    id: user.id.value,
                    name: user.name.first,
                    profilePicture: user.picture.medium,
                    isResponse
                },
            };
        },
        scrollChat() {
            const container = this.$el.querySelector('.app-container');
            container.scrollTop = container.scrollHeight;
            container.scrollTo({top: container.scrollTop, behavior: 'smooth'});
        },
    },
};
</script>

<style>
.app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 20px;
    width: 400px;
    position: absolute;
    bottom: 0;
    right: 0;
}

.app-header {
    background-color: #17a2b8;
    height: 70px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    padding: 5px 0 0 10px;
    color: #fff;
    position: relative;
    margin-bottom: 1px;
}

.app-header-icon  {
    position: absolute;
    top: 20px;
    right: 14px;
    font-size: 30px;
    cursor: pointer;
}

.app-header-img {
    width: 50px;
    height: 50px;
    border-radius: 20px;
}

.app-header-text {
    margin-left: 10px;
    font-size: 24px;
}

.app-container {
    height: 400px;
    display: flex; 
    align-items: flex-start;
    flex-direction: column;
    overflow-y: scroll;
    height: 400px;
    width: 100%;
    border-left: 1px solid #e9ecef;
    padding: 5px 0 0 10px;
    transition: height 0.5s;
}

.closed {
    height: 0;
    padding: 0 0 0 10px;
}

.app-container::-webkit-scrollbar {
    width: 8px;
}
 
.app-container::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
}
 
.app-container::-webkit-scrollbar-thumb {
    background-color: #17a2b8;
    border-radius: 100px;
}
</style>
