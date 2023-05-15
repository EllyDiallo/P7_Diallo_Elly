import { createStore, action, thunk, computed } from "easy-peasy";
import api from './Api/getAxios';

export default createStore({
    posts: [],
    setPosts: action((state, payload) => {
        state.posts = payload;
    }),
    postTitle: '',
    setPostTitle: action((state, payload) => {
        state.postTitle = payload;
    }),
    postContent: '',
    setPostContent: action((state, payload) => {
        state.postContent = payload;
    }),
    postAttachment: '',
    setPostAttachhment: action((state, payload) => {
        state.postAttachment = payload;
    }),
    editTitle: '',
    setEditTitle: action((state, payload) => {
        state.editTitle = payload;
    }),
    editContent: '',
    setEditContent: action((state, payload) => {
        state.editContent = payload;
    }),
    editAttachment: '',
    setEditAttachment: action((state, payload) => {
        state.editAttachment = payload;
    }),
    search: '',
    setSearch: action((state, payload) => {
        state.search = payload;
    }),
    searchResults: [],
    setSearchResults: action((state, payload) => {
        state.searchResults = payload;
    }),
    postCount: computed((state) => state.posts.length),
    getPostById: computed((state) => {
        return (uuid) => state.posts.find(post => (post.uuid).toString() === uuid);
    }),
    savePost: thunk(async (actions, newPost, helpers) => {
        const { posts } = helpers.getState();
        try {

            const response = await api.post('/message/new/e45d08fb-3d00-4972-bc3f-ecc391530fa3',newPost,{
            headers: {
            'Content-Type': 'multipart/form-data'
            }})      
          
            actions.setPosts([...posts, response.data]);
            actions.setPostTitle('');
            actions.setPostContent('');  
            console.log(response)
        } catch (err) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        }
    }),
    deletePost: thunk(async (actions, uuid, helpers) => {
        const { posts } = helpers.getState();
         try {
        await api.delete(`message/delete/${uuid}`)
            actions.setPosts(posts.filter(post => post.uuid !== uuid));
      } catch (err) {
        console.log(err)
      }
      
    }),
    editPost: thunk(async (actions, state, newEditPost, uuid, helpers) => {
        const { posts } = helpers.getState();
       try {
      const response = await api.put(`/message/update/${uuid}`, newEditPost,{
                             headers: {'Content-Type': 'multipart/form-data'}});
      console.log(response.data);
      actions.setPosts(posts.map(post => post.uuid === uuid ? { ...response.data } : post));
      actions.setEditTitle(state.editTitle);
      actions.setEditContent(state.editContent);
      actions.setEditAttachment(state.editAttachment);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
    })
});