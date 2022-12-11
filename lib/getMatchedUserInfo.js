const getMatchedUserInfo = (users, userLoggedIn) => {
    const newUsers = {...users};
   
    delete newUsers[userLoggedIn];

    const [ id, user] = Object.entries(newUsers).flat()
    // console.log("Object.entries(newUsers)",Object.entries(newUsers));
    // console.log(id, user)

    return { id, ...user}
}

export default getMatchedUserInfo;