import { Client } from "discord.js";

export default (client: Client) => {
    const statusOptions = [
        "Getting a baba!",
        "Drinking milk!",
        "Playing with food!",
        "Getting changed!",
        "Playing with padding!",
        "Doing some colouring!",
        "Cuddling stuffies!",
    ]
    let counter = 0

    const updateStatus = () => {
        client.user?.setPresence({
            status: 'online',
            activities:[
                {
                    name: statusOptions[counter]
                }
            ]
        })
        console.log(`Set client status to "${statusOptions[counter]}"`);
        if (++counter >= statusOptions.length){
            counter = 0
        }
        setTimeout(updateStatus, 1000 * 60)
        
    }
    updateStatus()

}

export const config = {
    dbName: 'STATUS_CHANGER',
    displayName: 'Status Changer'
}