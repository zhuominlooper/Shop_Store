import store from "store";

export default  {
    save:  (KEY='user_key',data) => {
        store.set(KEY,data)
    },

    getData:(KEY='user_key') => {
        return store.get(KEY)||{}
    },
    remove:(KEY='user_key') => {
        store.remove(KEY)
    }
}