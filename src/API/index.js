export function getTodoList() {
	return new Promise(rs => {
		setTimeout(() => {
			rs([
				{
					id: 1,
					content: "ABC",
					done: false,
				},
				{
					id: 2,
					content: "work2",
					done: true,
				},
				{
					id: 3,
					content: "work4",
					done: true,
				},
			]);
		}, 2000);
	});
}

const API = {
    getTodoList
}
export default API;