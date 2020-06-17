<template>
  <div class="container mx-auto h-full flex flex-wrap justify-center items-center">
    <div class="w-2/3">
      <div class="border-teal-500 p-8 border-t-8 bg-white mb-6 rounded-lg shadow-lg">
        <h2 class="font-hairline mb-6 text-center text-2xl">CONFIGURATION</h2>
        <form action="">
          <div class="flex flex-wrap items-start justify-center md:divide-x divide-gray-400 my-6">
            <div class="mt-4 w-full md:w-1/3 flex-1 px-4">
              <label class="text-center">Input Nodes</label>
              <numberInput class="m-auto" v-model="config.input_nodes"></numberInput>
              <div class="mt-6" v-for="(input_node, index) in config.input_nodes" :key="index">
                <label>Input #{{index+1}}</label>
                <input type="number" class="form-input w-full" placeholder="Input value" v-model.number="inputs[index]">
              </div>
            </div>
            <div class="mt-4 w-full md:w-1/3 self-stretch flex-none px-4">
              <label class="text-center">Hidden Nodes</label>
              <numberInput class="m-auto" v-model="config.hidden_nodes"></numberInput>

              <div class="mt-6" v-for="(hidden_node, index) in config.hidden_nodes" :key="index">
                <label>Hidden #{{index+1}}</label>
                <div class="bg-gray-700 w-full h-10 rounded"></div>
              </div>
            </div>
            <div class="mt-4 w-full md:w-1/3 self-stretch flex-1 px-4">
              <label class="text-center">Output Nodes</label>
              <numberInput class="m-auto" v-model="config.output_nodes"></numberInput>

              <div class="mt-6" v-for="(input_node, index) in config.output_nodes" :key="index">
                <label>Output #{{index+1}}</label>
                <input type="number" class="form-input w-full" placeholder="Expected output" v-model.number="outputs[index]">
              </div>
            </div>
          </div>
          <div class="mt-4 w-full md:w-1/2 inline-block px-2">
              <label class="text-center">Learning Rate</label>
              <vue-slider :min="0" :max="1" :interval="0.01" :tooltip-placement="'bottom'" v-model.number="a"/>
          </div>
          <label for="toogleA" class="flex items-center cursor-pointer my-4">
              <div class="relative">
                <input id="toogleA" type="checkbox" class="hidden" v-model.number="manualWeights">
                <div class="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
                <div class="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
              </div>
              <div class="ml-3 text-gray-700 font-medium">Manual initial weights</div>
          </label>
          <div class="flex flex-wrap justify-center divide-x divide-gray-400 my-6" v-if="manualWeights">
            <div class="w-1/2 p-4">
            <h5 class="text-lg font-bold mb-3">Input to hidden weights</h5>
              <div v-for="i in initialWeights_ih.rows" :key="i">
                <div class="w-full md:w-1/2 mt-2 inline-block" v-for="j in initialWeights_ih.cols" :key="j">
                  <label>W<small class="mr-2">{{i}}{{j}}</small>
                    <input type="number" class="form-input w-24 mr-1" placeholder="Weight value" v-model.number="initialWeights_ih.data[i-1][j-1]">
                  </label>
                </div>
              </div>
            </div>
            <div class="w-1/2 p-4">
            <h5 class="text-lg font-bold mb-3">Hidden to output weights</h5>
            <div v-for="k in initialWeights_ho.rows" :key="k">
                <label class="w-full md:w-1/2 mt-2 inline-block" v-for="m in initialWeights_ho.cols" :key="m">W<small class="mr-2">{{k}}{{m}}</small>
                  <input type="number" class="form-input w-24 mr-1" placeholder="Weight value" v-model.number="initialWeights_ho.data[k-1][m-1]">
                </label>
            </div>
            </div>
          </div>
          <label class="inline-block">Epochs<input type="number" class="form-input w-16 ml-1 mr-1" placeholder="w6" v-model.number="epochs"></label><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" @click.prevent="testCompute(epochs)">Start</button>
        </form>
      </div>
    </div>

    <div class="w-2/3 transition duration-500 ease-in" v-if="trained">
      <div class="border-teal-500 p-8 border-t-8 bg-white mb-6 rounded-lg shadow-lg">
        <h2 class="font-hairline mb-6 text-center text-2xl">EVALUATION</h2>
        <errorChart :chart-data="dataCollection"></errorChart>
        <label class="text-center mt-6">Errors & Outputs</label>
        <table class="epochs border-collapse border-2 border-gray-500 w-full mt-5">
          <tbody>
            <tr>
              <th class="bg-gray-300" v-for="j in config.output_nodes" :key="j+'suf4'">Error #{{j}}</th>
              <th class="bg-gray-300" v-for="i in config.output_nodes" :key="i+'suf5'">Output #{{i}}</th>
            </tr>
            <tr>
              <td v-for="(error, i) in chart_errors" :key="i+'suf6'">{{error[epochs-1]}}</td>
              <td v-for="(output, i) in final_ouputs" :key="i+'suf7'">{{output}}</td>
            </tr>
          </tbody>
        </table>
        <div class="flex flex-wrap justify-center my-6">
          <div class="w-1/2 p-4">
            <label class="text-center">Weights (inputs to hidden)</label>
            <table class="epochs border-collapse border-2 border-gray-500 w-full mt-5">
              <tbody>
                <tr>
                  <th class="bg-gray-300">W</th>
                  <th class="bg-gray-300" v-for="i in network.weights_ih.cols" :key="i+'suf1'">{{i}}</th>
                </tr>
                <tr v-for="i in network.weights_ih.rows" :key="i+'suf2'">
                  <th class="bg-gray-300">{{i}}</th>
                  <td v-for="j in network.weights_ih.cols" :key="j">{{round(network.weights_ih.data[i-1][j-1], 2)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="w-1/2 p-4">
            <label class="text-center">Weights (hidden to outputs)</label>
            <table class="epochs border-collapse border-2 border-gray-500 w-full mt-5">
              <tbody>
                <tr>
                  <th class="bg-gray-300">W</th>
                  <th class="bg-gray-300" v-for="i in network.weights_ho.cols" :key="i+'suf1'">{{i}}</th>
                </tr>
                <tr v-for="i in network.weights_ho.rows" :key="i+'suf3'">
                  <th class="bg-gray-300">{{i}}</th>
                  <td v-for="j in network.weights_ho.cols" :key="j">{{round(network.weights_ho.data[i-1][j-1], 2)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Matrix from '../assets/matrix.js'
import {NeuralNetwork} from '../assets/nn.js'
import numberInput from './numberInput.vue'
import errorChart from './errorChart.vue'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
export default {
  name: 'backPropagation',
  props: {
    msg: String
  },
  components:{
    numberInput,
    errorChart,
    VueSlider
  },
  data: function() {
      return {
          config: {
            input_nodes: 2,
            hidden_nodes: 2,
            output_nodes: 1
          },
          inputs: [2,3],
          outputs: [1],
          a: 0.5,
          final_ouputs: [],
          manualWeights: true,
          epochs: 8,
          chart_errors: [],
          dataCollection: null,
          trained: false,
          network: null,
          colorArray : ['#f87979', '#00B3E6', '#FF33FF', '#FFFF99', '#FFB399', '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D']
      }
  },
  methods: {
    round(number, decimals) {
      return +(Math.round(number + "e+" + decimals) + "e-" + decimals); 
    },
    testCompute(epochs){
      this.network = new NeuralNetwork(this.config.input_nodes,this.config.hidden_nodes,this.config.output_nodes);
      this.network.setLearningRate(this.a);
      if(this.manualWeights){
        this.network.weights_ih = this.initialWeights_ih.copy();
        this.network.weights_ho = this.initialWeights_ho.copy();
      }
      let errors = [];
      let tempData = null;
      for (let i = 0; i < epochs; i++) {
        let tempData = this.network.simpleTrain(this.inputs, this.outputs);
        this.final_ouputs= tempData[0];
        errors.push(tempData[1]);
      }
      this.chart_errors = Matrix.transposeArray(errors);
      let datasets = [];

      for(var i = 0; i < this.config.output_nodes; i++){
        datasets[i] = 
          {
            label: 'Output Error #' + (i+1),
            backgroundColor: this.colorArray[i],
            data: this.chart_errors[i]
          }
      }
      let labels = []
      for(i=0; i < this.epochs; i++){
        labels.push(i+1);
      }
      this.dataCollection = {
        labels,
        datasets
      }
      this.trained= true;
    }
  },
  created(){
    this.initialWeights_ih.data[0][0] = 0.11;
    this.initialWeights_ih.data[0][1] = 0.21;
    this.initialWeights_ih.data[1][0] = 0.12;
    this.initialWeights_ih.data[1][1] = 0.08;

    this.initialWeights_ho.data[0][0] = 0.14;
    this.initialWeights_ho.data[0][1] = 0.15;
  },
  computed:{
		testArr: function(){
      let test = new Matrix(3,2);
			return test;
    },
    initialWeights_ih: function(){
      return new Matrix(this.config.hidden_nodes, this.config.input_nodes).randomize()
    },
    initialWeights_ho: function(){
      return new Matrix(this.config.output_nodes, this.config.hidden_nodes).randomize()
    } 
  }
}
</script>

<style scoped>

</style>
