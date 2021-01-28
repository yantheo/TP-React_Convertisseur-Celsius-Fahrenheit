const scaleNames = {
    c: "Celsius",
    f: "Fehrenheit"
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32
}

function tryConvert(temperature, convert) {
    const value = parseFloat(temperature)
    if(Number.isNaN(value)){
        return "";
    }
    return (Math.round(convert(value) *100) / 100).toString()
}

function BoilingVerdict({ celsius }) {
    if (celsius >= 100) {
        return <div className="alert alert-danger text-center">L'eau bout!</div>
    }
    return <div className="alert alert-info text-center">L'eau ne bout pas!</div>
}

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        this.props.onTemperatureChange(e.target.value)
    }

    render() {
        const { temperature } = this.props
        const datatype = 'scale' + this.props.scale
        const scalename = scaleNames[this.props.scale]
        return <div className="form-group">
            <label htmlFor={datatype}>Température en {scalename}</label>
            <input type="text" id={datatype} value={temperature} className="form-control" onChange={this.handleChange} />
        </div>
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props)
        this.state = { 
            temperature: "20",
            scale: "c" 
        }
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this)
        this.handleFarenheitChange = this.handleFarenheitChange.bind(this)
    }

    handleCelsiusChange(temperature) {
        this.setState({
            scale: "c",
            temperature})

    }

    handleFarenheitChange(temperature) {
        this.setState({
            scale: "f",
            temperature})

    }

    render() {
        const { temperature, scale } = this.state
        const celsius = scale === 'c' ? temperature : tryConvert(temperature, toCelsius)
        const fahrenheit = scale === 'f' ? temperature : tryConvert(temperature, toFahrenheit)
        return <div>
            <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
            <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFarenheitChange}/>
            <BoilingVerdict celsius={celsius} />
        </div>
    }
}

ReactDOM.render(<Calculator />, document.querySelector("#tp"))