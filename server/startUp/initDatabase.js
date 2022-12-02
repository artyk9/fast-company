const Quality = require('../models/Quality')
const Profession = require('../models/Profession')
const qualitiesMock = require('../mock/qualities.json')
const professionsMock = require('../mock/professions.json')

module.exports = async () => {
  const profesions = await Profession.find()
  if (profesions.length !== professionsMock.length) {
    await createInitialEntity(Profession, professionsMock)
  }
  const qualities = await Quality.find()
  if (qualities.length !== qualitiesMock.length) {
    await createInitialEntity(Quality, qualitiesMock)
  }
}

async function createInitialEntity(Model, data) {
  await Model.collection.drop()
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id
        const newItem = new Model(item)
        await newItem.save()
        return newItem
      } catch (error) {
        return error
      }
    })
  )
}
