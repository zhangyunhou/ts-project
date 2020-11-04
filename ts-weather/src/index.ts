import axios, { AxiosResponse } from 'axios'
import colors from 'colors'
import commander from 'commander'
const command = commander
  .version('0.1.0')
  .option('-c, --city [name]', 'Add city name')
  .parse(process.argv)
if (process.argv.slice(2).length === 0) {
  command.outputHelp(colors.red)
  process.exit()
}

interface IWeatherResponse {
  status: string
  count: string
  info: string
  infocode: string
  lives: Ilive[]
}
interface Ilive {
  province: string
  city: string
  adcode: string
  weather: string
  temperature: string
  winddirection: string
  windpower: string
  humidity: string
  reporttime: string
}

const URL = 'https://restapi.amap.com/v3/weather/weatherInfo'
const KEY = '0a87ab029136607726ed4b0bd01562d1'
console.log(`${URL}?city=${encodeURI(command.city)}&key=${KEY}`)

axios
  .get(`${URL}?city=${encodeURI(command.city)}&key=${KEY}`)
  .then((res: AxiosResponse<IWeatherResponse>) => {
    const live = res.data.lives[0]
    console.log(colors.yellow(live.reporttime))
    console.log(colors.white(`${live.province} ${live.city}`))
    console.log(colors.green(`${live.weather} ${live.temperature}度`))
  })
