import axios from 'axios';

const getUsers =  () => {
    try {

        return new Promise(function (resolve , reject) {
            const nodeNodeTarget = 'owner'
            fetch(`http://localhost:5000/users`)
                .then(res => res.json())
                .then(allUsers => {
                    if (allUsers) {

                        allUsers = allUsers.filter(item => item.supervisor || item.lastname == nodeNodeTarget)
                        const idMapping = allUsers.reduce((acc, el, i) => {
                            acc[el.uuid] = i;
                            return acc;
                        }, {});

                        let root;
                        allUsers.forEach((el, i) => {
                            let labelElement = allUsers[idMapping[el.uuid]]
                            if (el.name === undefined) {
                                labelElement.name = (el.firstname || "00") + " " + (el.lastname || "--")
                            }
                            if (el.id === undefined) {
                                labelElement.id = (el.uuid) ? el.uuid : null
                            }
                            if (el.title === undefined) {
                                labelElement.title = "Manager"
                            }

                            if (el.lastname === nodeNodeTarget) {
                                root = el
                                return
                            }

                            const parentEl = allUsers[idMapping[el.supervisor]]
                            parentEl.children = [...(parentEl.children || []), el]

                        });

                        console.log(root)
                        resolve(root)
                    }

                });
        })
    }
    catch (error) {
        // TODO: handle error
        console.log(error);
    }

}

export default getUsers