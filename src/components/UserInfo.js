export class UserInfo {
    constructor({ userName, userJob, userAvatar}) {
        this._name = document.querySelector(userName);
        this._job = document.querySelector(userJob);
        this._avatar = document.querySelector(userAvatar);
    }
    getUserInfo() {
        const description = {
            name: this._name.textContent,
            job: this._job.textContent,
        };
        return description;

    }
    setUserInfo(data) {
        this._name.textContent = data.name;
        this._job.textContent = data.job;
    }

    setUserAvatar(data) {
        this._avatar.src = data.avatar;
    }

}