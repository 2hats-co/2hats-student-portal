import React from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
const codes = ['UNSWAISOC123','UTSMEDICAL12',
'BUSINESSONE1','USYDNETWORK1','UNSWYOUNGEN1',
'UNSWSTARTUPS','USYDJAMMINGS','UNSWMEDREVUE',
'USYDKOREANCA','UNSWLAWREVUE','USYDBUSINESS',
'MUMUBSOCIETY','UNSWREALSOCS','UNSWMANAGESO',
'UNSWINVESTSO','UNSWBUSINESS','UNSWBITSASOC',
'UNSWASOCIETY']
class PromoCode extends React.Component{
 constructor(props){
        super(props)
        this.state = {
          isValid:true,
        code:''
        }
        this.handleChange = this.handleChange.bind(this)
     }
    componentWillMount(){
        console.log(this.props)
        if(this.props.value){
            this.setState({code:this.props.value})
        }
    }
    
    handleChange(e){
        const value = e.target.value.toUpperCase()
        const {changeHandler} = this.props
        if(value.length <= 12){
            this.setState({code:value})
        }
        
        if(codes.includes(value)){
            this.setState({isValid:true})
          changeHandler('promoCode',value)
        }else{
            this.setState({isValid:false})
        }
    }
    render(){
        const {isValid,code} = this.state
        return(
        <FormControl style={{width:'100%'}}
        id="promoCode"
        key="promoCode"
        error = {!isValid && code.length > 11}
         aria-describedby="component-error-text">
          <InputLabel htmlFor="component-error">{(!isValid && code.length > 11)?'Promo Code(invalid)':'Promo Code'}</InputLabel>
          <Input id="component-error" value={code} onChange={this.handleChange} />
        </FormControl>
        )
    }
}
export default PromoCode
