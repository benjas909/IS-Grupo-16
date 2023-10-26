import { createStore } from "redux";

function dataReducer(state = { username: "MUNDO" }, action) {
	switch (action.type) {
		case "setUsername":
			return { username: action.payload.username };
		default:
			return state;
	}
}

const store = createStore(dataReducer);

export default store;
