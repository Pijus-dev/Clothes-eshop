const data = localStorage.getItem("persist:root");
const currentUser = JSON.parse(JSON.parse(data).user).currentUser;
export const userId = currentUser.id ?? currentUser.uid;
