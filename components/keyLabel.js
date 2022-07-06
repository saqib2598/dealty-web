import homeInfoQuestions from '../data/homeInfoQuestions.json'
import otherHomeUpdates from '../data/otherHomeUpdates.json'

const findValue = (subject, type, key) => {
  if (key) {
    const choice = subject.find(q => q.key == type).choices.find(c => c.value == key)
    return choice ? choice.label : key
  }
}

export const propertyLabel = key => findValue(homeInfoQuestions, 'buildingType', key)
export const horseFeatures = key => findValue(otherHomeUpdates, 'horseFeatures', key)
