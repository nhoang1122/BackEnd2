const houses = require('./db.json');

let globalID = 4;

module.exports = {
    getHouses: (req,res) => {
        res.status(200).send(houses);
    },
    deleteHouse: (req,res) => {
        let index = houses.findIndex(elem => elem.id === +req.params.id);
        houses.splice(index, 1);
        res.status(200).send(houses);
    },
    createHouse: (req,res) => {
        let { address, price, imageURL } = req.body
        let newHouse = {
            id: globalID,
            address: address, 
            price: price,
            imageURL: imageURL
        }
        houses.push(newHouse)
        res.status(200).send(houses)
        globalID++
    },
    updateHouse: (req,res) => {
        let { id } = req.params
        let { type } = req.body
        let index = houses.findIndex(elem => +elem.id === +id)

        if (type === 'plus') {
            houses[index].price += 10000
            res.status(200).send(houses)
        } else if (type === 'minus') {
            houses[index].price -= 10000
            res.status(200).send(houses)
        } else {
            res.sendStatus(400)
        }
    }
}
