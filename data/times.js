const times = {
  blank: '',
  anytime: 'Anytime',
  morning: 'Morning',
  midday: 'Midday',
  afternoon: 'Afternoon',
  evening: 'Evening'
}

export default Object.keys(times).map(value => ({
  value,
  label: times[value]
}))