<template>
    <div class="flex flex-row border h-10 w-24 rounded-lg border-gray-400 relative">
        <button class="font-semibold border-r bg-blue-500 hover:bg-blue-400 text-white border-gray-400 h-full w-20 flex rounded-l focus:outline-none cursor-pointer" @click.prevent="decrease">
        <span class="m-auto">-</span>
        </button>
        <input type="hidden" class="md:p-2 p-1 text-xs md:text-base border-gray-400 focus:outline-none text-center" v-model="number" readonly name="custom-input-number">
        <div class="bg-white w-24 text-xs md:text-base flex items-center justify-center cursor-default">
        <span>{{number}}</span>
        </div>

        <button class="font-semibold border-l  bg-blue-500 hover:bg-blue-400 text-white border-gray-400 h-full w-20 flex rounded-r focus:outline-none cursor-pointer" @click.prevent="increase">
        <span class="m-auto">+</span>
        </button>
        <!-- <div class="absolute flex flex-col p-2 w-32 md:w-full mt-6 md:mt-8 mt-10 flex items-start justify-center">
        <svg width="10" height="10" class="fill-current ml-5 md:mx-auto">
            <polygon points="0 10, 10 10, 5 0" />
        </svg>
        <span class="text-xs block w-48 flex flex-wrap justify-center bg-black p-3 h-auto rounded-lg text-white">Input validation message</span>
        </div> -->
    </div> 
</template>
  
<script>
    export default {
        name: 'numberInput',
        props: ['value'],
        data: function() {
            return {
            }
        },
        methods: {
            increase(){
                this.number++;
            },
            decrease(){
                this.number--;
            }
        },
        computed: {
            number: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
            }
        } 
    }
</script>

<style>

</style>