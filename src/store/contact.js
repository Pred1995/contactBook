const state = {
  items: [
    {
      id: Math.random(),
      name: "Виктор",
      mobile: "8 (499) 721-21-12",
      tasks: []
    }
  ]
};

const getters = {
  items: s => s.items,
  contactById: s => id => s.items.find(contact => contact.id === id),
  contactItems: s => id => s.items[s.items.findIndex(c => c.id === id)].tasks
};

export default {
  state,
  getters,
  actions: {
    async editContact({ commit }, item) {
      try {
        commit("editContact", item);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    async addContact({ commit }, item) {
      try {
        commit("addContact", item);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    async deleteContact({ commit }, payload) {
      try {
        commit("deleteContact", payload);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    async addItemToContact({ commit }, payload) {
      try {
        commit("addItemToContact", payload);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    async deleteItemContact({ commit }, payload) {
      try {
        commit("deleteItemContact", payload);
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    async updateItemContact({ commit }, payload) {
      try {
        commit("updateItemContact", payload);
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  },
  mutations: {
    addContact(state, value) {
      state.items = state.items.concat({
        id: Math.random(),
        tasks: [],
        ...value
      });
    },
    deleteContact(state, payload) {
      state.items = state.items.filter(c => c.id !== payload);
    },
    deleteItemContact(state, { index, id }) {
      const idx = state.items.findIndex(c => c.id === id);
      state.items[idx].tasks.splice(index, 1);
    },
    addItemToContact(state, { id, value }) {
      const idx = state.items.findIndex(c => c.id === id);
      state.items[idx].tasks.push(value);
    },
    updateItemContact(state, { id, index, updateText }) {
      const idx = state.items.findIndex(c => c.id === id);
      state.items[idx].tasks[index] = updateText;
    }
  }
};
