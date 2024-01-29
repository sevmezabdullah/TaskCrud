import axios from "axios";



const BASE_URL = 'http://localhost:3004/tasks'

const TaskService = {
    getTasks: async () => {
        try {
            const response = await axios.get(`${BASE_URL}`);
            return response;
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    },

    addTask: async (task) => {
        try {
            const response = await axios.post(`${BASE_URL}`, task);
            return response.data;
        } catch (error) {
            console.error('Error adding task:', error);
            throw error;
        }
    },

    removeTask: async (taskId) => {
        try {
            await axios.delete(`${BASE_URL}/${taskId}`);
        } catch (error) {
            console.error('Error removing task:', error);
            throw error;
        }
    },
    updateTask: async (taskId, updatedTask) => {
        try {
            const response = await axios.put(`${BASE_URL}/${taskId}`, updatedTask);
            return response.data;
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    },
};


export default TaskService;