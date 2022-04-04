const dateFun = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const date = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21th', '22th', '23th', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31th', ]
    const now = new Date();
    const mm = months[now.getMonth()];
    const dd = date[now.getDate() - 1];
    const yy = now.getFullYear();
    const tt = now.toLocaleTimeString();
    return `${mm} ${dd}, ${yy} at ${tt}`
}

module.exports = { dateFun };