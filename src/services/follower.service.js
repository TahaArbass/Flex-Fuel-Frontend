import http from '../Axios.config';

// get all followers
const getAllFollowers = () => {
    return http.get('/followers');
};

// get follower by id
const getFollowerById = (id) => {
    return http.get(`/followers/${id}`);
};

// get all followers of a user (users following `following_id`)
const getFollowersByFollowingId = (followingId) => {
    return http.get(`/followers/following/${followingId}`);
};

// get all users a user is following (`follower_id`)
const getFollowingsByFollowerId = (followerId) => {
    return http.get(`/followers/follower/${followerId}`);
};

// create new follower
const createFollower = (data) => {
    return http.post('/followers', data);
};

// update follower by id
const updateFollower = (id, data) => {
    return http.put(`/followers/${id}`, data);
};

// delete follower by id
const deleteFollower = (id) => {
    return http.delete(`/followers/${id}`);
};

const FollowerService = {
    getAllFollowers,
    getFollowerById,
    getFollowersByFollowingId,
    getFollowingsByFollowerId,
    createFollower,
    updateFollower,
    deleteFollower,
};

export default FollowerService;