import React from 'react';
import { StyleSheet, Text, View ,Button,TouchableOpacity} from 'react-native';

export default class App extends React.Component {
  constructor()
  {
    super();
    this.state={
       resultText:"",
       calculateText:""
    };
    this.oparr=['DEL','+','-','*','/']
  }
  calculate()
  {
    const text=this.state.resultText;
     this.setState({
       calculateText: eval(text),
       resultText: ""
     })
  }
  validate()
  {
    switch(this.state.resultText.slice(-1))
    {
      case '+':
      case '-':
      case '*':
      case '/':
            return false;
    }
    return true;
  }
  onfunc(text){
    if(text == '=')
    {
      return this.validate() && this.calculate();
    }
    this.setState({
      resultText:this.state.resultText+text
    })
  }
  operator(opt)
  {
    switch(opt){
      case 'DEL':
                 let text=this.state.resultText.split('')
                 text.pop()
                 this.setState({
                   resultText:text.join('')
                 })
                 break
      case '+':
      case '-':
      case '*':
      case '/':
                const lastChar=this.state.resultText.split('').pop()
                if(this.oparr.indexOf(lastChar)>0) return
                if(this.state.resultText == "") return
                this.setState({
                  resultText:this.state.resultText+opt
                })
                 
    }
  }

  render() {
     let rows=[]
     let nums=[[1,2,3],[4,5,6],[7,8,9],[0,'.','=']]
     for(let i=0;i<4;i++)
     {
       let row=[] 
       for(let j=0;j<3;j++)
       {
       row.push(<TouchableOpacity key={nums[i][j]} onPress={() => this.onfunc(nums[i][j])} style={styles.btn}><Text style={styles.text1}>{nums[i][j]}</Text></TouchableOpacity>);
       }
       rows.push(<View key={i} style={styles.row1}>{row}</View>);
     }

     let operations=[]
     for(let i=0;i<5;i++)
     {
        operations.push(<TouchableOpacity key={this.oparr[i]} onPress={() => this.operator(this.oparr[i])}style={styles.btn}><Text style={styles.text2}>{this.oparr[i]}</Text></TouchableOpacity>);
     }

    return (
      <View style={styles.container}>
        <View style={styles.result}>
           <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
            <Text style={styles.calText}>{this.state.calculateText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>
             {rows}
          </View>
          <View style={styles.operations}>
              {operations}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  resultText:{
    fontSize:30,
    color:'white'
  },
  text1:{
     fontSize:30,
  },
  text2:{
     fontSize:30,
     color:'black',
  },
  calText:{
    fontSize:40,
    color:'white'
  },
  btn:{

  },
  result:{
    flex:2,
    backgroundColor:'black',
    justifyContent:'center',
     alignItems:'flex-end',
  },
  calculation:{
    flex:1,
    backgroundColor:'black',
    justifyContent:'center',
    alignItems:'flex-end',
  },
  row1:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
  },
  buttons:{
    flex:7,
    flexDirection:'row',
    backgroundColor:'black',
  },
  numbers:{
    flex:3,
    backgroundColor:'#70788D',
  },
  operations:{
    flex:1,
    alignItems:'center',
    justifyContent:'space-around',
    backgroundColor:'orange',
  },
});
