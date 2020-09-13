const Discord = require('discord.js');
const fetch = require('node-fetch');

const reporterBot = new Discord.Client();

// APIKEY
const EtherScanKey = '';
// Wallet Address
const DAOWallet = '';
// Discord bot token
const BotToken = '';

const prefix = '!';

reporterBot.once('ready', () => {
    console.log('Reporter Bot is online!');
});

reporterBot.on('message', async message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        message.channel.send('pong');
    } else if (command === 'help'){
        message.channel.send('Here are some commands you can tell me to do:' +
        '\n    !help - Brings you here, where I describe my applicable commands.' +
        '\n    !wallet - Post the contents in the wallet of the DAO.' +
        '\n    !ping - I will respond with \'pong\'.' +
        '\n    !shutup - I will respond in kind.' +
        '\n    !meow - Post a picture of a random cat (Matt used this to practice API calls)' +
        '\n\nSome commands I will have soon:' +
        '\n    !assets - Post the price of a selection of crypto assets.' +
        '\n\nIn the future I will also make a post everytime an asset gets ' +
        'dropped into the DAO\'s wallet.'
        );
    } else if(command === 'shutup'){
        message.channel.send('No You!');
    } else if(command === 'meow'){

        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());

        message.channel.send(file);
    } else if (command === 'wallet'){

        try{
            const ETH = await fetch('https://api.etherscan.io/api?module=account&action=balance&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
            // contract address for USDC 0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48
            const USDC = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
            // contract address for MKR 0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2
            const MKR = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
            // contract address for BAL 0xba100000625a3754423978a60c9317c58a424e3d
            const BAL = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xba100000625a3754423978a60c9317c58a424e3d&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
            // contract address for OMG 0xd26114cd6EE289AccF82350c8d8487fedB8A0C07
            const OMG = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xd26114cd6EE289AccF82350c8d8487fedB8A0C07&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
            // contract address for REN 0x408e41876cccdc0f92210600ef50372656052a38
            const REN = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x408e41876cccdc0f92210600ef50372656052a38&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
            // contract address for ZRX 0xe41d2489571d322189246dafa5ebde1f4699f498
            const ZRX = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xe41d2489571d322189246dafa5ebde1f4699f498&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
            // contract address for BAT 0x0d8775f648430679a709e98d2b0cb6250d2887ef
            const BAT = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x0d8775f648430679a709e98d2b0cb6250d2887ef&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
            // contract address for BNT 0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c
            const BNT = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x1f573d6fb3f13d689ff844b4ce37794d79a7ff1c&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
            // contract address for KNC 0xdd974d5c2e2928dea5f71b9825b8b646686bd200
            const KNC = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0xdd974d5c2e2928dea5f71b9825b8b646686bd200&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
            // contract address for DAI 0x6b175474e89094c44da98b954eedeac495271d0f
            const DAI = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x6b175474e89094c44da98b954eedeac495271d0f&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
            // contract address for LEND 0x80fB784B7eD66730e8b1DBd9820aFD29931aab03
            const LEND = await fetch('https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=0x80fB784B7eD66730e8b1DBd9820aFD29931aab03&address=' + DAOWallet + '&tag=latest&apikey=' + EtherScanKey).then(response => response.json());
            
            const wallet = '```ETH          ' + (ETH.result/1000000000000000000) +
                            '\nUSDC         ' + (USDC.result/1000000) +
                            '\nMKR          ' + (MKR.result/1000000000000000000) +
                            '\nBAL          ' + (BAL.result/1000000000000000000) +
                            '\nOMG          ' + (OMG.result/1000000000000000000) +
                            '\nREN          ' + (REN.result/1000000000000000000) +
                            '\nZRX          ' + (ZRX.result/1000000000000000000) +
                            '\nBAT          ' + (BAT.result/1000000000000000000) + 
                            '\nBNT          ' + (BNT.result/1000000000000000000) +
                            '\nKNC          ' + (KNC.result/1000000000000000000) +
                            '\nDAI          ' + (DAI.result/1000000000000000000) +
                            '\nLEND         ' + (LEND.result/1000000000000000000)+
                            '```';

            message.channel.send(wallet);

        } catch(error) {
            message.channel.send(error.message);
        } // end try/catch block

    }   // * * * add more commands here * * * 
    
});




// * * * THIS NEEDS TO BE THE LAST LINE IN THE FILE * * * 
reporterBot.login(BotToken);