<template>
	<div>
		<div>Hello world</div>
		<form class="addTask" v-on:submit.prevent="addTask">
			<input name="newTaskInput" @change="inputChange" v-model="newTask" />
			<button type="submit">Add</button>
		</form>
		<h3>Pending task:</h3>
		<ul>

			<li class="list-item" v-bind:key="task.id" v-for="task in pendingTasks">
                    <span :class=" task.done && 'done' ">{{ task.content }}</span>
                    <button @click="makeDone(task.id)">{{task.done ? "Make Pending": "Make Done"}}</button>
                    <button @click="removeTask(task.id)">Delete</button>
			</li>
		</ul>
		<template v-if="doneTasks.length > 0">
		<h3>Task done:</h3>
		<ul>
			<li class="list-item" v-bind:key="task.id" v-for="task in doneTasks">
                    <span :class=" task.done && 'done' ">{{ task.content }}</span>
                    <button @click="makeDone(task.id)">{{task.done ? "Make Pending": "Make Done"}}</button>
                    <button @click="removeTask(task.id)">Delete</button>
			</li>
		</ul>
		</template>
	</div>
</template>
<script>
import API from "../API/index.js";

export default {
	name: "TodoList",
	data: () => ({
		list: [],
		newTask: "",
	}),
	mounted() {
		API.getTodoList().then(data => {
			this.list.push(...data);
		});
	},
	computed: {
		doneTasks() {
			return this.list.filter(t => t.done);
		},
		pendingTasks() {
			return this.list.filter(t => !t.done);
		}
	},
	watch: {
		newTask: (val, oldVal) => {},
	},
	methods: {
		addTask(e) {
			this.list.push({
				content: this.newTask,
				id: Math.floor(Math.random() * 9999),
                done: false
			});
			this.newTask = "";
			e.target.newTaskInput.focus();
		},
		removeTask(id) {
			this.list = this.list.filter(t => t.id != id);
		},
		makeDone(id) {
			const idx = this.list.findIndex(t => t.id === id);
			const newList = [...this.list]
			if(idx !== -1) {
				newList[idx].done = !newList[idx].done;
			}
			this.list = newList;
		},
		inputChange() {
			console.log(this.newTask);
		},
	},
};
</script>

<style scoped>
.done {
    text-decoration-line: line-through;
}
.list-item > span {
	display: inline-block;
	min-width: 30%
}
</style>
